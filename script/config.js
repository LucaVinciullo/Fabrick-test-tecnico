/**
 * This script allows the app to fetch environment variables
 * Additional information can be found here: https://pazel.dev/how-to-keep-your-secrets-from-your-source-code-in-an-angular-project
 */

const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/environments/environment.ts';

  require('dotenv').config({
    path: '.env'
  });

  const envConfigFile = `export const environment = {
  baseUrl: '${process.env.BASE_URL}',
  apiKey: '${process.env.API_KEY}',
};
`;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
};

setEnv();
