# API Design

## Overview
RESTful API design for the admin panel backend. All endpoints follow REST conventions and return JSON responses.

## Base URL
```
Production: https://api.yourdomain.com/v1
Staging: https://api-staging.yourdomain.com/v1
```

## Authentication
All API requests (except public endpoints) require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Common Query Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sort`: Sort field (e.g., `createdAt`, `-createdAt` for descending)
- `search`: Search query
- `fields`: Comma-separated list of fields to return

## HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful request with no response body
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity`: Validation error
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## API Endpoints

## 1. Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "emailVerified": false
    },
    "message": "Verification email sent"
  }
}
```

### POST /auth/login
Authenticate user and get access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresIn": 1800
  }
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "expiresIn": 1800
  }
}
```

### POST /auth/logout
Logout user and invalidate tokens.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### POST /auth/forgot-password
Request password reset.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### POST /auth/reset-password
Reset password with token.

**Request:**
```json
{
  "token": "reset_token",
  "password": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

### POST /auth/verify-email
Verify email address.

**Request:**
```json
{
  "token": "verification_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### POST /auth/2fa/enable
Enable two-factor authentication.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "secret": "2fa_secret",
    "qrCode": "data:image/png;base64,...",
    "backupCodes": ["code1", "code2", ...]
  }
}
```

### POST /auth/2fa/verify
Verify 2FA code and complete setup.

**Request:**
```json
{
  "code": "123456"
}
```

### POST /auth/2fa/disable
Disable two-factor authentication.

**Request:**
```json
{
  "password": "current_password"
}
```

## 2. User Management Endpoints

### GET /users
Get list of all users (Admin only).

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `search`: Search by name or email
- `status`: Filter by status (active, suspended, etc.)
- `role`: Filter by role
- `application`: Filter by application access

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "status": "active",
      "emailVerified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### GET /users/:id
Get user by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "avatar": "https://...",
    "status": "active",
    "emailVerified": true,
    "twoFactorEnabled": false,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-15T10:00:00Z",
    "roles": [...],
    "applications": [...]
  }
}
```

### POST /users
Create new user (Admin only).

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "username": "janesmith",
  "roles": ["user"],
  "sendWelcomeEmail": true
}
```

### PUT /users/:id
Update user information.

**Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "avatar": "https://..."
}
```

### DELETE /users/:id
Delete user (Admin only).

**Query Parameters:**
- `hard`: Boolean, true for permanent delete

**Response (204):**
No content

### POST /users/:id/suspend
Suspend user account (Admin only).

**Request:**
```json
{
  "reason": "Terms violation",
  "duration": "30d"
}
```

### POST /users/:id/activate
Activate suspended user account (Admin only).

### GET /users/:id/activity
Get user activity logs.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "action": "login",
      "ip": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /users/:id/sessions
Get user's active sessions.

### DELETE /users/:id/sessions/:sessionId
Terminate specific session.

### GET /users/me
Get current authenticated user.

### PUT /users/me
Update current user profile.

### POST /users/me/change-password
Change current user password.

**Request:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

## 3. Role & Permission Endpoints

### GET /roles
Get all roles.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "admin",
      "displayName": "Administrator",
      "description": "Full system access",
      "roleType": "system",
      "permissions": [...]
    }
  ]
}
```

### GET /roles/:id
Get role by ID.

### POST /roles
Create new role (Admin only).

**Request:**
```json
{
  "name": "moderator",
  "displayName": "Moderator",
  "description": "Can moderate content",
  "roleType": "application",
  "applicationId": "uuid",
  "permissions": ["permission-id-1", "permission-id-2"]
}
```

### PUT /roles/:id
Update role.

### DELETE /roles/:id
Delete role (cannot delete system roles).

### GET /permissions
Get all permissions.

### POST /users/:userId/roles
Assign role to user.

**Request:**
```json
{
  "roleId": "uuid",
  "applicationId": "uuid"
}
```

### DELETE /users/:userId/roles/:roleId
Remove role from user.

## 4. Application Management Endpoints

### GET /applications
Get all applications.

**Query Parameters:**
- `status`: Filter by status
- `category`: Filter by category
- `page`, `limit`, `sort`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "blog-generator",
      "displayName": "Blog Generator",
      "description": "AI-powered blog creation",
      "category": "content",
      "status": "active",
      "version": "1.0.0",
      "userCount": 1250,
      "apiCallsToday": 5432
    }
  ]
}
```

### GET /applications/:id
Get application details.

### POST /applications
Create new application (Admin only).

**Request:**
```json
{
  "name": "new-app",
  "displayName": "New Application",
  "description": "App description",
  "category": "utility",
  "baseUrl": "https://app.example.com",
  "apiEndpoint": "https://api.app.example.com",
  "requiresSubscription": false
}
```

### PUT /applications/:id
Update application.

### DELETE /applications/:id
Delete application.

### GET /applications/:id/users
Get users of specific application.

### POST /applications/:id/users
Add user to application.

**Request:**
```json
{
  "userId": "uuid",
  "subscriptionTier": "free"
}
```

### DELETE /applications/:id/users/:userId
Remove user from application.

### GET /applications/:id/stats
Get application statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "activeUsers": {
      "daily": 450,
      "monthly": 980
    },
    "apiCalls": {
      "today": 5432,
      "thisMonth": 125000
    },
    "revenue": {
      "today": 123.45,
      "thisMonth": 5678.90
    },
    "uptime": 99.98,
    "avgResponseTime": 150
  }
}
```

### PUT /applications/:id/settings
Update application settings.

**Request:**
```json
{
  "maxRequestsPerMinute": 100,
  "timeout": 30,
  "maintenanceMode": false
}
```

## 5. Analytics Endpoints

### GET /analytics/overview
Get overall system analytics.

**Query Parameters:**
- `startDate`: Start date (ISO 8601)
- `endDate`: End date (ISO 8601)
- `granularity`: hour, day, week, month

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 15000,
      "new": 250,
      "active": 8500
    },
    "applications": {
      "total": 12,
      "active": 10
    },
    "revenue": {
      "total": 45000.00,
      "growth": 12.5
    },
    "apiCalls": {
      "total": 2500000,
      "errors": 1250
    }
  }
}
```

### GET /analytics/users
Get user analytics.

**Query Parameters:**
- `startDate`, `endDate`, `granularity`
- `applicationId`: Filter by application

### GET /analytics/applications/:id
Get specific application analytics.

### GET /analytics/revenue
Get revenue analytics.

### POST /analytics/reports
Generate custom report.

**Request:**
```json
{
  "reportType": "user_growth",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "format": "pdf",
  "email": "admin@example.com"
}
```

## 6. Subscription & Billing Endpoints

### GET /subscriptions
Get all subscriptions (Admin only).

### GET /subscriptions/:id
Get subscription details.

### POST /subscriptions
Create new subscription.

**Request:**
```json
{
  "userId": "uuid",
  "applicationId": "uuid",
  "planName": "premium",
  "billingCycle": "monthly"
}
```

### PUT /subscriptions/:id
Update subscription (upgrade/downgrade).

### POST /subscriptions/:id/cancel
Cancel subscription.

**Request:**
```json
{
  "cancelAtPeriodEnd": true,
  "reason": "Too expensive"
}
```

### POST /subscriptions/:id/resume
Resume cancelled subscription.

### GET /invoices
Get all invoices.

### GET /invoices/:id
Get invoice details.

### POST /invoices/:id/send
Resend invoice email.

### GET /invoices/:id/pdf
Download invoice PDF.

## 7. Notification Endpoints

### GET /notifications
Get user notifications.

**Query Parameters:**
- `unreadOnly`: Boolean
- `type`: Filter by type
- `page`, `limit`

### GET /notifications/:id
Get notification details.

### PUT /notifications/:id/read
Mark notification as read.

### PUT /notifications/read-all
Mark all notifications as read.

### DELETE /notifications/:id
Delete notification.

### POST /notifications/send
Send notification to users (Admin only).

**Request:**
```json
{
  "userIds": ["uuid1", "uuid2"],
  "type": "email",
  "title": "Important Update",
  "message": "System maintenance scheduled",
  "linkUrl": "https://..."
}
```

## 8. Audit Log Endpoints

### GET /audit-logs
Get audit logs (Admin only).

**Query Parameters:**
- `userId`: Filter by user
- `action`: Filter by action
- `resourceType`: Filter by resource
- `startDate`, `endDate`
- `page`, `limit`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "userId": "uuid",
      "action": "user.update",
      "resourceType": "user",
      "resourceId": "uuid",
      "oldValues": {...},
      "newValues": {...},
      "ipAddress": "192.168.1.1",
      "timestamp": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### GET /audit-logs/:id
Get specific audit log entry.

## 9. Settings Endpoints

### GET /settings
Get all settings (Admin only).

### GET /settings/:key
Get specific setting.

### PUT /settings/:key
Update setting (Admin only).

**Request:**
```json
{
  "value": "new_value"
}
```

### GET /settings/public
Get public settings (no auth required).

## 10. API Key Endpoints

### GET /api-keys
Get user's API keys.

### POST /api-keys
Create new API key.

**Request:**
```json
{
  "name": "Production API Key",
  "scopes": ["read:users", "write:data"],
  "expiresAt": "2025-01-01T00:00:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Production API Key",
    "key": "sk_live_xxxxxxxxxxxxx",
    "scopes": ["read:users", "write:data"],
    "expiresAt": "2025-01-01T00:00:00Z"
  },
  "message": "Save this key securely. It won't be shown again."
}
```

### DELETE /api-keys/:id
Revoke API key.

## 11. Usage & Statistics Endpoints

### GET /usage/summary
Get usage summary for current user.

### GET /usage/:applicationId
Get usage for specific application.

### GET /usage/logs
Get usage logs.

## 12. System Health Endpoints

### GET /health
Health check endpoint (no auth required).

**Response (200):**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:00:00Z",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "storage": "healthy"
  }
}
```

### GET /health/detailed
Detailed health check (Admin only).

## Rate Limiting

All API endpoints are rate limited:

**Default Limits:**
- Unauthenticated: 20 requests per minute
- Authenticated users: 100 requests per minute
- Admin users: 500 requests per minute

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## Webhooks

Applications can subscribe to events:

**Available Events:**
- `user.created`
- `user.updated`
- `user.deleted`
- `subscription.created`
- `subscription.updated`
- `subscription.cancelled`
- `payment.succeeded`
- `payment.failed`

**Webhook Payload:**
```json
{
  "event": "user.created",
  "data": { ... },
  "timestamp": "2024-01-15T10:00:00Z",
  "signature": "sha256_signature"
}
```

## Error Codes

Common error codes:

- `UNAUTHORIZED`: Authentication failed
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid input data
- `DUPLICATE_ENTRY`: Resource already exists
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Versioning

API versioning is handled via URL path:
- Current: `/v1/`
- Future: `/v2/`

Breaking changes will result in a new version. Old versions will be supported for at least 12 months after deprecation notice.
