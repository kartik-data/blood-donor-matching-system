# Blood Request and Donor Matching System (MERN)

A full-stack web app connecting blood donors with people who need blood. Built with
MongoDB, Express, React, and Node.js.

## Features
- Donor registration with validation
- Blood request submission
- Automatic **compatibility + ranking algorithm** that finds and scores the best matching donors
  (based on blood group compatibility, city match, availability, and donation eligibility)
- Admin dashboard to manage donors and update request status

## Project Structure
```
blood-donor-app/
├── backend/          Express + MongoDB API
│   ├── config/       DB connection
│   ├── models/       Donor.js, BloodRequest.js
│   ├── controllers/  CRUD + matching logic
│   ├── routes/       API endpoints
│   ├── utils/        matching.js (compatibility + scoring algorithm)
│   └── server.js
└── frontend/         React (Vite)
    └── src/
        ├── pages/     Home, RegisterDonor, RequestBlood, AdminDashboard
        ├── components/ Navbar
        └── api.js
```

## How to Run

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (or a MongoDB Atlas connection string)

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI if using Atlas
npm run dev                # starts on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

The frontend is configured to proxy `/api` requests to `http://localhost:5000`, so
just open http://localhost:5173 in your browser once both servers are running.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/donors | Register a donor |
| GET | /api/donors | List donors (filters: ?city=&bloodGroup=) |
| PUT | /api/donors/:id | Update donor (e.g. availability) |
| DELETE | /api/donors/:id | Remove donor |
| POST | /api/requests | Submit a blood request |
| GET | /api/requests | List requests |
| PUT | /api/requests/:id | Update request status |
| GET | /api/requests/:id/matches | Get ranked list of compatible donors |

## Matching Algorithm (core logic)
1. Filters all donors by **blood group compatibility** (using a standard donor compatibility chart).
2. Scores each compatible donor: +50 if available now, +30 if same city, +20 if eligible
   (90+ days since last donation, or never donated).
3. Returns donors sorted by score, highest first.

## Possible Future Enhancements (good for your "future scope" journal section)
- Real-time notifications (SMS/email) to matched donors
- Geolocation-based distance instead of city string match
- Authentication (JWT) for admin routes
- A simple ML model to predict donor response likelihood
