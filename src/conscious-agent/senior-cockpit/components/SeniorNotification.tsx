// MASTER PLAN 2.0: SeniorNotification.tsx
// STATUS: Notifikationssystem för Senior Cockpit
// INTEGRATION: Conscious Agent - Senior-vänliga notifikationer
// ARCHITECTURE: Dual Consciousness Architecture compliant

import React, { useState, useEffect } from 'react';

/**
 * MASTER PLAN 2.0 Senior Notification Types
 * 
 * Senior-vänliga meddelandetyper utan teknisk jargong
 */
export interface SeniorNotification {
  id: string;
  type: 'success' | 'info' | 'celebration' | 'gentle_reminder' | 'encouragement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  duration?: number; // milliseconds, undefined = manual dismiss
  icon?: string;
  celebrationLevel?: 'small' | 'medium' | 'big'; // For celebration type
  actionButton?: {
    text: string;
    onClick: () => void;
  };
  timestamp: Date;
  isRead: boolean;
  seniorFriendly: {
    tone: 'encouraging' | 'informative' | 'celebratory' | 'supportive';
    complexity: 'simple' | 'detailed';
    emotionalSupport: boolean;
  };
}

export interface SeniorNotificationProps {
  notification: SeniorNotification;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
  className?: string;
}

/**
 * MASTER PLAN 2.0 Senior Notification Component
 * 
 * Stora, tydliga meddelanden designade för seniorer:
 * - Stora knappar och text
 * - Tydliga färger och kontrast
 * - Enkelt språk utan teknisk jargong
 * - Uppmuntrande och stödjande ton
 * - Celebration moments för positiv feedback
 */
export const SeniorNotification: React.FC<SeniorNotificationProps> = ({
  notification,
  onDismiss,
  onRead,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-dismiss timer
  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  // Mark as read when component mounts
  useEffect(() => {
    if (!notification.isRead) {
      onRead(notification.id);
    }
  }, [notification.id, notification.isRead, onRead]);

  // Celebration animation
  useEffect(() => {
    if (notification.type === 'celebration') {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification.type]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(notification.id), 300); // Allow fade out animation
  };

  const getNotificationStyles = () => {
    const baseStyles = `
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      ${isAnimating && notification.type === 'celebration' ? 'animate-bounce' : ''}
    `;

    const typeStyles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      celebration: 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-lg',
      gentle_reminder: 'bg-purple-50 border-purple-200 text-purple-800',
      encouragement: 'bg-pink-50 border-pink-200 text-pink-800'
    };

    const priorityStyles = {
      low: 'border-l-4',
      medium: 'border-l-8 shadow-md',
      high: 'border-l-12 shadow-lg ring-2 ring-opacity-50'
    };

    return `${baseStyles} ${typeStyles[notification.type]} ${priorityStyles[notification.priority]}`;
  };

  const getIcon = () => {
    if (notification.icon) return notification.icon;

    const defaultIcons = {
      success: '✅',
      info: 'ℹ️',
      celebration: '🎉',
      gentle_reminder: '💡',
      encouragement: '💪'
    };

    return defaultIcons[notification.type];
  };

  const getCelebrationEmoji = () => {
    if (notification.type !== 'celebration') return '';

    const celebrationEmojis = {
      small: '🎊',
      medium: '🎉🎊',
      big: '🎉🎊🥳✨'
    };

    return celebrationEmojis[notification.celebrationLevel || 'medium'];
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        senior-notification
        max-w-md mx-auto mb-4 p-6 rounded-xl border-2
        ${getNotificationStyles()}
        ${className}
      `}
      role="alert"
      aria-live={notification.priority === 'high' ? 'assertive' : 'polite'}
    >
      {/* Header with icon and title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span 
            className="text-3xl flex-shrink-0" 
            role="img" 
            aria-label={`${notification.type} notification`}
          >
            {getIcon()}
          </span>
          <h3 className="text-xl font-bold leading-tight">
            {notification.title}
            {notification.type === 'celebration' && (
              <span className="ml-2 text-2xl">
                {getCelebrationEmoji()}
              </span>
            )}
          </h3>
        </div>
        
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="
            flex-shrink-0 ml-4 p-2 rounded-full
            hover:bg-gray-200 focus:bg-gray-200
            focus:outline-none focus:ring-2 focus:ring-gray-400
            transition-colors duration-200
          "
          aria-label="Stäng meddelande"
        >
          <span className="text-2xl text-gray-500">×</span>
        </button>
      </div>

      {/* Message content */}
      <div className="mb-4">
        <p className="text-lg leading-relaxed">
          {notification.message}
        </p>
        
        {/* Timestamp for reference */}
        <p className="text-sm text-gray-600 mt-2">
          {notification.timestamp.toLocaleString('sv-SE', {
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short'
          })}
        </p>
      </div>

      {/* Action button if provided */}
      {notification.actionButton && (
        <div className="mt-4">
          <button
            onClick={notification.actionButton.onClick}
            className="
              w-full py-3 px-6 rounded-lg font-semibold text-lg
              bg-blue-600 text-white hover:bg-blue-700
              focus:outline-none focus:ring-4 focus:ring-blue-300
              transition-colors duration-200
              shadow-md hover:shadow-lg
            "
          >
            {notification.actionButton.text}
          </button>
        </div>
      )}

      {/* Celebration animation overlay */}
      {notification.type === 'celebration' && isAnimating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Sparkle effects */}
            <div className="absolute top-2 right-2 text-2xl animate-ping">✨</div>
            <div className="absolute bottom-2 left-2 text-2xl animate-pulse">⭐</div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl animate-bounce">
              🎊
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * MASTER PLAN 2.0 Senior Notification Manager
 * 
 * Hanterar prioritering och visning av notifikationer
 */
export class SeniorNotificationManager {
  private notifications: SeniorNotification[] = [];
  private listeners: Array<(notifications: SeniorNotification[]) => void> = [];
  private maxNotifications: number = 5;

  constructor(maxNotifications: number = 5) {
    this.maxNotifications = maxNotifications;
    console.log('🔔 Senior Notification Manager initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Add notification with automatic prioritization
   */
  addNotification(notification: Omit<SeniorNotification, 'id' | 'timestamp' | 'isRead'>): string {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const fullNotification: SeniorNotification = {
      ...notification,
      id,
      timestamp: new Date(),
      isRead: false
    };

    // Insert based on priority
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const insertIndex = this.notifications.findIndex(
      n => priorityOrder[n.priority] < priorityOrder[fullNotification.priority]
    );

    if (insertIndex === -1) {
      this.notifications.push(fullNotification);
    } else {
      this.notifications.splice(insertIndex, 0, fullNotification);
    }

    // Limit number of notifications
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications);
    }

    this.notifyListeners();
    console.log(`🔔 Added ${notification.type} notification: ${notification.title}`);
    
    return id;
  }

  /**
   * MASTER PLAN 2.0: Create celebration notification
   */
  celebrate(title: string, message: string, level: 'small' | 'medium' | 'big' = 'medium'): string {
    return this.addNotification({
      type: 'celebration',
      title,
      message,
      priority: 'high',
      celebrationLevel: level,
      duration: level === 'big' ? 8000 : level === 'medium' ? 5000 : 3000,
      seniorFriendly: {
        tone: 'celebratory',
        complexity: 'simple',
        emotionalSupport: true
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Create encouraging notification
   */
  encourage(title: string, message: string, actionText?: string, actionCallback?: () => void): string {
    return this.addNotification({
      type: 'encouragement',
      title,
      message,
      priority: 'medium',
      duration: 10000,
      actionButton: actionText && actionCallback ? {
        text: actionText,
        onClick: actionCallback
      } : undefined,
      seniorFriendly: {
        tone: 'encouraging',
        complexity: 'simple',
        emotionalSupport: true
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Create gentle reminder
   */
  gentleReminder(title: string, message: string): string {
    return this.addNotification({
      type: 'gentle_reminder',
      title,
      message,
      priority: 'low',
      duration: 15000,
      seniorFriendly: {
        tone: 'supportive',
        complexity: 'simple',
        emotionalSupport: false
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Create success notification
   */
  success(title: string, message: string): string {
    return this.addNotification({
      type: 'success',
      title,
      message,
      priority: 'medium',
      duration: 7000,
      seniorFriendly: {
        tone: 'informative',
        complexity: 'simple',
        emotionalSupport: true
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Create info notification
   */
  info(title: string, message: string, persistent: boolean = false): string {
    return this.addNotification({
      type: 'info',
      title,
      message,
      priority: 'low',
      duration: persistent ? undefined : 10000,
      seniorFriendly: {
        tone: 'informative',
        complexity: 'detailed',
        emotionalSupport: false
      }
    });
  }

  /**
   * MASTER PLAN 2.0: Remove notification
   */
  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
    console.log(`🔔 Removed notification: ${id}`);
  }

  /**
   * MASTER PLAN 2.0: Mark notification as read
   */
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      this.notifyListeners();
      console.log(`🔔 Marked notification as read: ${id}`);
    }
  }

  /**
   * MASTER PLAN 2.0: Get all notifications
   */
  getNotifications(): SeniorNotification[] {
    return [...this.notifications];
  }

  /**
   * MASTER PLAN 2.0: Subscribe to notification changes
   */
  subscribe(listener: (notifications: SeniorNotification[]) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * MASTER PLAN 2.0: Clear all notifications
   */
  clearAll(): void {
    this.notifications = [];
    this.notifyListeners();
    console.log('🔔 Cleared all notifications');
  }

  /**
   * MASTER PLAN 2.0: Get notification statistics
   */
  getStats(): {
    total: number;
    unread: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  } {
    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let unread = 0;

    for (const notification of this.notifications) {
      byType[notification.type] = (byType[notification.type] || 0) + 1;
      byPriority[notification.priority] = (byPriority[notification.priority] || 0) + 1;
      if (!notification.isRead) unread++;
    }

    return {
      total: this.notifications.length,
      unread,
      byType,
      byPriority
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener([...this.notifications]);
    }
  }
}

// Export default notification manager instance
export const seniorNotificationManager = new SeniorNotificationManager();

export default SeniorNotification;