# VaultDrive — Framework de automatización de pruebas

Proyecto del curso **DSF-705 Automatización de Pruebas de Software** (Universidad Fidélitas).
Sistema bajo prueba: [VaultDrive](https://github.com/develasmen/VaultDrive), aplicación web de gestión de contenido digital
(ASP.NET Core 9 Web API + React 19/Vite + MongoDB) desarrollada en el curso SC-609 Base de Datos NoSQL.

> **Estado: Avance 1.** Este repositorio contiene la estructura inicial del framework y la configuración de ejemplo (sin secretos).
> Los casos de prueba diseñados en el Avance 1 (WEB-01 a WEB-06, API-01 a API-07 y PERF-01) se implementarán en las carpetas indicadas en los siguientes avances.

| Foco | Herramienta | Carpeta |
|---|---|---|
| Web GUI | Playwright Test (TypeScript), patrón Page Object | `web/` |
| API REST | Playwright Test (`APIRequestContext`) | `api/` |
| Rendimiento | Grafana k6 | `performance/` |

## Estructura

```
vaultdrive-test-automation/
├── api/tests/                        # Casos API (API-01 a API-07)
├── config/environments.example.json  # Configuración de ejemplo por ambiente (sin secretos)
├── performance/
│   ├── scenarios/                    # Escenario de rendimiento PERF-01 (k6)
│   └── data/users.example.json       # Formato del pool de usuarios de rendimiento
├── reports/                          # Reportes generados (no versionados)
├── scripts/                          # Preparación de datos y reinicio de la base VaultDrive_QA
├── shared/
│   ├── test-files/                   # Archivos de prueba controlados
│   └── utils/                        # Fábrica de datos y cliente de API
├── web/
│   ├── fixtures/                     # Fixtures de Playwright (usuario registrado / con sesión)
│   ├── pages/                        # Page Objects
│   └── tests/                        # Casos Web GUI (WEB-01 a WEB-06)
├── .env.example                      # Variables de entorno de ejemplo (sin secretos)
├── .gitignore
├── package.json
├── playwright.config.ts              # Proyectos: api, chromium, firefox
└── tsconfig.json
```

## Configuración

1. Instalar Node.js 22+, .NET SDK 9, MongoDB 7 y [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/).
2. Levantar VaultDrive contra la base aislada **VaultDrive_QA** (nunca la base de desarrollo):
   ```bash
   # en el repo de VaultDrive
   cd VaultDrive.UI
   MongoDbSettings__DatabaseName=VaultDrive_QA dotnet run --launch-profile http   # API en http://localhost:5213
   cd ../vaultdrive-ui && npm install && npm run dev                              # Web en http://localhost:5173
   ```
   En Windows (PowerShell): `$env:MongoDbSettings__DatabaseName="VaultDrive_QA"`.
3. En este repo:
   ```bash
   npm install
   npx playwright install chromium firefox
   cp .env.example .env    # definir las contraseñas de prueba localmente
   ```

Las contraseñas nunca se versionan: se leen de `.env` (ignorado por Git) o de los *secrets* del pipeline.
