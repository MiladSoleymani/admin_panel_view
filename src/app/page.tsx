'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import TranslateIcon from '@mui/icons-material/Translate';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  const stats = [
    { label: 'Total Applications', value: '12', trend: '+3', icon: AppsIcon, color: '#1976d2' },
    { label: 'Active Apps', value: '10', trend: '83%', icon: CheckCircleIcon, color: '#4caf50' },
    { label: 'Total Users', value: '8.5K', trend: '+15%', icon: PeopleIcon, color: '#ed6c02' },
    { label: 'Avg Response Time', value: '234ms', trend: '-12%', icon: SpeedIcon, color: '#9c27b0' },
  ];

  const applications = [
    {
      id: 1,
      name: 'AI Blog Generator',
      displayName: 'Blog Generator Pro',
      description: 'AI-powered blog post creation with SEO optimization',
      category: 'Content Creation',
      icon: ArticleIcon,
      color: '#1976d2',
      status: 'active',
      version: '2.3.1',
      users: 2543,
      apiCalls: 452000,
      uptime: 99.8,
      avgResponseTime: 189,
      revenue: 12400,
      created: '2023-05-15',
      isPublic: true,
      requiresSubscription: true,
    },
    {
      id: 2,
      name: 'Smart Content Writer',
      displayName: 'Content Writer AI',
      description: 'General content generation for various formats',
      category: 'Content Creation',
      icon: CreateIcon,
      color: '#2e7d32',
      status: 'active',
      version: '1.8.5',
      users: 1872,
      apiCalls: 381000,
      uptime: 99.5,
      avgResponseTime: 215,
      revenue: 8900,
      created: '2023-07-22',
      isPublic: true,
      requiresSubscription: true,
    },
    {
      id: 3,
      name: 'AI Image Generator',
      displayName: 'ImageAI Studio',
      description: 'Create stunning AI-generated images and artwork',
      category: 'Image Generation',
      icon: ImageIcon,
      color: '#ed6c02',
      status: 'active',
      version: '3.0.2',
      users: 3421,
      apiCalls: 894000,
      uptime: 98.9,
      avgResponseTime: 412,
      revenue: 18200,
      created: '2023-03-10',
      isPublic: true,
      requiresSubscription: true,
    },
    {
      id: 4,
      name: 'Code Assistant',
      displayName: 'CodeHelper Pro',
      description: 'Programming help and intelligent code generation',
      category: 'Development',
      icon: CodeIcon,
      color: '#7b1fa2',
      status: 'active',
      version: '1.5.0',
      users: 1256,
      apiCalls: 234000,
      uptime: 99.9,
      avgResponseTime: 156,
      revenue: 9800,
      created: '2023-09-01',
      isPublic: true,
      requiresSubscription: true,
    },
    {
      id: 5,
      name: 'Translation Service',
      displayName: 'MultiLang AI',
      description: 'Multi-language translation with context awareness',
      category: 'Language',
      icon: TranslateIcon,
      color: '#0288d1',
      status: 'maintenance',
      version: '2.1.0',
      users: 711,
      apiCalls: 123000,
      uptime: 97.2,
      avgResponseTime: 198,
      revenue: 4200,
      created: '2023-06-18',
      isPublic: true,
      requiresSubscription: false,
    },
    {
      id: 6,
      name: 'AI Chatbot Service',
      displayName: 'ChatBot Builder',
      description: 'Conversational AI for customer support and engagement',
      category: 'Conversational AI',
      icon: SmartToyIcon,
      color: '#f57c00',
      status: 'active',
      version: '2.7.3',
      users: 3421,
      apiCalls: 1240000,
      uptime: 99.6,
      avgResponseTime: 143,
      revenue: 22100,
      created: '2023-04-05',
      isPublic: true,
      requiresSubscription: true,
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, appId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedApp(appId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApp(null);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'maintenance': return '#ff9800';
      case 'deprecated': return '#f44336';
      case 'disabled': return '#757575';
      default: return '#757575';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Stats Cards */}
        <Box sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          mb: 4
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
                          bgcolor: `${stat.color}20`,
                        }}
                      >
                        <Icon sx={{ color: stat.color, fontSize: 28 }} />
                      </Box>
                      <Chip
                        label={stat.trend}
                        size="small"
                        sx={{
                          bgcolor: stat.trend.includes('+') || stat.trend.includes('-') ?
                            (stat.trend.includes('-') && stat.label === 'Avg Response Time' ? '#4caf5015' :
                             stat.trend.includes('+') ? '#4caf5015' : '#f4433615') : '#2196f315',
                          color: stat.trend.includes('+') || stat.trend.includes('-') ?
                            (stat.trend.includes('-') && stat.label === 'Avg Response Time' ? '#4caf50' :
                             stat.trend.includes('+') ? '#4caf50' : '#f44336') : '#2196f3',
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

        {/* Filters and Actions */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
              <TextField
                placeholder="Search applications..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: { xs: '1 1 100%', md: '1 1 300px' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="disabled">Disabled</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Content Creation">Content</MenuItem>
                  <MenuItem value="Image Generation">Image</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Language">Language</MenuItem>
                  <MenuItem value="Conversational AI">Chatbot</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flex: 1 }} />
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                size="small"
              >
                More Filters
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
              >
                Add Application
              </Button>
            </Box>

            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label={`All (${applications.length})`} />
              <Tab label={`Active (${applications.filter(a => a.status === 'active').length})`} />
              <Tab label={`Maintenance (${applications.filter(a => a.status === 'maintenance').length})`} />
            </Tabs>
          </CardContent>
        </Card>

        {/* Applications Grid */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {filteredApplications.map((app) => {
            const Icon = app.icon;
            return (
              <Box key={app.id} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' } }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      transform: 'translateY(-4px)',
                      borderColor: app.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${app.color}20 0%, ${app.color}40 100%)`,
                        }}
                      >
                        <Icon sx={{ color: app.color, fontSize: 32 }} />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={app.status}
                          size="small"
                          sx={{
                            bgcolor: `${statusColor(app.status)}15`,
                            color: statusColor(app.status),
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, app.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {app.displayName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      v{app.version} • {app.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                      {app.description}
                    </Typography>

                    {/* Metrics */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Uptime
                        </Typography>
                        <Typography variant="caption" fontWeight={600} sx={{ color: app.color }}>
                          {app.uptime}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={app.uptime}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: `${app.color}15`,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: app.color,
                            borderRadius: 3
                          }
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Users
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          {app.users.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          API Calls
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          {(app.apiCalls / 1000).toFixed(0)}K
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Revenue
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          ${(app.revenue / 1000).toFixed(1)}K
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      {app.isPublic && (
                        <Chip label="Public" size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                      )}
                      {app.requiresSubscription && (
                        <Chip label="Premium" size="small" variant="outlined" color="primary" sx={{ fontSize: '0.7rem' }} />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit Application</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configure Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>View Users</MenuItem>
          <MenuItem onClick={handleMenuClose}>View Analytics</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'warning.main' }}>
            Maintenance Mode
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            Disable Application
          </MenuItem>
        </Menu>
      </Box>
    </DashboardLayout>
  );
}
