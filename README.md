# Geo-Data App

A full-stack web application for managing and visualizing geospatial data, built with **Next.js** and **Express**.
#Demo
<img width="1435" alt="Screenshot 2025-01-12 at 18 42 23" src="https://github.com/user-attachments/assets/f6dba2f8-de79-4ee0-b789-881bf4ac3683" />
<img width="1440" alt="Screenshot 2025-01-12 at 15 56 55" src="https://github.com/user-attachments/assets/f3c2f457-3b5e-4828-b142-3af66bffe304" />
<img width="1435" alt="Screenshot 2025-01-12 at 18 37 40" src="https://github.com/user-attachments/assets/0f827a37-3db5-4801-9e54-fdabe03ea427" />

## Features

- **User authentication and authorization**
- **GeoJSON/KML/TIFF file upload and visualization**
- **Custom shape drawing and editing**
- **Distance measurement tools**
- **Point marker management**
- **Interactive hover cards with feature information**

## Prerequisites

Before setting up the project, make sure you have the following software installed:

- **Node.js** (v16 or higher)
- **MongoDB**
- **Mapbox API key** for mapping functionality

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd geo-data-app
   ```

2. **Install dependencies**:

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

   - Backend:
     ```bash
     cd ../backend
     npm install
     ```

3. **Start the development servers**:

   - Backend:
     ```bash
     cd backend
     npm run dev
     ```

   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

4. The application will be available at: [http://localhost:3000](http://localhost:3000)

## API Routes

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: User login

### Files

- **POST /api/files/upload**: Upload geo files
- **GET /api/files**: Get user's files

### Shapes

- **POST /api/shapes**: Save custom shape
- **GET /api/shapes**: Get user's shapes
- **PUT /api/shapes/:id**: Update shape
- **DELETE /api/shapes/:id**: Delete shape

## Contributing

1. **Fork the repository**
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Additional Setup Instructions

### MongoDB and Mapbox Configuration

1. **Create a `.env` file in the server directory**:
   ```bash
   MONGODB_URI=mongodb://127.0.0.1:27017/userManagement
   MAPBOX_TOKEN=your-mapbox-token
   ```

2. **Start the MongoDB server**:
   ```bash
   mongod
   ```

3. **Start the development servers**:
   - In the **server** directory:
     ```bash
     npm start
     ```
   - In the **client** directory:
     ```bash
     npm run dev
     ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Usage

### Register and Login:
- **Create a new account** or **log in** with an existing account.

### Upload Files:
- Upload **GeoJSON**, **KML**, or **TIFF** files to visualize them on the map.

### Draw and Edit Shapes:
- Use the drawing tools to create and edit custom shapes on the map.

### Measure Distances:
- Use the distance measurement tools to calculate distances between points.

### Manage Markers:
- **Add markers**: Double-click on the map to add markers.
- **Update markers**: Drag the markers to update their position.
- **Delete markers**: Right-click on a marker to delete it.

### Interactive Hover Cards:
- Hover over features on the map to view additional information.

---

## API Endpoints

### Authentication
- **POST /register**: Register a new user.
- **POST /login**: Log in an existing user.

### File Upload
- **POST /upload/file**: Upload a **GeoJSON**, **KML**, or **TIFF** file.

### Markers
- **POST /markers**: Add a new marker.
- **DELETE /markers/:id**: Delete a marker by ID.
- **GET /markers**: Get all markers for the authenticated user.

---

## CRUD Operations for Markers

### Create Marker
To create a new marker, send a **POST** request to `/markers` with the marker data and user email in the headers.

#### Request:
```bash
POST /markers
Content-Type: application/json
x-user-email: user@example.com

{
  "lng": 109.86574245536644,
  "lat": 37.837862417211426,
  "description": "New marker"
}
```

#### Response:
```json
{
  "message": "Marker added successfully",
  "marker": {
    "_id": "60c72b2f9b1d8c001c8e4d5b",
    "lng": 109.86574245536644,
    "lat": 37.837862417211426,
    "description": "New marker",
    "createdAt": "2021-06-14T12:34:56.789Z"
  }
}
```

### Read Markers
To get all markers for the authenticated user, send a **GET** request to `/markers` with the user email in the headers.

#### Request:
```bash
GET /markers
x-user-email: rishigupta280594@gmail.com
```

#### Response:
```json
[
  {
    "_id": "60c72b2f9b1d8c001c8e4d5b",
    "lng": 109.86574245536644,
    "lat": 37.837862417211426,
    "description": "New marker",
    "createdAt": "2021-06-14T12:34:56.789Z"
  },
  ...
]
```

### Update Marker
To update an existing marker, send a **POST** request to `/markers` with the updated marker data and user email in the headers.

#### Request:
```bash
POST /markers
Content-Type: application/json
x-user-email: user@example.com

{
  "lng": 109.86574245536644,
  "lat": 37.837862417211426,
  "description": "Updated marker"
}
```

#### Response:
```json
{
  "message": "Marker updated successfully",
  "marker": {
    "_id": "60c72b2f9b1d8c001c8e4d5b",
    "lng": 109.86574245536644,
    "lat": 37.837862417211426,
    "description": "Updated marker",
    "createdAt": "2021-06-14T12:34:56.789Z"
  }
}
```

### Delete Marker
To delete a marker by ID, send a **DELETE** request to `/markers/:id` with the user email in the headers.

#### Request:
```bash
DELETE /markers/60c72b2f9b1d8c001c8e4d5b
x-user-email: rishigupta280594@gmail.com
```

#### Response:
```json
{
  "message": "Marker deleted successfully"
}
```

---

## Project Structure

### Server Directory

```
server/
├── controllers/
│   ├── authController.js
│   ├── fileController.js
│   ├── markerController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── FormData.js
│   ├── UploadedFile.js
│   ├── User.js
│   └── userActionModel.js
├── routes/
│   ├── auth.js
│   ├── fileRoutes.js
│   └── marker.js
├── uploads/
│   └── [uploaded files]
├── utils/
│   └── fileUpload.js
├── index.js
├── package.json
└── .env
```

### Client Directory

```
client/
├── public/
├── src/
│   ├── api.js
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── Map/
│   │       ├── DistanceMeasurement.jsx
│   │       ├── DrawControls.jsx
│   │       ├── FileUpload.jsx
│   │       ├── PointMarkers.jsx
│   │       └── MapContainer.jsx
│   ├── main.jsx
│   └── vite.config.js
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

### Explanation:
1. **Features**: Lists the main features of the application.
2. **Prerequisites**: Lists the required software and tools.
3. **Environment Variables**: Provides instructions for setting up environment variables.
4. **Installation**: Provides step-by-step instructions to set up the project.
5. **Usage**: Describes how to use the main features of the application.
6. **API Endpoints**: Lists the available API endpoints and their purposes.
7. **CRUD Operations for Markers**: Provides detailed instructions and examples for creating, reading, updating, and deleting markers.
8. **Project Structure**: Provides an overview of the project's directory structure for both the server and client.
9. **Contributing**: Encourages contributions and provides guidelines.
10. **License**: Specifies the project's license.

By following these instructions, users should be able to set up and use the Geo-Data App effectively, including performing CRUD operations for markers.
### Explanation:
1. **Features**: Lists the main features of the application.
2. **Prerequisites**: Lists the required software and tools.
3. **Environment Variables**: Provides instructions for setting up environment variables.
4. **Installation**: Provides step-by-step instructions to set up the project.
5. **Usage**: Describes how to use the main features of the application.
6. **API Endpoints**: Lists the available API endpoints and their purposes.
7. **CRUD Operations for Markers**: Provides detailed instructions and examples for creating, reading, updating, and deleting markers.
8. **Project Structure**: Provides an overview of the project's directory structure for both the server and client.
9. **Contributing**: Encourages contributions and provides guidelines.
10. **License**: Specifies the project's license.

By following these instructions, users should be able to set up and use the Geo-Data App effectively, including performing CRUD operations for markers.
