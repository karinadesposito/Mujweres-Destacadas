import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/UserContext';

const Login = () => {
  const { handleLogin } = useAuth();
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // usuario simulado
    const simulatedUsername = 'admin';
    const simulatedPassword = 'admin123';

    if (nombre === simulatedUsername && password === simulatedPassword) {
      handleLogin(nombre);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'my-swal'
        }
      }).then(() => {
        navigate('/'); 
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Inicie sesión</h2>
        <input 
          type="text"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
};


export default Login;
