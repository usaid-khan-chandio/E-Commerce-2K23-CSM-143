## Section 1: Target Audience & Market Focus

**Primary Persona:**  
University of Sindh undergraduate/postgraduate students (across all academic departments), alumni, faculty, and staff.

**User Profile:**  
Mobile-first users seeking affordable, official university-branded gear (clothing, stationery, accessories) that represents both the main university identity and their specific department or major (e.g., Computer Science, Business Administration, Fine Arts).

**Core Pain Point:**  
No online platform exists to buy official University of Sindh merchandise. Students must physically visit campus vendors or local markets with limited stock, inconsistent pricing, and no options for specialized department-branded apparel or gear.

**Domain Scope:**  
**Vertical Market:** Campus Retail & E-Commerce (Apparel, Accessories, and Academic Stationery).

**Catalog Focus:**  
* **University-Wide Gear:** Main University of Sindh branded hoodies, backpacks, water bottles, and stationery.
* **Department-Specific Collections:** Custom-designed merchandise tailored for individual departments (e.g., "Computer Science" hoodies, department logos, specialized notebook covers, and major-specific accessories).


## Section 2: Minimum Viable Product (MVP) Feature Scope

The Minimum Viable Product (MVP) focuses on essential user workflows required for browsing, filtering by department, selecting, purchasing, and managing University of Sindh merchandise within the academic semester project scope.

| Category | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **Authentication** | User Registration & Authentication | Secure user sign-up, login, and session handling using password hashing and JWT-based authentication. Supports student profile creation with department selection. | High (MVP) |
| **Catalog** | Product Browsing & Department Filtering | Interactive product catalog displaying clothing, accessories, and stationery with filtering options for general university gear vs. specific departments (e.g., Computer Science, Business). | High (MVP) |
| **Cart** | Cart Management | Persistent shopping cart allowing users to add, update quantities, view subtotal costs, and remove items before checking out. | High (MVP) |
| **Checkout** | Order Processing & Checkout | Multi-step checkout process with shipping/pickup detail collection, order summary calculation, and payment processing (Stripe Sandbox / Mock API). | High (MVP) |
| **Order Tracking** | Order History & Status | User dashboard enabling buyers to view past purchases and monitor real-time order status (e.g., Pending, Processing, Shipped). | High (MVP) |
| **Admin** | Inventory & Department Control | Administrative interface for store managers to perform CRUD operations (Create, Read, Update, Delete) on products, department categories, and stock levels. | Medium |


## Section 3: Tech Stack Selection & Justification

### Frontend Framework: HTML, CSS, JavaScript (Bootstrap)
* **Selected Technology**: HTML5, CSS3, JavaScript (Vanilla / Bootstrap)
* **Justification**: Using core web technologies alongside Bootstrap allows for dynamic responsive UI design without the setup overhead or complex build configurations of modern JavaScript frameworks. It enables rapid layout development and direct DOM manipulation for cart actions, department-based filtering, and interactive product search, making it ideal for fast, lightweight deployment.

### Backend Infrastructure: Node.js with Express
* **Selected Technology**: Node.js / Express.js
* **Justification**: Node.js offers a highly performant, non-blocking I/O event-driven engine perfectly suited for asynchronous web requests like cart operations and inventory updates. Express minimalizes backend overhead by providing an intuitive setup for RESTful routing and API construction, simplifying backend development compared to heavier alternatives.

### Database Management System: MongoDB (NoSQL)
* **Selected Technology**: MongoDB
* **Justification**: MongoDB provides a flexible, document-oriented schema that stores product catalogs, department tags, user accounts, and cart data as JSON-like documents, allowing seamless integration with JavaScript backend objects. Its dynamic structure simplifies frequent adjustments to product metadata and department-specific variations without requiring complex migration scripts.

### Authentication & Payment Integration
* **Authentication**: JSON Web Tokens (JWT) for lightweight, stateless session management and secure user identity verification.
* **Payment Processing**: Stripe API (Test Mode) for executing mock payment gateway workflows, transaction verifications, and order validation during checkout.



## Section 4: Entity-Relationship Diagram (ERD)

### Database Schema Overview
The relational schema models the core entities required for the e-commerce platform: user authentication, product catalog categorization, department tagging, shopping cart management, and order transaction handling[cite: 1].

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ CART : owns
    DEPARTMENTS ||--o{ PRODUCTS : tags
    CATEGORIES ||--o{ PRODUCTS : categorizes
    PRODUCTS ||--o{ ORDER_ITEMS : included_in
    PRODUCTS ||--o{ CART_ITEMS : contains
    ORDERS ||--|{ ORDER_ITEMS : consists_of
    CART ||--o{ CART_ITEMS : holds

    USERS {
        int id PK
        string full_name
        string email
        string password_hash
        string department
        string role
        string created_at
    }

    DEPARTMENTS {
        int id PK
        string name
        string code
    }

    CATEGORIES {
        int id PK
        string name
        string description
    }

    PRODUCTS {
        int id PK
        int category_id FK
        int department_id FK
        string title
        string description
        decimal price
        int stock_quantity
        string image_url
        string created_at
    }

    CART {
        int id PK
        int user_id FK
        string updated_at
    }

    CART_ITEMS {
        int id PK
        int cart_id FK
        int product_id FK
        int quantity
    }

    ORDERS {
        int id PK
        int user_id FK
        decimal total_amount
        string order_status
        string payment_status
        string created_at
    }

    ORDER_ITEMS {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }
