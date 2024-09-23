// src/pages/CadastroAutorLivro.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CadastroAutorLivro.css'; // Importando o arquivo CSS

function CadastroAutorLivro() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoCadastro, setTipoCadastro] = useState('autor'); // Estado para controlar o tipo de cadastro
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (tipoCadastro === 'autor') {
      const dados = { nome, descricao };

      try {
        
        const response = await axios.post('http://localhost:8080/autor', dados);
        
        // Limpar campos após sucesso
        setNome('');
        setDescricao('');
        setSuccessMessage('Autor cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar autor:', error.response ? error.response.data : error.message);
        setErrorMessage('Erro ao cadastrar autor. Verifique os dados e tente novamente.');
      }
    } else {
      // Placeholder para futura implementação do cadastro de livro
      console.log('Cadastro de livro ainda não implementado.');
    }
  };

  return (
    <Box p={2} className="cadastro-container">
      <Typography variant="h4" gutterBottom>
        {tipoCadastro === 'autor' ? 'Cadastrar Autor' : 'Cadastrar Livro'}
      </Typography>

      <FormControl component="fieldset" className="cadastro-radio-group">
        <RadioGroup
          row
          value={tipoCadastro}
          onChange={(e) => setTipoCadastro(e.target.value)}
        >
          <FormControlLabel value="autor" control={<Radio />} label="Cadastrar Autor" />
          <FormControlLabel value="livro" control={<Radio />} label="Cadastrar Livro" />
        </RadioGroup>
      </FormControl>

      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="cadastro-form">
        <TextField
          label={tipoCadastro === 'autor' ? 'Nome do Autor' : 'Nome do Livro'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Cadastrar
        </Button>
      </form>
    </Box>
  );
}

export default CadastroAutorLivro;
