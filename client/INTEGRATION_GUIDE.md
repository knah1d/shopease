# ShopEase Frontend - Backend Integration

This frontend is now fully integrated with your Spring Boot backend APIs. Here's what has been implemented and how to use it:

## 🚀 Quick Start

1. **Start your Spring Boot backend** on `http://localhost:8080`
2. **Start the Next.js frontend**:
    ```bash
    cd client
    npm run dev
    ```
3. Visit `http://localhost:3001` to see your application
4. Test API integration at `http://localhost:3001/api-test`

## 🔗 API Integration

### Backend Endpoints Connected:

#### User APIs ✅

-   `POST /api/users/register` - Register new user
-   `POST /api/users/login` - User login
-   `GET /api/users/profile/{userId}` - Get user profile

#### Product APIs ✅

-   `POST /api/products/createProduct` - Create product (admin)
-   `GET /api/products/{id}` - Get product by ID
-   `GET /api/products/getAllProducts` - Get all products
-   `GET /api/products/search` - Search products
-   `PUT /api/products/{id}/price` - Update price
-   `PUT /api/products/{id}/stock` - Update stock

#### Order APIs ✅

-   `POST /api/orders` - Create new order
-   `GET /api/orders/{orderId}` - Get order by ID
-   `GET /api/orders/user/{userId}` - Get user orders
-   `PUT /api/orders/{orderId}/status` - Update order status

#### Payment APIs ✅

-   `POST /api/orders/{orderId}/payment` - Initiate order payment
-   `POST /api/payments/initiate` - Initiate payment
-   `POST /api/payments/success` - Payment success callback
-   `POST /api/payments/fail` - Payment failure callback
-   `POST /api/payments/cancel` - Payment cancellation callback
-   `POST /api/payments/ipn` - Payment IPN listener
-   `GET /api/payments/status/{transactionId}` - Get payment status
-   `GET /api/payments/order/{orderId}` - Get order payments
-   `GET /api/payments/test/config` - Get test config

## 🎯 Key Features Now Working

### Authentication System

-   **Sign Up**: `/sign-up` - Creates new user account via backend
-   **Sign In**: `/sign-in` - Authenticates user and stores JWT token
-   **Protected Routes**: Automatic redirection for unauthenticated users
-   **User Profile**: Access to user information from backend

### Product Management

-   **Product Display**: Home page shows products from backend (falls back to static data)
-   **Product Search**: Functional search across products
-   **Product Details**: Individual product pages with backend data
-   **Category Filtering**: Products filtered by categories

### Shopping Cart

-   **Add to Cart**: Products can be added to cart (stored locally)
-   **Cart Management**: Update quantities, remove items
-   **Persistent Cart**: Cart data saved in localStorage

### Order Management

-   **Place Orders**: Checkout process creates orders via backend
-   **Order History**: View previous orders in `My Orders` section
-   **Order Status**: Track order status updates
-   **Shipping Address**: Save and manage shipping information

### Payment Integration

-   **Payment Processing**: Initiate payments for orders
-   **Payment Callbacks**: Handle success, failure, and cancellation
-   **Payment Status**: Check payment status and history

## 📁 Updated Components

### Forms

-   `SignInForm.tsx` - Connected to `/api/users/login`
-   `SignUpForm.tsx` - Connected to `/api/users/register`
-   `CheckoutForm.tsx` - Connected to `/api/orders`

### Services

-   `userService.ts` - User authentication and profile management
-   `productService.ts` - Product CRUD operations
-   `orderService.ts` - Order management
-   `paymentService.ts` - Payment processing
-   `cartService.ts` - Local cart management

### Hooks

-   `useAuth.ts` - Authentication state management
-   `useProducts.ts` - Product data management
-   `useOrders.ts` - Order management
-   `usePayment.ts` - Payment processing

### Providers

-   `AuthProvider.tsx` - Global authentication context

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_ENVIRONMENT=development
```

### Backend Requirements

Your Spring Boot backend should:

1. Run on `http://localhost:8080`
2. Have CORS enabled for `http://localhost:3001`
3. Return JWT tokens on login
4. Accept JWT tokens in Authorization header
5. Return JSON responses matching the expected formats

## 🧪 Testing

### API Test Page

Visit `/api-test` to test all endpoints:

1. Test non-authenticated endpoints first (Get Products, Test Config)
2. Register a new user
3. Login with the registered user
4. Test authenticated endpoints (Orders, Profile)

### Manual Testing Flow

1. **Register Account**: Go to `/sign-up` and create account
2. **Login**: Go to `/sign-in` and login
3. **Browse Products**: Products should load from backend
4. **Add to Cart**: Add products to cart
5. **Checkout**: Go to `/checkout` and place order
6. **View Orders**: Go to `/my-orders` to see order history

## 🚨 Troubleshooting

### Backend Not Connected

-   Products will show static data as fallback
-   Authentication will fail
-   Orders cannot be placed
-   Check console for API errors

### Common Issues

1. **CORS Error**: Enable CORS in Spring Boot for frontend URL
2. **401 Unauthorized**: Check JWT token implementation
3. **Network Error**: Verify backend is running on correct port
4. **Type Errors**: Backend response format should match expected types

### Error Handling

-   All API calls have error handling with toast notifications
-   Fallback to static data when backend is unavailable
-   User-friendly error messages for all operations

## 📱 User Flow

1. **New User**:

    - Sign Up → Email verification (if implemented) → Sign In → Browse Products → Add to Cart → Checkout → Payment

2. **Returning User**:

    - Sign In → Browse Products → Add to Cart → Checkout → Payment → View Orders

3. **Guest User**:
    - Browse Products → Must Sign In to Checkout

## 🔄 Data Flow

1. **Frontend** makes API calls to backend
2. **Backend** processes requests and returns JSON
3. **Frontend** updates UI based on response
4. **Local storage** used for cart and authentication tokens
5. **Zustand stores** manage global state

## ⚡ Performance

-   Products cached after first load
-   Authentication state persisted
-   Optimistic UI updates for cart operations
-   Loading states for all async operations
-   Error boundaries to prevent crashes

## 🎨 UI/UX Features

-   **Responsive Design**: Works on all device sizes
-   **Dark/Light Mode**: Theme switching
-   **Loading States**: Skeleton loaders and spinners
-   **Toast Notifications**: Success and error messages
-   **Form Validation**: Client-side validation with Zod schemas
-   **Accessibility**: ARIA labels and keyboard navigation

---

Your ShopEase application is now fully functional with backend integration! 🎉
