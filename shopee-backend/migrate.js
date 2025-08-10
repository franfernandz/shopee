// backend/migrate.js

const fs = require('fs/promises'); // Usamos la versión de promesas de 'fs'
const path = require('path');
const pool = require('./db'); // Importamos nuestro pool de conexión

async function migrateData() {
  let client;
  try {
    // 1. Conectar a la base de datos
    client = await pool.connect();
    console.log('Conexión a la base de datos establecida.');

    // 2. Leer el archivo dataset.json
    const dataPath = path.join(__dirname, 'dataset.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const perfumes = JSON.parse(data);
    console.log('Dataset JSON leído correctamente.');

    // Opcional: Limpiar la tabla antes de insertar nuevos datos para evitar duplicados
    console.log('Limpiando la tabla "productos"...');
    await client.query('DELETE FROM productos');

    console.log('Iniciando la inserción de datos...');

    // 3. Iterar sobre cada perfume y construir la consulta de inserción
    for (const perfume of perfumes) {
      const insertQuery = `
        INSERT INTO productos(
          id, nombre, marca, genero, familia_olfativa, notas_salida, 
          notas_corazon, notas_fondo, precio, duracion, proyeccion, 
          estacionalidad, ocasion, popularidad
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      `;
      
      const values = [
        perfume.id,
        perfume.nombre,
        perfume.marca,
        perfume.genero,
        perfume.familia_olfativa,
        perfume.notas_salida,
        perfume.notas_corazon,
        perfume.notas_fondo,
        perfume.precio,
        perfume.duracion,
        perfume.proyeccion,
        perfume.estacionalidad,
        perfume.ocasion,
        perfume.popularidad
      ];
      
      // 4. Ejecutar la consulta
      await client.query(insertQuery, values);
      console.log(`- Insertado: ${perfume.nombre}`);
    }

    console.log('\n¡Migración de datos completada exitosamente!');

  } catch (err) {
    console.error('Error durante la migración:', err);
  } finally {
    // 5. Asegurarse de cerrar la conexión
    if (client) {
      client.release(); // Devuelve el cliente al pool
      console.log('Conexión con el cliente liberada.');
    }
    await pool.end(); // Cierra todas las conexiones del pool
    console.log('Pool de conexiones cerrado.');
  }
}

// Ejecutar la función
migrateData();