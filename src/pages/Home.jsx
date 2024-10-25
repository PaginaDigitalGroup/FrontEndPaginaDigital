import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from '@mui/material';
import './Home.css';
import ImageCarousel from './ImageCarousel';
import imagemPrincipal from '../assets/livrostemplate.jpg';


function Home() {
    const [livros, setLivros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formAutor, setFormAutor] = useState({ nome: "", descricao: "" });
    const [formLivro, setFormLivro] = useState({ titulo: "", descricao: "" });
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredLivros, setFilteredLivros] = useState([]);
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const livroResponse = await axios.get('http://localhost:8080/livros');
                setLivros(livroResponse.data);
                const autorResponse = await axios.get('http://localhost:8080/autor');
                setAutores(autorResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = livros.filter(livro => {
            return livro.titulo.toLowerCase().includes(lowercasedSearchTerm) ||
                   livro.autor.nome.toLowerCase().includes(lowercasedSearchTerm) ||
                   livro.genero.toLowerCase().includes(lowercasedSearchTerm);
        });
        setFilteredLivros(filtered);
    }, [searchTerm, livros]);

    const getAutorNome = (autorId) => {
        const autor = autores.find(autor => autor.id === autorId);
        return autor ? autor.nome : 'Desconhecido';
    };

    const handleOpenDialog = (livro) => {
        setSelectedItem(livro);
        setOpenDialog(true);
        setIsEditing(false);
        setFormAutor({ nome: livro.autor?.nome || '', descricao: livro.autor?.descricao || '' });
        setFormLivro({ titulo: livro.titulo, descricao: livro.descricao });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedItem(null);
        setIsEditing(false);
        setAnchorEl(null);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDeleteAutor = async () => {
        try {
            await axios.delete(`http://localhost:8080/autor/${selectedItem.autor.id}`);
            alert("Autor excluído com sucesso.");
            setAutores(autores.filter(autor => autor.id !== selectedItem.autor.id));
            handleCloseDialog();
        } catch (error) {
            alert("Erro ao excluir autor.");
        }
    };

    const handleEditAutor = async () => {
        try {
            const updatedAutor = {
                id: selectedItem.autor.id,
                nome: formAutor.nome,
                descricao: formAutor.descricao
            };

            await axios.put('http://localhost:8080/autor', updatedAutor);
            alert("Autor atualizado com sucesso.");
            setAutores(autores.map(autor => (autor.id === selectedItem.autor.id ? updatedAutor : autor)));
            setIsEditing(false);
        } catch (error) {
            alert("Erro ao atualizar autor.");
        }
    };

    const handleEditLivro = async () => {
        try {
            console.log(selectedItem);
            
            // Cria um novo objeto para o livro atualizado, mantendo os valores não editados
            const updatedLivro = {
                id: selectedItem.id,
                titulo: formLivro.titulo || selectedItem.titulo, // Se formLivro.titulo estiver vazio, mantenha o título atual
                editora: selectedItem.editora, // Mantém o valor atual
                numeroPaginas: selectedItem.numeroPaginas, // Mantém o valor atual
                descricao: formLivro.descricao || selectedItem.descricao, // Se formLivro.descricao estiver vazio, mantenha a descrição atual
                genero: selectedItem.genero, // Mantém o valor atual
                situacao: selectedItem.situacao, // Mantém o valor atual
                autor: {
                    id: selectedItem.autor.id, // Mantém o ID do autor
                    nome: selectedItem.autor.nome, // Mantém o nome do autor
                    descricao: selectedItem.autor.descricao // Mantém a descrição do autor
                },
                foto: selectedItem.foto // Mantém o valor atual
            };
    
            console.log(updatedLivro);
            await axios.put('http://localhost:8080/livros', updatedLivro);
            alert("Livro atualizado com sucesso.");
            
            // Atualiza a lista de livros na interface do usuário
            setLivros(livros.map(l => (l.id === selectedItem.id ? updatedLivro : l)));
            handleCloseDialog(); // Fechar o diálogo após a edição
        } catch (error) {
            alert("Erro ao atualizar livro.");
            console.error(error); // Para ver mais detalhes sobre o erro
        }
    };
    

    const handleDeleteLivro = async () => {
        try {
            await axios.delete(`http://localhost:8080/livros/${selectedItem.id}`);
            alert("Livro excluído com sucesso.");
            setLivros(livros.filter(l => l.id !== selectedItem.id));
            handleCloseDialog();
        } catch (error) {
            alert("Erro ao excluir livro.");
        }
    };

    const handleToggleSituacao = async (livro) => {
        const novaSituacao = livro.situacao ? 0 : 1;
        try {
            console.log("id", livro.id);
            await axios.put(`http://localhost:8080/livros/${livro.id}/situacao/${novaSituacao}`, null, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            // Atualize o estado dos livros
            setLivros(livros.map(l => l.id === livro.id ? { ...l, situacao: novaSituacao } : l));
        } catch (error) {
            console.error('Erro ao alterar a situação do livro.', error);
            alert('Erro ao alterar a situação do livro.');
        }
    };
    
    

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <>
            {/* Usando o componente ImageCarousel */}
            <Box className="image-container">
                <ImageCarousel/>
            </Box>

            <Box className="text-below-image">
                <Typography variant="h5">
                    Bem Vindo! O que deseja ler hoje?
                </Typography>
            </Box>

            <Box className="content-container">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Procurar"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h4" gutterBottom mt={4}>
                    Lista de Livros
                </Typography>
                <Box className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Título</th>
                                <th>Genero</th>
                                <th>Autor</th>
                                <th>Descrição</th>                               
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLivros.map(livro => (
                                <tr key={livro.id}>
                                    <td><img src={livro.foto} alt={livro.titulo} width="200" /></td>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.genero}</td>
                                    <td>{getAutorNome(livro.autor?.id)}</td>
                                    <td>{livro.descricao}</td>                                    
                                    <td>
                                        <span style={{ color: livro.situacao ? 'green' : 'red' }}>
                                            {livro.situacao ? 'Disponível' : 'Alugado'}
                                        </span>
                                    </td>
                                    <td>
                                    <Button
                                        variant="contained"
                                        className="table-action"
                                        onClick={() => handleOpenDialog(livro)}
                                    >
                                        Ver Mais
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className={livro.situacao ? 'delete' : 'save'}
                                        onClick={() => handleToggleSituacao(livro)}
                                    >
                                        {livro.situacao ? 'Alugar' : 'Devolver'}
                                    </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Box>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>{selectedItem?.titulo || 'Detalhes do Livro'}</DialogTitle>
                <DialogContent>
                    {!isEditing ? (
                        <>
                            <Typography variant="h6">Descrição do Livro:</Typography>
                            <Typography>{selectedItem?.descricao || 'Descrição não disponível'}</Typography>
                            <Typography variant="h6">Autor:</Typography>
                            <Typography>{selectedItem?.autor?.nome || 'Autor não disponível'}</Typography>
                            <Typography>{selectedItem?.autor?.descricao || 'Descrição do autor não disponível'}</Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenMenu}
                                style={{ marginTop: 20, marginRight: 10 }}
                            >
                                Ações
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => { setIsEditing(true); handleCloseMenu(); }}>Editar</MenuItem>
                                <MenuItem onClick={() => { handleDeleteLivro(); handleCloseMenu(); }}>Excluir Livro</MenuItem>
                                <MenuItem onClick={() => { handleDeleteAutor(); handleCloseMenu(); }}>Excluir Autor</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6">Editar Livro</Typography>
                            <TextField
                                fullWidth
                                label="Título"
                                variant="outlined"
                                value={formLivro.titulo}
                                onChange={(e) => setFormLivro({ ...formLivro, titulo: e.target.value })}
                                style={{ marginBottom: 16 }}
                            />
                            <TextField
                                fullWidth
                                label="Descrição"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={formLivro.descricao}
                                onChange={(e) => setFormLivro({ ...formLivro, descricao: e.target.value })}
                                style={{ marginBottom: 16 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { handleEditLivro(); setIsEditing(false); }}
                                style={{ marginRight: 10 }}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </Button>

                            <Typography variant="h6" style={{ marginTop: 30 }}>Editar Autor</Typography>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                value={formAutor.nome}
                                onChange={(e) => setFormAutor({ ...formAutor, nome: e.target.value })}
                                style={{ marginBottom: 16 }}
                            />
                            <TextField
                                fullWidth
                                label="Descrição"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={formAutor.descricao}
                                onChange={(e) => setFormAutor({ ...formAutor, descricao: e.target.value })}
                                style={{ marginBottom: 16 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { handleEditAutor(); setIsEditing(false); }}
                                style={{ marginRight: 10 }}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </Button>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Home;
