import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import capa1 from '../assets/livrariacapa.jpg';
import potter2 from '../assets/potter2.jpg';
import lewis3 from '../assets/lewis3.jpg';
import lovecraft4 from '../assets/lovecraft4.jpg';
import king5 from '../assets/king5.jpg';

const images = [capa1, potter2, lewis3, lovecraft4, king5];


const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Função para alterar a imagem a cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Muda de imagem a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente desmontar
  }, []);

  return (
    <Box
      sx={{
        width: '100%',          // Defina a largura total
        height: '600px',        // Altura fixa do box
        overflow: 'hidden',     // Para esconder partes de imagens fora do box
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#f0f0f0', // Cor de fundo (pode escolher a que quiser)
      }}
    >
      <img
        src={images[currentImageIndex]}
        alt="Carousel"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',    // Faz a imagem se ajustar ao box mantendo as proporções
        }}
      />
    </Box>
  );
};

export default ImageCarousel;



