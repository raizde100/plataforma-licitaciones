import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  Notifications,
  Search,
  Business,
  AttachMoney,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';

const Alerts = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [newAlert, setNewAlert] = useState({
    name: '',
    sector: '',
    region: '',
    minAmount: '',
    maxAmount: '',
    email: true,
    push: false,
    frequency: 'daily',
  });

  // Mock alerts data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'Licitaciones de Construcción en Lima',
      sector: 'Construcción',
      region: 'Lima',
      minAmount: 1000000,
      maxAmount: 50000000,
      email: true,
      push: true,
      frequency: 'daily',
      active: true,
      lastMatch: '2024-01-15',
      matches: 12,
    },
    {
      id: 2,
      name: 'Proyectos de Tecnología',
      sector: 'Tecnología',
      region: '',
      minAmount: 500000,
      maxAmount: 20000000,
      email: true,
      push: false,
      frequency: 'weekly',
      active: true,
      lastMatch: '2024-01-10',
      matches: 8,
    },
    {
      id: 3,
      name: 'Contratos de Salud en Arequipa',
      sector: 'Salud',
      region: 'Arequipa',
      minAmount: 2000000,
      maxAmount: 30000000,
      email: false,
      push: true,
      frequency: 'daily',
      active: false,
      lastMatch: '2024-01-08',
      matches: 5,
    },
  ]);

  const sectors = ['Construcción', 'Tecnología', 'Salud', 'Educación', 'Transporte', 'Otros'];
  const regions = ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad', 'Lambayeque', 'Todas'];
  const frequencies = [
    { value: 'immediate', label: 'Inmediato' },
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateAlert = () => {
    if (newAlert.name) {
      const alert = {
        id: Date.now(),
        ...newAlert,
        active: true,
        lastMatch: new Date().toISOString().split('T')[0],
        matches: 0,
      };
      setAlerts([...alerts, alert]);
      setNewAlert({
        name: '',
        sector: '',
        region: '',
        minAmount: '',
        maxAmount: '',
        email: true,
        push: false,
        frequency: 'daily',
      });
      setOpenDialog(false);
    }
  };

  const handleEditAlert = (alert) => {
    setEditingAlert(alert);
    setNewAlert({
      name: alert.name,
      sector: alert.sector,
      region: alert.region,
      minAmount: alert.minAmount,
      maxAmount: alert.maxAmount,
      email: alert.email,
      push: alert.push,
      frequency: alert.frequency,
    });
    setOpenDialog(true);
  };

  const handleUpdateAlert = () => {
    if (editingAlert && newAlert.name) {
      setAlerts(alerts.map(alert =>
        alert.id === editingAlert.id
          ? { ...alert, ...newAlert }
          : alert
      ));
      setEditingAlert(null);
      setNewAlert({
        name: '',
        sector: '',
        region: '',
        minAmount: '',
        maxAmount: '',
        email: true,
        push: false,
        frequency: 'daily',
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const handleToggleAlert = (alertId) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, active: !alert.active }
        : alert
    ));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAlert(null);
    setNewAlert({
      name: '',
      sector: '',
      region: '',
      minAmount: '',
      maxAmount: '',
      email: true,
      push: false,
      frequency: 'daily',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Mis Alertas
      </Typography>

      {/* Create Alert Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Crear Nueva Alerta
        </Button>
      </Box>

      {/* Alerts Grid */}
      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} md={6} lg={4} key={alert.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {alert.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditAlert(alert)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAlert(alert.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {alert.sector && (
                    <Chip
                      icon={<Business />}
                      label={alert.sector}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {alert.region && (
                    <Chip
                      icon={<LocationOn />}
                      label={alert.region}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>

                {alert.minAmount && alert.maxAmount && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AttachMoney fontSize="small" color="action" />
                    <Typography variant="body2">
                      {formatAmount(alert.minAmount)} - {formatAmount(alert.maxAmount)}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Frecuencia: {frequencies.find(f => f.value === alert.frequency)?.label}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={alert.active}
                        onChange={() => handleToggleAlert(alert.id)}
                        size="small"
                      />
                    }
                    label="Activa"
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {alert.email && <Chip label="Email" size="small" color="primary" />}
                    {alert.push && <Chip label="Push" size="small" color="secondary" />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {alert.matches} coincidencias
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  Última coincidencia: {alert.lastMatch}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Alert Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAlert ? 'Editar Alerta' : 'Crear Nueva Alerta'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Nombre de la Alerta"
              value={newAlert.name}
              onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Sector</InputLabel>
                  <Select
                    value={newAlert.sector}
                    label="Sector"
                    onChange={(e) => setNewAlert({ ...newAlert, sector: e.target.value })}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {sectors.map((sector) => (
                      <MenuItem key={sector} value={sector}>
                        {sector}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Región</InputLabel>
                  <Select
                    value={newAlert.region}
                    label="Región"
                    onChange={(e) => setNewAlert({ ...newAlert, region: e.target.value })}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {regions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monto Mínimo (S/)"
                  type="number"
                  value={newAlert.minAmount}
                  onChange={(e) => setNewAlert({ ...newAlert, minAmount: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monto Máximo (S/)"
                  type="number"
                  value={newAlert.maxAmount}
                  onChange={(e) => setNewAlert({ ...newAlert, maxAmount: e.target.value })}
                />
              </Grid>
            </Grid>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Frecuencia de Notificaciones</InputLabel>
              <Select
                value={newAlert.frequency}
                label="Frecuencia de Notificaciones"
                onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value })}
              >
                {frequencies.map((freq) => (
                  <MenuItem key={freq.value} value={freq.value}>
                    {freq.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newAlert.email}
                    onChange={(e) => setNewAlert({ ...newAlert, email: e.target.checked })}
                  />
                }
                label="Notificaciones por Email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={newAlert.push}
                    onChange={(e) => setNewAlert({ ...newAlert, push: e.target.checked })}
                  />
                }
                label="Notificaciones Push"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={editingAlert ? handleUpdateAlert : handleCreateAlert}
            variant="contained"
          >
            {editingAlert ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Alerts; 