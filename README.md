# ProcuraPerú - Plataforma de Compras Gubernamentales

Una plataforma web moderna para explorar y gestionar información sobre compras gubernamentales, licitaciones y obras públicas en Perú.

## 🎯 Características Principales

### 🔍 Búsqueda Avanzada
- **Búsqueda por texto libre** en títulos, descripciones e instituciones
- **Filtros avanzados** por sector, región, monto, estado y año
- **Rango de montos** con slider interactivo
- **Resultados paginados** para mejor rendimiento

### 📊 Dashboard Intuitivo
- **Tarjetas de resumen** con estadísticas clave
- **Gráficos interactivos** de tendencias mensuales
- **Distribución por sectores** con gráfico de pastel
- **Licitaciones recientes** con acceso rápido

### 🏢 Perfiles de Empresas
- **Información detallada** de empresas ganadoras
- **Historial de contratos** con estados y montos
- **Rendimiento anual** con gráficos de barras
- **Certificaciones y contactos** completos

### 📋 Detalles de Licitaciones
- **Información completa** de cada oportunidad
- **Pestañas organizadas** para requisitos, documentos y cronograma
- **Lista de participantes** con estados
- **Información de contacto** del responsable

### 🔔 Sistema de Alertas
- **Alertas personalizables** por criterios específicos
- **Notificaciones por email y push**
- **Frecuencias configurables** (inmediato, diario, semanal, mensual)
- **Gestión completa** de alertas activas/inactivas

### 📱 Diseño Responsivo
- **Interfaz moderna** con Material-UI
- **Navegación intuitiva** con breadcrumbs
- **Accesibilidad** optimizada
- **Experiencia móvil** completa

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 con hooks
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Gráficos**: Recharts
- **Formularios**: React Hook Form
- **Estado**: React Query para datos
- **Estilos**: Emotion (CSS-in-JS)

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd peru-procurement-platform
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Login.js        # Pantalla de inicio de sesión
│   ├── Navbar.js       # Barra de navegación
│   ├── Dashboard.js    # Panel principal
│   ├── Search.js       # Búsqueda y filtros
│   ├── TenderDetails.js # Detalles de licitación
│   ├── CompanyProfile.js # Perfil de empresa
│   └── Alerts.js       # Gestión de alertas
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🎨 Flujo de Usuario

### 1. **Inicio de Sesión**
- Pantalla de login profesional con branding peruano
- Validación de credenciales
- Redirección automática al dashboard

### 2. **Dashboard Principal**
- Vista general de oportunidades activas
- Estadísticas en tiempo real
- Acceso rápido a funcionalidades principales

### 3. **Búsqueda de Licitaciones**
- Barra de búsqueda principal
- Filtros avanzados expandibles
- Resultados con información clave
- Paginación para grandes volúmenes

### 4. **Detalles de Licitación**
- Información completa organizada en pestañas
- Documentos descargables
- Cronograma de eventos
- Lista de participantes

### 5. **Perfiles de Empresas**
- Información corporativa completa
- Historial de contratos
- Métricas de rendimiento
- Datos de contacto

### 6. **Gestión de Alertas**
- Creación de alertas personalizadas
- Configuración de notificaciones
- Seguimiento de coincidencias
- Gestión de preferencias

## 📊 Fuentes de Datos

La plataforma está diseñada para integrarse con:

- **SEACE** (Sistema Electrónico de Contrataciones del Estado)
- **OSCE** (Organismo Supervisor de las Contrataciones del Estado)
- **Portales regionales** de compras
- **APIs públicas** de instituciones gubernamentales

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
REACT_APP_API_URL=https://api.procuraperu.com
REACT_APP_SEACE_URL=https://www.seace.gob.pe
REACT_APP_OSCE_URL=https://www.osce.gob.pe
```

### Scripts Disponibles
```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm test           # Ejecutar tests
npm run eject      # Eject de Create React App
```

## 🎯 Funcionalidades Futuras

- [ ] **API Integration** con SEACE y OSCE
- [ ] **Exportación avanzada** (PDF, Excel, CSV)
- [ ] **Análisis predictivo** de oportunidades
- [ ] **Comparación de propuestas**
- [ ] **Sistema de calificaciones** de empresas
- [ ] **Notificaciones push** en tiempo real
- [ ] **Módulo de reportes** personalizados
- [ ] **Integración con CRM** empresarial

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: contacto@procuraperu.com
- **Website**: www.procuraperu.com
- **Documentación**: docs.procuraperu.com

---

**ProcuraPerú** - Conectando empresas con oportunidades gubernamentales en Perú 🇵🇪 