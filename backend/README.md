# WE Management App Backend

This is the backend service for the WE Management App, built with Go, Gin, and PostgreSQL 17.

## Prerequisites

- Docker
- Docker Compose
- Go 1.23.9 or later (for local development)

## Project Structure

```
backend/
├── cmd/
│   └── main.go                 # Application entry point
├── internal/
│   ├── config/                 # Configuration
│   ├── models/                 # Data models
│   ├── repository/            # Database operations
│   ├── service/              # Business logic
│   ├── handler/              # HTTP handlers
│   └── middleware/           # Middleware
├── pkg/                      # Reusable packages
├── api/                      # API routes
├── docs/                     # Swagger documentation
├── migrations/               # Database migrations
├── config/                   # Configuration files
└── Dockerfile               # Production Dockerfile
```

## Configuration

The application uses the following configuration files:

- `config/config.yaml`: Main configuration file
- `.env`: Environment variables (not tracked in git)

Required environment variables:

- `DB_PASSWORD`: PostgreSQL password
- `JWT_SECRET`: Secret key for JWT tokens

## Development

### Using Docker (Recommended)

1. Start the development environment with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. The application will be available at:

- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger/index.html
- PostgreSQL: localhost:5432

### Local Development

1. Install dependencies:

```bash
go mod download
```

2. Run the application:

```bash
go run cmd/main.go
```

## API Documentation

The API documentation is available through Swagger UI. After starting the application, you can access it at:

```
http://localhost:8080/swagger/index.html
```

### Generating Swagger Documentation

To update the Swagger documentation after making changes to the API:

```bash
swag init -g cmd/main.go
```

This will update the documentation in the `docs` directory.

## Production

1. Build and start the production environment:

```bash
docker-compose up --build
```

## API Endpoints

### Health Check

- `GET /ping`: Check if the server is running

## Database

The application uses PostgreSQL 17 with the following default configuration:

- Host: localhost
- Port: 5432
- User: postgres
- Database: we_management

## Hot Reload

The development environment uses `air` for hot reloading. Configuration can be found in `.air.toml`.

## Docker Commands

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Production

```bash
# Start production environment
docker-compose up --build

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f
```

## Database Commands

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U postgres -d we_management

# Backup database
docker-compose exec postgres pg_dump -U postgres we_management > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres -d we_management < backup.sql
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
