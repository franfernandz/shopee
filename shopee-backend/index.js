import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cargar dataset
const datasetPath = "./dataset.json";
let perfumes = [];

try {
  const data = fs.readFileSync(datasetPath, "utf-8");
  perfumes = JSON.parse(data);
  console.log(`Cargados ${perfumes.length} perfumes`);
} catch (error) {
  console.error("Error leyendo dataset.json:", error);
}

// Endpoint: lista todos los perfumes
app.get("/perfumes", (req, res) => {
  res.json(perfumes);
});

// Endpoint: detalle por id
app.get("/perfumes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const perfume = perfumes.find((p) => p.id === id);
  if (!perfume) {
    return res.status(404).json({ error: "Perfume no encontrado" });
  }
  res.json(perfume);
});

// Endpoint: búsqueda por filtros (POST)
// En el body recibe JSON con campos a filtrar:
// ejemplo: { "genero": "femenino", "estacionalidad": "verano" }
app.post("/buscar", (req, res) => {
  const filtros = req.body;

  let resultados = perfumes;

  if (filtros.genero) {
    resultados = resultados.filter(
      (p) => p.genero.toLowerCase() === filtros.genero.toLowerCase()
    );
  }

  if (filtros.estacionalidad) {
    resultados = resultados.filter((p) =>
      p.estacionalidad.some(
        (est) => est.toLowerCase() === filtros.estacionalidad.toLowerCase()
      )
    );
  }

  if (filtros.ocasion) {
    resultados = resultados.filter((p) =>
      p.ocasion.some(
        (oc) => oc.toLowerCase() === filtros.ocasion.toLowerCase()
      )
    );
  }

  res.json(resultados);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
