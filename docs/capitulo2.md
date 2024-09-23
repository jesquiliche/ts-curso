---
sidebar_position: 3
---
# Capítulo 2: Tipos Básicos y Sintaxis

## **Objetivo del Capítulo**
Al finalizar este módulo, los lectores serán capaces de comprender y utilizar los tipos básicos de TypeScript, manejar correctamente la inferencia de tipos y aplicar estos fundamentos en la creación de estructuras de datos más complejas. Este módulo sentará las bases para avanzar hacia conceptos más avanzados, como tipos generics, interfaces y clases.

---

## **2.1. Tipos Primitivos**

Los tipos primitivos en TypeScript son los bloques fundamentales para la declaración de variables. Estos tipos son similares a los de JavaScript, pero TypeScript proporciona un sistema de tipos más fuerte que permite una mayor seguridad y robustez en el código.

### **Tipos Principales:**

1. **`string`**
   Utilizado para almacenar cadenas de texto. TypeScript asegura que cualquier variable declarada con este tipo solo contenga texto.
   ```typescript
   let saludo: string = "Hola Mundo";
   let nombre: string = 'Juan Pérez';
   let mensaje: string = `Hola, ${nombre}, ¿cómo estás?`;  // Uso de plantillas literales
   ```

2. **`number`**
   En TypeScript, el tipo `number` se utiliza tanto para enteros como para decimales. No hay distinción entre ambos.
   ```typescript
   let edad: number = 25;       // Número entero
   let temperatura: number = 36.5;  // Número decimal
   let hex: number = 0xff;      // Valor hexadecimal
   let bin: number = 0b1010;    // Valor binario
   let octal: number = 0o744;   // Valor octal
   ```

3. **`boolean`**
   Se utiliza para almacenar valores de verdadero o falso (`true` o `false`).
   ```typescript
   let esEstudiante: boolean = true;
   let tieneLicencia: boolean = false;
   ```

4. **`null` y `undefined`**
   Estos dos tipos representan la ausencia de valor. `null` es un valor explícito de "vacío", mientras que `undefined` indica que una variable ha sido declarada pero aún no tiene un valor asignado.
   ```typescript
   let valorNulo: null = null;
   let valorIndefinido: undefined = undefined;
   ```

### **Inferencia de Tipos en TypeScript**
TypeScript puede inferir el tipo de una variable basándose en el valor inicial que se le asigna. Esto significa que no siempre necesitas declarar el tipo explícitamente, aunque es recomendable para mantener la claridad del código.
```typescript
let mensaje = "Hola TypeScript";  // TypeScript infiere que 'mensaje' es un string
mensaje = 42;  // Error: TypeScript no permite cambiar de string a number
```

**Ventajas de la Inferencia de Tipos:**
- **Reducción de código:** No es necesario especificar el tipo manualmente en todos los casos.
- **Flexibilidad:** Permite un desarrollo más ágil sin perder la seguridad de tipos.

### **Ejercicio 1: Tipos Primitivos**
Crea un código donde declares variables de cada uno de los tipos primitivos. Luego, intenta asignar valores de tipos incorrectos a esas variables para observar cómo TypeScript detecta estos errores antes de ejecutar el programa.

---

## **2.2. Tipos Compuestos**

TypeScript también admite tipos más complejos que permiten almacenar colecciones de datos o estructurar información de maneras más avanzadas. Los dos tipos compuestos más comunes son los **arrays** y las **tuplas**.

### **Arrays**
Un **array** es una colección de elementos del mismo tipo. En TypeScript, los arrays se pueden declarar de manera explícita:
```typescript
let numeros: number[] = [1, 2, 3, 4, 5];  // Array de números
let palabras: string[] = ["manzana", "banana", "naranja"];  // Array de cadenas
```

Otra forma de definir arrays es utilizando el tipo genérico `Array<tipo>`:
```typescript
let otrosNumeros: Array<number> = [10, 20, 30];
```

**Acceso y Modificación de Arrays:**
Puedes acceder a los elementos del array utilizando su índice y modificarlos de manera segura:
```typescript
numeros[0] = 99;  // Cambia el primer elemento
palabras.push("uva");  // Agrega un nuevo elemento al final
```

### **Tuplas**
Las **tuplas** permiten definir un array donde cada posición tiene un tipo específico. Esto es útil para almacenar datos estructurados que tienen un número fijo de elementos.
```typescript
let coordenadas: [number, number] = [40.7128, -74.0060];  // Tupla con dos números
let persona: [string, number] = ["Juan", 30];  // Tupla con un string y un número
```

En las tuplas, debes respetar tanto el número de elementos como los tipos de cada uno de ellos.

### **Tipos Literales**
En TypeScript, los **tipos literales** permiten restringir una variable a un conjunto limitado de valores:
```typescript
let direccion: "norte" | "sur" | "este" | "oeste";  // Solo puede tomar estos valores
direccion = "norte";  // Válido
direccion = "arriba";  // Error: no es uno de los valores permitidos
```

Esto es útil cuando deseas que una variable solo pueda tomar un conjunto predefinido de valores.

### **`readonly` en Arrays**
Si deseas evitar que se modifique un array después de haber sido creado, puedes usar el modificador `readonly`:
```typescript
let numerosFijos: readonly number[] = [1, 2, 3];
numerosFijos.push(4);  // Error: no se puede modificar un array readonly
```

### **Ejercicio 2: Arrays y Tuplas**
Crea un array de nombres de tipo `string` que no permita modificar sus elementos. Luego, declara una tupla que represente el nombre de una persona y su edad.

---

## **2.3. Tipos Especiales: `any`, `unknown`, `never`**

TypeScript introduce algunos tipos especiales que permiten mayor flexibilidad o control en situaciones más avanzadas.

### **`any`**
El tipo `any` permite que una variable almacene valores de cualquier tipo, sin que TypeScript realice verificaciones. Aunque puede ser útil en ciertos contextos, su uso debería limitarse porque elimina las ventajas del sistema de tipos:
```typescript
let dato: any = "Hola";
dato = 100;  // No genera error, aunque el tipo cambió de string a number
```

**Consejo:** Usa `any` solo cuando sea absolutamente necesario, ya que su uso extensivo puede llevar a errores difíciles de depurar.

### **`unknown`**
El tipo `unknown` es similar a `any`, pero ofrece mayor seguridad. Una variable de tipo `unknown` puede contener cualquier valor, pero antes de usarla, TypeScript te obliga a realizar una verificación del tipo:
```typescript
let valorDesconocido: unknown = "Hola mundo";
if (typeof valorDesconocido === "string") {
  console.log(valorDesconocido.toUpperCase());  // Safe, es una cadena
}
```

**Ventaja:** `unknown` es más seguro que `any` porque te obliga a verificar el tipo antes de operar con la variable.

### **`never`**
El tipo `never` representa valores que nunca ocurren. Se utiliza en funciones que nunca retornan, como aquellas que lanzan excepciones o entran en bucles infinitos:
```typescript
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}
```
Las funciones con retorno `never` indican que no devuelven ningún valor y que interrumpen el flujo normal del programa.

### **Ejercicio 3: `any` vs `unknown`**
Declara una variable de tipo `unknown` e implementa una lógica que verifique si es un `string`, `number` o `boolean` antes de realizar una operación con ella.

---

## **2.4. Tipos de Funciones**

TypeScript ofrece soporte completo para definir los tipos de los parámetros y el valor de retorno de una función, lo que mejora la seguridad y la legibilidad del código.

### **Declaración de Tipos en Funciones**
Puedes definir tanto los tipos de los parámetros como el tipo del valor de retorno:
```typescript
function suma(a: number, b: number): number {
  return a + b;
}
```

TypeScript verificará que los argumentos pasados y el valor de retorno de la función coincidan con los tipos declarados.

### **Funciones como Tipos**
También puedes declarar tipos para las funciones y luego asignarles funciones que cumplan con esa firma:
```typescript
let multiplicar: (a: number, b: number) => number;
multiplicar = (a, b) => a * b;
```

Esto es útil para declarar variables que almacenan funciones, asegurando que siempre reciban los parámetros correctos y devuelvan un valor del tipo esperado.

### **Parámetros Opcionales y Valores por Defecto**
Puedes hacer que algunos parámetros sean opcionales usando el signo `?`. Si no se proporcionan

, TypeScript asignará `undefined` por defecto:
```typescript
function saludar(nombre: string, saludo?: string): string {
  return `${saludo || "Hola"}, ${nombre}`;
}
```

Además, puedes establecer valores por defecto para los parámetros:
```typescript
function despedir(nombre: string, mensaje: string = "Adiós"): string {
  return `${mensaje}, ${nombre}`;
}
```

### **Parámetros Rest**
Los parámetros rest permiten a una función recibir un número variable de argumentos, que se agrupan en un array:
```typescript
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acumulado, actual) => acumulado + actual, 0);
}
```
Esto es útil cuando no sabes de antemano cuántos argumentos se pasarán a la función.

### **Ejercicio 4: Funciones**
Crea una función que acepte un número variable de argumentos y los sume. Permite también un segundo argumento que, si se proporciona, indique si se deben multiplicar los valores en lugar de sumarlos. Asegúrate de manejar la validación de tipos.

---

## **Conclusión:**
En este módulo, hemos explorado los tipos básicos y la sintaxis de TypeScript, proporcionando una base sólida que permitirá escribir código más seguro y legible. Comprender los tipos primitivos, compuestos, especiales y las funciones es esencial para aprovechar al máximo las capacidades de TypeScript.

Con este conocimiento, los lectores estarán mejor equipados para abordar temas más avanzados como interfaces, clases y tipos genéricos en los próximos módulos.

