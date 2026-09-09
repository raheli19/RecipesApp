# 🍽️ RecipesApp

### Full-Stack Recipe Management & Meal Planning Application

RecipesApp is a full-stack web application designed to help users **discover, manage, save, and organize recipes** in one place.

The application combines a **React frontend**, a **Node.js/Express backend**, and a **MySQL relational database** to provide a complete end-to-end recipe management experience.

Users can browse and search recipes, view detailed recipe information, save favorites, create and manage their own recipes, manage ingredients, build shopping lists, and interact with an integrated recipe chatbot.

---

## 🚀 Key Features

### 🔐 User Authentication & Authorization

* User registration and login
* Password hashing using **bcrypt**
* User session management through React Context
* Protected application routes
* Role-based functionality
* User profile and account management

Passwords are hashed on the backend before being stored in the database.

---

### 🍳 Recipe Management

Users can:

* Browse available recipes
* Search recipes by title
* View detailed recipe information
* Create new recipes
* Edit existing recipes
* Delete recipes
* Associate recipes with ingredients
* View recipes created by a specific user

The application exposes dedicated backend endpoints for recipe retrieval, creation, updating, deletion, and ingredient management.

---

### ❤️ Favorites

Users can save recipes to their personal favorites and remove them whenever needed.

The application supports:

* Add to favorites
* Remove from favorites
* Retrieve favorites by user
* Check whether a specific recipe is already favorited
* Display favorite recipes in the user interface

Favorites are persisted in the MySQL database through a dedicated relationship between users and recipes.

---

### 🔎 Recipe Search

The home page provides client-side recipe search functionality.

Users can search recipes by title, with the displayed results being dynamically filtered as the user types.

The backend also provides ingredient-based recipe search through a SQL query joining recipes, ingredients, and the `recipe_ingredients` relationship table.

---

### 🥕 Ingredient Management

Recipes are connected to a centralized ingredient database.

The application supports:

* Retrieving available ingredients
* Selecting multiple ingredients when creating a recipe
* Associating ingredients with recipes
* Searching recipes by ingredient

The frontend uses Material UI's multi-select components to provide an interactive ingredient-selection experience.

---

### 🛒 Shopping List

RecipesApp includes a dedicated **Shopping List** feature that allows users to organize ingredients needed for their cooking plans.

This functionality is implemented as a dedicated React page within the application.

---

### 🤖 Recipe Chatbot

The application also integrates a chatbot interface called **RecipeBot**.

The chatbot is embedded directly into the React application through a dedicated component and an external Botpress webchat interface.

This provides an additional conversational interface alongside the traditional recipe-management functionality.

---

## 🏗️ Application Architecture

The project follows a classic **client-server architecture**:

```text
┌─────────────────────────────┐
│        React Frontend       │
│                             │
│  Pages • Components • UI    │
│  Context • Services         │
└──────────────┬──────────────┘
               │
               │ HTTP / API
               ▼
┌─────────────────────────────┐
│       Node.js Backend       │
│          Express            │
│                             │
│ Authentication              │
│ Recipe API                  │
│ User Management             │
│ Favorites                   │
│ Ingredients                 │
└──────────────┬──────────────┘
               │
               │ SQL Queries
               ▼
┌─────────────────────────────┐
│          MySQL              │
│                             │
│ Users                       │
│ Recipes                     │
│ Ingredients                 │
│ Favorites                   │
│ Recipe Relationships        │
│ Comments                    │
└─────────────────────────────┘
```

The repository is explicitly separated into `frontend` and `backend` applications.

---

## 🧩 Technology Stack

### Frontend

| Technology            | Purpose                    |
| --------------------- | -------------------------- |
| **React 18**          | Frontend application       |
| **React Router**      | Client-side routing        |
| **Material UI**       | UI components and styling  |
| **MobX**              | State management           |
| **Axios**             | HTTP requests              |
| **Font Awesome**      | Icons                      |
| **React Context API** | User state management      |
| **Create React App**  | Frontend build environment |

The frontend dependencies include React 18, React Router, Material UI, MobX, Axios, Font Awesome, and React Testing Library.

### Backend

| Technology                     | Purpose                       |
| ------------------------------ | ----------------------------- |
| **Node.js**                    | Backend runtime               |
| **Express.js**                 | REST API server               |
| **MySQL**                      | Relational database           |
| **mysql / mysql2**             | Database connectivity         |
| **bcrypt**                     | Password hashing              |
| **CORS**                       | Cross-origin request handling |
| **body-parser / Express JSON** | Request body parsing          |
| **Nodemon**                    | Development server            |

The backend is implemented with Express and exposes API endpoints for authentication, users, recipes, ingredients, favorites, and related operations.

### Additional Technologies

* Botpress Webchat
* Jest / React Testing Library
* SQL
* Git & GitHub

---

## 🗄️ Database Design

RecipesApp uses a relational **MySQL database**.

The database contains dedicated entities for users, recipes, ingredients, favorites, comments, and recipe-ingredient relationships.

### Main Entities

```text
Users
  │
  ├───────────────┐
  │               │
  ▼               ▼
Recipes         Favorites
  │
  ▼
Recipe_Ingredients
  │
  ▼
Ingredients
```

The database includes:

* `users`
* `recipes`
* `ingredients`
* `recipe_ingredients`
* `favorite`
* `comments`

Foreign-key relationships connect recipes to their authors, recipes to ingredients, and users to favorites and comments.

---

## 🔌 REST API

The Express backend exposes dedicated API endpoints for the main application features.

### Authentication

```text
POST /register
POST /login
GET  /checkUsername/:username
```

Passwords are hashed using bcrypt during registration and compared securely during login.

### Recipes

```text
GET    /getRecipes
GET    /getRecipesByUser/:userId
GET    /getRecipeDetails/:recipeId
GET    /searchRecipesByIngredient/:ingredient
POST   /addNewRecipe
PUT    /updateRecipeById/:recipeId
DELETE /deleteRecipeByID/:recipeId
```

### Favorites

```text
POST /addFavorite
POST /removeFavorite
GET  /getFavoritesByUser/:userId
GET  /getFavoritesByRecipe/:recipeId
```

### Ingredients

```text
GET /getIngredientsByRecipeId/:recipeId
GET /getAllIngredients
```

### Users

```text
GET    /getUsers
GET    /getUserByID/:userId
PUT    /updateUserById/:userId
DELETE /deleteUserByID/:userId
```

These endpoints are implemented in the Express server and communicate with the MySQL data-access layer.

---

## 📁 Project Structure

```text
RecipesApp/
│
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── connectionInfo.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── config/
│   │   ├── context/
│   │   ├── css/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── App.test.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── DB_Diagram.JPG
├── MySQL.JPG
├── Dbml Code.txt
├── Insert Data.sql
└── Sql Insert.sql
```

The frontend is organized into separate pages, services, context, layout, assets, and styling directories, while the backend contains the Express server and database layer.

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/raheli19/RecipesApp.git
cd RecipesApp
```

---

### 2. Set Up the Database

Create a MySQL database and execute the SQL initialization script provided in the repository.

The SQL file contains the database schema, relationships, and sample data for users, recipes, ingredients, favorites, and comments.

Configure the database connection according to your local MySQL environment.

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

Start the backend:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The backend is configured to run on port `3001` by default.

---

### 4. Install Frontend Dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The frontend runs through Create React App and is configured to start on port `3000`.

---

## 🧪 Testing

The frontend is configured with:

* Jest
* React Testing Library
* `@testing-library/jest-dom`
* `@testing-library/user-event`

Run the frontend test suite with:

```bash
npm test
```

The project also includes an `App.test.js` test file and the standard Create React App testing configuration.

---

## 💡 Technical Highlights

This project demonstrates practical experience with:

* Full-stack JavaScript development
* React component architecture
* Client-side routing
* REST API development
* Relational database design
* SQL queries and table relationships
* CRUD operations
* Authentication and password hashing
* Protected routes
* Role-based application logic
* State management
* API integration
* Form handling
* Dynamic search and filtering
* Many-to-many database relationships
* Modular frontend service architecture
* Third-party chatbot integration
* Testing with React Testing Library

---

## 🧠 Engineering Concepts Demonstrated

### Separation of Concerns

The application separates responsibilities between:

* React UI components
* React pages
* Context/state management
* Frontend service modules
* Express API routes
* Database operations

For example, recipe-related API calls are organized in a dedicated `recipeService.js` module rather than being embedded directly throughout the UI.

### Relational Data Modeling

The database uses normalized relationships between recipes and ingredients through the `recipe_ingredients` junction table.

This allows a recipe to be associated with multiple ingredients while keeping ingredient information reusable across recipes.

### Secure Password Handling

Passwords are not stored directly as plain text during registration. The backend uses bcrypt with a defined salt-round configuration before storing the resulting hash.

---

## 🔮 Potential Improvements

Future improvements could include:

* JWT-based authentication and refresh tokens
* More granular authorization middleware
* Stronger server-side input validation
* Centralized error handling
* Automated backend API tests
* Improved database connection management
* Environment-based configuration
* Docker-based development environment
* CI/CD pipeline
* Improved responsive design
* Recipe ratings and reviews
* Nutritional information
* Advanced recipe filtering
* More sophisticated AI-powered recipe recommendations

---

## 🎯 Project Goals

RecipesApp was designed to demonstrate the development of a complete web application rather than only a frontend interface.

The project brings together:

**Frontend → API → Backend → Database**

while implementing real-world functionality such as authentication, authorization, CRUD operations, relational data management, favorites, search, shopping-list functionality, and third-party chatbot integration.

---

## 👩‍💻 Project

**RecipesApp**

A full-stack recipe management platform built with React, Node.js, Express, and MySQL.

**Repository:** `raheli19/RecipesApp`
