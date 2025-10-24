'use client';

import { Box, Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Home() {
  const stats = [
    { label: 'Total Users', value: '2,543', trend: '+12%', icon: PeopleIcon, color: '#1976d2' },
    { label: 'Active Sessions', value: '847', trend: '+8%', icon: SpeedIcon, color: '#2e7d32' },
    { label: 'Total Revenue', value: '$45.2K', trend: '+23%', icon: TrendingUpIcon, color: '#ed6c02' },
    { label: 'System Status', value: '99.9%', trend: 'Stable', icon: SecurityIcon, color: '#9c27b0' },
  ];

  const features = [
    {
      icon: DashboardIcon,
      title: 'Dashboard',
      description: 'View analytics, statistics, and key metrics for your admin panel.',
      color: '#1976d2',
      action: 'Open Dashboard'
    },
    {
      icon: PeopleIcon,
      title: 'User Management',
      description: 'Manage user accounts, permissions, roles and access control.',
      color: '#2e7d32',
      action: 'Manage Users'
    },
    {
      icon: AssessmentIcon,
      title: 'Analytics',
      description: 'Deep insights into your data with advanced analytics and reporting.',
      color: '#ed6c02',
      action: 'View Analytics'
    },
    {
      icon: SettingsIcon,
      title: 'Settings',
      description: 'Configure system settings, preferences and application parameters.',
      color: '#9c27b0',
      action: 'Open Settings'
    },
    {
      icon: SecurityIcon,
      title: 'Security',
      description: 'Monitor security events, manage policies and access logs.',
      color: '#d32f2f',
      action: 'View Security'
    },
    {
      icon: SpeedIcon,
      title: 'Performance',
      description: 'Track system performance, optimize resources and monitor uptime.',
      color: '#0288d1',
      action: 'View Metrics'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label="v1.0.0"
              size="small"
              sx={{
                mb: 2,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600
              }}
            />
            <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
              Admin Panel
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.95, maxWidth: 600, mx: 'auto' }}>
              Powerful admin dashboard built with Next.js, TypeScript, and Material-UI
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  fontWeight: 600,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {/* Stats Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Overview
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
          }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: `${stat.color}15`,
                          }}
                        >
                          <Icon sx={{ color: stat.color, fontSize: 28 }} />
                        </Box>
                        <Chip
                          label={stat.trend}
                          size="small"
                          sx={{
                            bgcolor: stat.trend.includes('+') ? '#4caf5015' : '#2196f315',
                            color: stat.trend.includes('+') ? '#4caf50' : '#2196f3',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Features Section */}
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            Quick Access
          </Typography>
          <Box sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        transform: 'translateY(-8px)',
                        borderColor: feature.color,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ color: feature.color, fontSize: 32 }} />
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 48 }}>
                        {feature.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: feature.color,
                          color: feature.color,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: feature.color,
                            bgcolor: `${feature.color}10`,
                          }
                        }}
                      >
                        {feature.action}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
