const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Objeto que centraliza todas las llamadas a la API.
export const apiService = {
  // Metodo para realizar peticiones GET.
  get: async (endpoint, token = null) => {
    const headers = { 'Content-Type': 'application/json' }; 
    // Si se provee un token, lo agregamos a las cabeceras.
    if (token) headers['Authorization'] = `Bearer ${token}`; 

    const res = await fetch(`${API_BASE_URL}${endpoint}`, { headers }); 
    let data = null;
    try { data = await res.json(); } catch { data = null; } // Manejo de respuestas sin JSON.
    // Si la respuesta no es exitosa, lanzamos un error.
    if (!res.ok) throw new Error(data?.message || `Error: ${res.status}`); 
    return data;
  },

  // Metodo para realizar peticiones POST.
  post: async (endpoint, body, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`; 

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',       
      headers,                 
      body: JSON.stringify(body), // Convertimos el cuerpo de la peticion a JSON.
    });

    let data = null;
    try { data = await res.json(); } catch { data = null; } 
    if (!res.ok) throw new Error(data?.message || `Error: ${res.status}`); 
    return data; 
  },
  
  // Metodo para realizar peticiones PUT.
  put: async (endpoint, body, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    let data = null;
    try { data = await res.json(); } catch { data = null; }
    if (!res.ok) throw new Error(data?.message || `Error: ${res.status}`);
    return data;
  },
};

/* --- FUNCIONES DE VALIDACION Y NORMALIZACION DE DATOS --- */

// Lista de hosts de imagenes que sabemos que estan rotos o no funcionan.
const BAD_IMAGE_HOSTS = new Set(['placeimg.com', 'placeimg.cc']);

// Valida si una URL de imagen es valida y no pertenece a los hosts bloqueados.
function isGoodImageUrl(url) {
  try {
    const u = new URL(url); 
    return (u.protocol === 'http:' || u.protocol === 'https:')
      && !BAD_IMAGE_HOSTS.has(u.hostname); 
  } catch {
    return false; // Si la URL no se puede parsear, no es valida.
  }
}

// Limpia y normaliza el array de imagenes de un producto.
export function normalizeProduct(p) {
  const raw = Array.isArray(p?.images) ? p.images : (p?.images ? [p.images] : []);
  // Filtramos URLs vacias o de hosts bloqueados.
  const images = raw.filter(Boolean).filter(isGoodImageUrl);
  // Devolvemos el producto con el array de imagenes limpio.
  return { ...p, images };
}

// Detecta si el titulo del producto indica que es un producto de prueba.
function isTestTitle(title) {
  return typeof title === 'string' && /test\s*product/i.test(title);
}

// Verifica si un producto tiene al menos una imagen valida.
export function hasImages(p) {
  return Array.isArray(p?.images) && p.images.length > 0; 
}

// Funcion principal para determinar si un producto es "utilizable" en la tienda.
export function isUsableProduct(p) {
  // Un producto es usable si no es de prueba y tiene imagenes.
  return !isTestTitle(p?.title) && hasImages(p);
}


/* --- FUNCIONES DE ALTO NIVEL PARA CONSUMIR LA API --- */

// Obtiene una lista de productos, ya normalizados y filtrados.
export async function getProducts(limit = 24, offset = 0) {
  const data = await apiService.get(`/products?limit=${limit}&offset=${offset}`);
  return (Array.isArray(data) ? data : [])
    .map(normalizeProduct)  
    .filter(isUsableProduct);
}

// Obtiene productos por categoria, aplicando la misma logica de limpieza.
export async function getProductsByCategory(categoryId, limit = 24, offset = 0) {
  const data = await apiService.get(`/categories/${categoryId}/products?limit=${limit}&offset=${offset}`);
  return (Array.isArray(data) ? data : [])
    .map(normalizeProduct)  
    .filter(isUsableProduct);
}

// Obtiene un solo producto por ID y lanza un error si no es valido.
export async function getProductById(id) {
  const p = normalizeProduct(await apiService.get(`/products/${id}`));
  if (!isUsableProduct(p)) throw new Error('Producto invalido (sin imagenes o de prueba)'); 
  return p; 
}

// Obtiene solo las categorias que contienen al menos N productos validos.
export async function getCategoriesWithProducts({ sample = 2 } = {}) {
  const cats = await apiService.get('/categories'); 
  // Hacemos una llamada por cada categoria para verificar si tiene productos usables.
  const checks = await Promise.allSettled(
    (cats || []).map(async (c) => {
      const prods = await getProductsByCategory(c.id, sample, 0);
      return prods.length > 0 ? c : null; 
    })
  );

  // Filtramos los resultados para devolver solo las categorias que pasaron la verificacion.
  return checks
    .map((r) => (r.status === 'fulfilled' ? r.value : null))
    .filter(Boolean);
}