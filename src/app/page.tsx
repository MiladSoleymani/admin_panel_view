'use client';

import { Box, Typography, Card, CardContent, Chip, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Home() {
  const stats = [
    { label: 'Total Users', value: '2,543', trend: '+12%', icon: PeopleIcon, color: '#1976d2' },
    { label: 'Active Sessions', value: '847', trend: '+8%', icon: SpeedIcon, color: '#2e7d32' },
    { label: 'Total Revenue', value: '$45.2K', trend: '+23%', icon: AttachMoneyIcon, color: '#ed6c02' },
    { label: 'System Status', value: '99.9%', trend: 'Stable', icon: SecurityIcon, color: '#9c27b0' },
  ];

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new user', time: '2 min ago', status: 'success' },
    { id: 2, user: 'Sarah Johnson', action: 'Updated settings', time: '15 min ago', status: 'info' },
    { id: 3, user: 'Mike Wilson', action: 'Deleted item', time: '1 hour ago', status: 'warning' },
    { id: 4, user: 'Emma Davis', action: 'Login attempt failed', time: '2 hours ago', status: 'error' },
    { id: 5, user: 'Tom Brown', action: 'Updated profile', time: '3 hours ago', status: 'success' },
  ];

  const systemMetrics = [
    { name: 'CPU Usage', value: 45, color: '#1976d2' },
    { name: 'Memory', value: 72, color: '#ed6c02' },
    { name: 'Disk Space', value: 58, color: '#2e7d32' },
    { name: 'Network', value: 34, color: '#9c27b0' },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196f3';
      default: return '#757575';
    }
  };

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

        {/* Main Content Grid */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Recent Activity */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(60% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Activity
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>User</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id} hover>
                          <TableCell>{activity.user}</TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>{activity.time}</TableCell>
                          <TableCell>
                            <Chip
                              label={activity.status}
                              size="small"
                              sx={{
                                bgcolor: `${statusColor(activity.status)}15`,
                                color: statusColor(activity.status),
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          {/* System Metrics */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(40% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  System Metrics
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {systemMetrics.map((metric, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {metric.name}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ color: metric.color }}>
                          {metric.value}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={metric.value}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: `${metric.color}15`,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: metric.color,
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Stats
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#1976d215', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingCartIcon sx={{ color: '#1976d2' }} />
                      </Box>
                      <Typography variant="body2">Total Orders</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700}>1,248</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#2e7d3215', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUpIcon sx={{ color: '#2e7d32' }} />
                      </Box>
                      <Typography variant="body2">Growth Rate</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700}>+18%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#ed6c0215', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AttachMoneyIcon sx={{ color: '#ed6c02' }} />
                      </Box>
                      <Typography variant="body2">Avg. Revenue</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={700}>$3.2K</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
