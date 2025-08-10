# ShopEase E-commerce Platform

A modern e-commerce application built with Spring Boot following Clean Architecture principles.

## 🚀 Features

- **User Management** - Registration, authentication with JWT
- **Product Catalog** - Browse products with categories 
- **Order Management** - Create, track, and manage orders
- **Payment Integration** - SSLCommerz payment gateway
- **Clean Architecture** - Domain-driven design with proper layering

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.5.3, Java 17
- **Database**: PostgreSQL (Neon Cloud)
- **Security**: Spring Security with JWT
- **Payment**: SSLCommerz Gateway
- **Build Tool**: Maven

## 📋 Prerequisites

- Java 17+
- Maven 3.6+
- PostgreSQL access (configured for Neon DB)

## 🏃 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/knah1d/shopease.git
   cd shopease
   ```

2. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

3. **Access the application**
   - API Base URL: `http://localhost:8080`
   - Health Check: `http://localhost:8080/actuator/health`

## 📚 API Endpoints

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login (returns JWT token)
- `GET /api/users/profile/{userId}` - Get user profile

### Products
- `GET /api/products/getAllProducts` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search` - Search products (with query parameters)
- `POST /api/products/createProduct` - Create new product
- `PUT /api/products/{id}/price` - Update product price
- `PUT /api/products/{id}/stock` - Update product stock

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/active` - List active categories only
- `GET /api/categories/{id}` - Get category details
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `PUT /api/categories/{id}/activate` - Activate/deactivate category
- `DELETE /api/categories/{id}` - Delete category

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user/{userId}` - Get user's orders
- `PATCH /api/orders/{id}/status` - Update order status

### Payments
- `POST /api/orders/{order_id}/payment` - Make payment for an order
- `POST /api/payments/initiate` - Initiate payment with SSLCommerz
- `POST /api/payments/success` - Payment success callback
- `POST /api/payments/fail` - Payment failure callback
- `POST /api/payments/cancel` - Payment cancellation callback
- `GET /api/payments/status/{transactionId}` - Get payment status

## ⚙️ Configuration

Key configuration in `application.properties`:
- Database connection (Neon PostgreSQL)
- JWT secret and expiration
- SSLCommerz payment gateway settings

## 🏗️ Architecture

```
src/
├── main/java/com/example/shopease/
│   ├── user/           # User module
│   ├── product/        # Product module  
│   ├── order/          # Order module
│   ├── payment/        # Payment module
│   └── shared/         # Shared utilities
```

Each module follows Clean Architecture:
- `domain/` - Business logic and entities
- `application/` - Use cases and services
- `infrastructure/` - Data persistence
- `interfaces/` - REST controllers and DTOs

## 🔧 Development

- Hot reload enabled with Spring DevTools
- SQL logging enabled for debugging
- Postman collection available for API testing

## 📝 Database

- **Type**: PostgreSQL 17.5
- **Provider**: Neon Database Cloud
- **Schema**: Auto-generated with Hibernate DDL

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for academic purposes**
