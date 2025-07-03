# Database Setup for ProcuraPerú Platform

## 🗄️ **Database Options for Pie Chart Data**

### **Option 1: MySQL Database**

#### **Installation & Setup**
```bash
# Install MySQL
# Windows: Download from mysql.com
# macOS: brew install mysql
# Ubuntu: sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Secure installation
sudo mysql_secure_installation
```

#### **Database Schema**
```sql
-- Create database
CREATE DATABASE procuraperu_db;
USE procuraperu_db;

-- Create tenders table
CREATE TABLE tenders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    status ENUM('Abierto', 'Próximo', 'Cerrado', 'Adjudicado') DEFAULT 'Abierto',
    deadline DATE NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_sector (sector),
    INDEX idx_region (region),
    INDEX idx_status (status),
    INDEX idx_amount (amount),
    INDEX idx_deadline (deadline)
);

-- Create companies table
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    ruc VARCHAR(20) UNIQUE NOT NULL,
    sector VARCHAR(100),
    region VARCHAR(100),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    description TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    total_contracts INT DEFAULT 0,
    total_amount DECIMAL(15,2) DEFAULT 0,
    founded_year INT,
    employees INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contracts table (relationship between companies and tenders)
CREATE TABLE contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tender_id INT NOT NULL,
    company_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    start_date DATE,
    end_date DATE,
    status ENUM('En Ejecución', 'Completado', 'Cancelado') DEFAULT 'En Ejecución',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tender_id) REFERENCES tenders(id),
    FOREIGN KEY (company_id) REFERENCES companies(id),
    INDEX idx_tender (tender_id),
    INDEX idx_company (company_id)
);
```

#### **Sample Data Insertion**
```sql
-- Insert sample tenders
INSERT INTO tenders (title, institution, amount, sector, region, status, deadline, description) VALUES
('Construcción de Hospital Regional en Arequipa', 'Gobierno Regional de Arequipa', 25000000, 'Construcción', 'Arequipa', 'Abierto', '2024-02-15', 'Proyecto de construcción de hospital regional'),
('Sistema de Gestión Hospitalaria', 'MINSA', 8500000, 'Tecnología', 'Lima', 'Abierto', '2024-02-20', 'Desarrollo de sistema hospitalario'),
('Mantenimiento de Infraestructura Educativa', 'MINEDU', 3200000, 'Educación', 'Cusco', 'Próximo', '2024-02-25', 'Servicios de mantenimiento'),
('Suministro de Equipos Médicos', 'EsSalud', 15000000, 'Salud', 'Piura', 'Abierto', '2024-03-01', 'Adquisición de equipos médicos'),
('Construcción de Carretera Interprovincial', 'MTC', 45000000, 'Construcción', 'La Libertad', 'Abierto', '2024-03-10', 'Construcción de carretera'),
('Sistema de Seguridad Ciudadana', 'Policía Nacional', 12000000, 'Tecnología', 'Lima', 'Abierto', '2024-03-15', 'Implementación de sistema de seguridad');

-- Insert sample companies
INSERT INTO companies (name, ruc, sector, region, address, phone, email, rating, total_contracts, total_amount) VALUES
('Constructora ABC S.A.', '20123456789', 'Construcción', 'Lima', 'Av. Javier Prado 1234', '+51 1 234-5678', 'contacto@abc.com', 4.5, 45, 125000000),
('TechSolutions SAC', '20187654321', 'Tecnología', 'Lima', 'Av. Arequipa 456', '+51 1 987-6543', 'info@techsolutions.com', 4.2, 28, 45000000);
```

#### **Pie Chart Query**
```sql
-- Query for pie chart data
SELECT 
    sector,
    COUNT(*) as count,
    SUM(amount) as total_amount,
    ROUND((SUM(amount) / (SELECT SUM(amount) FROM tenders WHERE status = 'Abierto')) * 100, 2) as percentage
FROM tenders 
WHERE status = 'Abierto' 
GROUP BY sector 
ORDER BY total_amount DESC;
```

### **Option 2: PostgreSQL Database**

#### **Installation & Setup**
```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Create user and database
sudo -u postgres createuser --interactive
sudo -u postgres createdb procuraperu_db
```

#### **Database Schema**
```sql
-- Connect to database
\c procuraperu_db;

-- Create tenders table
CREATE TABLE tenders (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Abierto', 'Próximo', 'Cerrado', 'Adjudicado')) DEFAULT 'Abierto',
    deadline DATE NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_tenders_sector ON tenders(sector);
CREATE INDEX idx_tenders_region ON tenders(region);
CREATE INDEX idx_tenders_status ON tenders(status);
CREATE INDEX idx_tenders_amount ON tenders(amount);
CREATE INDEX idx_tenders_deadline ON tenders(deadline);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_date_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_tenders_updated_date 
    BEFORE UPDATE ON tenders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_date_column();
```

#### **Advanced Pie Chart Query**
```sql
-- Advanced query with window functions
WITH sector_stats AS (
    SELECT 
        sector,
        COUNT(*) as count,
        SUM(amount) as total_amount,
        AVG(amount) as avg_amount,
        ROUND(
            (SUM(amount) / SUM(SUM(amount)) OVER()) * 100, 
            2
        ) as percentage
    FROM tenders 
    WHERE status = 'Abierto' 
        AND created_date >= CURRENT_DATE - INTERVAL '1 year'
    GROUP BY sector
)
SELECT 
    sector,
    count,
    total_amount,
    avg_amount,
    percentage,
    CASE 
        WHEN percentage >= 30 THEN 'Alto'
        WHEN percentage >= 15 THEN 'Medio'
        ELSE 'Bajo'
    END as category
FROM sector_stats
ORDER BY total_amount DESC;
```

### **Option 3: MongoDB Database**

#### **Installation & Setup**
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB
sudo systemctl start mongod

# Connect to MongoDB
mongosh
```

#### **Database Schema**
```javascript
// Use database
use procuraperu_db

// Create tenders collection with schema validation
db.createCollection("tenders", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["title", "institution", "amount", "sector", "region", "status", "deadline"],
         properties: {
            title: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            institution: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            amount: {
               bsonType: "number",
               description: "must be a number and is required"
            },
            sector: {
               bsonType: "string",
               enum: ["Construcción", "Tecnología", "Salud", "Educación", "Transporte", "Otros"],
               description: "must be one of the enum values and is required"
            },
            region: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            status: {
               bsonType: "string",
               enum: ["Abierto", "Próximo", "Cerrado", "Adjudicado"],
               description: "must be one of the enum values and is required"
            },
            deadline: {
               bsonType: "date",
               description: "must be a date and is required"
            },
            description: {
               bsonType: "string"
            },
            created_date: {
               bsonType: "date",
               default: new Date()
            }
         }
      }
   }
})

// Create indexes
db.tenders.createIndex({ "sector": 1 })
db.tenders.createIndex({ "region": 1 })
db.tenders.createIndex({ "status": 1 })
db.tenders.createIndex({ "amount": 1 })
db.tenders.createIndex({ "deadline": 1 })
db.tenders.createIndex({ "created_date": 1 })
```

#### **Sample Data Insertion**
```javascript
// Insert sample tenders
db.tenders.insertMany([
    {
        title: "Construcción de Hospital Regional en Arequipa",
        institution: "Gobierno Regional de Arequipa",
        amount: 25000000,
        sector: "Construcción",
        region: "Arequipa",
        status: "Abierto",
        deadline: new Date("2024-02-15"),
        description: "Proyecto de construcción de hospital regional",
        created_date: new Date()
    },
    {
        title: "Sistema de Gestión Hospitalaria",
        institution: "MINSA",
        amount: 8500000,
        sector: "Tecnología",
        region: "Lima",
        status: "Abierto",
        deadline: new Date("2024-02-20"),
        description: "Desarrollo de sistema hospitalario",
        created_date: new Date()
    }
])
```

#### **Pie Chart Aggregation Pipeline**
```javascript
// Aggregation pipeline for pie chart data
db.tenders.aggregate([
    {
        $match: {
            status: "Abierto",
            created_date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
    },
    {
        $group: {
            _id: "$sector",
            count: { $sum: 1 },
            total_amount: { $sum: "$amount" },
            avg_amount: { $avg: "$amount" },
            min_amount: { $min: "$amount" },
            max_amount: { $max: "$amount" }
        }
    },
    {
        $addFields: {
            percentage: {
                $multiply: [
                    { $divide: ["$total_amount", { $sum: "$total_amount" }] },
                    100
                ]
            }
        }
    },
    {
        $sort: { total_amount: -1 }
    },
    {
        $limit: 10
    }
])
```

## 🔧 **Backend API Implementation**

### **Node.js with Express**

#### **Installation**
```bash
npm init -y
npm install express mysql2 pg mongoose cors dotenv
```

#### **Server Setup**
```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connections
const mysql = require('mysql2/promise');
const { Pool } = require('pg');
const mongoose = require('mongoose');

// MySQL connection
const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'procuraperu_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// PostgreSQL connection
const pgPool = new Pool({
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DATABASE || 'procuraperu_db',
    port: process.env.PG_PORT || 5432
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/procuraperu_db');

// API Routes
app.get('/api/sector-data', async (req, res) => {
    try {
        const { db = 'mysql', timeRange = 'all' } = req.query;
        
        let sectorData;
        
        switch(db) {
            case 'mysql':
                sectorData = await getSectorDataMySQL(timeRange);
                break;
            case 'postgres':
                sectorData = await getSectorDataPostgreSQL(timeRange);
                break;
            case 'mongodb':
                sectorData = await getSectorDataMongoDB(timeRange);
                break;
            default:
                sectorData = await getSectorDataMySQL(timeRange);
        }
        
        res.json(sectorData);
    } catch (error) {
        console.error('Error fetching sector data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// MySQL function
async function getSectorDataMySQL(timeRange) {
    let whereClause = "WHERE status = 'Abierto'";
    
    if (timeRange === 'current_year') {
        whereClause += " AND YEAR(created_date) = YEAR(CURRENT_DATE)";
    } else if (timeRange === 'last_6_months') {
        whereClause += " AND created_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)";
    }
    
    const query = `
        SELECT 
            sector,
            COUNT(*) as count,
            SUM(amount) as total_amount,
            AVG(amount) as avg_amount
        FROM tenders 
        ${whereClause}
        GROUP BY sector 
        ORDER BY total_amount DESC
    `;
    
    const [rows] = await mysqlPool.execute(query);
    
    const totalAmount = rows.reduce((sum, row) => sum + row.total_amount, 0);
    
    return rows.map((row, index) => ({
        name: row.sector,
        value: Math.round((row.total_amount / totalAmount) * 100),
        count: row.count,
        total_amount: row.total_amount,
        avg_amount: row.avg_amount,
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#ff6b6b'][index % 6]
    }));
}

// PostgreSQL function
async function getSectorDataPostgreSQL(timeRange) {
    let whereClause = "WHERE status = 'Abierto'";
    
    if (timeRange === 'current_year') {
        whereClause += " AND EXTRACT(YEAR FROM created_date) = EXTRACT(YEAR FROM CURRENT_DATE)";
    } else if (timeRange === 'last_6_months') {
        whereClause += " AND created_date >= CURRENT_DATE - INTERVAL '6 months'";
    }
    
    const query = `
        SELECT 
            sector,
            COUNT(*) as count,
            SUM(amount) as total_amount,
            AVG(amount) as avg_amount
        FROM tenders 
        ${whereClause}
        GROUP BY sector 
        ORDER BY total_amount DESC
    `;
    
    const result = await pgPool.query(query);
    
    const totalAmount = result.rows.reduce((sum, row) => sum + parseFloat(row.total_amount), 0);
    
    return result.rows.map((row, index) => ({
        name: row.sector,
        value: Math.round((parseFloat(row.total_amount) / totalAmount) * 100),
        count: parseInt(row.count),
        total_amount: parseFloat(row.total_amount),
        avg_amount: parseFloat(row.avg_amount),
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'][index % 5]
    }));
}

// MongoDB function
async function getSectorDataMongoDB(timeRange) {
    let matchStage = { status: 'Abierto' };
    
    if (timeRange === 'current_year') {
        const currentYear = new Date().getFullYear();
        matchStage.created_date = {
            $gte: new Date(currentYear, 0, 1),
            $lt: new Date(currentYear + 1, 0, 1)
        };
    } else if (timeRange === 'last_6_months') {
        matchStage.created_date = {
            $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
        };
    }
    
    const aggregation = [
        { $match: matchStage },
        {
            $group: {
                _id: '$sector',
                count: { $sum: 1 },
                total_amount: { $sum: '$amount' },
                avg_amount: { $avg: '$amount' }
            }
        },
        { $sort: { total_amount: -1 } },
        { $limit: 10 }
    ];
    
    const result = await mongoose.connection.db.collection('tenders').aggregate(aggregation).toArray();
    
    const totalAmount = result.reduce((sum, doc) => sum + doc.total_amount, 0);
    
    return result.map((doc, index) => ({
        name: doc._id,
        value: Math.round((doc.total_amount / totalAmount) * 100),
        count: doc.count,
        total_amount: doc.total_amount,
        avg_amount: doc.avg_amount,
        color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'][index % 5]
    }));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## 🔄 **Real-time Updates with WebSocket**

```javascript
// WebSocket server for real-time updates
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    
    ws.on('close', () => {
        clients.delete(ws);
    });
});

// Function to broadcast updates to all clients
function broadcastUpdate(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Example: Update pie chart when new tender is added
app.post('/api/tenders', async (req, res) => {
    try {
        // Add new tender to database
        const newTender = req.body;
        // ... database insertion logic
        
        // Get updated sector data
        const updatedSectorData = await getSectorDataMySQL('all');
        
        // Broadcast to all connected clients
        broadcastUpdate({
            type: 'SECTOR_DATA_UPDATE',
            data: updatedSectorData
        });
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
```

## 📊 **Performance Optimization**

### **Caching Strategy**
```javascript
// Redis caching for frequently accessed data
const redis = require('redis');
const client = redis.createClient();

async function getSectorDataWithCache(timeRange) {
    const cacheKey = `sector_data:${timeRange}`;
    
    // Try to get from cache first
    const cached = await client.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // If not in cache, get from database
    const sectorData = await getSectorDataMySQL(timeRange);
    
    // Cache for 5 minutes
    await client.setex(cacheKey, 300, JSON.stringify(sectorData));
    
    return sectorData;
}
```

### **Database Indexing**
```sql
-- MySQL optimization
CREATE INDEX idx_tenders_composite ON tenders(status, sector, created_date);
CREATE INDEX idx_tenders_amount_range ON tenders(amount, sector);

-- PostgreSQL optimization
CREATE INDEX idx_tenders_partial ON tenders(sector, amount) 
WHERE status = 'Abierto';

-- MongoDB optimization
db.tenders.createIndex({ "status": 1, "sector": 1, "created_date": 1 })
db.tenders.createIndex({ "amount": 1, "sector": 1 })
```

---

**🎯 This setup provides a complete database solution for your pie chart with real-time updates, caching, and performance optimization!** 