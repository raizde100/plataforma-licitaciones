// Mock API service for ProcuraPerú platform
// This simulates real API calls to SEACE and other government sources

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Database connection examples (you would use real database libraries)
// const mysql = require('mysql2/promise');
// const { Pool } = require('pg'); // PostgreSQL
// const mongoose = require('mongoose'); // MongoDB

// Example database configurations
const dbConfig = {
  // MySQL
  mysql: {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'procuraperu_db'
  },
  
  // PostgreSQL
  postgres: {
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'procuraperu_db',
    port: 5432
  },
  
  // MongoDB
  mongodb: 'mongodb://localhost:27017/procuraperu_db'
};

// Mock data for tenders (this would come from your database)
const mockTenders = [
  {
    id: 1,
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
    description: 'Desarrollo e implementación de sistema de gestión hospitalaria integral que incluya módulos de pacientes, farmacia, laboratorio y administración.',
    requirements: [
      'Experiencia en desarrollo de software hospitalario',
      'Certificación CMMI nivel 3 o superior',
      'Equipo de desarrollo mínimo 10 personas',
      'Soporte técnico 24/7',
    ],
    documents: [
      'Especificaciones técnicas',
      'Manual de usuario',
      'Documentación de API',
      'Plan de implementación',
    ],
    timeline: [
      { date: '2024-01-20', event: 'Publicación de bases' },
      { date: '2024-02-05', event: 'Presentación técnica' },
      { date: '2024-02-15', event: 'Consulta de bases' },
      { date: '2024-02-20', event: 'Presentación de propuestas' },
    ],
    participants: [
      { name: 'TechSolutions SAC', status: 'Inscrito' },
      { name: 'Sistemas Avanzados EIRL', status: 'Inscrito' },
    ],
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
    description: 'Servicios de mantenimiento preventivo y correctivo de infraestructura educativa en la región de Cusco.',
    requirements: [
      'Experiencia en mantenimiento de infraestructura',
      'Personal técnico certificado',
      'Vehículos y equipos propios',
      'Cobertura en toda la región',
    ],
    documents: [
      'Plan de mantenimiento',
      'Cronograma de actividades',
      'Especificaciones técnicas',
      'Certificaciones del personal',
    ],
    timeline: [
      { date: '2024-02-01', event: 'Publicación de bases' },
      { date: '2024-02-15', event: 'Visita técnica' },
      { date: '2024-02-20', event: 'Consulta de bases' },
      { date: '2024-02-25', event: 'Presentación de propuestas' },
    ],
    participants: [],
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
    description: 'Adquisición de equipos médicos especializados para hospitales de EsSalud en la región Piura.',
    requirements: [
      'Autorización sanitaria vigente',
      'Certificación de calidad ISO 13485',
      'Garantía mínima de 2 años',
      'Servicio técnico autorizado',
    ],
    documents: [
      'Catálogo de productos',
      'Certificaciones sanitarias',
      'Especificaciones técnicas',
      'Garantías y servicios',
    ],
    timeline: [
      { date: '2024-01-25', event: 'Publicación de bases' },
      { date: '2024-02-10', event: 'Exposición de productos' },
      { date: '2024-02-20', event: 'Consulta de bases' },
      { date: '2024-03-01', event: 'Presentación de propuestas' },
    ],
    participants: [
      { name: 'MedEquip SAC', status: 'Inscrito' },
      { name: 'Equipos Médicos del Norte', status: 'Pendiente' },
    ],
  },
];

// Mock data for companies
const mockCompanies = [
  {
    id: 1,
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
  },
  {
    id: 2,
    name: 'TechSolutions SAC',
    ruc: '20187654321',
    sector: 'Tecnología',
    region: 'Lima',
    address: 'Av. Arequipa 456, Lima',
    phone: '+51 1 987-6543',
    email: 'info@techsolutions.com',
    website: 'www.techsolutions.com',
    description: 'Empresa especializada en desarrollo de software empresarial y soluciones tecnológicas para el sector público.',
    rating: 4.2,
    totalContracts: 28,
    totalAmount: 45000000,
    foundedYear: 2015,
    employees: 85,
    certifications: ['ISO 9001', 'CMMI Level 3'],
    contracts: [
      {
        id: 4,
        title: 'Sistema de Gestión Hospitalaria',
        institution: 'MINSA',
        amount: 8500000,
        startDate: '2023-01-15',
        endDate: '2024-06-30',
        status: 'En Ejecución',
        sector: 'Tecnología',
      },
    ],
    performanceData: [
      { year: '2020', contracts: 5, amount: 8.5 },
      { year: '2021', contracts: 12, amount: 12.3 },
      { year: '2022', contracts: 10, amount: 18.7 },
      { year: '2023', contracts: 5, amount: 10.5 },
    ],
  },
];

// Mock dashboard data
const mockDashboardData = {
  summaryCards: [
    {
      title: 'Licitaciones Activas',
      value: '156',
      change: '+12%',
      icon: 'Business',
      color: '#1976d2',
    },
    {
      title: 'Monto Total',
      value: 'S/ 2.5B',
      change: '+8%',
      icon: 'AttachMoney',
      color: '#2e7d32',
    },
    {
      title: 'Empresas Participando',
      value: '1,247',
      change: '+5%',
      icon: 'TrendingUp',
      color: '#ed6c02',
    },
    {
      title: 'Próximos Vencimientos',
      value: '23',
      change: '-3',
      icon: 'CalendarToday',
      color: '#d32f2f',
    },
  ],
  sectorData: [
    { name: 'Construcción', value: 35, color: '#8884d8' },
    { name: 'Tecnología', value: 25, color: '#82ca9d' },
    { name: 'Salud', value: 20, color: '#ffc658' },
    { name: 'Educación', value: 15, color: '#ff7300' },
    { name: 'Otros', value: 5, color: '#8dd1e1' },
  ],
  monthlyData: [
    { month: 'Ene', amount: 45.2 },
    { month: 'Feb', amount: 52.1 },
    { month: 'Mar', amount: 38.7 },
    { month: 'Abr', amount: 61.3 },
    { month: 'May', amount: 48.9 },
    { month: 'Jun', amount: 55.4 },
  ],
};

// ===== DATABASE INTEGRATION EXAMPLES =====

// Example 1: MySQL Database Query for Pie Chart
const getSectorDataFromMySQL = async () => {
  try {
    // const connection = await mysql.createConnection(dbConfig.mysql);
    
    // Real MySQL query would be:
    const query = `
      SELECT 
        sector,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM tenders 
      WHERE status = 'Abierto' 
      GROUP BY sector 
      ORDER BY total_amount DESC
    `;
    
    // const [rows] = await connection.execute(query);
    // await connection.end();
    
    // Mock result from database
    const rows = [
      { sector: 'Construcción', count: 45, total_amount: 1250000000 },
      { sector: 'Tecnología', count: 32, total_amount: 850000000 },
      { sector: 'Salud', count: 28, total_amount: 680000000 },
      { sector: 'Educación', count: 22, total_amount: 420000000 },
      { sector: 'Transporte', count: 15, total_amount: 280000000 },
      { sector: 'Otros', count: 14, total_amount: 220000000 }
    ];
    
    // Calculate percentages and format for pie chart
    const totalAmount = rows.reduce((sum, row) => sum + row.total_amount, 0);
    
    const sectorData = rows.map((row, index) => ({
      name: row.sector,
      value: Math.round((row.total_amount / totalAmount) * 100),
      count: row.count,
      total_amount: row.total_amount,
      color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#ff6b6b'][index % 6]
    }));
    
    return sectorData;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Example 2: PostgreSQL Database Query
const getSectorDataFromPostgreSQL = async () => {
  try {
    // const pool = new Pool(dbConfig.postgres);
    
    // Real PostgreSQL query would be:
    const query = `
      SELECT 
        sector,
        COUNT(*) as count,
        SUM(amount) as total_amount,
        AVG(amount) as avg_amount
      FROM tenders 
      WHERE created_date >= CURRENT_DATE - INTERVAL '1 year'
      GROUP BY sector 
      HAVING COUNT(*) > 5
      ORDER BY total_amount DESC
    `;
    
    // const result = await pool.query(query);
    // await pool.end();
    
    // Mock result
    const rows = [
      { sector: 'Construcción', count: 52, total_amount: 1450000000, avg_amount: 27884615 },
      { sector: 'Tecnología', count: 38, total_amount: 920000000, avg_amount: 24210526 },
      { sector: 'Salud', count: 31, total_amount: 720000000, avg_amount: 23225806 },
      { sector: 'Educación', count: 25, total_amount: 480000000, avg_amount: 19200000 },
      { sector: 'Transporte', count: 18, total_amount: 320000000, avg_amount: 17777777 }
    ];
    
    const totalAmount = rows.reduce((sum, row) => sum + row.total_amount, 0);
    
    const sectorData = rows.map((row, index) => ({
      name: row.sector,
      value: Math.round((row.total_amount / totalAmount) * 100),
      count: row.count,
      total_amount: row.total_amount,
      avg_amount: row.avg_amount,
      color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'][index % 5]
    }));
    
    return sectorData;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Example 3: MongoDB Aggregation Pipeline
const getSectorDataFromMongoDB = async () => {
  try {
    // const mongoose = require('mongoose');
    // await mongoose.connect(dbConfig.mongodb);
    
    // Real MongoDB aggregation would be:
    const aggregation = [
      {
        $match: {
          status: 'Abierto',
          created_date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: '$sector',
          count: { $sum: 1 },
          total_amount: { $sum: '$amount' },
          avg_amount: { $avg: '$amount' }
        }
      },
      {
        $sort: { total_amount: -1 }
      },
      {
        $limit: 10
      }
    ];
    
    // const result = await Tender.aggregate(aggregation);
    
    // Mock result
    const result = [
      { _id: 'Construcción', count: 48, total_amount: 1380000000, avg_amount: 28750000 },
      { _id: 'Tecnología', count: 35, total_amount: 890000000, avg_amount: 25428571 },
      { _id: 'Salud', count: 29, total_amount: 710000000, avg_amount: 24482758 },
      { _id: 'Educación', count: 23, total_amount: 450000000, avg_amount: 19565217 },
      { _id: 'Transporte', count: 16, total_amount: 290000000, avg_amount: 18125000 }
    ];
    
    const totalAmount = result.reduce((sum, doc) => sum + doc.total_amount, 0);
    
    const sectorData = result.map((doc, index) => ({
      name: doc._id,
      value: Math.round((doc.total_amount / totalAmount) * 100),
      count: doc.count,
      total_amount: doc.total_amount,
      avg_amount: doc.avg_amount,
      color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'][index % 5]
    }));
    
    return sectorData;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Example 4: Real-time data with WebSocket updates
const getRealTimeSectorData = async () => {
  try {
    // WebSocket connection for real-time updates
    // const socket = new WebSocket('ws://your-server.com/ws');
    
    // Real-time query with caching
    const cacheKey = 'sector_data_cache';
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    
    // Check cache first
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheExpiry) {
        return data;
      }
    }
    
    // Fetch fresh data from database
    const sectorData = await getSectorDataFromMySQL(); // or any other method
    
    // Cache the result
    localStorage.setItem(cacheKey, JSON.stringify({
      data: sectorData,
      timestamp: Date.now()
    }));
    
    return sectorData;
  } catch (error) {
    console.error('Real-time data error:', error);
    throw error;
  }
};

// API functions
export const api = {
  // Authentication
  login: async (credentials) => {
    await delay(1000);
    if (credentials.email && credentials.password) {
      return { success: true, user: { name: 'Usuario Demo', email: credentials.email } };
    }
    throw new Error('Credenciales inválidas');
  },

  // Dashboard data with database integration
  getDashboardData: async () => {
    await delay(800);
    
    // Get real sector data from database
    const sectorData = await getSectorDataFromMySQL();
    
    return {
      ...mockDashboardData,
      sectorData: sectorData
    };
  },

  // Get sector data specifically for pie chart
  getSectorData: async (filters = {}) => {
    await delay(600);
    
    // Apply filters to database query
    if (filters.timeRange === 'current_year') {
      return await getSectorDataFromPostgreSQL();
    } else if (filters.realTime) {
      return await getRealTimeSectorData();
    } else {
      return await getSectorDataFromMySQL();
    }
  },

  // Tenders
  getTenders: async (filters = {}) => {
    await delay(600);
    let filteredTenders = [...mockTenders];
    
    if (filters.sector) {
      filteredTenders = filteredTenders.filter(t => t.sector === filters.sector);
    }
    if (filters.region) {
      filteredTenders = filteredTenders.filter(t => t.region === filters.region);
    }
    if (filters.status) {
      filteredTenders = filteredTenders.filter(t => t.status === filters.status);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredTenders = filteredTenders.filter(t => 
        t.title.toLowerCase().includes(term) ||
        t.institution.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );
    }
    
    return {
      tenders: filteredTenders,
      total: filteredTenders.length,
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  getTenderById: async (id) => {
    await delay(500);
    const tender = mockTenders.find(t => t.id === parseInt(id));
    if (!tender) {
      throw new Error('Licitación no encontrada');
    }
    return tender;
  },

  // Companies
  getCompanies: async (filters = {}) => {
    await delay(600);
    let filteredCompanies = [...mockCompanies];
    
    if (filters.sector) {
      filteredCompanies = filteredCompanies.filter(c => c.sector === filters.sector);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filteredCompanies = filteredCompanies.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      );
    }
    
    return {
      companies: filteredCompanies,
      total: filteredCompanies.length,
    };
  },

  getCompanyById: async (id) => {
    await delay(500);
    const company = mockCompanies.find(c => c.id === parseInt(id));
    if (!company) {
      throw new Error('Empresa no encontrada');
    }
    return company;
  },

  // Search
  search: async (query, filters = {}) => {
    await delay(800);
    const results = {
      tenders: [],
      companies: [],
    };

    if (query) {
      const term = query.toLowerCase();
      
      // Search in tenders
      results.tenders = mockTenders.filter(t => 
        t.title.toLowerCase().includes(term) ||
        t.institution.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );

      // Search in companies
      results.companies = mockCompanies.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      );
    }

    return results;
  },

  // Export data
  exportData: async (data, format = 'csv') => {
    await delay(1000);
    // Simulate file download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `procuraperu-export-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return { success: true, message: 'Datos exportados correctamente' };
  },
};

export default api; 