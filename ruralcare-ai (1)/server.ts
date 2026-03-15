import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Hospital Database
  const hospitals = [
    { id: 1, name: "City Care Hospital", location: "Downtown", specializations: ["Cardiology", "Neurology", "General"], availableBeds: 12, icuBeds: 4, doctorsAvailable: 8, emergencyServices: true, lat: 34.0522, lng: -118.2437, distance: 2.2 },
    { id: 2, name: "Apollo Medical Center", location: "Westside", specializations: ["Orthopedics", "Pediatrics", "General"], availableBeds: 5, icuBeds: 1, doctorsAvailable: 4, emergencyServices: true, lat: 34.0622, lng: -118.2537, distance: 3.5 },
    { id: 3, name: "Government Hospital", location: "Eastside", specializations: ["General", "Trauma"], availableBeds: 45, icuBeds: 10, doctorsAvailable: 15, emergencyServices: true, lat: 34.0422, lng: -118.2337, distance: 5.1 },
    { id: 4, name: "Rural Health Clinic", location: "Outskirts", specializations: ["General"], availableBeds: 2, icuBeds: 0, doctorsAvailable: 1, emergencyServices: false, lat: 34.1522, lng: -118.1437, distance: 12.4 },
  ];

  // API Routes
  app.get("/api/hospitals", (req, res) => {
    console.log("GET /api/hospitals hit");
    res.json(hospitals);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
