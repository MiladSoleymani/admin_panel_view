# Database Schema

## Overview
This document defines the database schema for the admin panel system. The schema is designed for PostgreSQL but can be adapted for other relational databases.

## Core Tables

### 1. users
Stores all user accounts across the system.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),  -- NULL for OAuth-only users
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20),
  avatar_url TEXT,
  status VARCHAR(50) DEFAULT 'active',  -- active, suspended, deleted, pending_verification
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  preferred_language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  deleted_at TIMESTAMP,  -- Soft delete

  -- Indexes
  INDEX idx_users_email (email),
  INDEX idx_users_username (username),
  INDEX idx_users_status (status),
  INDEX idx_users_created_at (created_at)
);
```

### 2. applications
Stores AI application information.

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),  -- blog, image, code, translation, etc.
  icon_url TEXT,
  cover_image_url TEXT,
  version VARCHAR(20),
  status VARCHAR(50) DEFAULT 'active',  -- active, maintenance, deprecated, disabled
  base_url TEXT,
  api_endpoint TEXT,
  api_version VARCHAR(20),
  webhook_url TEXT,
  documentation_url TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  requires_subscription BOOLEAN DEFAULT FALSE,
  is_beta BOOLEAN DEFAULT FALSE,
  max_requests_per_minute INTEGER DEFAULT 60,
  timeout_seconds INTEGER DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_applications_name (name),
  INDEX idx_applications_status (status),
  INDEX idx_applications_category (category)
);
```

### 3. roles
Defines system and application roles.

```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  role_type VARCHAR(50) NOT NULL,  -- system, application
  application_id UUID REFERENCES applications(id),  -- NULL for system roles
  is_system_role BOOLEAN DEFAULT FALSE,  -- Cannot be deleted
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_roles_name (name),
  INDEX idx_roles_type (role_type),
  INDEX idx_roles_application (application_id)
);
```

### 4. permissions
Defines granular permissions.

```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,  -- e.g., users:read:all
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  resource VARCHAR(100) NOT NULL,  -- users, applications, settings, etc.
  action VARCHAR(50) NOT NULL,  -- create, read, update, delete
  scope VARCHAR(50),  -- all, own, specific
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_permissions_name (name),
  INDEX idx_permissions_resource (resource)
);
```

### 5. role_permissions
Maps permissions to roles.

```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(role_id, permission_id),

  -- Indexes
  INDEX idx_role_permissions_role (role_id),
  INDEX idx_role_permissions_permission (permission_id)
);
```

### 6. user_roles
Assigns roles to users.

```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id),  -- NULL for system roles
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,  -- NULL for permanent

  UNIQUE(user_id, role_id, application_id),

  -- Indexes
  INDEX idx_user_roles_user (user_id),
  INDEX idx_user_roles_role (role_id),
  INDEX idx_user_roles_application (application_id)
);
```

### 7. user_applications
Maps users to applications with access details.

```sql
CREATE TABLE user_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active',  -- active, suspended, trial, expired
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP,
  subscription_tier VARCHAR(50),  -- free, basic, premium, enterprise
  subscription_status VARCHAR(50),  -- active, cancelled, expired, trial
  trial_ends_at TIMESTAMP,
  subscription_ends_at TIMESTAMP,
  api_calls_count INTEGER DEFAULT 0,
  api_calls_limit INTEGER,
  storage_used_bytes BIGINT DEFAULT 0,
  storage_limit_bytes BIGINT,

  UNIQUE(user_id, application_id),

  -- Indexes
  INDEX idx_user_apps_user (user_id),
  INDEX idx_user_apps_application (application_id),
  INDEX idx_user_apps_status (status)
);
```

### 8. sessions
Tracks active user sessions.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  refresh_token_hash VARCHAR(255) UNIQUE,
  ip_address VARCHAR(45),  -- IPv4 or IPv6
  user_agent TEXT,
  device_type VARCHAR(50),  -- desktop, mobile, tablet
  device_name VARCHAR(255),
  browser VARCHAR(100),
  os VARCHAR(100),
  location_country VARCHAR(100),
  location_city VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,

  -- Indexes
  INDEX idx_sessions_user (user_id),
  INDEX idx_sessions_token (token_hash),
  INDEX idx_sessions_refresh_token (refresh_token_hash),
  INDEX idx_sessions_expires (expires_at)
);
```

### 9. oauth_providers
OAuth authentication providers.

```sql
CREATE TABLE oauth_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL,  -- google, github, facebook, etc.
  provider_user_id VARCHAR(255) NOT NULL,
  provider_email VARCHAR(255),
  provider_username VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  profile_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(provider, provider_user_id),

  -- Indexes
  INDEX idx_oauth_user (user_id),
  INDEX idx_oauth_provider (provider),
  INDEX idx_oauth_provider_user (provider, provider_user_id)
);
```

### 10. api_keys
User API keys for programmatic access.

```sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id),
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  key_prefix VARCHAR(20),  -- First few chars for identification
  scopes JSONB,  -- Array of permission scopes
  status VARCHAR(50) DEFAULT 'active',  -- active, revoked, expired
  last_used_at TIMESTAMP,
  usage_count INTEGER DEFAULT 0,
  rate_limit INTEGER,  -- Requests per minute
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP,

  -- Indexes
  INDEX idx_api_keys_user (user_id),
  INDEX idx_api_keys_hash (key_hash),
  INDEX idx_api_keys_status (status)
);
```

### 11. subscriptions
User subscription details.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES applications(id),
  plan_name VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,  -- active, cancelled, expired, past_due, trial
  billing_cycle VARCHAR(50),  -- monthly, yearly
  amount DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_provider VARCHAR(50),  -- stripe, paypal, etc.
  payment_provider_subscription_id VARCHAR(255),
  trial_ends_at TIMESTAMP,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_subscriptions_user (user_id),
  INDEX idx_subscriptions_application (application_id),
  INDEX idx_subscriptions_status (status)
);
```

### 12. invoices
Billing invoices.

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  user_id UUID NOT NULL REFERENCES users(id),
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL,  -- draft, paid, void, uncollectible
  amount DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50),
  payment_provider VARCHAR(50),
  payment_provider_invoice_id VARCHAR(255),
  due_date TIMESTAMP,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_invoices_subscription (subscription_id),
  INDEX idx_invoices_user (user_id),
  INDEX idx_invoices_number (invoice_number),
  INDEX idx_invoices_status (status)
);
```

### 13. usage_logs
Track application usage for billing and analytics.

```sql
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  application_id UUID NOT NULL REFERENCES applications(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id VARCHAR(255),
  metadata JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  response_time_ms INTEGER,
  status_code INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_usage_user (user_id),
  INDEX idx_usage_application (application_id),
  INDEX idx_usage_created (created_at),
  INDEX idx_usage_action (action)
);
```

### 14. audit_logs
Complete audit trail of all actions.

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id VARCHAR(255),
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(50),  -- success, failure
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_audit_user (user_id),
  INDEX idx_audit_resource (resource_type, resource_id),
  INDEX idx_audit_action (action),
  INDEX idx_audit_created (created_at)
);
```

### 15. notifications
User notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,  -- email, push, sms, in_app
  category VARCHAR(50),  -- security, billing, update, promotion
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  read_at TIMESTAMP,
  priority VARCHAR(20) DEFAULT 'normal',  -- low, normal, high
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_notifications_user (user_id),
  INDEX idx_notifications_read (is_read),
  INDEX idx_notifications_sent (is_sent),
  INDEX idx_notifications_created (created_at)
);
```

### 16. settings
System and application settings.

```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope VARCHAR(50) NOT NULL,  -- system, application, user
  scope_id UUID,  -- application_id or user_id
  key VARCHAR(255) NOT NULL,
  value JSONB NOT NULL,
  data_type VARCHAR(50),  -- string, number, boolean, json
  is_public BOOLEAN DEFAULT FALSE,
  is_encrypted BOOLEAN DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(scope, scope_id, key),

  -- Indexes
  INDEX idx_settings_scope (scope, scope_id),
  INDEX idx_settings_key (key)
);
```

### 17. password_reset_tokens
Temporary tokens for password reset.

```sql
CREATE TABLE password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_reset_tokens_user (user_id),
  INDEX idx_reset_tokens_hash (token_hash),
  INDEX idx_reset_tokens_expires (expires_at)
);
```

### 18. email_verification_tokens
Tokens for email verification.

```sql
CREATE TABLE email_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  token_hash VARCHAR(255) UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_verify_tokens_user (user_id),
  INDEX idx_verify_tokens_hash (token_hash),
  INDEX idx_verify_tokens_expires (expires_at)
);
```

## Relationships

### Entity Relationship Summary

```
users (1) ─────< (M) user_roles (M) >───── (1) roles
  │                                            │
  │                                            │
  ├────< (M) user_applications (M) >──────────┤
  │                                            │
  │                                            └─< (M) applications
  ├────< (M) sessions
  │
  ├────< (M) oauth_providers
  │
  ├────< (M) api_keys
  │
  ├────< (M) subscriptions (M) >──── (1) applications
  │         │
  │         └────< (M) invoices
  │
  ├────< (M) usage_logs
  │
  ├────< (M) audit_logs
  │
  └────< (M) notifications

roles (1) ─────< (M) role_permissions (M) >───── (1) permissions
```

## Data Types

### Status Enums
- User Status: `active`, `suspended`, `deleted`, `pending_verification`
- Application Status: `active`, `maintenance`, `deprecated`, `disabled`
- Subscription Status: `active`, `cancelled`, `expired`, `past_due`, `trial`
- Session Status: `active`, `expired`, `revoked`

### Indexes Strategy
- Primary keys on all `id` columns
- Unique indexes on email, username, token hashes
- Foreign key indexes for join performance
- Composite indexes for common query patterns
- Timestamp indexes for date range queries

## Performance Considerations

### Query Optimization
- Use appropriate indexes
- Avoid SELECT *
- Use EXPLAIN ANALYZE for slow queries
- Implement pagination
- Cache frequently accessed data

### Data Archival
- Archive old audit logs (>1 year)
- Archive old usage logs (>6 months)
- Soft delete inactive users
- Regular cleanup of expired tokens

### Partitioning Strategy
- Partition `usage_logs` by month
- Partition `audit_logs` by quarter
- Consider partitioning large tables by date

## Security Considerations

### Sensitive Data
- Hash all passwords (bcrypt/Argon2)
- Hash all tokens
- Encrypt sensitive settings
- Never log sensitive data
- Use parameterized queries

### Data Privacy
- GDPR compliance
- Right to be forgotten
- Data export capability
- Consent tracking
- Data minimization
