import { FaOptinMonster, FaSearch } from "react-icons/fa";
import './style.css';
import { useState } from 'react';
import api from './servic/api';
import { FcOldTimeCamera } from "react-icons/fc";

function App() {
  // Função assíncrona para manipulação da busca
  const handleSearch = async () => {
    if (input === '') {
      alert('Preencha o campo do CEP');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      // Atualiza o estado com os dados recebidos
      setCep(response.data);
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      setInput("");  // Limpa o campo de input em caso de erro
      setCep({});    // Limpa os dados do CEP em caso de erro
    }
  };
  
  // Estado para o valor do input
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  return (
    <div className="container">
      <h1 className="title">BUSCANDO CEP</h1>
      
      <div className="containerInput">
        <input
          type='text'
          placeholder="Digite o seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FaSearch size={25} color="#FFF" />
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

      <div className="copy">
      <footer id="thiago">&copy;Thiago Tomé</footer>
      </div>
    </div>
  
  );
  

}




export default App;
