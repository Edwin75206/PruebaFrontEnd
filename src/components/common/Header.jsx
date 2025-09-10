import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Box, Badge,
  Avatar, Menu, MenuItem, Tooltip, Divider, ListItemIcon, useMediaQuery, useTheme
} from '@mui/material';
import { Icon } from '../../icons/index.jsx'; 
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { messages } from '../../config/defaultMessages';
import { CategoryNav } from './CategoryNav';

// Componente principal de la barra de navegacion superior.
export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const theme = useTheme();
  // Hook de MUI para detectar el tamano de la pantalla y aplicar logica responsiva.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Estado para controlar la visibilidad de la barra de navegacion de categorias.
  const [showCategories, setShowCategories] = React.useState(true);
  const handleToggleMenu = React.useCallback(() => {
    setShowCategories((v) => !v);
  }, []);

  // Estado para manejar el anclaje del menu desplegable del usuario en movil.
  const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  
  const handleUserMenuOpen = (e) => setUserMenuAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
  
  const handleGoAndClose = (path) => {
    handleUserMenuClose();
    navigate(path);
  };
  const handleLogout = () => {
    handleUserMenuClose();
    logout();
    navigate('/');
  };

  return (
    // El AppBar se queda fijo en la parte superior de la pagina al hacer scroll.
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: 'auto', md: '33%' } }}>
          <IconButton edge="start" aria-label="menu-categorias" onClick={handleToggleMenu}>
            <Icon name="menu" className="h-6 w-6" /> 
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
            {messages.general_appName.defaultMessage}
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'flex-end', width: { xs: 'auto', md: '33%' } }}>
          
          {/* Este icono del carrito solo es visible en pantallas de escritorio (md en adelante). */}
          <IconButton component={Link} to="/cart" aria-label="carrito" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            <Badge badgeContent={cartCount} color="primary">
              <Icon name="cart" className="h-6 w-6" /> 
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <Tooltip title={messages.header_profile.defaultMessage}>
                <IconButton
                  id="user-menu-button"
                  // El comportamiento del boton cambia: en movil abre un menu, en escritorio navega directo.
                  onClick={isMobile ? handleUserMenuOpen : () => navigate('/profile')}
                  aria-label="perfil"
                >
                  <Badge badgeContent={cartCount} color="primary" invisible={!isMobile || cartCount === 0} overlap="circular">
                    <Avatar src={user?.avatar || undefined} alt={user?.name || 'User'} sx={{ width: 32, height: 32 }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              {/* El menu desplegable del usuario solo se renderiza en la vista movil. */}
              {isMobile && (
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={isUserMenuOpen}
                  onClose={handleUserMenuClose}
                  keepMounted
                  MenuListProps={{ 'aria-labelledby': 'user-menu-button' }}
                >
                  <MenuItem onClick={() => handleGoAndClose('/profile')}>
                    <ListItemIcon><Icon name="user" className="h-5 w-5" /></ListItemIcon>
                    {messages.header_profile.defaultMessage}
                  </MenuItem>
                  <MenuItem onClick={() => handleGoAndClose('/cart')}>
                    <ListItemIcon>
                      <Badge badgeContent={cartCount} color="primary">
                        <Icon name="cart" className="h-5 w-5" /> 
                      </Badge>
                    </ListItemIcon>
                    {messages.header_cartLabel.defaultMessage}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Icon name="logout" className="h-5 w-5" /></ListItemIcon>
                    {messages.header_logout.defaultMessage}
                  </MenuItem>
                </Menu>
              )}
            </>
          ) : (
            <Tooltip title={messages.header_login.defaultMessage}>
              <IconButton
                id="guest-menu-button"
                // Tambien para invitados, el comportamiento cambia con el tamano de la pantalla.
                onClick={isMobile ? handleUserMenuOpen : () => navigate('/login')}
                aria-label="login-menu"
              >
                <Badge badgeContent={cartCount} color="primary" invisible={!isMobile || cartCount === 0} overlap="circular">
                   <Icon name="user" className="h-6 w-6" />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          
          {isMobile && !isAuthenticated && (
            <Menu
              anchorEl={userMenuAnchorEl}
              open={isUserMenuOpen}
              onClose={handleUserMenuClose}
              keepMounted
              MenuListProps={{ 'aria-labelledby': 'guest-menu-button' }}
            >
              <MenuItem onClick={() => handleGoAndClose('/login')}>
                <ListItemIcon><Icon name="login" className="h-5 w-5" /></ListItemIcon>
                {messages.header_login.defaultMessage}
              </MenuItem>
              <MenuItem onClick={() => handleGoAndClose('/cart')}>
                <ListItemIcon>
                  <Badge badgeContent={cartCount} color="primary">
                    <Icon name="cart" className="h-5 w-5" />
                  </Badge>
                </ListItemIcon>
                {messages.header_cartLabel.defaultMessage}
              </MenuItem>
            </Menu>
          )}
        </Box>
      </Toolbar>

      {/* La barra de categorias se renderiza aqui para que sea 'sticky' junto con el header. */}
      <CategoryNav open={showCategories} />
    </AppBar>
  );
}