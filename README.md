# KinalPrax — Gestión Integral de Prácticas Profesionales

Sistema completo para la administración de prácticas profesionales del Instituto Kinal.

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    KinalPrax                         │
│                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │ client-admin│  │client-user- │  │client-user-│ │
│  │  (React)    │  │   web       │  │  mobile    │ │
│  │  :5173      │  │  (React)    │  │  (Expo)    │ │
│  └──────┬──────┘  └──────┬──────┘  └─────┬──────┘ │
│         │                │               │         │
│  ┌──────▼──────┐  ┌──────▼──────┐        │         │
│  │  admin-api  │  │  user-api   │        │         │
│  │  (Node.js)  │  │  (Node.js)  │        │         │
│  │   :3001     │  │   :3002     │        │         │
│  └──────┬──────┘  └──────┬──────┘        │         │
│         │                │               │         │
│         └───────┬────────┘               │         │
│                 ▼                        ▼         │
│           ┌──────────┐            ┌──────────┐     │
│           │ MongoDB  │            │  Auth    │     │
│           │  :27017  │            │ Service  │     │
│           └──────────┘            │ (.NET 8) │     │
│                                   │  :5033   │     │
│                                   └────┬─────┘     │
│                                        ▼           │
│                                   ┌──────────┐     │
│                                   │PostgreSQL│     │
│                                   │  :5433   │     │
│                                   └──────────┘     │
└─────────────────────────────────────────────────────┘
```

## Servicios

| Servicio | Tecnología | Puerto | Descripción |
|----------|-----------|--------|-------------|
| Auth Service | .NET 8 + PostgreSQL | 5033 | Autenticación JWT, registro, login |
| Admin API | Node.js + Express + MongoDB | 3001 | CRUD administrativo |
| User API | Node.js + Express + MongoDB | 3002 | API del estudiante |
| Client Admin | React + Vite + Tailwind | 5173 | Panel de administración |
| Client User Web | React + Vite + Tailwind | 5174 | Portal del estudiante |
| Client User Mobile | React Native + Expo | — | App móvil |

## Inicio Rápido

### Prerrequisitos
- Docker y Docker Compose
- Node.js 18+ (para desarrollo sin Docker)
- pnpm

### Con Docker (recomendado)

```bash
git clone --recurse-submodules https://github.com/Marioescobar64/KinalPrax.git
cd KinalPrax
docker-compose up -d
```

### Sin Docker

```bash
git clone --recurse-submodules https://github.com/Marioescobar64/KinalPrax.git
cd KinalPrax

# Auth Service
cd services/auth-service
dotnet run --project src/AuthService.Api

# Admin API
cd services/admin-api
pnpm install
pnpm dev

# User API
cd services/user-api
pnpm install
pnpm dev

# Client Admin
cd clients/client-admin
pnpm install
pnpm dev
```

## Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@kinalprax.local | Admin1234! | ADMIN_ROLE |

## Variables de Entorno

Cada servicio tiene su propia configuración. Ver los archivos `.env.example` en cada directorio.

### Auth Service
- `ConnectionStrings__DefaultConnection` — PostgreSQL
- `JwtSettings__SecretKey` — Clave JWT
- `CloudinarySettings__*` — Cloudinary
- `SmtpSettings__*` — Email

### APIs (Admin/User)
- `URI_MONGODB` — MongoDB connection string
- `PORT` — Puerto del servidor

## Despliegue en Producción

| Servicio | Plataforma | URL |
|----------|-----------|-----|
| Auth Service | Render | TBD |
| Admin API | Vercel | TBD |
| User API | Vercel | TBD |
| Client Admin | Vercel | TBD |
| Client User Web | Vercel | TBD |

## Módulos

- **Usuarios** — Gestión de cuentas y roles
- **Estudiantes** — Registro académico y horas
- **Supervisores** — Asignación y seguimiento
- **Empresas** — Directorio de empresas colaboradoras
- **Instituciones** — Datos institucionales
- **Prácticas** — Control del ciclo de práctica
- **Evidencias** — Documentos y archivos
- **Revisiones** — Evaluaciones de supervisores
- **Reportes de Horas** — Seguimiento de horas trabajadas
- **Tareas** — Asignación de tareas

## Licencia

ISC

## Autores

- **Mario Escobar** — [Marioescobar64](https://github.com/Marioescobar64)
