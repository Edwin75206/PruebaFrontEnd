import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import Snackbar from "../components/common/Snackbar";
import { snackbars } from "../config/snackbars";

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children, autoHideMs = 2500 }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("success");
  const [action, setAction] = useState(null);

  const openWith = (message, variant = "success", act = null) => {
    setMsg(message);
    setType(variant);
    setAction(act);
    setOpen(true);
  };

  const show = useCallback((message, variant = "success") => {
    openWith(message, variant, null);
  }, []);

  const showAction = useCallback((message, variant = "success", act = null) => {
    openWith(message, variant, act);
  }, []);

  const showKey = useCallback((key, vars = {}) => {
    const item = snackbars[key];
    if (!item) return;
    let text = item.defaultMessage;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replaceAll(`{${k}}`, String(v));
    });
    openWith(text, item.type || "success", null);
  }, []);

  const showKeyAction = useCallback((key, vars = {}, act = null) => {
    const item = snackbars[key];
    if (!item) return;
    let text = item.defaultMessage;
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replaceAll(`{${k}}`, String(v));
    });
    openWith(text, item.type || "success", act);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 3500);
    return () => clearTimeout(t);
  }, [open]);

  const value = useMemo(
    () => ({ show, showAction, showKey, showKeyAction, close }),
    [show, showAction, showKey, showKeyAction, close]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {open && (
        <Snackbar message={msg} type={type} action={action} onClose={close} />
      )}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");
  return ctx;
}
