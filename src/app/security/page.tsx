'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';
import GppBadIcon from '@mui/icons-material/GppBad';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DevicesIcon from '@mui/icons-material/Devices';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function SecurityPage() {
  const [timePeriod, setTimePeriod] = useState('7days');
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    {
      label: 'Security Score',
      value: '94/100',
      trend: 'Excellent',
      icon: ShieldIcon,
      color: '#4caf50'
    },
    {
      label: 'Active Sessions',
      value: '1,247',
      trend: '+5.2%',
      icon: DevicesIcon,
      color: '#2196f3'
    },
    {
      label: 'Failed Logins (24h)',
      value: '23',
      trend: '-15%',
      icon: GppBadIcon,
      color: '#ff9800'
    },
    {
      label: 'Security Alerts',
      value: '3',
      trend: 'Low Risk',
      icon: WarningIcon,
      color: '#f44336'
    },
  ];

  const securityEvents = [
    {
      id: 1,
      type: 'Failed Login',
      user: 'john.smith@example.com',
      ip: '192.168.1.105',
      location: 'New York, US',
      timestamp: '5 min ago',
      severity: 'warning',
      details: '5 consecutive failed attempts'
    },
    {
      id: 2,
      type: 'Suspicious Activity',
      user: 'sarah.j@company.com',
      ip: '45.123.67.89',
      location: 'Unknown Location',
      timestamp: '15 min ago',
      severity: 'high',
      details: 'Login from new country'
    },
    {
      id: 3,
      type: 'Password Changed',
      user: 'mike.w@startup.io',
      ip: '172.16.0.45',
      location: 'San Francisco, US',
      timestamp: '1 hour ago',
      severity: 'info',
      details: 'Password reset completed'
    },
    {
      id: 4,
      type: '2FA Disabled',
      user: 'emma.davis@mail.com',
      ip: '10.0.0.234',
      location: 'London, UK',
      timestamp: '2 hours ago',
      severity: 'warning',
      details: 'User disabled 2FA'
    },
    {
      id: 5,
      type: 'API Key Created',
      user: 'tom.brown@enterprise.com',
      ip: '192.168.50.10',
      location: 'Seattle, US',
      timestamp: '3 hours ago',
      severity: 'info',
      details: 'New API key generated'
    },
    {
      id: 6,
      type: 'Account Locked',
      user: 'lisa.a@design.co',
      ip: '203.45.67.123',
      location: 'Sydney, AU',
      timestamp: '4 hours ago',
      severity: 'high',
      details: 'Too many failed login attempts'
    },
  ];

  const activeSessions = [
    {
      id: 1,
      user: 'John Smith',
      email: 'john.smith@example.com',
      device: 'Chrome on Windows',
      deviceIcon: LaptopIcon,
      ip: '192.168.1.105',
      location: 'New York, US',
      lastActivity: '2 min ago',
      duration: '2h 15m',
      status: 'active'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      device: 'Safari on iPhone',
      deviceIcon: PhoneAndroidIcon,
      ip: '10.0.1.45',
      location: 'Los Angeles, US',
      lastActivity: '5 min ago',
      duration: '45m',
      status: 'active'
    },
    {
      id: 3,
      user: 'Mike Wilson',
      email: 'mike.w@startup.io',
      device: 'Firefox on macOS',
      deviceIcon: LaptopIcon,
      ip: '172.16.0.45',
      location: 'San Francisco, US',
      lastActivity: '10 min ago',
      duration: '1h 30m',
      status: 'active'
    },
    {
      id: 4,
      user: 'Tom Brown',
      email: 'tom.brown@enterprise.com',
      device: 'Chrome on Linux',
      deviceIcon: LaptopIcon,
      ip: '192.168.50.10',
      location: 'Seattle, US',
      lastActivity: '1 min ago',
      duration: '3h 45m',
      status: 'active'
    },
  ];

  const auditLogs = [
    {
      id: 1,
      action: 'User Created',
      actor: 'admin@system.com',
      target: 'john.doe@example.com',
      timestamp: '2024-03-15 14:32:15',
      status: 'success',
      details: 'New user account created'
    },
    {
      id: 2,
      action: 'Permission Changed',
      actor: 'admin@system.com',
      target: 'sarah.j@company.com',
      timestamp: '2024-03-15 14:15:42',
      status: 'success',
      details: 'Granted Admin role'
    },
    {
      id: 3,
      action: 'Login Attempt',
      actor: 'unknown',
      target: 'mike.w@startup.io',
      timestamp: '2024-03-15 13:45:18',
      status: 'failed',
      details: 'Invalid password'
    },
    {
      id: 4,
      action: 'Data Export',
      actor: 'admin@system.com',
      target: 'Analytics Data',
      timestamp: '2024-03-15 12:30:05',
      status: 'success',
      details: 'User data exported'
    },
    {
      id: 5,
      action: 'Settings Updated',
      actor: 'super.admin@system.com',
      target: 'Security Settings',
      timestamp: '2024-03-15 11:20:33',
      status: 'success',
      details: 'Password policy updated'
    },
  ];

  const authenticationMethods = [
    { method: 'Email & Password', users: 6234, percentage: 72.9, enabled: true },
    { method: 'Google OAuth', users: 1543, percentage: 18.1, enabled: true },
    { method: 'GitHub OAuth', users: 456, percentage: 5.3, enabled: true },
    { method: 'Two-Factor Auth', users: 314, percentage: 3.7, enabled: true },
  ];

  const severityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4caf50';
      case 'failed': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#757575';
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Security & Access Control
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monitor security events, manage sessions, and review audit logs
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={timePeriod}
                label="Time Period"
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <MenuItem value="24hours">Last 24 Hours</MenuItem>
                <MenuItem value="7days">Last 7 Days</MenuItem>
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="90days">Last 90 Days</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              size="small"
            >
              Export Report
            </Button>
          </Box>
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
                          bgcolor: `${stat.color}15`,
                          color: stat.color,
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

        {/* Tabs */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 2
            }}
          >
            <Tab label="Security Events" />
            <Tab label="Active Sessions" />
            <Tab label="Audit Logs" />
            <Tab label="Authentication" />
          </Tabs>
        </Card>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Box>
            {/* Security Events */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Security Events
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      placeholder="Search events..."
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<FilterListIcon />}
                      size="small"
                    >
                      Filter
                    </Button>
                  </Box>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Event Type</strong></TableCell>
                        <TableCell><strong>User</strong></TableCell>
                        <TableCell><strong>IP Address</strong></TableCell>
                        <TableCell><strong>Location</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Severity</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {securityEvents.map((event) => (
                        <TableRow key={event.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {event.type}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {event.details}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {event.user}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {event.ip}
                            </Typography>
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.timestamp}</TableCell>
                          <TableCell>
                            <Chip
                              label={event.severity}
                              size="small"
                              sx={{
                                bgcolor: `${severityColor(event.severity)}15`,
                                color: severityColor(event.severity),
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <MoreVertIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            {/* Active Sessions */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Active User Sessions
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<BlockIcon />}
                    size="small"
                  >
                    Terminate All
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>User</strong></TableCell>
                        <TableCell><strong>Device</strong></TableCell>
                        <TableCell><strong>IP Address</strong></TableCell>
                        <TableCell><strong>Location</strong></TableCell>
                        <TableCell><strong>Last Activity</strong></TableCell>
                        <TableCell><strong>Duration</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeSessions.map((session) => {
                        const DeviceIcon = session.deviceIcon;
                        return (
                          <TableRow key={session.id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600}>
                                {session.user}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {session.email}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DeviceIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {session.device}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontFamily="monospace">
                                {session.ip}
                              </Typography>
                            </TableCell>
                            <TableCell>{session.location}</TableCell>
                            <TableCell>{session.lastActivity}</TableCell>
                            <TableCell>{session.duration}</TableCell>
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<BlockIcon />}
                              >
                                Terminate
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            {/* Audit Logs */}
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    System Audit Logs
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      placeholder="Search logs..."
                      size="small"
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<FileDownloadIcon />}
                      size="small"
                    >
                      Export
                    </Button>
                  </Box>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Action</strong></TableCell>
                        <TableCell><strong>Actor</strong></TableCell>
                        <TableCell><strong>Target</strong></TableCell>
                        <TableCell><strong>Timestamp</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Details</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {auditLogs.map((log) => (
                        <TableRow key={log.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {log.action}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {log.actor}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {log.target}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontFamily="monospace">
                              {log.timestamp}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={log.status}
                              size="small"
                              sx={{
                                bgcolor: `${statusColor(log.status)}15`,
                                color: statusColor(log.status),
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="caption" color="text.secondary">
                              {log.details}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        )}

        {tabValue === 3 && (
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* Authentication Methods */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(60% - 12px)' } }}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Authentication Methods
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Distribution of authentication methods across users
                  </Typography>
                  <Box>
                    {authenticationMethods.map((method, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {method.method}
                            </Typography>
                            <Chip
                              label={method.enabled ? 'Enabled' : 'Disabled'}
                              size="small"
                              sx={{
                                bgcolor: method.enabled ? '#4caf5015' : '#75757515',
                                color: method.enabled ? '#4caf50' : '#757575',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" fontWeight={600}>
                              {method.users.toLocaleString()} users
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {method.percentage}%
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={method.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
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

            {/* Security Policies */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(40% - 12px)' } }}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Security Policies
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Current security configurations
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LockIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2">Password Expiry</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={600}>90 days</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VpnKeyIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2">Min Password Length</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={600}>8 chars</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DangerousIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2">Max Failed Attempts</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={600}>5 attempts</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HistoryIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2">Session Timeout</Typography>
                      </Box>
                      <Typography variant="body2" fontWeight={600}>30 minutes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShieldIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2">2FA Enforcement</Typography>
                      </Box>
                      <Chip
                        label="Admins Only"
                        size="small"
                        sx={{
                          bgcolor: '#2196f315',
                          color: '#2196f3',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Configure Policies
                  </Button>
                </CardContent>
              </Card>

              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    <Button variant="outlined" startIcon={<BlockIcon />} fullWidth>
                      Block IP Address
                    </Button>
                    <Button variant="outlined" startIcon={<SecurityIcon />} fullWidth>
                      Generate Security Report
                    </Button>
                    <Button variant="outlined" startIcon={<VpnKeyIcon />} fullWidth>
                      Revoke API Keys
                    </Button>
                    <Button variant="outlined" startIcon={<HistoryIcon />} fullWidth>
                      View Full Audit Trail
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
