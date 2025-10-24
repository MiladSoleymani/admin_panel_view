'use client';

import { Box, Typography, Card, CardContent, Chip, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import AppsIcon from '@mui/icons-material/Apps';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloudIcon from '@mui/icons-material/Cloud';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Home() {
  const stats = [
    { label: 'Total Applications', value: '12', trend: '+3', icon: AppsIcon, color: '#1976d2' },
    { label: 'Active Users', value: '8,547', trend: '+15%', icon: PeopleIcon, color: '#2e7d32' },
    { label: 'API Requests (Today)', value: '1.2M', trend: '+8%', icon: ApiIcon, color: '#ed6c02' },
    { label: 'System Health', value: '98.5%', trend: 'Healthy', icon: CloudIcon, color: '#9c27b0' },
  ];

  const applications = [
    {
      name: 'AI Blog Generator',
      type: 'Content Creation',
      users: 2543,
      requests: 45200,
      status: 'active',
      icon: ArticleIcon,
      color: '#1976d2'
    },
    {
      name: 'Smart Content Writer',
      type: 'Content Creation',
      users: 1872,
      requests: 38100,
      status: 'active',
      icon: CreateIcon,
      color: '#2e7d32'
    },
    {
      name: 'AI Chatbot Service',
      type: 'Conversational AI',
      users: 3421,
      requests: 89400,
      status: 'active',
      icon: SmartToyIcon,
      color: '#ed6c02'
    },
    {
      name: 'Text Summarizer',
      type: 'Text Processing',
      users: 711,
      requests: 12300,
      status: 'maintenance',
      icon: AutoAwesomeIcon,
      color: '#f57c00'
    },
  ];

  const recentActivity = [
    { id: 1, app: 'AI Blog Generator', action: 'New user registration', user: 'john@example.com', time: '2 min ago', status: 'success' },
    { id: 2, app: 'Smart Content Writer', action: 'API quota exceeded', user: 'sarah@company.com', time: '15 min ago', status: 'warning' },
    { id: 3, app: 'AI Chatbot Service', action: 'Application deployed', user: 'System', time: '1 hour ago', status: 'info' },
    { id: 4, app: 'Text Summarizer', action: 'Maintenance started', user: 'Admin', time: '2 hours ago', status: 'warning' },
    { id: 5, app: 'AI Blog Generator', action: 'Performance alert cleared', user: 'System', time: '3 hours ago', status: 'success' },
  ];

  const systemMetrics = [
    { name: 'API Gateway', value: 67, color: '#1976d2' },
    { name: 'Database Load', value: 45, color: '#2e7d32' },
    { name: 'Cache Hit Rate', value: 89, color: '#4caf50' },
    { name: 'Error Rate', value: 2, color: '#f44336' },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196f3';
      case 'active': return '#4caf50';
      case 'maintenance': return '#ff9800';
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

        {/* AI Applications Overview */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              AI Applications
            </Typography>
            <Button variant="outlined" size="small">View All</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {applications.map((app, index) => {
              const Icon = app.icon;
              return (
                <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' } }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        transform: 'translateY(-4px)',
                        borderColor: app.color,
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: `${app.color}20`,
                          }}
                        >
                          <Icon sx={{ color: app.color, fontSize: 28 }} />
                        </Box>
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
                      </Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {app.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {app.type}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Users</Typography>
                          <Typography variant="body2" fontWeight={600}>{app.users.toLocaleString()}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">API Calls</Typography>
                          <Typography variant="body2" fontWeight={600}>{(app.requests / 1000).toFixed(1)}K</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Main Content Grid */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Recent Activity */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(60% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Activity Log
                  </Typography>
                  <Button size="small" endIcon={<VisibilityIcon />}>View All</Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Application</strong></TableCell>
                        <TableCell><strong>Event</strong></TableCell>
                        <TableCell><strong>User</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>{activity.app}</Typography>
                          </TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">{activity.user}</Typography>
                          </TableCell>
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
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(40% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Platform Metrics
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Real-time monitoring across all applications
                </Typography>
                <Box>
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
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
