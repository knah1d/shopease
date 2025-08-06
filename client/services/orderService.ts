import { apiClient } from '@/lib/api';
import { 
  Order, 
  CreateOrderRequest, 
  UpdateOrderStatusRequest,
  OrderStatus 
} from '@/types/order';

class OrderService {
  // Create a new order
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await apiClient.post<Order>('/orders', orderData);
      return response;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await apiClient.get<Order>(`/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }
  }

  // Get all orders for a user
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>(`/orders/user/${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, statusData: UpdateOrderStatusRequest): Promise<Order> {
    try {
      const response = await apiClient.put<Order>(`/orders/${orderId}/status`, statusData);
      return response;
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }

  // Cancel an order
  async cancelOrder(orderId: string): Promise<Order> {
    try {
      const response = await this.updateOrderStatus(orderId, { status: OrderStatus.CANCELLED });
      return response;
    } catch (error) {
      console.error('Failed to cancel order:', error);
      throw error;
    }
  }

  // Get current user's orders
  async getCurrentUserOrders(): Promise<Order[]> {
    try {
      // Get current user from localStorage
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not authenticated');
      }
      
      const user = JSON.parse(userStr);
      const response = await this.getUserOrders(user.id);
      return response;
    } catch (error) {
      console.error('Failed to fetch current user orders:', error);
      throw error;
    }
  }

  // Get orders by status
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      const allOrders = await this.getCurrentUserOrders();
      return allOrders.filter(order => order.status === status);
    } catch (error) {
      console.error('Failed to fetch orders by status:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const orderService = new OrderService();