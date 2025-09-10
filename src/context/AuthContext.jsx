import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { apiService } from "../services/apiService";

// Contexto para manejar el estado de autenticacion y la informacion del usuario.

const AuthContext = createContext(null);

// Claves para guardar los tokens en localStorage.
const LS_ACCESS = "authToken";
const LS_REFRESH = "authRefreshToken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Inicializamos los tokens desde localStorage para mantener la sesion.
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem(LS_ACCESS)
  );
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem(LS_REFRESH)
  );
  const [loading, setLoading] = useState(true); // Estado de carga inicial para verificar la sesion.
  const refreshingRef = useRef(null); // Ref para evitar multiples peticiones de refresh-token simultaneas.

  // Guarda o elimina los tokens en el estado y en localStorage.
  const saveTokens = useCallback((access, refresh) => {
    if (access) {
      setAccessToken(access);
      localStorage.setItem(LS_ACCESS, access);
    } else {
      setAccessToken(null);
      localStorage.removeItem(LS_ACCESS);
    }
    if (refresh) {
      setRefreshToken(refresh);
      localStorage.setItem(LS_REFRESH, refresh);
    } else {
      setRefreshToken(null);
      localStorage.removeItem(LS_REFRESH);
    }
  }, []);

  // Obtiene el perfil del usuario usando un token de acceso.
  const fetchProfile = useCallback(async (authToken) => {
    const profile = await apiService.get("/auth/profile", authToken);
    setUser(profile);
    return profile;
  }, []);

  // Actualiza localmente los datos del usuario.
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
  };

  // Efecto principal que se ejecuta al cargar la app para verificar si hay una sesion activa.
  useEffect(() => {
    let mounted = true;
    (async () => {
      const at = localStorage.getItem(LS_ACCESS);
      if (!at) {
        setLoading(false);
        return;
      } // Si no hay token, no hay sesion.

      try {
        // Intenta obtener el perfil con el token actual.
        await fetchProfile(at);
      } catch {
        // Si el token expiro, intenta refrescarlo.
        const rt = localStorage.getItem(LS_REFRESH);
        if (rt) {
          try {
            const data = await apiService.post("/auth/refresh-token", {
              refreshToken: rt,
            });
            saveTokens(data?.access_token, data?.refresh_token || rt);
            await fetchProfile(data?.access_token);
          } catch {
            // Si el refresh-token tambien falla, cierra la sesion.
            saveTokens(null, null);
            setUser(null);
          }
        } else {
          saveTokens(null, null);
          setUser(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchProfile, saveTokens]);

  // Funcion para iniciar sesion.
  const login = useCallback(
    async (email, password) => {
      const data = await apiService.post("/auth/login", { email, password });
      saveTokens(data?.access_token, data?.refresh_token);
      const me = await fetchProfile(data?.access_token);
      return me;
    },
    [fetchProfile, saveTokens]
  );

  // Funcion para registrar un nuevo usuario.
  const register = useCallback(async (name, email, password) => {
    const avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`;
    await apiService.post("/users/", { name, email, password, avatar });
  }, []);

  // Funcion para cerrar sesion.
  const logout = useCallback(() => {
    saveTokens(null, null);
    setUser(null);
  }, [saveTokens]);

  const authFetch = useCallback(
    async (endpoint, init = {}) => {
      if (!accessToken) throw new Error("No access token");

      const doCall = (token) =>
        fetch(`https://api.escuelajs.co/api/v1${endpoint}`, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...(init.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        });

      let res = await doCall(accessToken);
      if (res.status !== 401) return res;

      if (!refreshToken) return res;
      if (!refreshingRef.current) {
        refreshingRef.current = apiService
          .post("/auth/refresh-token", { refreshToken })
          .then((data) => {
            saveTokens(data?.access_token, data?.refresh_token || refreshToken);
            return data?.access_token;
          })
          .finally(() => {
            refreshingRef.current = null;
          });
      }
      const newAccess = await refreshingRef.current;
      res = await doCall(newAccess);
      return res;
    },
    [accessToken, refreshToken, saveTokens]
  );

  // Valor del contexto que se expone a los componentes hijos.
  const value = useMemo(
    () => ({
      user,
      token: accessToken,
      isAuthenticated: !!accessToken && !!user,
      login,
      logout,
      register,
      loading,
      updateUser,
    }),
    [user, accessToken, login, logout, register, loading, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para consumir el contexto de forma sencilla.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return ctx;
};
