'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import AppsIcon from '@mui/icons-material/Apps';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Users', icon: PeopleIcon, path: '/users' },
  { text: 'Applications', icon: AppsIcon, path: '/applications' },
  { text: 'Analytics', icon: AssessmentIcon, path: '/analytics' },
  { text: 'Security', icon: SecurityIcon, path: '/security' },
  { text: 'Settings', icon: SettingsIcon, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            A
          </Box>
          <Typography variant="h6" fontWeight={700}>
            Admin Panel
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(144, 202, 249, 0.16)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(144, 202, 249, 0.24)' : 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
