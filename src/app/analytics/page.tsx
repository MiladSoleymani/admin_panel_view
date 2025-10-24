'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ApiIcon from '@mui/icons-material/Api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState('7days');

  const stats = [
    {
      label: 'Total Users',
      value: '8,547',
      change: '+12.5%',
      changeValue: '+986',
      trend: 'up',
      icon: PeopleIcon,
      color: '#1976d2'
    },
    {
      label: 'API Requests',
      value: '3.2M',
      change: '+18.3%',
      changeValue: '+492K',
      trend: 'up',
      icon: ApiIcon,
      color: '#2e7d32'
    },
    {
      label: 'Revenue',
      value: '$87.4K',
      change: '+23.1%',
      changeValue: '+$16.4K',
      trend: 'up',
      icon: AttachMoneyIcon,
      color: '#ed6c02'
    },
    {
      label: 'Avg Response Time',
      value: '234ms',
      change: '-8.2%',
      changeValue: '-21ms',
      trend: 'down',
      icon: SpeedIcon,
      color: '#9c27b0'
    },
  ];

  const usageData = [
    { month: 'Jan', users: 6200, apiCalls: 2100000, revenue: 52000 },
    { month: 'Feb', users: 6800, apiCalls: 2350000, revenue: 58000 },
    { month: 'Mar', users: 7200, apiCalls: 2600000, revenue: 64000 },
    { month: 'Apr', users: 7600, apiCalls: 2800000, revenue: 71000 },
    { month: 'May', users: 8100, apiCalls: 2950000, revenue: 78000 },
    { month: 'Jun', users: 8547, apiCalls: 3200000, revenue: 87400 },
  ];

  const topApplications = [
    { name: 'AI Chatbot Service', users: 3421, apiCalls: 1240000, revenue: 22100, growth: 28 },
    { name: 'AI Image Generator', users: 3421, apiCalls: 894000, revenue: 18200, growth: 15 },
    { name: 'AI Blog Generator', users: 2543, apiCalls: 452000, revenue: 12400, growth: 12 },
    { name: 'Code Assistant', users: 1256, apiCalls: 234000, revenue: 9800, growth: 8 },
    { name: 'Smart Content Writer', users: 1872, apiCalls: 381000, revenue: 8900, growth: 5 },
  ];

  const regionData = [
    { region: 'North America', users: 3892, percentage: 45.5, growth: 12 },
    { region: 'Europe', users: 2564, percentage: 30.0, growth: 18 },
    { region: 'Asia Pacific', users: 1453, percentage: 17.0, growth: 25 },
    { region: 'South America', users: 427, percentage: 5.0, growth: 8 },
    { region: 'Others', users: 211, percentage: 2.5, growth: 15 },
  ];

  const subscriptionBreakdown = [
    { tier: 'Enterprise', users: 342, revenue: 34200, percentage: 39.1 },
    { tier: 'Premium', users: 1523, revenue: 30460, percentage: 34.8 },
    { tier: 'Basic', users: 2847, revenue: 14235, percentage: 16.3 },
    { tier: 'Free', users: 3835, revenue: 8505, percentage: 9.8 },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Analytics & Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Platform-wide analytics and performance metrics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={timePeriod}
                label="Time Period"
                onChange={(e) => setTimePeriod(e.target.value)}
                startAdornment={<CalendarTodayIcon sx={{ mr: 1, fontSize: 18 }} />}
              >
                <MenuItem value="24hours">Last 24 Hours</MenuItem>
                <MenuItem value="7days">Last 7 Days</MenuItem>
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="90days">Last 90 Days</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
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
            const TrendIcon = stat.trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
            const isPositive = stat.trend === 'up' || stat.label === 'Avg Response Time';

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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TrendIcon
                          sx={{
                            fontSize: 16,
                            color: isPositive ? '#4caf50' : '#f44336'
                          }}
                        />
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          sx={{ color: isPositive ? '#4caf50' : '#f44336' }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isPositive ? '#4caf50' : '#f44336' }}>
                      {stat.changeValue} vs last period
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Charts Section */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
          {/* Growth Trend */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(60% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Growth Trend
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Users, API calls, and revenue over time
                </Typography>
                <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 2, pt: 2 }}>
                  {usageData.map((data, index) => {
                    const maxValue = Math.max(...usageData.map(d => d.users));
                    const heightPercent = (data.users / maxValue) * 100;
                    const minHeight = 20; // Minimum height in pixels
                    const height = Math.max(minHeight, (heightPercent / 100) * 250); // Convert to pixels
                    return (
                      <Box
                        key={index}
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 1,
                          position: 'relative'
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: `${height}px`,
                            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 1,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'scaleY(1.05)',
                              opacity: 0.8,
                              '& .hover-tooltip': {
                                opacity: 1,
                                visibility: 'visible'
                              }
                            }
                          }}
                        >
                          <Box
                            className="hover-tooltip"
                            sx={{
                              position: 'absolute',
                              bottom: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              mb: 1,
                              p: 1.5,
                              bgcolor: 'rgba(0, 0, 0, 0.9)',
                              borderRadius: 1,
                              minWidth: 150,
                              opacity: 0,
                              visibility: 'hidden',
                              transition: 'all 0.3s ease',
                              zIndex: 10,
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            <Typography variant="caption" fontWeight={600} sx={{ display: 'block', mb: 0.5 }}>
                              {data.month} 2024
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: '#90caf9' }}>
                              Users: {data.users.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: '#81c784' }}>
                              API Calls: {(data.apiCalls / 1000000).toFixed(1)}M
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', color: '#ffb74d' }}>
                              Revenue: ${(data.revenue / 1000).toFixed(0)}K
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {data.month}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Subscription Breakdown */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(40% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Subscription Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Revenue by subscription tier
                </Typography>
                <Box>
                  {subscriptionBreakdown.map((sub, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {sub.tier}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {sub.users.toLocaleString()} users
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight={600}>
                            ${(sub.revenue / 1000).toFixed(1)}K
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {sub.percentage}%
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={sub.percentage}
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
        </Box>

        {/* Tables Section */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Top Applications */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Top Applications
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  By revenue generation
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Application</strong></TableCell>
                        <TableCell align="right"><strong>Users</strong></TableCell>
                        <TableCell align="right"><strong>Revenue</strong></TableCell>
                        <TableCell align="right"><strong>Growth</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topApplications.map((app, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {app.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {app.users.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={600}>
                              ${(app.revenue / 1000).toFixed(1)}K
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`+${app.growth}%`}
                              size="small"
                              sx={{
                                bgcolor: '#4caf5015',
                                color: '#4caf50',
                                fontWeight: 600
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

          {/* Geographic Distribution */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(50% - 12px)' } }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Geographic Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Users by region
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Region</strong></TableCell>
                        <TableCell align="right"><strong>Users</strong></TableCell>
                        <TableCell align="right"><strong>Share</strong></TableCell>
                        <TableCell align="right"><strong>Growth</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {regionData.map((region, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {region.region}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {region.users.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {region.percentage}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`+${region.growth}%`}
                              size="small"
                              sx={{
                                bgcolor: '#4caf5015',
                                color: '#4caf50',
                                fontWeight: 600
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
        </Box>
      </Box>
    </DashboardLayout>
  );
}
