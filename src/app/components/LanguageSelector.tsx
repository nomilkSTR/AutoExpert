'use client';

import React from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n/translations';

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang: string) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  // Flag emojis for each language
  const flags: Record<string, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
    de: '🇩🇪',
    es: '🇪🇸'
  };

  return (
    <>
      <Tooltip title="Change language">
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ 
            ml: 2,
            fontSize: '1.5rem',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          {flags[i18n.language]}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 180,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {Object.entries(languages).map(([code, name]) => (
          <MenuItem
            key={code}
            onClick={() => handleLanguageSelect(code)}
            selected={code === i18n.language}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {flags[code]}
            </ListItemIcon>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
} 