// src/pages/SobreNos.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import './SobreNos.css'; // Importando o arquivo CSS para estilizar a página
import imagemBiblioteca from '../assets/livrariaSobreNos.jpg'; // Importando a imagem

function SobreNos() {
  return (
    <Box className="sobre-nos-container">
      <Box className="imagem-container">
        <img src={imagemBiblioteca} alt="Imagem da Biblioteca" className="imagem-biblioteca" />
      </Box>
      <Box className="texto-container">
        <Typography variant="h4" gutterBottom>
          Sobre Nós
        </Typography>
        <Typography variant="body1">
          Bem-vindo à nossa biblioteca digital, um espaço dedicado a promover a paixão pela leitura e o acesso ao conhecimento. Aqui, acreditamos que os livros têm o poder de transformar vidas, abrir mentes e enriquecer o espírito.
        </Typography>
        <Typography variant="body1" paragraph>
          Nossa missão é proporcionar um ambiente onde leitores de todas as idades e interesses possam explorar, descobrir e se apaixonar por novos mundos literários. Com uma vasta coleção de títulos, desde clássicos atemporais até as obras mais recentes, buscamos atender a todos os gostos e necessidades.
        </Typography>
        <Typography variant="body1">
          Além de oferecer um acervo diversificado, nos empenhamos em criar uma comunidade de leitores engajada, onde o amor pelos livros é celebrado e compartilhado. Acreditamos que a leitura é uma jornada contínua e estamos aqui para caminhar ao seu lado nessa aventura. Seja para estudar, relaxar ou se inspirar, nossa biblioteca é o lugar certo para você.
        </Typography>
      </Box>
    </Box>
  );
}

export default SobreNos;
