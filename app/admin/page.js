'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// IMPORTANT: Use your actual Supabase client import here.
// The mock data is for demonstration and immediate testing without a live Supabase connection.
import { supabase } from '../../lib/supabaseClient' // Your actual Supabase client import

import styles from './admin.module.css'

const AdminPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  // Updated status filter options
  const [statusFilter, setStatusFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null) // Clear previous errors

      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error

      setOrders(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      // Refresh orders after successful update
      fetchOrders()
    } catch (err) {
      setError(err.message)
      console.error('Error updating order status:', err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update order status in Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      // Refresh orders list
      fetchOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
      setError('Failed to update order status: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button onClick={fetchOrders} className={styles.retryButton}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>Order Management Dashboard</h1>
        <div className={styles.headerControls}>
          <div className={styles.filterContainer}>
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="placed">Placed</option>
              <option value="dispatched">Dispatched</option>
              {/* If 'cancelled' orders can exist but aren't a primary filter, you might add: */}
              {/* <option value="cancelled">Cancelled</option> */}
            </select>
          </div>
          <button
            onClick={fetchOrders}
            className={styles.refreshButton}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Orders'}
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>No orders found.</p>
        </div>
      ) : (
        <div className={styles.ordersContainer}>
          <div className={styles.ordersTable}>
            <table className={styles.ordersTableInner}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={`${styles.orderRow} ${order.status === 'cancelled' ? styles.cancelled : ''}`}
                  >
                    <td>
                      <button
                        className={styles.orderIdButton}
                        onClick={() => setSelectedOrder(order)}
                      >
                        #{order.id.slice(0, 8)}
                      </button>
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.email}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <span
                        className={`${styles.paymentBadge} ${
                          order.payment_method === 'virtual'
                            ? styles.virtual
                            : styles.cod
                        }`}
                      >
                        {order.payment_method === 'virtual'
                          ? 'Virtual Payment'
                          : 'Cash on Delivery'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          order.status === 'pending'
                            ? styles.pending
                            : order.status === 'placed'
                              ? styles.placed
                              : order.status === 'dispatched'
                                ? styles.dispatched
                                : styles.cancelled // Fallback for 'cancelled' or unknown statuses
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={styles.statusSelect}
                        disabled={order.status === 'cancelled'} // Optionally disable status change for cancelled orders
                      >
                        <option value="pending">Pending</option>
                        <option value="placed">Placed</option>
                        <option value="dispatched">Dispatched</option>
                        {/* If you want to allow changing to cancelled, uncomment below */}
                        {/* <option value="cancelled">Cancelled</option> */}
                      </select>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className={styles.viewButton}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <h3>Total Orders</h3>
              <p>{orders.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Pending</h3>
              <p>{orders.filter((o) => o.status === 'pending').length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Placed</h3>
              <p>{orders.filter((o) => o.status === 'placed').length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Dispatched</h3>
              <p>{orders.filter((o) => o.status === 'dispatched').length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.orderDetailModal}>
            <div className={styles.modalHeader}>
              <h2>Order Details: #{selectedOrder.id.slice(0, 8)}</h2>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedOrder(null)}
              >
                &times;
              </button>
            </div>

            <div className={styles.orderInfo}>
              <div>
                <p>
                  <strong>Date:</strong> {formatDate(selectedOrder.created_at)}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={`${styles.statusBadge} ${
                      selectedOrder.status === 'pending'
                        ? styles.pending
                        : selectedOrder.status === 'placed'
                          ? styles.placed
                          : selectedOrder.status === 'dispatched'
                            ? styles.dispatched
                            : styles.cancelled
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
                <p>
                  <strong>Payment Method:</strong>
                  <span
                    className={`${styles.paymentBadge} ${
                      selectedOrder.payment_method === 'virtual'
                        ? styles.virtual
                        : styles.cod
                    }`}
                  >
                    {selectedOrder.payment_method === 'virtual'
                      ? 'Virtual Payment'
                      : 'Cash on Delivery'}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <strong>Customer:</strong> {selectedOrder.customer_name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.phone}
                </p>
              </div>
            </div>

            <div className={styles.shippingInfo}>
              <h3>Shipping Address</h3>
              <p>{selectedOrder.shipping_address}</p>
            </div>

            <div className={styles.orderItems}>
              <h3>Order Items</h3>
              <table className={styles.itemsTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className={styles.productInfo}>
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className={styles.productImage}
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src =
                                'https://placehold.co/60x60/CCCCCC/000000?text=No+Image'
                            }}
                          />
                          <div>
                            <div className={styles.productName}>
                              {item.name}
                            </div>
                            <div className={styles.productDesc}>
                              {item.description || 'No description'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryItem}>
                <span>Subtotal:</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Shipping:</span>
                <span>{formatCurrency(selectedOrder.shipping)}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Tax (18%):</span>
                <span>{formatCurrency(selectedOrder.tax)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total:</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.closeDetailButton}
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
