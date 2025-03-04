require("dotenv").config(); // Charge les variables d'environnement
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
const MONGO_URI = "mongodb+srv://ismailbenali:1234@cluster0.ndbim.mongodb.net/moteursDB";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connecté"))
    .catch(err => {
        console.error("❌ Erreur MongoDB :", err);
        process.exit(1);
    });

// Définition du modèle MongoDB
const MoteurSchema = new mongoose.Schema({
    nom: String,
    reference: String,
    fabricant: String,
    date_fabrication: Date,
    etat: String,
    description: String,
    image_url: String,
    model_3d_url: String,
    etapes_demontage: Array
});
const Moteur = mongoose.model("Moteur", MoteurSchema);

// Exporter le modèle pour l'utiliser dans seed.js
module.exports = Moteur;

// Routes API
app.get("/moteurs", async (req, res) => {
    const moteurs = await Moteur.find();
    res.json(moteurs);
});

app.get("/moteurs/:id", async (req, res) => {
    const moteur = await Moteur.findById(req.params.id);
    res.json(moteur);
});

app.post("/moteurs", async (req, res) => {
    const newMoteur = new Moteur(req.body);
    await newMoteur.save();
    res.json({ message: "✅ Moteur ajouté !" });
});


app.listen(3000, () => console.log("🚀 Serveur démarré sur http://localhost:3000"));
