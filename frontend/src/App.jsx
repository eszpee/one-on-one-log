import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        setMessage(response.data.message);
      } catch (err) {
        console.error('Error fetching API data:', err);
        setError('Failed to connect to the API. Please check if the backend is running.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">One-on-One Log</h1>
        
        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        ) : (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p>{message}</p>
          </div>
        )}
        
        <p className="text-gray-600 text-center">
          This is a placeholder page for the One-on-One Log contact management system.
        </p>
      </div>
    </div>
  );
}

export default App;
