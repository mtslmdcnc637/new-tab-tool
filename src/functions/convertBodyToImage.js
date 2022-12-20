const htmlToImage = require('html-to-image');

async function convertBodyToImage(bodyContent) {
  // Cria uma imagem base64 a partir da string de HTML
  const image = await htmlToImage.toPng(bodyContent);

  // Retorna a imagem base64
  return image;
}

module.exports = convertBodyToImage;
