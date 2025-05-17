# G-Scores App

A web application for managing and tracking scores.

## Demo

Check out the live demo: [G-Scores App](https://g-scores-app.vercel.app/)

## Project Structure

The project is divided into two main parts:

- `frontend/`: Contains the React frontend application
- `backend/`: Contains the Laravel backend API

## Prerequisites

Before running the project locally, make sure you have the following installed:

- Node.js (v14 or higher)
- PHP (v8.0 or higher)
- Composer
- MySQL
- XAMPP (for local development)

## Getting Started

### Backend Setup

1 Navigate to the backend directory:

```bash
cd backend
```

2 Install PHP dependencies:

```bash
composer install
```

3 Copy the environment file:

```bash
cp .env.example .env
```

4 Configure your database settings in the`.env` file:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5 Generate application key:

```bash
php artisan key:generate
```

6 Run database migrations:

```bash
php artisan migrate
```

7 Start the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1 Navigate to the frontend directory:

```bash
cd frontend
```

2 Install dependencies:

```bash
npm install
```

3 Change API_URL in file frontend\src\services\api.js:

```bash
API_URL=http://localhost:8000
```

4 Start the development server:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

## Features

- Score management
- Real-time updates
- Responsive design

## Technologies Used

- Frontend:

  - React
  - Vite
  - Tailwind CSS
  - Axios

- Backend:
  - Laravel
  - MySQL
  - PHP

## Contributing

1 Fork the repository
2 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4 Push to the branch (`git push origin feature/AmazingFeature`)
5 Open a Pull Request
