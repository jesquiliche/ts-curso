---
sidebar_position: 2
---
# Caítulo 1: Instalación y preparación del entorno

## **Instalación y configuración inicial**

Comencemos con los pasos para preparar tu entorno de desarrollo con TypeScript. TypeScript es un superconjunto de JavaScript, lo que significa que cualquier código JavaScript válido es también válido en TypeScript. Sin embargo, a medida que introducimos nuevas características de tipado y herramientas, necesitamos preparar un entorno que pueda gestionar estos cambios.

### **1.1. Instalar Node.js y TypeScript**

Primero, necesitamos instalar **Node.js**, que es un entorno de ejecución de JavaScript del lado del servidor, y luego instalaremos **TypeScript** para habilitar el desarrollo tipado.

**Paso 1: Instalar Node.js**
![Descripción de la imagen](/images/node.png)
- Dirígete a [nodejs.org](https://nodejs.org/) y descarga la última versión estable.
- Sigue las instrucciones de instalación específicas para tu sistema operativo.
- Para verificar la instalación de Node.js y su gestor de paquetes `npm`, abre tu terminal o línea de comandos y ejecuta:
  ```bash
  node -v
  npm -v
  ```
  Deberías ver las versiones de Node.js y `npm` instaladas.

**Paso 2: Instalar TypeScript**
Para instalar TypeScript en un entorno Node.js, puedes seguir los siguientes pasos:

### **Inicializar un Proyecto Node.js**
Una vez que tengas Node.js instalado, debes inicializar un proyecto. Esto creará un archivo `package.json` que almacenará información sobre las dependencias y scripts del proyecto.

```bash
npm init -y
```

###  Instalar TypeScript
Ahora puedes instalar TypeScript como una dependencia de desarrollo utilizando `npm` o `yarn`.

Con `npm`:

```bash
npm install typescript --save-dev
```

Con `yarn`:

```bash
yarn add typescript --dev
```

### Verificar la Instalación
Una vez instalado, puedes verificar que TypeScript está instalado correctamente ejecutando el siguiente comando en la terminal:

```bash
npx tsc --version
```

Este comando debería mostrar la versión de TypeScript que acabas de instalar.

### Configurar TypeScript
Es recomendable crear un archivo de configuración de TypeScript (`tsconfig.json`) en la raíz del proyecto para personalizar las opciones de compilación.

Puedes crear este archivo manualmente o generarlo con el siguiente comando:

```bash
npx tsc --init
```

Esto creará un archivo `tsconfig.json` con las opciones de configuración básicas.

### Escribir y Compilar Código TypeScript
Ahora puedes empezar a escribir código TypeScript en archivos con la extensión `.ts`.

Por ejemplo, crea un archivo `index.ts`:

```ts
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

Para compilar el archivo TypeScript a JavaScript, ejecuta:

```bash
npx tsc
```

Esto generará un archivo `index.js` que se puede ejecutar con Node.js:

```bash
node index.js
```

### Opcional: Ejecutar TypeScript Directamente con `ts-node`
Si no quieres compilar manualmente cada vez que ejecutes un archivo `.ts`, puedes instalar `ts-node`, que permite ejecutar código TypeScript directamente.

```bash
npm install ts-node --save-dev
```

Luego, puedes ejecutar un archivo TypeScript de esta forma:

```bash
npx ts-node index.ts
```

### **1.3. Diferencia entre compilar TypeScript y ejecutar JavaScript**

Una de las características distintivas de TypeScript es que **debe ser compilado** antes de que pueda ejecutarse. El compilador `tsc` convierte los archivos `.ts` en archivos `.js` que luego se pueden ejecutar en cualquier entorno que soporte JavaScript, como navegadores web o Node.js.

- **Compilación de TypeScript a JavaScript**: 
  Para compilar tus archivos `.ts`, simplemente ejecuta el siguiente comando:
  ```bash
  tsc
  ```
  Esto generará archivos `.js` que serán equivalentes a los archivos `.ts` que has escrito. 

- **Ejecución de JavaScript**:
  Una vez que hayas compilado el código TypeScript, puedes ejecutar el archivo JavaScript generado con Node.js:
  ```bash
  node dist/index.js
  ```
  
**Ventaja de TypeScript sobre JavaScript**: TypeScript ofrece **tipado estático y validación en tiempo de desarrollo**, lo que significa que puedes detectar errores en el código antes de ejecutarlo, algo que no es posible en JavaScript puro.

---

### 2. Instalar Visual Studio Code
Para instalar Visual Studio Code (VS Code), sigue estos pasos según tu sistema operativo:

### Windows

1. **Descargar el instalador**:
   - Ve al sitio oficial de Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/).
   - Haz clic en el botón **Download for Windows** para descargar el instalador `.exe`.

2. **Instalar VS Code**:
   - Una vez descargado, abre el archivo `.exe` y sigue las instrucciones del asistente de instalación.
   - Acepta los términos y condiciones, selecciona el directorio de instalación y marca las casillas para crear accesos directos, agregar VS Code al **PATH**, y otras opciones útiles como abrir archivos con VS Code desde el menú contextual.

3. **Abrir Visual Studio Code**:
   - Una vez completada la instalación, puedes abrir VS Code desde el menú de inicio o buscando "Visual Studio Code".

### macOS

1. **Descargar el instalador**:
   - Ve al sitio oficial: [https://code.visualstudio.com/](https://code.visualstudio.com/).
   - Haz clic en **Download for macOS** para descargar el archivo `.zip`.

2. **Instalar VS Code**:
   - Abre el archivo `.zip`, y una vez extraído, arrastra el icono de **Visual Studio Code** a la carpeta `Applications`.

3. **Agregar VS Code al PATH** (opcional):
   - Abre VS Code, luego presiona `Cmd + Shift + P` para abrir la paleta de comandos.
   - Escribe `Shell Command: Install 'code' command in PATH` y presiona `Enter`. Esto te permitirá abrir VS Code desde la terminal con el comando `code`.

### Linux (Ubuntu/Debian)

1. **Descargar e instalar**:
   - Abre una terminal y ejecuta los siguientes comandos:

   ```bash
   sudo apt update
   sudo apt install software-properties-common apt-transport-https wget
   wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
   sudo apt update
   sudo apt install code
   ```

2. **Abrir VS Code**:
   - Después de instalar, puedes abrir VS Code ejecutando el comando `code` en la terminal o buscándolo en el menú de aplicaciones.

### Instalar extensiones

Una vez que VS Code esté instalado, puedes buscar e instalar extensiones útiles (como la extensión para **TypeScript** o **ESLint**):

1. Abre **Visual Studio Code**.
2. Presiona `Ctrl + Shift + X` o haz clic en el icono de extensiones en la barra lateral.
3. Busca la extensión que necesitas e instálala.

¡Y ya estarías listo para usar Visual Studio Code!
