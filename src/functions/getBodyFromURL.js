const axios = require("axios");
const { JSDOM } = require('jsdom');

async function getBodyFromURL(url) {
  try {
    // Cria um novo objeto de URL
    const parsedURL = new URL(url);

    // Verifica se a URL é válida
    if (parsedURL.protocol === 'http:' || parsedURL.protocol === 'https:') {
      // Faz a solicitação GET para a URL especificada
      const response = await axios.get(url);

      // Obtém o HTML como uma string
      const html = response.data;

      // Cria um novo objeto JSDOM a partir da string de HTML
      const dom = new JSDOM(html);

      // Obtém o elemento body do documento
      const body = dom.window.document.body;

      // Retorna o conteúdo do elemento body
      return body.innerHTML;
    } else {
      // Se a URL não for válida, retorna um erro
      return new Error('URL inválida');
    }
  } catch (error) {
    // Se ocorrer um erro ao criar o objeto de URL, retorna um erro
    return new Error('Erro ao validar a URL: ' + error);
  }
}


module.exports = getBodyFromURL  