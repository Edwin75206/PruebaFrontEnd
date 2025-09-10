import * as React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Collapse } from "@mui/material";
import { getCategoriesWithProducts } from "../../services/apiService";

// Barra de navegacion para las categorias de productos.
export function CategoryNav({ open = true }) {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    // Control para evitar actualizaciones de estado en un componente desmontado.
    let mounted = true;
    getCategoriesWithProducts({ sample: 2 })
      .then((data) => { if (mounted) setCategories(data || []); })
      .catch(console.error);
    return () => { mounted = false; };
  }, []);

  // Estilo base para todas las pestañas.
  const baseStyle = {
    padding: '12px 20px', 
    borderRadius: '0px', 
    fontSize: '16px',
    fontWeight: 500,
    transition: 'background-color 0.2s, color 0.2s',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: '#4B5563', 
  };

  // Estilo que se sobrepone cuando una pestaña esta activa.
  const activeStyle = {
    backgroundColor: '#F5F2EE',
    color: '#111827',        
    fontWeight: 600,
  };

  return (
    // La visibilidad de toda la barra se controla desde el Header con la prop 'open'.
    <Collapse in={open} timeout={250}>
      <Box sx={{ bgcolor: "background.paper", borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
          <div className="flex items-center space-x-2 overflow-x-auto category-scrollbar">
            {categories.map((c) => (
              <NavLink
                key={c.id}
                to={`/category/${c.id}`}
                // React Router nos da 'isActive' para saber si la ruta coincide.
                style={({ isActive }) =>
                  // Si esta activa, se combinan ambos objetos de estilo.
                  isActive 
                    ? { ...baseStyle, ...activeStyle }
                    : baseStyle
                }
              >
                {c.name}
              </NavLink>
            ))}
          </div>
        </Container>
      </Box>
    </Collapse>
  );
}