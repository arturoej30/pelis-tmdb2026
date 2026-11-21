
const fs = require('node:fs');

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error('Falta la variable de entorno TMDB_API_KEY');
}

const environment = `export const environment = {
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  tmdbApiKey: '${apiKey}'
};
`;

fs.writeFileSync(
  'src/environments/environment.ts',
  environment
);

console.log('Configuración de TMDB generada correctamente.');
