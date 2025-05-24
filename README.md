# ShopEase E-Commerce Backend

ShopEase is a modern e-commerce platform built with Spring Boot, designed to provide a seamless shopping experience for customers and an efficient management system for sellers.

## Project Overview

ShopEase implements a clean architecture approach with distinct layers:

-   **Application Layer**: Contains controllers, DTOs, and services that handle HTTP requests and orchestrate business logic
-   **Domain Layer**: Houses the core business logic, models, and repositories
-   **Infrastructure Layer**: Manages technical concerns like persistence, security, and external integrations

## Features

-   User management (registration, authentication)
-   Role-based access control (customers and sellers)
-   Product catalog management
-   Order processing
-   Secure payment integration (planned)

## Tech Stack

-   Java 17
-   Spring Boot 3.5.0
-   Spring Data JPA
-   Spring Security
-   Maven
-   Lombok
-   H2 Database (for development)

## Getting Started

### Prerequisites

-   JDK 17+
-   Maven 3.8+
-   Your favorite IDE (IntelliJ IDEA, Eclipse, VS Code)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/shopease.git
    cd shopease
    ```

2. Build the project:

    ```bash
    ./mvnw clean install
    ```

3. Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

The application will start on `http://localhost:8080`

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── shopease/
│   │               ├── ShopEaseBackendApplication.java
│   │               ├── application/
│   │               │   ├── controllers/
│   │               │   ├── dtos/
│   │               │   └── services/
│   │               ├── domain/
│   │               │   ├── models/
│   │               │   ├── repositories/
│   │               │   └── usecases/
│   │               └── infrastructure/
│   │                   ├── config/
│   │                   └── persistence/
│   └── resources/
│       ├── application.properties
│       ├── static/
│       └── templates/
└── test/
    └── java/
        └── com/
            └── example/
                └── shopease/
```

## API Endpoints

### User Management

-   `POST /api/users/register` - Register a new user
-   `POST /api/users/login` - Authenticate a user

Additional endpoints will be documented as they are implemented.

## Development

### Running Tests

```bash
./mvnw test
```

### Building for Production

```bash
./mvnw clean package
```

The built JAR file will be available in the `target` directory.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
