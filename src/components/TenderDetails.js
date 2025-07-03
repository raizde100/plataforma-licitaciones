import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Business,
  AttachMoney,
  CalendarToday,
  LocationOn,
  Description,
  Download,
  Notifications,
  Share,
  ArrowBack,
  Timeline,
  People,
  Assignment,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock tender data
  const tender = {
    id: id,
    title: 'Construcción de Hospital Regional en Arequipa',
    institution: 'Gobierno Regional de Arequipa',
    amount: 25000000,
    deadline: '2024-02-15',
    status: 'Abierto',
    sector: 'Construcción',
    region: 'Arequipa',
    description: 'Proyecto de construcción de hospital regional con capacidad para 200 camas, incluyendo áreas de emergencia, consultorios especializados, laboratorio, farmacia y servicios administrativos.',
    requirements: [
      'Experiencia mínima de 5 años en construcción de hospitales',
      'Certificación ISO 9001 vigente',
      'Capacidad financiera demostrable',
      'Personal técnico calificado',
    ],
    documents: [
      'Bases de la licitación',
      'Plano de ubicación',
      'Especificaciones técnicas',
      'Cronograma de ejecución',
    ],
    timeline: [
      { date: '2024-01-15', event: 'Publicación de bases' },
      { date: '2024-01-30', event: 'Visita técnica' },
      { date: '2024-02-10', event: 'Consulta de bases' },
      { date: '2024-02-15', event: 'Presentación de propuestas' },
    ],
    participants: [
      { name: 'Constructora ABC S.A.', status: 'Inscrito' },
      { name: 'Ingenieros Unidos SAC', status: 'Inscrito' },
      { name: 'Proyectos Integrales EIRL', status: 'Pendiente' },
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
          Detalles de la Licitación
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {tender.title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={tender.sector} color="primary" />
              <Chip
                label={tender.status}
                color={tender.status === 'Abierto' ? 'success' : 'warning'}
              />
            </Box>

            <Typography variant="body1" paragraph>
              {tender.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Business color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Institución
                  </Typography>
                </Box>
                <Typography variant="body1">{tender.institution}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOn color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Región
                  </Typography>
                </Box>
                <Typography variant="body1">{tender.region}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AttachMoney color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Monto Estimado
                  </Typography>
                </Box>
                <Typography variant="body1">{formatAmount(tender.amount)}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarToday color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Fecha de Cierre
                  </Typography>
                </Box>
                <Typography variant="body1">{tender.deadline}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs */}
          <Paper sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Requisitos" />
              <Tab label="Documentos" />
              <Tab label="Cronograma" />
              <Tab label="Participantes" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Requisitos para Participar
                </Typography>
                <List>
                  {tender.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Assignment />
                      </ListItemIcon>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Documentos Disponibles
                </Typography>
                <List>
                  {tender.documents.map((doc, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Description />
                      </ListItemIcon>
                      <ListItemText primary={doc} />
                      <IconButton>
                        <Download />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Cronograma de la Licitación
                </Typography>
                <List>
                  {tender.timeline.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Timeline />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.event}
                        secondary={item.date}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Empresas Participantes
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Empresa</TableCell>
                        <TableCell>Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tender.participants.map((participant, index) => (
                        <TableRow key={index}>
                          <TableCell>{participant.name}</TableCell>
                          <TableCell>
                            <Chip
                              label={participant.status}
                              color={participant.status === 'Inscrito' ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Acciones
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Notifications />}
                  fullWidth
                >
                  Crear Alerta
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  fullWidth
                >
                  Descargar Información
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  fullWidth
                >
                  Compartir
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información de Contacto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Responsable:</strong> Ing. Juan Pérez
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> juan.perez@regionarequipa.gob.pe
                </Typography>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> (054) 123-456
                </Typography>
                <Typography variant="body2">
                  <strong>Dirección:</strong> Av. Ejército 123, Arequipa
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TenderDetails; 