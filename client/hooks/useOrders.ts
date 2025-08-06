import { useState, useEffect } from 'react';
import { orderService } from '@/services';
import { Order, CreateOrderRequest, OrderStatus } from '@/types/order';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await orderService.getCurrentUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newOrder = await orderService.createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const order = await orderService.getOrderById(orderId);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedOrder = await orderService.cancelOrder(orderId);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersByStatus = async (status: OrderStatus) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await orderService.getOrdersByStatus(status);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders by status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get order statistics
  const getOrderStats = () => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === OrderStatus.PENDING).length;
    const completedOrders = orders.filter(order => order.status === OrderStatus.DELIVERED).length;
    const cancelledOrders = orders.filter(order => order.status === OrderStatus.CANCELLED).length;
    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalSpent,
    };
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return {
    orders,
    isLoading,
    error,
    fetchUserOrders,
    createOrder,
    getOrderById,
    cancelOrder,
    getOrdersByStatus,
    getOrderStats,
  };
};