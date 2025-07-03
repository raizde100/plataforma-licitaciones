import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Business,
  AttachMoney,
  CalendarToday,
  LocationOn,
  Phone,
  Email,
  Language,
  ArrowBack,
  TrendingUp,
  Assignment,
  Star,
  Download,
  Share,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock company data
  const company = {
    id: id,
    name: 'Constructora ABC S.A.',
    ruc: '20123456789',
    sector: 'Construcción',
    region: 'Lima',
    address: 'Av. Javier Prado 1234, San Isidro, Lima',
    phone: '+51 1 234-5678',
    email: 'contacto@constructoraabc.com',
    website: 'www.constructoraabc.com',
    description: 'Empresa líder en construcción con más de 15 años de experiencia en proyectos públicos y privados. Especializada en infraestructura hospitalaria y educativa.',
    rating: 4.5,
    totalContracts: 45,
    totalAmount: 125000000,
    foundedYear: 2008,
    employees: 150,
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    contracts: [
      {
        id: 1,
        title: 'Construcción de Hospital Regional en Arequipa',
        institution: 'Gobierno Regional de Arequipa',
        amount: 25000000,
        startDate: '2023-03-01',
        endDate: '2024-12-31',
        status: 'En Ejecución',
        sector: 'Construcción',
      },
      {
        id: 2,
        title: 'Mantenimiento de Infraestructura Educativa',
        institution: 'MINEDU',
        amount: 8500000,
        startDate: '2022-08-15',
        endDate: '2023-08-14',
        status: 'Completado',
        sector: 'Construcción',
      },
      {
        id: 3,
        title: 'Construcción de Centro de Salud',
        institution: 'MINSA',
        amount: 12000000,
        startDate: '2021-06-01',
        endDate: '2022-11-30',
        status: 'Completado',
        sector: 'Construcción',
      },
    ],
    performanceData: [
      { year: '2020', contracts: 8, amount: 15.2 },
      { year: '2021', contracts: 12, amount: 22.8 },
      { year: '2022', contracts: 15, amount: 28.5 },
      { year: '2023', contracts: 10, amount: 58.5 },
    ],
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: '20px' }}>
      {value === index && children}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/search')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">
          Perfil de Empresa
        </Typography>
      </Box>

      {/* Company Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              <Business sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h5" gutterBottom>
              {company.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Chip label={company.sector} color="primary" />
              <Chip label={`RUC: ${company.ruc}`} variant="outlined" />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Star sx={{ color: 'warning.main' }} />
                <Typography variant="body2">{company.rating}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {company.description}
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" startIcon={<Download />}>
                Descargar Perfil
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Compartir
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Contratos" />
              <Tab label="Rendimiento" />
              <Tab label="Información" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Historial de Contratos
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Contrato</TableCell>
                        <TableCell>Institución</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Período</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {company.contracts.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {contract.title}
                            </Typography>
                            <Chip label={contract.sector} size="small" />
                          </TableCell>
                          <TableCell>{contract.institution}</TableCell>
                          <TableCell>{formatAmount(contract.amount)}</TableCell>
                          <TableCell>
                            <Chip
                              label={contract.status}
                              color={contract.status === 'En Ejecución' ? 'warning' : 'success'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {contract.startDate} - {contract.endDate}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Rendimiento Anual
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={company.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#1976d2" name="Monto (Millones S/)" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Información General
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Año de Fundación"
                          secondary={company.foundedYear}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Número de Empleados"
                          secondary={company.employees}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Total de Contratos"
                          secondary={company.totalContracts}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Monto Total Adjudicado"
                          secondary={formatAmount(company.totalAmount)}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Certificaciones
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {company.certifications.map((cert, index) => (
                        <Chip key={index} label={cert} variant="outlined" />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn color="action" />
                  <Typography variant="body2">{company.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="action" />
                  <Typography variant="body2">{company.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email color="action" />
                  <Typography variant="body2">{company.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Language color="action" />
                  <Typography variant="body2">{company.website}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Estadísticas Rápidas
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Contratos Activos</Typography>
                  <Typography variant="body2" fontWeight="medium">3</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Contratos Completados</Typography>
                  <Typography variant="body2" fontWeight="medium">42</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Tasa de Éxito</Typography>
                  <Typography variant="body2" fontWeight="medium">93%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Promedio de Calificación</Typography>
                  <Typography variant="body2" fontWeight="medium">4.5/5</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyProfile; 