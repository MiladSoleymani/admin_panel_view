'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Tabs,
  Tab,
  Alert,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ApiIcon from '@mui/icons-material/Api';
import StorageIcon from '@mui/icons-material/Storage';
import PaletteIcon from '@mui/icons-material/Palette';
import LanguageIcon from '@mui/icons-material/Language';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [showApiKey, setShowApiKey] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'apikey_prod_1234567890abcdefghijklmnopqrstuvwxyz',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'apikey_dev_abcdefghijklmnopqrstuvwxyz1234567890',
      created: '2024-02-10',
      lastUsed: '5 days ago',
      status: 'active'
    },
    {
      id: 3,
      name: 'Backup API Key',
      key: 'apikey_backup_xyz7890abcdef1234ghijklmnopqrstuv',
      created: '2024-03-01',
      lastUsed: 'Never',
      status: 'inactive'
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            System Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure system-wide settings and preferences
          </Typography>
        </Box>

        {/* Tabs */}
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 2
            }}
          >
            <Tab icon={<SettingsIcon />} label="General" iconPosition="start" />
            <Tab icon={<EmailIcon />} label="Email" iconPosition="start" />
            <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
            <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
            <Tab icon={<ApiIcon />} label="API" iconPosition="start" />
            <Tab icon={<PaletteIcon />} label="Appearance" iconPosition="start" />
          </Tabs>
        </Card>

        {/* General Settings Tab */}
        {tabValue === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  System Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Basic system configuration and branding
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="System Name"
                    defaultValue="Admin Panel"
                    fullWidth
                    helperText="The name displayed throughout the system"
                  />
                  <TextField
                    label="System URL"
                    defaultValue="https://admin.example.com"
                    fullWidth
                    helperText="The primary URL for accessing the system"
                  />
                  <TextField
                    label="Support Email"
                    defaultValue="support@example.com"
                    type="email"
                    fullWidth
                    helperText="Default email address for support inquiries"
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      System Logo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 32,
                        }}
                      >
                        A
                      </Box>
                      <Box>
                        <Button
                          variant="outlined"
                          startIcon={<CloudUploadIcon />}
                          size="small"
                        >
                          Upload Logo
                        </Button>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          Recommended: 200x200px, PNG or SVG
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Regional Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure timezone, language, and regional preferences
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select defaultValue="utc" label="Timezone">
                      <MenuItem value="utc">UTC (Coordinated Universal Time)</MenuItem>
                      <MenuItem value="est">EST (Eastern Standard Time)</MenuItem>
                      <MenuItem value="pst">PST (Pacific Standard Time)</MenuItem>
                      <MenuItem value="gmt">GMT (Greenwich Mean Time)</MenuItem>
                      <MenuItem value="cet">CET (Central European Time)</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Default Language</InputLabel>
                    <Select defaultValue="en" label="Default Language">
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="ja">Japanese</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select defaultValue="mdy" label="Date Format">
                      <MenuItem value="mdy">MM/DD/YYYY</MenuItem>
                      <MenuItem value="dmy">DD/MM/YYYY</MenuItem>
                      <MenuItem value="ymd">YYYY-MM-DD</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select defaultValue="usd" label="Currency">
                      <MenuItem value="usd">USD ($)</MenuItem>
                      <MenuItem value="eur">EUR (€)</MenuItem>
                      <MenuItem value="gbp">GBP (£)</MenuItem>
                      <MenuItem value="jpy">JPY (¥)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  System Maintenance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Control system availability and maintenance windows
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                      />
                    }
                    label="Maintenance Mode"
                  />
                  {maintenanceMode && (
                    <Alert severity="warning">
                      Maintenance mode is enabled. Users will see a maintenance page when trying to access the system.
                    </Alert>
                  )}
                  <TextField
                    label="Maintenance Message"
                    multiline
                    rows={3}
                    defaultValue="We are currently performing scheduled maintenance. We'll be back shortly."
                    fullWidth
                    disabled={!maintenanceMode}
                  />
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Email Settings Tab */}
        {tabValue === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  SMTP Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure email server settings for sending emails
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="SMTP Host"
                    defaultValue="smtp.gmail.com"
                    fullWidth
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="SMTP Port"
                      defaultValue="587"
                      type="number"
                      sx={{ flex: 1 }}
                    />
                    <FormControl sx={{ flex: 1 }}>
                      <InputLabel>Encryption</InputLabel>
                      <Select defaultValue="tls" label="Encryption">
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="tls">TLS</MenuItem>
                        <MenuItem value="ssl">SSL</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    label="SMTP Username"
                    defaultValue="noreply@example.com"
                    fullWidth
                  />
                  <TextField
                    label="SMTP Password"
                    type="password"
                    defaultValue="••••••••••••"
                    fullWidth
                  />
                  <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                    Test Connection
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Email Defaults
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Default sender information for outgoing emails
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="From Name"
                    defaultValue="Admin Panel System"
                    fullWidth
                  />
                  <TextField
                    label="From Email"
                    defaultValue="noreply@example.com"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    label="Reply-To Email"
                    defaultValue="support@example.com"
                    type="email"
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Email Templates
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage email templates for system notifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Welcome Email"
                      secondary="Sent to new users after registration"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Edit</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Password Reset"
                      secondary="Sent when users request password reset"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Edit</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Email Verification"
                      secondary="Sent to verify email addresses"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Edit</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Security Alert"
                      secondary="Sent for suspicious account activity"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Edit</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Security Settings Tab */}
        {tabValue === 2 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Password Policies
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure password requirements and security rules
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Minimum Password Length"
                    type="number"
                    defaultValue="8"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require uppercase letters"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require lowercase letters"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require numbers"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require special characters"
                  />
                  <TextField
                    label="Password Expiration (days)"
                    type="number"
                    defaultValue="90"
                    fullWidth
                    helperText="Set to 0 to disable password expiration"
                  />
                  <TextField
                    label="Password History"
                    type="number"
                    defaultValue="5"
                    fullWidth
                    helperText="Prevent reuse of last N passwords"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Login Security
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure login attempt limits and account lockout policies
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Max Failed Login Attempts"
                    type="number"
                    defaultValue="5"
                    fullWidth
                  />
                  <TextField
                    label="Account Lockout Duration (minutes)"
                    type="number"
                    defaultValue="30"
                    fullWidth
                  />
                  <TextField
                    label="Session Timeout (minutes)"
                    type="number"
                    defaultValue="30"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable CAPTCHA after failed attempts"
                  />
                  <TextField
                    label="CAPTCHA Trigger (attempts)"
                    type="number"
                    defaultValue="3"
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage 2FA requirements and methods
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={twoFactorRequired}
                        onChange={(e) => setTwoFactorRequired(e.target.checked)}
                      />
                    }
                    label="Require 2FA for Admin Users"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Require 2FA for All Users"
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" fontWeight={600}>
                    Available 2FA Methods
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Authenticator App (TOTP)"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="SMS Verification"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email Verification"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  IP Access Control
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage IP whitelist and blacklist
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable IP Whitelist"
                  />
                  <TextField
                    label="Whitelisted IP Addresses"
                    multiline
                    rows={3}
                    placeholder="192.168.1.0/24&#10;10.0.0.1"
                    fullWidth
                    helperText="One IP address or CIDR range per line"
                  />
                  <TextField
                    label="Blacklisted IP Addresses"
                    multiline
                    rows={3}
                    placeholder="45.123.67.89&#10;203.0.113.0/24"
                    fullWidth
                    helperText="One IP address or CIDR range per line"
                  />
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Notifications Tab */}
        {tabValue === 3 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Email Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure which events trigger email notifications
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    }
                    label="Enable Email Notifications"
                  />
                  <Divider sx={{ my: 1 }} />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="New User Registration"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Failed Login Attempts"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Security Alerts"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="System Errors"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Application Deployments"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Daily Summary Report"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Weekly Analytics Report"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Push Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure real-time push notifications
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                      />
                    }
                    label="Enable Push Notifications"
                  />
                  <Divider sx={{ my: 1 }} />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Security Events"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Critical Alerts"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="User Actions"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="System Updates"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Slack Integration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Send notifications to Slack channels
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable Slack Notifications"
                  />
                  <TextField
                    label="Slack Webhook URL"
                    placeholder="https://hooks.slack.com/services/..."
                    fullWidth
                  />
                  <TextField
                    label="Default Channel"
                    defaultValue="#admin-alerts"
                    fullWidth
                  />
                  <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                    Test Integration
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* API Settings Tab */}
        {tabValue === 4 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  API Keys
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Manage API keys for system access
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {apiKeys.map((apiKey) => (
                    <Card key={apiKey.id} variant="outlined" sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            {apiKey.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Typography variant="body2" fontFamily="monospace">
                              {showApiKey ? apiKey.key : '••••••••••••••••••••••••••••••'}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                            </IconButton>
                            <IconButton size="small">
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Chip
                          label={apiKey.status}
                          size="small"
                          sx={{
                            bgcolor: apiKey.status === 'active' ? '#4caf5015' : '#75757515',
                            color: apiKey.status === 'active' ? '#4caf50' : '#757575',
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                          </Typography>
                        </Box>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                  >
                    Generate New API Key
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Rate Limiting
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure API rate limits to prevent abuse
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label="Requests per Minute"
                    type="number"
                    defaultValue="60"
                    fullWidth
                  />
                  <TextField
                    label="Requests per Hour"
                    type="number"
                    defaultValue="1000"
                    fullWidth
                  />
                  <TextField
                    label="Requests per Day"
                    type="number"
                    defaultValue="10000"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable rate limiting"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  CORS Configuration
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure Cross-Origin Resource Sharing settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable CORS"
                  />
                  <TextField
                    label="Allowed Origins"
                    multiline
                    rows={3}
                    defaultValue="https://app.example.com&#10;https://dashboard.example.com"
                    fullWidth
                    helperText="One origin per line. Use * to allow all origins (not recommended)"
                  />
                  <TextField
                    label="Allowed Methods"
                    defaultValue="GET, POST, PUT, DELETE, OPTIONS"
                    fullWidth
                  />
                  <TextField
                    label="Allowed Headers"
                    defaultValue="Content-Type, Authorization"
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Appearance Tab */}
        {tabValue === 5 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Theme Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Customize the appearance of the admin panel
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Theme Mode</InputLabel>
                    <Select defaultValue="dark" label="Theme Mode">
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto (System)</MenuItem>
                    </Select>
                  </FormControl>
                  <Box>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Primary Color
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {['#90caf9', '#667eea', '#764ba2', '#4caf50', '#ff9800', '#f44336'].map((color) => (
                        <Box
                          key={color}
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            bgcolor: color,
                            cursor: 'pointer',
                            border: color === '#90caf9' ? '3px solid white' : 'none',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.1)'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel>Sidebar Position</InputLabel>
                    <Select defaultValue="left" label="Sidebar Position">
                      <MenuItem value="left">Left</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Compact Mode"
                  />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Dashboard Customization
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Configure default dashboard view and widgets
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>Default Dashboard View</InputLabel>
                    <Select defaultValue="overview" label="Default Dashboard View">
                      <MenuItem value="overview">Overview</MenuItem>
                      <MenuItem value="analytics">Analytics</MenuItem>
                      <MenuItem value="users">User Management</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 2 }}>
                    Visible Widgets
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Statistics Cards"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Activity Feed"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="System Metrics"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Quick Actions Panel"
                  />
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" startIcon={<RestartAltIcon />}>
                Reset to Defaults
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
