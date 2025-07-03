import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  Business,
  AttachMoney,
  CalendarToday,
  Visibility,
  Download,
  Notifications,
  Refresh,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('all');
  const [dataSource, setDataSource] = useState('mysql');

  // Fetch dashboard data from database
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get sector data based on selected data source
      const sectorData = await api.getSectorData({ 
        timeRange,
        dataSource 
      });
      
      // Get other dashboard data
      const data = await api.getDashboardData();
      
      setDashboardData({
        ...data,
        sectorData: sectorData
      });
    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchDashboardData();
  }, [timeRange, dataSource]);

  // Handle refresh button
  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Format amount for display
  const formatAmount = (amount) => {
    if (amount >= 1000000000) {
      return `S/ ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `S/ ${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `S/ ${amount.toLocaleString()}`;
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={handleRefresh}>
          Reintentar
        </Button>
      </Container>
    );
  }

  // Mock data for charts (in real app, this would come from database)
  const monthlyData = [
    { month: 'Ene', amount: 45.2 },
    { month: 'Feb', amount: 52.1 },
    { month: 'Mar', amount: 38.7 },
    { month: 'Abr', amount: 61.3 },
    { month: 'May', amount: 48.9 },
    { month: 'Jun', amount: 55.4 },
  ];

  const recentTenders = [
    {
      id: 1,
      title: 'Construcción de Hospital Regional en Arequipa',
      institution: 'Gobierno Regional de Arequipa',
      amount: 'S/ 25,000,000',
      deadline: '2024-02-15',
      status: 'Abierto',
      sector: 'Construcción',
    },
    {
      id: 2,
      title: 'Sistema de Gestión Hospitalaria',
      institution: 'MINSA',
      amount: 'S/ 8,500,000',
      deadline: '2024-02-20',
      status: 'Abierto',
      sector: 'Tecnología',
    },
    {
      id: 3,
      title: 'Mantenimiento de Infraestructura Educativa',
      institution: 'MINEDU',
      amount: 'S/ 3,200,000',
      deadline: '2024-02-25',
      status: 'Próximo',
      sector: 'Educación',
    },
  ];

  const summaryCards = [
    {
      title: 'Licitaciones Activas',
      value: '156',
      change: '+12%',
      icon: <Business />,
      color: '#1976d2',
    },
    {
      title: 'Monto Total',
      value: 'S/ 2.5B',
      change: '+8%',
      icon: <AttachMoney />,
      color: '#2e7d32',
    },
    {
      title: 'Empresas Participando',
      value: '1,247',
      change: '+5%',
      icon: <TrendingUp />,
      color: '#ed6c02',
    },
    {
      title: 'Próximos Vencimientos',
      value: '23',
      change: '-3',
      icon: <CalendarToday />,
      color: '#d32f2f',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {/* Header with filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Data Source Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Fuente de Datos</InputLabel>
            <Select
              value={dataSource}
              label="Fuente de Datos"
              onChange={(e) => setDataSource(e.target.value)}
            >
              <MenuItem value="mysql">MySQL</MenuItem>
              <MenuItem value="postgres">PostgreSQL</MenuItem>
              <MenuItem value="mongodb">MongoDB</MenuItem>
              <MenuItem value="realtime">Tiempo Real</MenuItem>
            </Select>
          </FormControl>

          {/* Time Range Filter */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={timeRange}
              label="Período"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="current_year">Año Actual</MenuItem>
              <MenuItem value="last_6_months">Últimos 6 Meses</MenuItem>
              <MenuItem value="last_month">Último Mes</MenuItem>
            </Select>
          </FormControl>

          {/* Refresh Button */}
          <IconButton onClick={handleRefresh} color="primary">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                      color: 'white',
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="div">
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={card.change}
                  size="small"
                  color={card.change.startsWith('+') ? 'success' : 'error'}
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monto de Licitaciones por Mes (Millones S/)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Distribución por Sector
              {dataSource && (
                <Chip 
                  label={dataSource.toUpperCase()} 
                  size="small" 
                  sx={{ ml: 1 }}
                  color="primary"
                />
              )}
            </Typography>
            
            {dashboardData?.sectorData ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent, total_amount }) => 
                      `${name} ${(percent * 100).toFixed(0)}%\n${formatAmount(total_amount)}`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dashboardData.sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${props.payload.name}: ${formatAmount(props.payload.total_amount)} (${props.payload.count} licitaciones)`,
                      'Monto Total'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Additional sector statistics */}
            {dashboardData?.sectorData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Estadísticas por Sector:
                </Typography>
                {dashboardData.sectorData.slice(0, 3).map((sector, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">
                      {sector.name}:
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {sector.count} licitaciones
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Tenders */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Licitaciones Recientes
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate('/search')}
                startIcon={<Visibility />}
              >
                Ver Todas
              </Button>
            </Box>

            <List>
              {recentTenders.map((tender) => (
                <ListItem
                  key={tender.id}
                  divider
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/tender/${tender.id}`)}
                >
                  <ListItemText
                    primary={tender.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {tender.institution} • {tender.amount}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            label={tender.sector}
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={tender.status}
                            size="small"
                            color={tender.status === 'Abierto' ? 'success' : 'warning'}
                          />
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <Notifications />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 