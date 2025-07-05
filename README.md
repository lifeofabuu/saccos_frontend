# SACCOS Management System

This is a web-based SACCOS (Savings and Credit Cooperative Society) management system built with Django and PostgreSQL.

## Features

- Member registration and management
- Savings and loan tracking
- Contribution and repayment tracking
- Admin dashboard
- User authentication

## Technologies Used

- Python
- Django
- PostgreSQL
- HTML/CSS/Bootstrap
- JavaScript

## Prerequisites

Before running the project, make sure you have:

- Python 3.9+
- PostgreSQL installed and running
- Git (optional)
- Virtualenv (recommended)

## Project Setup Instructions

### 1. Clone or Download the Project

```bash
git clone <repo-url>
cd abukakar_saccoss
```

Or extract the uploaded ZIP file manually and open the project directory in your terminal.

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate      # On Linux/macOS
venv\Scripts\activate         # On Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PWD=your_database_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_django_secret_key
DEBUG=True
```

> Replace the values with your actual PostgreSQL credentials and Django secret key.

### 5. Set Up PostgreSQL Database

- Create a new PostgreSQL database with the name you specified in `.env`.

```sql
CREATE DATABASE your_database_name;
```

### 6. Run Migrations

```bash
python manage.py migrate
```

### 7. Create Superuser

```bash
python manage.py createsuperuser
```

### 8. Start the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to access the application.

## Optional

- You can use `python manage.py loaddata` if you have initial fixtures.
- To collect static files: `python manage.py collectstatic`

## Contact

For support or contributions, please reach out to: [Your Email or GitHub Link]
