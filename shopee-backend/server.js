require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las peticiones POST

// Inicializar el cliente de OpenAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// -------- ¡AQUÍ ESTÁ LA LÓGICA PRINCIPAL! --------
app.post('/api/recommend', async (req, res) => {
    try {
        // 1. Recibir las preferencias del usuario desde el frontend
        const { genero, ocasion, estacionalidad, aromas } = req.body;

        // 2. Obtener TODO el catálogo de productos de la base de datos
        const dbResponse = await pool.query('SELECT * FROM productos');
        const catalogoCompleto = dbResponse.rows;

        // 3. Crear el "Prompt" para la IA (¡Esta es la parte clave!)
        const prompt = `
            Eres un asistente experto en perfumería de clase mundial. Un cliente busca recomendaciones.
            
            Las preferencias del cliente son:
            - Género de fragancia: ${genero}
            - Ocasión de uso: ${ocasion}
            - Estacionalidad preferida: ${estacionalidad}
            - Notas olfativas o aromas que le gustan: ${aromas}

            A continuación te proporciono nuestro catálogo de perfumes en formato JSON:
            ${JSON.stringify(catalogoCompleto)}

            Por favor, analiza las preferencias del cliente y el catálogo. Recomienda los 3 mejores perfumes.
            Tu respuesta DEBE SER EXCLUSIVAMENTE un objeto JSON. Este objeto debe contener una única clave llamada "recomendaciones", que sea un array de 3 objetos.
            Cada objeto dentro del array debe tener exactamente dos claves: "nombre" (el nombre exacto del perfume del catálogo) y "explicacion" (una frase corta y persuasiva de por qué es una buena elección para el cliente).
            No incluyas nada más en tu respuesta.
        `;

        // 4. Enviar la petición a la API de OpenAI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}); // Usamos gemini-1.5-flash, es rápido y muy capaz
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Limpiamos el texto de la respuesta para asegurarnos de que solo contiene el JSON
        let respuestaTexto = response.text();
        respuestaTexto = respuestaTexto.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const recomendacionesParseadas = JSON.parse(respuestaTexto).recomendaciones;

        const productosRecomendados = recomendacionesParseadas.map(rec => {
            const productoCompleto = catalogoCompleto.find(p => p.nombre === rec.nombre);
            return {
                ...productoCompleto,
                explicacion: rec.explicacion
            };
        });

        res.json(productosRecomendados);

    } catch (error) {
        console.error("Error en el endpoint de recomendación:", error);
        res.status(500).json({ message: "Hubo un error al generar las recomendaciones." });
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});