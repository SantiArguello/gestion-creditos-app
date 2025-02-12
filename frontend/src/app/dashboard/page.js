'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:4000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user ? (
          <div>
            <p>Bienvenido, {user.name}!</p>
            <p>Correo electrónico: {user.email}</p>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </ProtectedRoute>
  );
}