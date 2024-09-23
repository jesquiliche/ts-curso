---
sidebar_position: 6
---

# Capítulo 6: Manejo de Errores y Configuración en TypeScript

En cualquier aplicación, es crucial poder manejar errores de manera efectiva para garantizar la estabilidad y el control sobre el flujo de la aplicación. TypeScript, al ser un superset de JavaScript, hereda los mecanismos de manejo de errores de este último, pero agrega varias ventajas gracias a su sistema de tipos. Además, TypeScript permite una amplia personalización de la compilación a través del archivo `tsconfig.json`, que proporciona múltiples opciones para adaptar la compilación y el entorno de desarrollo.

En este capítulo, abordaremos dos aspectos fundamentales para el desarrollo con TypeScript: el manejo de errores y la configuración avanzada del archivo `tsconfig.json`.

## **6.1. Manejo de Errores en TypeScript**

El manejo de errores en TypeScript se basa en el mismo sistema que utiliza JavaScript, es decir, a través de bloques `try...catch`. Sin embargo, TypeScript ofrece la posibilidad de gestionar estos errores con mayor precisión mediante su sistema de tipos estáticos.

### **6.1.1. Manejo básico de errores con `try...catch`**

Un ejemplo básico de manejo de errores en TypeScript sería el siguiente:

```typescript
function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error("No se puede dividir entre cero");
  }
  return a / b;
}

try {
  console.log(dividir(10, 0)); // Lanza un error
} catch (error) {
  console.log("Se produjo un error: " + (error as Error).message);
}
```

Este es un manejo típico de errores con `try...catch`, pero al tener tipos estáticos, podemos beneficiarnos de una mejor predicción y control de los errores en tiempo de compilación. Aquí, usamos el operador `as` para indicar explícitamente que `error` es del tipo `Error`.

### **6.1.2. Tipos personalizados de errores**

TypeScript nos permite crear nuestros propios tipos de errores, lo que facilita la creación de jerarquías de errores y su manejo en aplicaciones más complejas.

```typescript
class DivisionPorCeroError extends Error {
  constructor() {
    super("No se puede dividir entre cero");
    this.name = "DivisionPorCeroError";
  }
}

function dividirSeguro(a: number, b: number): number {
  if (b === 0) {
    throw new DivisionPorCeroError();
  }
  return a / b;
}

try {
  console.log(dividirSeguro(10, 0)); // Lanza DivisionPorCeroError
} catch (error) {
  if (error instanceof DivisionPorCeroError) {
    console.error("Error de división: " + error.message);
  } else {
    console.error("Error desconocido");
  }
}
```

Este enfoque es útil cuando necesitas diferenciar entre varios tipos de errores y aplicar lógica diferente según el tipo de error.

### **6.1.3. Errores en Promesas y código asíncrono**

El manejo de errores en funciones asíncronas también se simplifica con `async/await`. TypeScript permite que la función `await` devuelva un valor con el tipo correcto, lo que facilita la gestión de errores.

```typescript
async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }
    return await response.json();
  } catch (error) {
    console.error("Error capturado: " + (error as Error).message);
  }
}

fetchData("https://api.fakeurl.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

En este ejemplo, el bloque `try...catch` dentro de la función asíncrona captura cualquier error que ocurra durante la ejecución de `fetch`, incluyendo errores de red o errores del servidor.

## **6.2. Configuración con `tsconfig.json`**

El archivo `tsconfig.json` es el archivo de configuración de TypeScript, y es esencial para definir cómo el compilador debe comportarse y cómo se deben compilar los archivos TypeScript.

### **6.2.1. Estructura básica del archivo `tsconfig.json`**

Un archivo `tsconfig.json` básico podría tener el siguiente formato:

```json
{
  "compilerOptions": {
    "target": "es6",                    // Especifica la versión de ECMAScript
    "module": "commonjs",                // Define el sistema de módulos
    "strict": true,                      // Habilita el modo estricto de comprobación de tipos
    "outDir": "./dist",                  // Define el directorio de salida para los archivos compilados
    "rootDir": "./src",                  // Define el directorio raíz de los archivos fuente
    "esModuleInterop": true,             // Habilita la interoperabilidad con módulos ES
    "skipLibCheck": true,                // Omitir la verificación de tipos en archivos de declaración
    "forceConsistentCasingInFileNames": true // Fuerza el uso de nombres de archivo consistentes
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### **6.2.2. Opciones comunes en `tsconfig.json`**

- **`target`**: Define a qué versión de ECMAScript se debe compilar el código. Puede ser `es5`, `es6`, `esnext`, etc. Especificar un `target` más moderno puede permitir que el código aproveche las nuevas características de JavaScript.
  
  ```json
  "target": "es6"
  ```

- **`module`**: Especifica el sistema de módulos. Puede ser `commonjs`, `esnext`, `amd`, `umd`, entre otros. La opción más común para Node.js es `commonjs`, mientras que para navegadores modernos es `esnext`.

  ```json
  "module": "commonjs"
  ```

- **`strict`**: Habilita todas las verificaciones estrictas de TypeScript, como la comprobación estricta de nulos, el tipado estricto de parámetros de funciones y otros.

  ```json
  "strict": true
  ```

- **`esModuleInterop`**: Permite la interoperabilidad con módulos ECMAScript, haciendo más fácil trabajar con paquetes que exportan mediante `default`.

  ```json
  "esModuleInterop": true
  ```

- **`noImplicitAny`**: Impide el uso implícito de `any`. Si no se especifica el tipo, el compilador arrojará un error.

  ```json
  "noImplicitAny": true
  ```

- **`skipLibCheck`**: Omitir la verificación de tipos en archivos de declaración de bibliotecas externas. Es útil para reducir el tiempo de compilación.

  ```json
  "skipLibCheck": true
  ```

### **6.2.3. Combinando opciones avanzadas**

Podemos crear un `tsconfig.json` más avanzado combinando diferentes opciones. Por ejemplo, podemos forzar el uso de alias de ruta, habilitar decoradores y asegurarnos de que los nombres de archivo sigan un formato consistente:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@models/*": ["src/models/*"],
      "@controllers/*": ["src/controllers/*"]
    },
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### **6.2.4. Modo estricto en TypeScript**

El **modo estricto** (`strict`) de TypeScript es una característica poderosa que asegura un chequeo más riguroso de tipos, mejorando la calidad del código y ayudando a prevenir errores en tiempo de compilación. Al habilitar `strict`, automáticamente se activan una serie de subopciones:

- **`noImplicitAny`**: Previene la asignación implícita de tipos `any`.
- **`strictNullChecks`**: Evita que valores `null` o `undefined` se asignen a variables de otros tipos.
- **`strictFunctionTypes`**: Realiza verificaciones estrictas en los tipos de funciones.
- **`strictBindCallApply`**: Verifica correctamente los tipos de `bind`, `call` y `apply`.
- **`strictPropertyInitialization`**: Asegura que las propiedades de las clases se inicialicen adecuadamente.

Activar el modo estricto es una de las mejores prácticas más recomendadas, ya que reduce las posibilidades de errores en tiempo de ejecución.

```json
"strict": true
```

## **6.3. Debugging en TypeScript**

El proceso de depuración en TypeScript no es muy diferente del que usamos en JavaScript. Sin embargo, gracias al soporte para **source maps**, podemos depurar nuestro código TypeScript directamente en los navegadores o en entornos como **Node.js** y **Visual Studio Code**.

### **6.3.1. Uso de Source

 Maps**

Los **source maps** permiten que las herramientas de depuración (como Chrome DevTools o Visual Studio Code) muestren el código TypeScript original en lugar del JavaScript compilado.

Para habilitar los **source maps**, basta con añadir la opción `sourceMap` en el archivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

Esto generará un archivo `.map` junto con el archivo JavaScript compilado, que mapea las líneas del archivo JS a las correspondientes en el archivo TS.

### **6.3.2. Depuración en Visual Studio Code**

Visual Studio Code ofrece un excelente soporte para la depuración de TypeScript. Siguiendo estos pasos básicos, puedes configurar un entorno de depuración:

1. Asegúrate de que `sourceMap` esté habilitado en el archivo `tsconfig.json`.
2. Abre tu proyecto en Visual Studio Code.
3. Ve a la pestaña de "Run and Debug" (Correr y depurar) y selecciona "Node.js".
4. Establece puntos de ruptura en tus archivos `.ts`.
5. Inicia la depuración.

---

Con esto concluye el Capítulo 6 sobre el manejo de errores y configuración en TypeScript. Hemos cubierto aspectos esenciales sobre cómo mejorar el control de errores, personalizar la compilación de TypeScript y aprovechar las herramientas de depuración para optimizar el desarrollo.
