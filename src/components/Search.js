import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList,
  ExpandMore,
  Visibility,
  Download,
  Notifications,
  Business,
  AttachMoney,
  CalendarToday,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sector: '',
    region: '',
    minAmount: 0,
    maxAmount: 100000000,
    status: '',
    year: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: 'Construcción de Hospital Regional en Arequipa',
      institution: 'Gobierno Regional de Arequipa',
      amount: 25000000,
      deadline: '2024-02-15',
      status: 'Abierto',
      sector: 'Construcción',
      region: 'Arequipa',
      description: 'Proyecto de construcción de hospital regional con capacidad para 200 camas...',
    },
    {
      id: 2,
      title: 'Sistema de Gestión Hospitalaria Integral',
      institution: 'MINSA',
      amount: 8500000,
      deadline: '2024-02-20',
      status: 'Abierto',
      sector: 'Tecnología',
      region: 'Lima',
      description: 'Desarrollo e implementación de sistema de gestión hospitalaria...',
    },
    {
      id: 3,
      title: 'Mantenimiento de Infraestructura Educativa',
      institution: 'MINEDU',
      amount: 3200000,
      deadline: '2024-02-25',
      status: 'Próximo',
      sector: 'Educación',
      region: 'Cusco',
      description: 'Servicios de mantenimiento preventivo y correctivo...',
    },
    {
      id: 4,
      title: 'Suministro de Equipos Médicos',
      institution: 'EsSalud',
      amount: 15000000,
      deadline: '2024-03-01',
      status: 'Abierto',
      sector: 'Salud',
      region: 'Piura',
      description: 'Adquisición de equipos médicos especializados...',
    },
  ];

  const sectors = ['Construcción', 'Tecnología', 'Salud', 'Educación', 'Transporte', 'Otros'];
  const regions = ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad', 'Lambayeque', 'Todas'];
  const statuses = ['Abierto', 'Próximo', 'Cerrado', 'Adjudicado'];
  const years = ['2024', '2023', '2022', '2021'];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', searchTerm, 'with filters:', filters);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Búsqueda de Licitaciones
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Buscar licitaciones, instituciones, sectores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filtros
              </Button>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <Accordion expanded={showFilters} sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Filtros Avanzados</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Sector</InputLabel>
                    <Select
                      value={filters.sector}
                      label="Sector"
                      onChange={(e) => handleFilterChange('sector', e.target.value)}
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

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Región</InputLabel>
                    <Select
                      value={filters.region}
                      label="Región"
                      onChange={(e) => handleFilterChange('region', e.target.value)}
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

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={filters.status}
                      label="Estado"
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Año</InputLabel>
                    <Select
                      value={filters.year}
                      label="Año"
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography gutterBottom>Rango de Monto (S/)</Typography>
                  <Slider
                    value={[filters.minAmount, filters.maxAmount]}
                    onChange={(event, newValue) => {
                      handleFilterChange('minAmount', newValue[0]);
                      handleFilterChange('maxAmount', newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000000}
                    step={1000000}
                    valueLabelFormat={(value) => formatAmount(value)}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      {formatAmount(filters.minAmount)}
                    </Typography>
                    <Typography variant="body2">
                      {formatAmount(filters.maxAmount)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </Paper>

      {/* Search Results */}
      <Grid container spacing={3}>
        {searchResults.map((tender) => (
          <Grid item xs={12} key={tender.id}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(`/tender/${tender.id}`)}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {tender.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {tender.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Business fontSize="small" color="action" />
                        <Typography variant="body2">{tender.institution}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2">{tender.region}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AttachMoney fontSize="small" color="action" />
                        <Typography variant="body2">{formatAmount(tender.amount)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="body2">{tender.deadline}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={tender.sector} size="small" />
                      <Chip
                        label={tender.status}
                        size="small"
                        color={tender.status === 'Abierto' ? 'success' : 'warning'}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <Notifications />
                    </IconButton>
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={10} page={1} />
      </Box>
    </Container>
  );
};

export default Search; 