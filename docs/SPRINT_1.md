# Section 1: Target Audience & Market Focus

**Primary Persona:**  
Laptop owners, tech enthusiasts, students, professionals, and gamers seeking to personalize and protect their laptops.

**User Profile:**  
Mobile-first shoppers looking for high-quality, durable, precision-cut laptop skins that reflect their personal aesthetic, hobbies, or profession while safeguarding their devices from scratches and daily wear.

**Core Pain Point:**  
Most available laptop skins suffer from poor vinyl quality, inaccurate dimensions, messy adhesive residue upon removal, or limited design choices. Customers struggle to find custom, high-fit skins tailored to their exact device model.

**Domain Scope:**  
**Vertical Market:** Tech Accessories & E-Commerce (Custom Laptop Skins & Device Decals).

**Catalog Focus:**  
* **Standard & Aesthetic Collections:** Minimalist textures (carbon fiber, matte, metallic), artistic patterns, pop culture graphics, and professional finish options.
* **Custom & Personalized Skins:** Custom image uploads, personalized text, and major-specific or profession-themed graphics (e.g., developer code snippets, graphic design artwork, minimal business styles).

## Section 2: Minimum Viable Product (MVP) Feature Scope

The Minimum Viable Product (MVP) focuses on essential user workflows required for browsing, filtering by device model and design series, customizing, purchasing, and managing laptop skins within the academic semester project scope.

| Category | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **Authentication** | User Registration & Authentication | Secure user sign-up, login, and session handling using password hashing and JWT-based authentication. Supports profile creation and device preference saving. | High (MVP) |
| **Catalog** | Product Browsing & Model Filtering | Interactive catalog displaying skin collections (Minimalist, Carbon Fiber, Pop Culture, Professional) with filtering options by laptop brand and specific device model (e.g., MacBook, Dell XPS, HP Pavilion). | High (MVP) |
| **Customization** | Skin Customization & Preview | Interactive skin selector allowing users to choose finish options (Matte, Gloss, Textured), select specific laptop models, and upload custom artwork or personal text. | High (MVP) |
| **Cart** | Cart Management | Persistent shopping cart allowing users to add skins, specify device model fit, update quantities, view subtotal costs, and remove items before checking out. | High (MVP) |
| **Checkout** | Order Processing & Checkout | Multi-step checkout process with shipping detail collection, order summary calculation, and payment processing (Stripe Sandbox / Mock API). | High (MVP) |
| **Order Tracking** | Order History & Status | User dashboard enabling buyers to view past purchases, device models ordered, and real-time order status (e.g., Pending, Printing, Shipped). | High (MVP) |
| **Admin** | Inventory & Catalog Control | Administrative interface for store managers to perform CRUD operations (Create, Read, Update, Delete) on skin designs, device model compatibility lists, and stock levels. | Medium |


## Section 3: Tech Stack Selection & Justification

### Frontend Framework: HTML, CSS, JavaScript (Bootstrap)
* **Selected Technology**: HTML5, CSS3, JavaScript (Vanilla / Bootstrap)
* **Justification**: Using core web technologies alongside Bootstrap allows for dynamic responsive UI design without the setup overhead or complex build configurations of modern JavaScript frameworks. It enables rapid layout development and direct DOM manipulation for cart actions, device model filtering, finish selection, and interactive product search, making it ideal for fast, lightweight deployment.

### Backend Infrastructure: Node.js with Express
* **Selected Technology**: Node.js / Express.js
* **Justification**: Node.js offers a highly performant, non-blocking I/O event-driven engine perfectly suited for asynchronous web requests like cart operations, device compatibility checks, and inventory updates. Express minimizes backend overhead by providing an intuitive setup for RESTful routing and API construction, simplifying backend development compared to heavier alternatives.

### Database Management System: MongoDB (NoSQL)
* **Selected Technology**: MongoDB
* **Justification**: MongoDB provides a flexible, document-oriented schema that stores product catalogs, laptop model dimensions, finish metadata, user accounts, and cart data as JSON-like documents, allowing seamless integration with JavaScript backend objects. Its dynamic structure simplifies frequent adjustments to product metadata and laptop skin texture/model variations without requiring complex migration scripts.

### Authentication & Payment Integration
* **Authentication**: JSON Web Tokens (JWT) for lightweight, stateless session management and secure user identity verification.
* **Payment Processing**: Stripe API (Test Mode) for executing mock payment gateway workflows, transaction verifications, and order validation during checkout.



## Section 4: Entity-Relationship Diagram (ERD)

### Database Schema Overview
The relational schema models the core entities required for the laptop skins e-commerce platform: user authentication, product catalog categorization, laptop device model compatibility, finish/texture options, shopping cart management, and order transaction handling.

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ CART : owns
    DEVICE_MODELS ||--o{ PRODUCTS : fits
    CATEGORIES ||--o{ PRODUCTS : categorizes
    FINISHES ||--o{ PRODUCTS : offers
    PRODUCTS ||--o{ ORDER_ITEMS : included_in
    PRODUCTS ||--o{ CART_ITEMS : contains
    ORDERS ||--|{ ORDER_ITEMS : consists_of
    CART ||--o{ CART_ITEMS : holds

    USERS {
        int id PK
        string full_name
        string email
        string password_hash
        string default_device_model
        string role
        string created_at
    }

    DEVICE_MODELS {
        int id PK
        string brand
        string model_name
        string screen_size
    }

    CATEGORIES {
        int id PK
        string name
        string description
    }

    FINISHES {
        int id PK
        string finish_type
        string texture_description
    }

    PRODUCTS {
        int id PK
        int category_id FK
        int device_model_id FK
        int finish_id FK
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
