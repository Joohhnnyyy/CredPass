# CredPass - System Design Document

**Version:** 1.0  
**Date:** February 15, 2026  
**Status:** Draft

---

## 1. System Architecture Overview

### 1.1 Architecture Style

CredPass follows a **microservices-oriented, event-driven architecture** designed for scalability, resilience, and maintainability.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CREDPASS ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐     ┌──────────────────────────────────────────────────┐ │
│  │   React.js   │────▶│                  API Gateway                     │ │
│  │   Frontend   │     │              (Express.js + NGINX)                │ │
│  └──────────────┘     └──────────────────────────────────────────────────┘ │
│                                         │                                   │
│         ┌───────────────────────────────┼───────────────────────────────┐  │
│         ▼                               ▼                               ▼  │
│  ┌──────────────┐     ┌──────────────────────┐     ┌──────────────────┐   │
│  │    Auth      │     │   Data Ingestion     │     │   Credential     │   │
│  │   Service    │     │      Service         │     │    Service       │   │
│  └──────────────┘     └──────────────────────┘     └──────────────────┘   │
│         │                       │                           │              │
│         ▼                       ▼                           ▼              │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │                         Apache Kafka                                  │ │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────────────┐ │ │
│  │  │ data.ingested   │ │ analysis.done   │ │ credential.generated    │ │ │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                    │                                       │
│         ┌──────────────────────────┴───────────────────────┐              │
│         ▼                                                  ▼              │
│  ┌──────────────────────┐                    ┌──────────────────────┐    │
│  │   AI Analysis        │                    │   Verification       │    │
│  │     Engine           │                    │      Service         │    │
│  │  ┌────────────────┐  │                    └──────────────────────┘    │
│  │  │ XAI Layer      │  │                                                │
│  │  └────────────────┘  │                                                │
│  └──────────────────────┘                                                │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                         Data Layer                                  │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐   │  │
│  │  │   MongoDB    │  │    Redis     │  │   File Storage (S3)    │   │  │
│  │  │  (Primary)   │  │   (Cache)    │  │   (Encrypted Data)     │   │  │
│  │  └──────────────┘  └──────────────┘  └────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                    AWS EC2 Deployment Zone                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Design Principles

| Principle | Implementation |
|-----------|----------------|
| **API-First** | All services expose REST APIs with OpenAPI specs |
| **Event-Driven** | Kafka for async communication between services |
| **Privacy-by-Design** | No raw data in verification responses |
| **Stateless Services** | Horizontal scaling capability |
| **Defense in Depth** | Multiple security layers |

---

## 2. Component Breakdown

### 2.1 Frontend (React.js)

**Purpose:** User-facing application for credential management

**Key Components:**
```
src/
├── components/
│   ├── Auth/           # Login, Register, OAuth
│   ├── Dashboard/      # User dashboard
│   ├── DataUpload/     # Financial data upload
│   ├── Credentials/    # Credential viewer & sharing
│   └── Common/         # Shared UI components
├── hooks/              # Custom React hooks
├── services/           # API client services
├── store/              # Redux state management
└── utils/              # Helper functions
```

**Technology Choices:**
- React 18 with TypeScript
- Redux Toolkit for state
- React Query for API caching
- Tailwind CSS for styling
- Vite for build tooling

### 2.2 API Gateway (Express.js)

**Purpose:** Central entry point for all API requests

**Responsibilities:**
- Request routing
- Authentication verification
- Rate limiting
- Request logging
- CORS handling
- Request transformation

**Implementation:**
```javascript
// Gateway structure
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── data.routes.js
│   ├── credential.routes.js
│   └── verify.routes.js
├── middleware/
│   ├── auth.middleware.js
│   ├── rateLimit.middleware.js
│   ├── logging.middleware.js
│   └── validation.middleware.js
└── config/
    └── routes.config.js
```

### 2.3 Authentication Service

**Purpose:** Handle user and institution authentication

**Features:**
- JWT token management
- Refresh token rotation
- OAuth 2.0 integration
- Session management
- Password hashing (bcrypt)

**Token Structure:**
```json
{
  "sub": "user_id",
  "type": "user|institution",
  "role": "user|admin|verifier",
  "iat": 1708000000,
  "exp": 1708003600
}
```

### 2.4 Data Ingestion Service

**Purpose:** Securely receive and process financial data

**Flow:**
1. Validate upload request
2. Sanitize and validate data format
3. Encrypt sensitive fields
4. Store encrypted data
5. Publish `data.ingested` event to Kafka

**Supported Formats:**
- CSV (bank statements)
- JSON (structured financial data)
- PDF (future: OCR extraction)

### 2.5 AI Analysis Engine

**Purpose:** Analyze financial behavior and generate trust scores

**Components:**
```
ai_engine/
├── preprocessors/
│   ├── data_cleaner.py
│   ├── feature_extractor.py
│   └── normalizer.py
├── models/
│   ├── behavioral_model.py
│   ├── risk_model.py
│   └── trust_scorer.py
├── explainability/
│   ├── shap_explainer.py
│   └── insight_generator.py
└── pipeline.py
```

**Analysis Dimensions:**
| Dimension | Weight | Indicators |
|-----------|--------|------------|
| Payment Consistency | 25% | On-time payments, regularity |
| Income Stability | 20% | Income variance, growth trend |
| Spending Behavior | 20% | Expense ratio, categories |
| Savings Pattern | 15% | Savings rate, consistency |
| Account Longevity | 10% | Account age, activity |
| Financial Diversity | 10% | Multiple accounts, investments |

**Trust Score Calculation:**
```
TrustScore = Σ(dimension_score × weight) × credibility_factor
Range: 0-1000
```

### 2.6 Explainable AI Layer

**Purpose:** Provide human-readable explanations for trust scores

**Output Structure:**
```json
{
  "score": 782,
  "confidence": 0.89,
  "insights": [
    {
      "factor": "Payment Consistency",
      "impact": "positive",
      "score_contribution": 215,
      "explanation": "98% on-time payment rate over 24 months"
    },
    {
      "factor": "Income Stability",
      "impact": "positive",
      "score_contribution": 180,
      "explanation": "Consistent income with 5% annual growth"
    }
  ],
  "recommendations": [
    "Maintain current payment patterns",
    "Consider diversifying savings accounts"
  ]
}
```

### 2.7 Trust Credential Service

**Purpose:** Generate and manage privacy-preserving credentials

**Credential Structure:**
```json
{
  "id": "cred_xxxx",
  "userId": "user_xxxx",
  "trustScore": 782,
  "tier": "excellent",
  "issuedAt": "2026-02-15T10:00:00Z",
  "expiresAt": "2027-02-15T10:00:00Z",
  "verificationToken": "vt_xxxx",
  "insights": { /* sanitized insights */ },
  "metadata": {
    "dataPoints": 1247,
    "analysisVersion": "1.0",
    "region": "us-west-2"
  }
}
```

**Privacy Features:**
- No raw financial data in credential
- Aggregated scores only
- Time-limited verification tokens
- Revocable sharing links

### 2.8 Verification Service

**Purpose:** Allow institutions to verify credentials

**Verification Response:**
```json
{
  "valid": true,
  "trustScore": 782,
  "tier": "excellent",
  "issuedAt": "2026-02-15T10:00:00Z",
  "verifiedAt": "2026-02-15T12:30:00Z",
  "insights": [
    "Strong payment history",
    "Stable income pattern"
  ]
}
```

**Caching Strategy:**
- Redis cache for frequent verifications
- 5-minute TTL for verification results
- Cache invalidation on credential update

---

## 3. Data Flow

### 3.1 Credential Generation Flow

```
┌─────────┐    ┌─────────────┐    ┌───────────────┐    ┌─────────────┐
│  User   │───▶│ Data Upload │───▶│ Data Ingestion│───▶│   Kafka     │
└─────────┘    └─────────────┘    │   Service     │    │ (ingested)  │
                                  └───────────────┘    └──────┬──────┘
                                                              │
┌─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────┐    ┌───────────────┐    ┌─────────────────┐
│  AI Analysis    │───▶│ Trust Score   │───▶│   XAI Layer     │
│    Engine       │    │  Calculator   │    │   (Insights)    │
└─────────────────┘    └───────────────┘    └────────┬────────┘
                                                     │
                                                     ▼
                       ┌───────────────┐    ┌─────────────────┐
                       │   MongoDB     │◀───│   Credential    │
                       │  (Storage)    │    │    Service      │
                       └───────────────┘    └─────────────────┘
```

### 3.2 Verification Flow

```
┌─────────────┐    ┌─────────────┐    ┌───────────────┐
│ Institution │───▶│ API Gateway │───▶│ Verification  │
└─────────────┘    └─────────────┘    │   Service     │
                                      └───────┬───────┘
                                              │
                         ┌────────────────────┼────────────────────┐
                         │ Check Cache        │ Cache Miss         │
                         ▼                    ▼                    ▼
                   ┌───────────┐       ┌───────────┐       ┌───────────┐
                   │   Redis   │       │  MongoDB  │       │  Response │
                   │  (Cache)  │       │  (Query)  │──────▶│  (JSON)   │
                   └───────────┘       └───────────┘       └───────────┘
```

---

## 4. Database Design

### 4.1 MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,          // indexed, unique
  passwordHash: String,
  profile: {
    firstName: String,
    lastName: String,
    country: String,
    dateOfBirth: Date
  },
  consent: {
    dataProcessing: Boolean,
    marketing: Boolean,
    consentedAt: Date,
    consentVersion: String
  },
  status: String,         // active, suspended, deleted
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ email: 1 }              // unique
{ status: 1, createdAt: -1 }
```

#### Financial Data Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // indexed
  uploadId: String,       // indexed
  dataType: String,       // bank_statement, transaction_history
  encryptedData: Binary,  // AES-256 encrypted
  metadata: {
    sourceCountry: String,
    currency: String,
    dateRange: {
      start: Date,
      end: Date
    },
    recordCount: Number
  },
  status: String,         // pending, processed, failed
  processingResult: {
    success: Boolean,
    errorMessage: String
  },
  createdAt: Date
}

// Indexes
{ userId: 1, createdAt: -1 }
{ uploadId: 1 }
{ status: 1 }
```

#### Credentials Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // indexed
  credentialId: String,   // indexed, unique (cred_xxxx)
  trustScore: Number,
  tier: String,           // poor, fair, good, excellent
  analysisResult: {
    dimensions: {
      paymentConsistency: Number,
      incomeStability: Number,
      spendingBehavior: Number,
      savingsPattern: Number,
      accountLongevity: Number,
      financialDiversity: Number
    },
    confidence: Number,
    insights: Array
  },
  verificationToken: String,  // indexed
  sharingLinks: [{
    token: String,
    expiresAt: Date,
    usageCount: Number,
    maxUsage: Number
  }],
  status: String,         // active, expired, revoked
  issuedAt: Date,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ userId: 1 }
{ credentialId: 1 }       // unique
{ verificationToken: 1 }
{ status: 1, expiresAt: 1 }
```

#### Institutions Collection
```javascript
{
  _id: ObjectId,
  institutionId: String,  // indexed, unique
  name: String,
  type: String,           // bank, landlord, lender
  email: String,
  apiKey: String,         // hashed
  apiKeyPrefix: String,   // first 8 chars for identification
  permissions: [String],
  rateLimit: {
    tier: String,
    requestsPerHour: Number
  },
  verificationHistory: [{
    credentialId: String,
    verifiedAt: Date,
    result: String
  }],
  status: String,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
{ institutionId: 1 }      // unique
{ apiKeyPrefix: 1 }
{ status: 1 }
```

#### Audit Logs Collection
```javascript
{
  _id: ObjectId,
  timestamp: Date,
  eventType: String,      // login, data_upload, verification, etc.
  actorType: String,      // user, institution, system
  actorId: String,
  resourceType: String,
  resourceId: String,
  action: String,
  details: Object,
  ipAddress: String,
  userAgent: String,
  correlationId: String   // for request tracing
}

// Indexes (TTL for compliance)
{ timestamp: 1 }          // TTL: 2 years
{ actorId: 1, timestamp: -1 }
{ resourceId: 1, timestamp: -1 }
{ correlationId: 1 }
```

### 4.2 Redis Data Structures

```
# Session Cache
session:{userId}         → JSON (user session data)
TTL: 24 hours

# Verification Cache  
verify:{token}           → JSON (verification result)
TTL: 5 minutes

# Rate Limiting
ratelimit:{ip}:{endpoint} → Counter
TTL: 1 hour

# Trust Score Cache
score:{userId}           → Number (latest trust score)
TTL: 1 hour

# Institution API Keys
apikey:{prefix}          → JSON (institution details)
TTL: 1 hour
```

---

## 5. API Design

### 5.1 API Architecture

```
/api/v1/
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /refresh
│   ├── POST /logout
│   └── POST /forgot-password
├── /users
│   ├── GET /profile
│   ├── PUT /profile
│   └── DELETE /account
├── /consent
│   ├── GET /
│   ├── POST /
│   └── DELETE /
├── /data
│   ├── POST /upload
│   ├── GET /uploads
│   └── GET /uploads/:id/status
├── /credentials
│   ├── GET /
│   ├── GET /:id
│   ├── POST /:id/share
│   └── DELETE /:id/share/:linkId
├── /verify
│   └── GET /:token
└── /institutions
    ├── POST /register
    ├── GET /dashboard
    ├── POST /api-keys
    └── GET /verifications
```

### 5.2 Request/Response Examples

**User Registration:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "firstName": "John",
  "lastName": "Doe",
  "country": "US"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "userId": "user_abc123",
    "email": "user@example.com"
  },
  "message": "Registration successful. Please verify your email."
}
```

**Credential Verification:**
```http
GET /api/v1/verify/vt_xyz789
Authorization: Bearer inst_api_key_xxx

Response: 200 OK
{
  "success": true,
  "data": {
    "valid": true,
    "trustScore": 782,
    "tier": "excellent",
    "issuedAt": "2026-02-15T10:00:00Z",
    "insights": [
      "Strong payment history",
      "Stable income pattern",
      "Healthy savings ratio"
    ]
  }
}
```

### 5.3 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "requestId": "req_abc123"
}
```

---

## 6. Event-Driven Architecture (Kafka)

### 6.1 Topic Design

| Topic | Partitions | Retention | Purpose |
|-------|------------|-----------|---------|
| `data.ingested` | 6 | 7 days | New financial data uploaded |
| `analysis.requested` | 6 | 7 days | Analysis job queued |
| `analysis.completed` | 6 | 7 days | Analysis finished |
| `credential.generated` | 3 | 30 days | New credential created |
| `verification.requested` | 6 | 3 days | Verification event |
| `audit.events` | 3 | 90 days | Audit trail |

### 6.2 Event Schemas

**Data Ingested Event:**
```json
{
  "eventId": "evt_xxx",
  "eventType": "data.ingested",
  "timestamp": "2026-02-15T10:00:00Z",
  "payload": {
    "userId": "user_xxx",
    "uploadId": "upload_xxx",
    "dataType": "bank_statement",
    "recordCount": 1247,
    "sourceCountry": "US"
  },
  "metadata": {
    "correlationId": "corr_xxx",
    "version": "1.0"
  }
}
```

### 6.3 Consumer Groups

```
┌─────────────────────────────────────────────────────────────┐
│                    Kafka Consumer Groups                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  data.ingested ──────▶ [analysis-workers]                   │
│                         ├── worker-1                        │
│                         ├── worker-2                        │
│                         └── worker-3                        │
│                                                             │
│  analysis.completed ──▶ [credential-generators]             │
│                         ├── generator-1                     │
│                         └── generator-2                     │
│                                                             │
│  *.events ──────────▶ [audit-logger]                        │
│                        └── logger-1                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Caching Design (Redis)

### 7.1 Caching Strategy

| Data Type | Strategy | TTL | Invalidation |
|-----------|----------|-----|--------------|
| User Sessions | Write-through | 24h | On logout |
| Trust Scores | Cache-aside | 1h | On new analysis |
| Verification Results | Write-through | 5m | Time-based |
| Rate Limits | Write-through | 1h | Rolling window |
| API Keys | Cache-aside | 1h | On rotation |

### 7.2 Cache Implementation

```javascript
// Verification cache example
async function verifyCrendential(token) {
  const cacheKey = `verify:${token}`;
  
  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - fetch from DB
  const result = await Credential.findOne({ verificationToken: token });
  
  // Store in cache
  await redis.setex(cacheKey, 300, JSON.stringify(result));
  
  return result;
}
```

---

## 8. Scalability Design

### 8.1 Horizontal Scaling

```
┌─────────────────────────────────────────────────────────────┐
│                    Load Balancer (ALB)                       │
└─────────────────────────────┬───────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  API Server   │    │  API Server   │    │  API Server   │
│   (EC2 #1)    │    │   (EC2 #2)    │    │   (EC2 #3)    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                    ┌───────────────────┐
                    │  MongoDB Replica  │
                    │     Set (3)       │
                    └───────────────────┘
```

### 8.2 Scaling Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU Usage | > 70% | Scale out API servers |
| Memory Usage | > 80% | Scale out API servers |
| Kafka Lag | > 10000 | Scale out workers |
| Request Latency | > 500ms p99 | Investigate & scale |
| Error Rate | > 1% | Alert & investigate |

### 8.3 Database Scaling Strategy

**MongoDB:**
- Replica set for high availability (1 primary, 2 secondaries)
- Read preference: `primaryPreferred` for consistency
- Future: Sharding on `userId` when data exceeds 100GB

**Redis:**
- Cluster mode for scaling beyond single node
- Sentinel for automatic failover

---

## 9. Security Design

### 9.1 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Network Security                                  │
│  ├── AWS VPC with private subnets                          │
│  ├── Security groups (least privilege)                     │
│  ├── WAF for API protection                                │
│  └── DDoS protection (AWS Shield)                          │
│                                                             │
│  Layer 2: Transport Security                                │
│  ├── TLS 1.3 for all connections                           │
│  ├── Certificate management (ACM)                          │
│  └── HSTS enforcement                                       │
│                                                             │
│  Layer 3: Application Security                              │
│  ├── JWT authentication                                     │
│  ├── RBAC authorization                                    │
│  ├── Input validation                                       │
│  ├── Rate limiting                                          │
│  └── CSRF/XSS protection                                   │
│                                                             │
│  Layer 4: Data Security                                     │
│  ├── AES-256 encryption at rest                            │
│  ├── Field-level encryption for PII                        │
│  ├── Key management (AWS KMS)                              │
│  └── Data masking in logs                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Authentication Flow

```
┌─────────┐     ┌─────────────┐     ┌────────────┐
│  User   │────▶│   Login     │────▶│  Validate  │
└─────────┘     │   Request   │     │ Credentials│
                └─────────────┘     └──────┬─────┘
                                           │
                      ┌────────────────────┴────────────────────┐
                      ▼                                         ▼
               ┌─────────────┐                          ┌─────────────┐
               │  Generate   │                          │  Generate   │
               │ Access Token│                          │Refresh Token│
               │ (15 min)    │                          │ (7 days)    │
               └──────┬──────┘                          └──────┬──────┘
                      │                                        │
                      └────────────────────┬───────────────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │  Response   │
                                    │  to Client  │
                                    └─────────────┘
```

### 9.3 Data Encryption

```javascript
// Field-level encryption for sensitive data
const encryptionSchema = {
  financialData: {
    encrypt: {
      algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
      keyId: process.env.MONGODB_KEY_ID
    }
  },
  socialSecurity: {
    encrypt: {
      algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
      keyId: process.env.MONGODB_KEY_ID
    }
  }
};
```

---

## 10. Deployment Design

### 10.1 AWS Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS Region (us-west-2)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      VPC                             │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │            Public Subnet                     │    │   │
│  │  │  ┌─────────────┐    ┌─────────────┐         │    │   │
│  │  │  │     ALB     │    │   NAT GW    │         │    │   │
│  │  │  └─────────────┘    └─────────────┘         │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │                                                      │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │            Private Subnet                    │    │   │
│  │  │  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐   │    │   │
│  │  │  │ EC2-1 │ │ EC2-2 │ │ EC2-3 │ │ EC2-4 │   │    │   │
│  │  │  │ (API) │ │ (API) │ │(Worker│ │(Worker│   │    │   │
│  │  │  └───────┘ └───────┘ └───────┘ └───────┘   │    │   │
│  │  │                                             │    │   │
│  │  │  ┌─────────────┐  ┌─────────────┐          │    │   │
│  │  │  │   MongoDB   │  │    Redis    │          │    │   │
│  │  │  │   (EC2/    │  │  (ElastiCache)│          │    │   │
│  │  │  │  Atlas)    │  │              │          │    │   │
│  │  │  └─────────────┘  └─────────────┘          │    │   │
│  │  │                                             │    │   │
│  │  │  ┌─────────────────────────────────┐       │    │   │
│  │  │  │     Amazon MSK (Kafka)          │       │    │   │
│  │  │  └─────────────────────────────────┘       │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  External Services:                                         │
│  ├── S3 (file storage)                                     │
│  ├── CloudWatch (monitoring)                               │
│  ├── KMS (key management)                                  │
│  └── SES (email)                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 CI/CD Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Code     │───▶│   Build &   │───▶│    Test     │
│   Commit    │    │   Lint      │    │   Suite     │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                              │
                    ┌─────────────────────────┘
                    ▼
             ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
             │   Security  │───▶│   Build     │───▶│   Deploy    │
             │    Scan     │    │   Docker    │    │   Staging   │
             └─────────────┘    └─────────────┘    └──────┬──────┘
                                                          │
                    ┌─────────────────────────────────────┘
                    ▼
             ┌─────────────┐    ┌─────────────┐
             │  E2E Tests  │───▶│   Deploy    │
             │   Staging   │    │   Prod      │
             └─────────────┘    └─────────────┘
```

### 10.3 Environment Configuration

| Environment | Purpose | Instances | Database |
|-------------|---------|-----------|----------|
| Development | Local development | 1 | Local MongoDB |
| Staging | Pre-production testing | 2 | Shared staging DB |
| Production | Live system | 3+ (auto-scaled) | Replica set |

---

## 11. Sequence Diagrams

### 11.1 User Registration & Credential Generation

```
User          Frontend       Gateway        Auth         Data         AI          Credential
  │              │              │            │            │            │              │
  │──Register───▶│              │            │            │            │              │
  │              │───Request───▶│            │            │            │              │
  │              │              │──Validate─▶│            │            │              │
  │              │              │            │──Create──▶│            │              │
  │              │              │◀───JWT─────│            │            │              │
  │◀────Token────│◀─────────────│            │            │            │              │
  │              │              │            │            │            │              │
  │──Upload Data▶│              │            │            │            │              │
  │              │───Request───▶│            │            │            │              │
  │              │              │────────────────Ingest──▶│            │              │
  │              │              │            │            │──Kafka────▶│              │
  │              │              │            │            │            │──Analyze───▶│
  │              │              │            │            │            │              │──Generate─▶
  │              │              │            │            │            │◀─Score──────│
  │◀──Credential─│◀─────────────│◀───────────│◀───────────│◀───────────│◀─────────────│
  │              │              │            │            │            │              │
```

### 11.2 Institution Verification

```
Institution    Gateway      Verify       Redis       MongoDB
     │            │            │            │            │
     │──Verify───▶│            │            │            │
     │            │──Request──▶│            │            │
     │            │            │──Check────▶│            │
     │            │            │◀──Miss─────│            │
     │            │            │────────────────Query───▶│
     │            │            │◀───────────────Result───│
     │            │            │──Cache────▶│            │
     │            │◀──Result───│            │            │
     │◀──Response─│            │            │            │
     │            │            │            │            │
```

---

## 12. Design Decisions & Tradeoffs

### 12.1 Key Decisions

| Decision | Rationale | Tradeoff |
|----------|-----------|----------|
| **MongoDB over PostgreSQL** | Schema flexibility for evolving data models, native JSON support | Less ACID compliance, eventual consistency |
| **Kafka over RabbitMQ** | Higher throughput, better for event sourcing, built-in partitioning | More complex setup, higher resource usage |
| **JWT over Sessions** | Stateless authentication, easier horizontal scaling | Token revocation complexity, larger payload |
| **Redis for Caching** | Low latency, rich data structures, pub/sub support | Memory constraints, cost at scale |
| **Single Region MVP** | Faster development, lower cost | Higher latency for global users |

### 12.2 MVP vs Production Considerations

| Aspect | MVP Approach | Production Approach |
|--------|--------------|---------------------|
| **Database** | Single MongoDB instance | Replica set with sharding |
| **Kafka** | Single broker | Multi-broker cluster |
| **AI Models** | Rule-based + simple ML | Deep learning ensemble |
| **Auth** | JWT only | JWT + OAuth + MFA |
| **Monitoring** | CloudWatch basic | Full observability stack |
| **DR** | Daily backups | Multi-region active-passive |

### 12.3 Future Architecture Optimizations

1. **GraphQL Gateway** - Replace REST for flexible queries
2. **Serverless Workers** - Lambda for variable workloads
3. **Global CDN** - CloudFront for static assets
4. **Multi-Region** - Active-active deployment
5. **ML Platform** - SageMaker for model training & serving

---

## 13. Monitoring & Observability

### 13.1 Metrics

- **Application:** Request rate, latency (p50, p95, p99), error rate
- **Infrastructure:** CPU, memory, disk I/O, network
- **Business:** Registrations, credentials generated, verifications
- **Kafka:** Consumer lag, message throughput, partition health

### 13.2 Logging

```json
{
  "timestamp": "2026-02-15T10:00:00.000Z",
  "level": "INFO",
  "service": "api-gateway",
  "correlationId": "corr_xxx",
  "message": "Request processed",
  "metadata": {
    "method": "POST",
    "path": "/api/v1/verify",
    "statusCode": 200,
    "duration": 45
  }
}
```

### 13.3 Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| High Error Rate | > 5% 5xx responses | Critical |
| High Latency | p99 > 2s | Warning |
| Kafka Lag | > 50000 messages | Warning |
| Database Connection | < 5 available | Critical |
| Disk Usage | > 80% | Warning |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 15, 2026 | CredPass Team | Initial design |
