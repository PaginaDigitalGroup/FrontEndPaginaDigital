import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CadastroAutorLivro.css';

function CadastroAutorLivro() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoCadastro, setTipoCadastro] = useState('autor');
  const [editora, setEditora] = useState('');
  const [numeroPaginas, setNumeroPaginas] = useState('');
  const [genero, setGenero] = useState('');
  const [foto, setFoto] = useState('');
  const [situacao] = useState(1);
  const [autores, setAutores] = useState([]);
  const [autorSelecionado, setAutorSelecionado] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Carregar autores ao montar o componente
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/autor');
        setAutores(response.data);
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
        setErrorMessage('Erro ao carregar autores.');
      }
    };
    fetchAutores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (tipoCadastro === 'autor') {
      const dados = { nome, descricao };
  
      try {
        const response = await axios.post('http://localhost:8080/autor', dados);
        setAutores((prevAutores) => [...prevAutores, response.data]); // Adiciona o novo autor à lista
        setNome('');
        setDescricao('');
        setSuccessMessage('Autor cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar autor:', error.response ? error.response.data : error.message);
        setErrorMessage('Erro ao cadastrar autor. Verifique os dados e tente novamente.');
      }
    } else {
      const dadosLivro = { 
        titulo: nome, 
        descricao, 
        editora, 
        numeroPaginas, 
        genero, 
        situacao: situacao || 1,
        foto, 
        autor: { id: autorSelecionado.id, nome: autorSelecionado.nome, descricao: autorSelecionado.descricao }
      };
  
      console.log(dadosLivro);
  
      try {
        await axios.post('http://localhost:8080/livros', dadosLivro);
        setNome('');
        setDescricao('');
        setEditora('');
        setNumeroPaginas('');
        setGenero('');
        setFoto('');
        setAutorSelecionado('');
        setSuccessMessage('Livro cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar livro:', error.response ? error.response.data : error.message);
        setErrorMessage('Erro ao cadastrar livro. Verifique os dados e tente novamente.');
      }
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
          label={tipoCadastro === 'autor' ? 'Nome do Autor' : 'Título do Livro'}
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

        {tipoCadastro === 'livro' && (
          <>
            <TextField
              label="Editora"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
            />
            <TextField
              label="Número de Páginas"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={numeroPaginas}
              onChange={(e) => setNumeroPaginas(e.target.value)}
            />
            <TextField
              label="Gênero"
              variant="outlined"
              fullWidth
              margin="normal"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
            <TextField
              label="URL da Foto"
              variant="outlined"
              fullWidth
              margin="normal"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            />

            {/* Selecione um autor */}
            <FormControl component="fieldset" fullWidth margin="normal">
  <Typography variant="h6">Selecione o Autor</Typography>
  <RadioGroup
    value={autorSelecionado ? autorSelecionado.id : ''}
    onChange={(e) => {
      const autorEscolhido = autores.find(autor => autor.id === Number(e.target.value));
      setAutorSelecionado(autorEscolhido);
    }}
  >
    {autores.map((autor) => (
      <FormControlLabel
        key={autor.id}
        value={autor.id} // O value deve ser o id do autor
        control={<Radio />}
        label={autor.nome}
      />
    ))}
  </RadioGroup>
</FormControl>

          </>
        )}

        <Button variant="contained" color="primary" type="submit">
          Cadastrar
        </Button>
      </form>
    </Box>
  );
}

export default CadastroAutorLivro;
