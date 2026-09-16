import api from "../api"; // Adjust import path to where your file is located

// ✅ CORRECT: calls https://blood-donor-matching-system.vercel.app/api/donors
api.get("/donors") 
api.post("/donors", formData)

// ❌ WRONG: avoid adding /api twice
api.get("/api/donors") // This would call /api/api/donors