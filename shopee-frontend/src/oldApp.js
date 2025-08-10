// src/App.jsx

import { useState } from 'react';
import './App.css'; // Importaremos un CSS básico más abajo

// Definimos las preguntas que haremos al usuario
const questions = [
  {
    key: 'genero',
    text: '¿Para qué género buscas el perfume?',
    options: ['Femenino', 'Masculino', 'Unisex'],
  },
  {
    key: 'ocasion',
    text: '¿Para qué tipo de ocasión lo necesitas?',
    options: ['Día', 'Noche', 'Fiestas', 'Oficina'],
  },
  {
    key: 'estacionalidad',
    text: '¿En qué estación del año lo usarías más?',
    options: ['Verano', 'Invierno', 'Primavera', 'Otoño'],
  },
  {
    key: 'aromas',
    text: 'Finalmente, ¿qué tipo de aroma te atrae más?',
    options: ['Cítricos y frescos', 'Dulces y avainillados', 'Amaderados y elegantes', 'Florales y románticos'],
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Esta función se llama cuando el usuario hace clic en una opción
  const handleAnswer = (key, answer) => {
    // Guardamos la respuesta
    const newAnswers = { ...userAnswers, [key]: answer.toLowerCase() };
    setUserAnswers(newAnswers);

    // Pasamos a la siguiente pregunta
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Si era la última pregunta, llamamos a la API
      fetchRecommendations(newAnswers);
    }
  };

  // Esta función llama a nuestro backend
   const fetchRecommendations = async (answers) => {
    setIsLoading(true);
    setError('');
    setRecommendations([]);

    try {
      // --- ESTA ES LA LÍNEA CORRECTA PARA CREATE REACT APP ---
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      // ----------------------------------------------------

      const response = await fetch(`${apiUrl}/api/recommend`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error('Algo salió mal con la petición.');
      }
      
      const data = await response.json();
      setRecommendations(data);

    } catch (err) {
      setError(err.message || 'No se pudieron obtener las recomendaciones.');
    } finally {
      setIsLoading(false);
    }
}; 
  
  const restartAssistant = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setRecommendations([]);
    setError('');
    setIsLoading(false);
  }

  return (
    <div className="assistant-container">
      <h1>Asistente de Perfumes Shopee</h1>
      
      {/* Etapa de Preguntas */}
      {recommendations.length === 0 && !isLoading && !error && (
        <div className="question-card">
          <h2>{questions[currentQuestionIndex].text}</h2>
          <div className="options-grid">
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                className="option-button"
                onClick={() => handleAnswer(questions[currentQuestionIndex].key, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Etapa de Carga */}
      {isLoading && <div className="loading-card"><h2>Buscando las mejores fragancias para ti...</h2><div className="spinner"></div></div>}

      {/* Etapa de Error */}
      {error && <div className="error-card"><h2>¡Ups! Ocurrió un error</h2><p>{error}</p><button onClick={restartAssistant}>Intentar de nuevo</button></div>}

      {/* Etapa de Resultados */}
      {recommendations.length > 0 && (
        <div className="results-card">
          <h2>¡Aquí tienes tus recomendaciones!</h2>
          <div className="recommendations-grid">
            {recommendations.map((perfume) => (
              <div key={perfume.id} className="product-card">
                <h3>{perfume.nombre}</h3>
                <p><strong>Marca:</strong> {perfume.marca}</p>
                <p><strong>Ideal para:</strong> {perfume.ocasion.join(', ')}</p>
                <p className="explanation"><strong>Por qué te gustará:</strong> {perfume.explicacion}</p>
              </div>
            ))}
          </div>
          <button onClick={restartAssistant} className="restart-button">Buscar de nuevo</button>
        </div>
      )}
    </div>
  );
}

export default App;
