# Vehicle Management API

A simple API for managing an inventory of vehicles, built with **Node.js** and **TypeScript**. The API supports basic CRUD operations, allowing dealers to add, update, and delete vehicles from the inventory.

## Technologies Used

- Backend Framework: **Express.js**
- Programming Language: **TypeScript**
- Database: **MongoDB** (local or cloud-hosted)
- Environment Variables: **dotenv**
- HTTP Client: Fetch/REST tools for testing (e.g., *Postman*)

## Features

- **POST /vehicles** - Add a new vehicle to the inventory
- **GET /vehicles** - Retrieve a list of all vehicles
- **PUT /vehicles/:id** - Update details of a specific vehicle
- **DELETE /vehicles/:id** - Remove a specific vehicle from the inventory

## Requirements

- **Node.js** (v16+ recommended)
- **MongoDB** (local or remote instance)
- **TypeScript**
- *Docker* (for containerizing MongoDB, optional)

## Installation

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/vehicle-management-api.git
cd vehicle-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Update the .env file with your MongoDB connection string and desired port:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/vehicles
```

### 4. Run the Application
Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm run build
npm start
```

## API Endpoints
**Base URL**: `http://localhost:3000/api/vehicles`

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| GET    | /             | Retrieve all vehicles              |
| POST   | /             | Add a new vehicle                  |
| GET    | /:id          | Retrieve a vehicle by ID           |
| PUT    | /:id          | Update vehicle details             |
| DELETE | /:id          | Remove a vehicle from the inventory|


## Request Examples

### 1. Create a Vehicle
**Endpoint**: `POST /api/vehicles`

**Request Body:**
```json
{
    "year": 2020,
    "make": "Toyota",
    "model": "Corolla",
    "trim": "SE"
}
```

### 2. Retrieve All Vehicles
**Endpoint**: `GET /api/vehicles`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository.
2. Clone the repository to your local directory
```bash
git clone https://github.com/yourusername/vehicle-management-api.git
```
3. Create a new branch 
```bash
git checkout -b feature-name
```
4. Make your changes and commit them 
```bash
git commit -m 'Add some feature'
```
5. Push to the branch 
```bash
git push origin feature-name
```
6. Open a pull request.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## Contact

For questions or support, feel free to reach out:

- **GitHub**: [DenisTagaev](https://github.com/DenisTagaev)
