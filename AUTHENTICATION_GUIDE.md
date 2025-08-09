# ShopEase Authentication & Role-Based Access Control

This document describes the comprehensive authentication and role-based access control system implemented in ShopEase.

## 🚀 Features

### Authentication

-   **JWT Token-based Authentication** with secure token storage in localStorage
-   **Role-based User Management** (Admin, Seller, Customer)
-   **Automatic Token Refresh** and session management
-   **Protected Routes** with role-based access control
-   **Secure Password Handling** with backend validation

### Role-Based Access Control (RBAC)

-   **Admin Dashboard**: User management, system statistics, and administrative controls
-   **Seller Dashboard**: Product management, order tracking, and seller analytics
-   **Customer Home**: Shopping interface, order history, and account management
-   **Dynamic Navigation**: Role-aware header and navigation components

### API Integration

-   **Authorization Headers**: Automatic Bearer token inclusion in API requests
-   **Error Handling**: Comprehensive error responses and user feedback
-   **API Testing**: Built-in test page for endpoint validation

## 🏗️ Architecture

### Frontend Structure

```
client/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── admin/
│   │   └── dashboard/
│   ├── seller/
│   │   └── dashboard/
│   ├── customer/
│   │   └── home/
│   ├── profile/
│   └── unauthorized/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── headers/
│   │   └── AuthenticatedHeader.tsx
│   └── forms/
│       ├── SignInForm.tsx
│       └── SignUpForm.tsx
├── hooks/
│   └── useAuth.ts
├── providers/
│   └── AuthProvider.tsx
├── services/
│   ├── userService.ts
│   └── adminService.ts
└── types/
    ├── user.ts
    └── admin.ts
```

### User Roles & Permissions

#### ADMIN

-   **Access**: Full system access
-   **Permissions**:
    -   View all users and manage their roles
    -   Activate/deactivate user accounts
    -   Access system statistics and analytics
    -   Manage products and categories
-   **Dashboard**: `/admin/dashboard`

#### SELLER

-   **Access**: Seller-specific features
-   **Permissions**:
    -   Manage own products
    -   View and process orders
    -   Access seller analytics
-   **Dashboard**: `/seller/dashboard`

#### CUSTOMER

-   **Access**: Shopping and account features
-   **Permissions**:
    -   Browse and purchase products
    -   Manage orders and wishlist
    -   Update profile information
-   **Dashboard**: `/customer/home`

## 🔐 Authentication Flow

### 1. User Registration

```typescript
// POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword",
  "role": "CUSTOMER" // or "SELLER"
}
```

### 2. User Login

```typescript
// POST /api/users/login
{
  "email": "john@example.com",
  "password": "securePassword"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "isActive": true
  }
}
```

### 3. Token Storage & Management

-   JWT tokens are stored in `localStorage` with key `authToken`
-   User information is stored in `localStorage` with key `user`
-   Automatic token inclusion in API request headers: `Authorization: Bearer <token>`

## 🛡️ Protected Routes

### ProtectedRoute Component

The `ProtectedRoute` component handles access control:

```typescript
<ProtectedRoute requiredRoles={["ADMIN"]} redirectTo="/unauthorized">
    <AdminDashboard />
</ProtectedRoute>
```

### Route Protection Examples

```typescript
// Admin only routes
<ProtectedRoute requiredRoles={['ADMIN']}>
  <AdminDashboard />
</ProtectedRoute>

// Seller only routes
<ProtectedRoute requiredRoles={['SELLER']}>
  <SellerDashboard />
</ProtectedRoute>

// Customer only routes
<ProtectedRoute requiredRoles={['CUSTOMER']}>
  <CustomerHome />
</ProtectedRoute>

// Multiple roles allowed
<ProtectedRoute requiredRoles={['ADMIN', 'SELLER']}>
  <ProductManagement />
</ProtectedRoute>
```

## 📡 API Endpoints

### User Management

-   `POST /api/users/register` - User registration
-   `POST /api/users/login` - User authentication
-   `GET /api/users/profile/{userId}` - Get user profile

### Admin Endpoints

-   `GET /api/admin/users` - Get all users
-   `GET /api/admin/users/customers` - Get all customers
-   `GET /api/admin/users/sellers` - Get all sellers
-   `PUT /api/admin/users/{userId}/role?role={role}` - Change user role
-   `PUT /api/admin/users/{userId}/activate` - Activate user
-   `PUT /api/admin/users/{userId}/deactivate` - Deactivate user
-   `GET /api/admin/dashboard/stats` - Get dashboard statistics

## 🎨 UI Components

### Role-Aware Navigation

The header component automatically shows/hides navigation links based on user role:

```typescript
// Admin sees: Admin Dashboard, Manage Users, Manage Products
// Seller sees: Seller Dashboard, My Products, Orders
// Customer sees: My Account, Orders, Cart, Wishlist
```

### User Avatar & Dropdown

Displays user information and role-specific quick actions.

### Dashboard Cards

Role-specific statistics and quick action cards on each dashboard.

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_ENVIRONMENT=development
```

### Backend Configuration

Update your Spring Boot `application.properties`:

```properties
# JWT Configuration
app.jwt.secret=your-secret-key-at-least-32-chars-long
app.jwt.expiration=86400000

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

## 🧪 Testing

### API Test Page

Access `/api-test` to test all authentication and API endpoints:

1. **Test Registration/Login** - Verify authentication flow
2. **Test Protected Routes** - Check role-based access
3. **Test Admin Functions** - Verify admin operations
4. **Test JWT Token** - Ensure proper authorization headers

### Manual Testing Checklist

-   [ ] User registration with different roles
-   [ ] User login and automatic dashboard redirect
-   [ ] Protected route access control
-   [ ] Admin user management functions
-   [ ] Role-based navigation display
-   [ ] Token expiration and refresh
-   [ ] Logout and session cleanup

## 🚨 Security Considerations

### Frontend Security

-   Tokens stored in localStorage (consider httpOnly cookies for production)
-   Role validation on both frontend and backend
-   Automatic token cleanup on logout
-   HTTPS required for production

### Backend Security

-   JWT secret key should be at least 32 characters
-   Token expiration configured appropriately
-   CORS properly configured
-   Input validation and sanitization
-   Rate limiting on authentication endpoints

## 🔄 State Management

### AuthContext Provider

```typescript
const { user, isAuthenticated, login, logout, refreshProfile } =
    useAuthContext();
```

### User Service Methods

```typescript
userService.login(credentials);
userService.register(userData);
userService.getProfile(userId);
userService.logout();
userService.isAuthenticated();
userService.hasRole(role);
```

## 📱 Responsive Design

All authentication components and dashboards are fully responsive:

-   Mobile-first design approach
-   Collapsible navigation menus
-   Touch-friendly interface elements
-   Optimized for all screen sizes

## 🐛 Troubleshooting

### Common Issues

1. **Login Redirect Not Working**

    - Check user role in localStorage
    - Verify JWT token validity
    - Check console for navigation errors

2. **Protected Route Access Denied**

    - Verify user role matches required roles
    - Check if user is authenticated
    - Review AuthProvider wrapping

3. **API Calls Failing**
    - Verify API base URL configuration
    - Check network tab for 401/403 errors
    - Ensure backend server is running

### Debug Mode

Enable debug logging by checking browser console for authentication state changes.

## 🚀 Deployment

### Frontend Deployment

1. Set production API URL in environment variables
2. Build the Next.js application: `npm run build`
3. Deploy to your hosting platform
4. Configure HTTPS for secure authentication

### Backend Deployment

1. Update CORS configuration for production domain
2. Set secure JWT secret in production environment
3. Configure HTTPS/SSL certificates
4. Set up proper database connections

## 📚 Additional Resources

-   [Next.js Authentication Guide](https://nextjs.org/docs/authentication)
-   [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc7519)
-   [React Hook Form Documentation](https://react-hook-form.com/)
-   [Zod Validation Library](https://zod.dev/)

---

For support or questions about the authentication system, please check the API test page at `/api-test` or review the component implementations in the codebase.
