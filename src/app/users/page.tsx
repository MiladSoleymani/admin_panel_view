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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const stats = [
    { label: 'Total Users', value: '8,547', trend: '+15%', icon: PeopleIcon, color: '#1976d2' },
    { label: 'Active Users', value: '7,234', trend: '+12%', icon: CheckCircleIcon, color: '#4caf50' },
    { label: 'New This Month', value: '423', trend: '+23%', icon: PersonAddIcon, color: '#ed6c02' },
    { label: 'Suspended', value: '127', trend: '-5%', icon: BlockIcon, color: '#f44336' },
  ];

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: null,
      role: 'End User',
      status: 'active',
      subscription: 'Premium',
      applications: ['AI Blog Generator', 'Smart Content Writer'],
      lastLogin: '2 hours ago',
      apiCalls: 12450,
      created: '2024-01-15',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      avatar: null,
      role: 'Application Owner',
      status: 'active',
      subscription: 'Enterprise',
      applications: ['AI Chatbot Service'],
      lastLogin: '5 min ago',
      apiCalls: 45200,
      created: '2023-11-08',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@startup.io',
      avatar: null,
      role: 'End User',
      status: 'active',
      subscription: 'Basic',
      applications: ['Text Summarizer'],
      lastLogin: '1 day ago',
      apiCalls: 3200,
      created: '2024-02-20',
    },
    {
      id: 4,
      name: 'Emma Davis',
      email: 'emma.davis@mail.com',
      avatar: null,
      role: 'End User',
      status: 'suspended',
      subscription: 'Free',
      applications: ['AI Blog Generator'],
      lastLogin: '3 days ago',
      apiCalls: 450,
      created: '2024-03-01',
    },
    {
      id: 5,
      name: 'Tom Brown',
      email: 'tom.brown@enterprise.com',
      avatar: null,
      role: 'Admin',
      status: 'active',
      subscription: 'Enterprise',
      applications: ['All Applications'],
      lastLogin: '10 min ago',
      apiCalls: 89300,
      created: '2023-08-12',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.a@design.co',
      avatar: null,
      role: 'End User',
      status: 'pending_verification',
      subscription: 'Premium',
      applications: ['Smart Content Writer'],
      lastLogin: 'Never',
      apiCalls: 0,
      created: '2024-03-15',
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'suspended': return '#f44336';
      case 'pending_verification': return '#ff9800';
      case 'deleted': return '#757575';
      default: return '#757575';
    }
  };

  const roleColor = (role: string) => {
    switch (role) {
      case 'Admin': return '#9c27b0';
      case 'Application Owner': return '#1976d2';
      case 'Support': return '#ed6c02';
      case 'End User': return '#757575';
      default: return '#757575';
    }
  };

  const subscriptionColor = (sub: string) => {
    switch (sub) {
      case 'Enterprise': return '#9c27b0';
      case 'Premium': return '#1976d2';
      case 'Basic': return '#ed6c02';
      case 'Free': return '#757575';
      default: return '#757575';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users across all AI applications
          </Typography>
        </Box>

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
                          bgcolor: stat.trend.includes('+') ? '#4caf5015' : '#f4433615',
                          color: stat.trend.includes('+') ? '#4caf50' : '#f44336',
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
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                placeholder="Search users by name or email..."
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
                  <MenuItem value="suspended">Suspended</MenuItem>
                  <MenuItem value="pending_verification">Pending</MenuItem>
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
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                size="small"
              >
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                size="small"
              >
                Add User
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Subscription</strong></TableCell>
                  <TableCell><strong>Applications</strong></TableCell>
                  <TableCell><strong>API Calls</strong></TableCell>
                  <TableCell><strong>Last Login</strong></TableCell>
                  <TableCell align="right"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          bgcolor: `${roleColor(user.role)}15`,
                          color: roleColor(user.role),
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status.replace('_', ' ')}
                        size="small"
                        sx={{
                          bgcolor: `${statusColor(user.status)}15`,
                          color: statusColor(user.status),
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.subscription}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: subscriptionColor(user.subscription),
                          color: subscriptionColor(user.subscription),
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {user.applications.join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {user.apiCalls.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {user.lastLogin}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit User</MenuItem>
          <MenuItem onClick={handleMenuClose}>Change Subscription</MenuItem>
          <MenuItem onClick={handleMenuClose}>View Activity</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'warning.main' }}>
            Suspend User
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
            Delete User
          </MenuItem>
        </Menu>
      </Box>
    </DashboardLayout>
  );
}
