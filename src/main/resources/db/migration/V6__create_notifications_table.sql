-- Notifications table (optional for MVP)
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('ORDER_CONFIRMATION', 'PAYMENT_SUCCESS', 'ORDER_SHIPPED')),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    sent BOOLEAN NOT NULL DEFAULT false,
    sent_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for notification queries
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_sent ON notifications(sent);
CREATE INDEX idx_notifications_type ON notifications(type);
