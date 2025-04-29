// init-project.js
const fs = require('fs');
const { execSync } = require('child_process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función para ejecutar comandos de manera segura
function safeExec(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error ejecutando comando: ${command}`);
    console.error(error.message);
    return false;
  }
}

async function setupProject() {
  console.log('🚀 Configurando nuevo proyecto de Cypress desde template');

  const projectName = await new Promise((resolve) => {
    readline.question('Nombre del proyecto: ', (answer) => resolve(answer));
  });

  const projectId = await new Promise((resolve) => {
    readline.question(
      'ID de proyecto en Cypress Cloud (dejar en blanco si no aplica): ',
      (answer) => resolve(answer),
    );
  });

  // Actualizar package.json
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    packageJson.name = projectName;
    packageJson.description = `Tests de Cypress para ${projectName}`;
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Archivo package.json actualizado');
  } catch (error) {
    console.error('❌ Error actualizando package.json:', error.message);
  }

  // Actualizar cypress.env.json si se proporciona projectId
  if (projectId) {
    try {
      let cypressEnv = {};

      // Verificar si el archivo existe
      if (fs.existsSync('./cypress.env.json')) {
        cypressEnv = JSON.parse(fs.readFileSync('./cypress.env.json', 'utf8'));
      }

      cypressEnv.projectId = projectId;
      fs.writeFileSync('./cypress.env.json', JSON.stringify(cypressEnv, null, 2));
      console.log('✅ Archivo cypress.env.json actualizado con el ID del proyecto');
    } catch (error) {
      console.error('❌ Error actualizando cypress.env.json:', error.message);
    }
  }

  // Inicializar nuevo repositorio Git
  console.log('Inicializando nuevo repositorio Git...');

  // Eliminar el repositorio Git existente
  if (fs.existsSync('./.git')) {
    fs.rmSync('./.git', { recursive: true, force: true });
  }

  // Inicializar nuevo repositorio
  safeExec('git init');
  safeExec('git add .');
  safeExec('git commit -m "Initial commit from Cypress template"');

  console.log(`\n✅ Proyecto "${projectName}" configurado correctamente`);
  console.log('\nPasos siguientes:');
  console.log('1. Revisa la configuración en cypress.config.js');
  console.log('2. Actualiza los valores en cypress.env.json según sea necesario');
  console.log('3. Comienza a escribir tus pruebas en cypress/e2e/');

  readline.close();
}

setupProject().catch((error) => {
  console.error('Error inesperado:', error);
  process.exit(1);
});
