import * as React from "react";
import { Box, Link as MLink, Typography, Divider } from "@mui/material";
import { Icon } from '../../icons/index.jsx';
import { messages } from "../../config/defaultMessages";

// Subcomponente reutilizable para las listas de enlaces del footer.
const Section = ({ title, items }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5, color: 'white' }}>
      {title}
    </Typography>
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {items.map((text) => (
        <li key={text}>
          <MLink
            href="#"
            underline="hover"
            sx={{
              display: "inline-block",
              py: 0.5,
              color: "grey.400",
              "&:hover": { color: "white" },
            }}
          >
            {text}
          </MLink>
        </li>
      ))}
    </Box>
  </Box>
);

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "black", color: "grey.400", mt: 'auto', py: { xs: 4, md: 6 }, px: { xs: 2, sm: 4, md: 6 } }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 4, md: 3 },
        }}>

          {/* Columna 1: Marca y Redes Sociales (Actualizada) */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
              {messages.general_appName.defaultMessage}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {messages.footer_tagline.defaultMessage}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MLink href="#" sx={{ color: 'white', '&:hover': { color: 'grey.400' } }} aria-label="X">
                <Icon name="x" />
              </MLink>
              <MLink href="#" sx={{ color: 'white', '&:hover': { color: 'grey.400' } }} aria-label="YouTube">
                <Icon name="youtube" />
              </MLink>
              <MLink href="#" sx={{ color: 'white', '&:hover': { color: 'grey.400' } }} aria-label="Instagram">
                <Icon name="instagram" />
              </MLink>
              <MLink href="#" sx={{ color: 'white', '&:hover': { color: 'grey.400' } }} aria-label="LinkedIn">
                <Icon name="linkedin" />
              </MLink>
            </Box>
          </Box>

          {/* Columnas de enlaces (Actualizadas para usar `messages`) */}
          <Box><Section title={messages.footer_help_title.defaultMessage} items={messages.footer_help_items.defaultMessage.split(', ')} /></Box>
          <Box><Section title={messages.footer_services_title.defaultMessage} items={messages.footer_services_items.defaultMessage.split(', ')} /></Box>
          <Box><Section title={messages.footer_about_title.defaultMessage} items={messages.footer_about_items.defaultMessage.split(', ')} /></Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="grey.500">
            {messages.footer_copyright.defaultMessage.replace('{year}', new Date().getFullYear())}
          </Typography>
          <MLink href="#" underline="hover" sx={{ color: "grey.400", '&:hover': { color: 'white' } }}>
            {messages.footer_country.defaultMessage}
          </MLink>
        </Box>
      </Box>
    </Box>
  );
}