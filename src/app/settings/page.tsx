'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useState } from 'react';

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);

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
            API Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage API keys and configuration
          </Typography>
        </Box>

        {/* API Settings */}
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
                  Add New API Key
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
