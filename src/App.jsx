import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Importando o CSS

const API_URL = 'https://nh3ougt7f7.execute-api.us-east-1.amazonaws.com/prod/usuarios';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsuarios = async () => {
    const res = await axios.get(API_URL);
    setUsuarios(res.data);
  };

  const addUsuario = async () => {
    await axios.post(API_URL, { nome, email });
    fetchUsuarios();
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="App">
      <h1>Usuários</h1>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUsuario}>Adicionar</button>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((u, index) => (
          <li key={index}>{u.nome} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
