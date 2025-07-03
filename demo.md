# Demo de ProcuraPerú - Plataforma de Compras Gubernamentales

## 🚀 Cómo Ejecutar la Demo

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar la Aplicación
```bash
npm start
```

### 3. Acceder a la Plataforma
Abrir http://localhost:3000 en tu navegador

## 🎯 Flujo de Demo - Navegación Completa

### Paso 1: Inicio de Sesión
- **Pantalla**: Login con branding peruano
- **Acción**: Ingresar cualquier email y contraseña
- **Resultado**: Redirección automática al Dashboard

### Paso 2: Dashboard Principal
- **Vista**: Panel con estadísticas y gráficos
- **Elementos clave**:
  - 4 tarjetas de resumen (Licitaciones Activas, Monto Total, etc.)
  - Gráfico de barras: Monto de Licitaciones por Mes
  - Gráfico de pastel: Distribución por Sector
  - Lista de Licitaciones Recientes
- **Acciones disponibles**:
  - Click en "Ver Todas" → Navega a Búsqueda
  - Click en cualquier licitación → Navega a Detalles

### Paso 3: Búsqueda de Licitaciones
- **Vista**: Página de búsqueda con filtros avanzados
- **Funcionalidades**:
  - Barra de búsqueda principal
  - Botón "Filtros" → Expande filtros avanzados
  - Filtros por: Sector, Región, Estado, Año, Rango de Monto
  - Resultados con información clave
- **Acciones**:
  - Click en "Buscar" → Ejecuta búsqueda
  - Click en cualquier resultado → Navega a Detalles
  - Click en iconos de notificación/descarga

### Paso 4: Detalles de Licitación
- **Vista**: Información completa de una licitación específica
- **Pestañas disponibles**:
  - **Requisitos**: Lista de requisitos para participar
  - **Documentos**: Documentos disponibles para descarga
  - **Cronograma**: Timeline de eventos importantes
  - **Participantes**: Lista de empresas participantes
- **Sidebar**:
  - Botones de acción (Crear Alerta, Descargar, Compartir)
  - Información de contacto del responsable
- **Navegación**: Click en "←" para volver a Búsqueda

### Paso 5: Perfil de Empresa
- **Acceso**: Desde detalles de licitación o búsqueda
- **Vista**: Información completa de empresa ganadora
- **Pestañas**:
  - **Contratos**: Historial de contratos adjudicados
  - **Rendimiento**: Gráfico de rendimiento anual
  - **Información**: Datos generales y certificaciones
- **Sidebar**:
  - Información de contacto
  - Estadísticas rápidas

### Paso 6: Sistema de Alertas
- **Acceso**: Menú de usuario → "Mis Alertas"
- **Funcionalidades**:
  - Ver alertas existentes con estadísticas
  - Click en "Crear Nueva Alerta" → Abre modal
  - Configurar criterios: Sector, Región, Monto, Frecuencia
  - Activar/desactivar alertas con switch
  - Editar o eliminar alertas existentes

## 🎨 Características de Diseño

### Interfaz Moderna
- **Material-UI**: Componentes consistentes y profesionales
- **Colores**: Paleta azul profesional con acentos
- **Tipografía**: Roboto para mejor legibilidad
- **Iconografía**: Material Icons para claridad visual

### Responsive Design
- **Desktop**: Layout completo con sidebar
- **Tablet**: Adaptación de columnas
- **Mobile**: Stack vertical optimizado

### UX/UI Best Practices
- **Navegación intuitiva**: Breadcrumbs y botones de retorno
- **Feedback visual**: Estados de carga y confirmaciones
- **Accesibilidad**: Soporte para lectores de pantalla
- **Performance**: Lazy loading y optimizaciones

## 📊 Datos de Demo

### Licitaciones de Ejemplo
1. **Construcción de Hospital Regional en Arequipa** (S/ 25M)
2. **Sistema de Gestión Hospitalaria** (S/ 8.5M)
3. **Mantenimiento de Infraestructura Educativa** (S/ 3.2M)
4. **Suministro de Equipos Médicos** (S/ 15M)

### Empresas de Ejemplo
1. **Constructora ABC S.A.** - Especializada en construcción
2. **TechSolutions SAC** - Desarrollo de software

### Alertas de Ejemplo
1. **Licitaciones de Construcción en Lima** (Activa)
2. **Proyectos de Tecnología** (Activa)
3. **Contratos de Salud en Arequipa** (Inactiva)

## 🔧 Funcionalidades Técnicas

### Estado de la Aplicación
- **Autenticación**: Simulada con estado local
- **Datos**: Mock API con delays realistas
- **Navegación**: React Router con rutas protegidas
- **Formularios**: Validación y manejo de estado

### Integración Futura
- **SEACE API**: Conexión real con datos gubernamentales
- **OSCE API**: Datos de supervisión
- **Notificaciones**: Sistema push real
- **Exportación**: PDF y Excel reales

## 🎯 Casos de Uso Principales

### Para Empresas
1. **Descubrir oportunidades** en su sector y región
2. **Analizar competencia** revisando perfiles de empresas
3. **Configurar alertas** para no perder oportunidades
4. **Exportar datos** para análisis interno

### Para Analistas
1. **Dashboard completo** con métricas clave
2. **Tendencias sectoriales** con gráficos
3. **Comparación de empresas** y rendimiento
4. **Reportes personalizados** para stakeholders

## 🚀 Próximos Pasos

1. **Integración con APIs reales** de SEACE y OSCE
2. **Sistema de usuarios** con roles y permisos
3. **Notificaciones push** en tiempo real
4. **Módulo de análisis predictivo**
5. **Integración con CRM** empresarial
6. **App móvil** nativa

---

**¡Disfruta explorando ProcuraPerú! 🇵🇪** 