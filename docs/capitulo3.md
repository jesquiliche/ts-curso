---
sidebar_position: 4
---

# Capítulo 3: Interfaces y Tipos Avanzados

## **Objetivo del Capítulo**
Al finalizar este capítulo, los lectores serán capaces de definir y utilizar interfaces para estructurar datos complejos y aprovechar tipos avanzados en TypeScript, creando aplicaciones más robustas y mantenibles.

---

## **3.1. Introducción a las Interfaces**

Las **interfaces** en TypeScript permiten definir la forma de un objeto, proporcionando una estructura clara y mejorando la legibilidad y la seguridad del código.

### **Definición de Interfaces**
Se define una interfaz usando la palabra clave `interface`:
```typescript
interface Persona {
  nombre: string;
  edad: number;
  esEstudiante?: boolean;  // Propiedad opcional
}
```
En este ejemplo, la propiedad `esEstudiante` es opcional, lo que significa que un objeto que implemente esta interfaz no necesita incluirla.

### **Uso de Interfaces**
Para utilizar la interfaz, creamos un objeto que cumpla con su estructura:
```typescript
const juan: Persona = {
  nombre: "Juan",
  edad: 25,
  esEstudiante: true,
};

const maria: Persona = {
  nombre: "María",
  edad: 30,
  // esEstudiante no es obligatorio
};
```

### **Extender Interfaces**
Podemos extender interfaces para crear nuevas estructuras:
```typescript
interface Trabajador extends Persona {
  puesto: string;
  salario: number;
}

const carlos: Trabajador = {
  nombre: "Carlos",
  edad: 40,
  puesto: "Ingeniero",
  salario: 50000,
};
```

## **Ejercicio 1: Crear una Interfaz**
Crea una interfaz `Vehiculo` con propiedades `marca`, `modelo` y `anio`. Luego, implementa esta interfaz en un objeto que represente un coche específico.

---

## **3.2. Tipos Avanzados**

### **Uniones de Tipos**
Las uniones permiten que una variable tenga uno de varios tipos posibles:
```typescript
let id: number | string;
id = 123;      // Válido
id = "abc";    // También válido
```
Esto es útil para casos donde un valor puede tener múltiples tipos, como un ID que puede ser un número o una cadena.

### **Intersecciones de Tipos**
Las intersecciones combinan múltiples tipos en uno solo:
```typescript
interface Usuario {
  nombre: string;
  email: string;
}

interface Admin {
  nivelAcceso: number;
}

type UsuarioAdmin = Usuario & Admin;

const admin: UsuarioAdmin = {
  nombre: "Ana",
  email: "ana@ejemplo.com",
  nivelAcceso: 1,
};
```

## **Ejercicio 2: Intersección de Tipos**
Crea dos interfaces, `Estudiante` y `Curso`, y utiliza una intersección para definir una nueva interfaz `EstudianteCurso` que contenga propiedades de ambas.

---

## **3.3. Tipos Genéricos**

Los tipos genéricos permiten crear componentes que pueden trabajar con diferentes tipos sin perder la información del tipo específico.

### **Definición de Funciones Genéricas**
```typescript
function identidad<T>(valor: T): T {
  return valor;
}

const numero = identidad(123);  // T es inferido como number
const texto = identidad("Hola"); // T es inferido como string
```
Las funciones genéricas son útiles cuando se necesita escribir una función que opere con múltiples tipos de datos.

### **Uso de Genéricos en Clases**
```typescript
class Caja<T> {
  private contenido: T;

  constructor(contenido: T) {
    this.contenido = contenido;
  }

  obtenerContenido(): T {
    return this.contenido;
  }
}

const cajaNumero = new Caja<number>(123);
const cajaTexto = new Caja<string>("Hola");

console.log(cajaNumero.obtenerContenido()); // 123
console.log(cajaTexto.obtenerContenido()); // "Hola"
```

### **Genéricos en Interfaces**
Las interfaces también pueden ser genéricas:
```typescript
interface Resultado<T> {
  datos: T;
  exito: boolean;
}

function manejarResultado<T>(resultado: Resultado<T>): void {
  if (resultado.exito) {
    console.log("Datos:", resultado.datos);
  } else {
    console.log("Error al obtener los datos.");
  }
}

const resultadoUsuario: Resultado<Usuario> = { datos: { nombre: "Luis", email: "luis@ejemplo.com" }, exito: true };
manejarResultado(resultadoUsuario);
```

## **Ejercicio 3: Clase Genérica**
Crea una clase `Pila` que pueda almacenar elementos de cualquier tipo y que tenga métodos para agregar y quitar elementos.

---

## **3.4. Enums**

Los **enums** (enumeraciones) permiten definir un conjunto de constantes relacionadas con un nombre, lo que mejora la legibilidad del código.

### **Definición de Enums**
Se definen utilizando la palabra clave `enum`:
```typescript
enum Direccion {
  Norte,
  Sur,
  Este,
  Oeste,
}
```
Los valores son asignados automáticamente comenzando desde 0, pero se pueden personalizar.

### **Uso de Enums**
Puedes utilizar el enum como cualquier otro tipo:
```typescript
let direccionActual: Direccion = Direccion.Norte;

if (direccionActual === Direccion.Norte) {
  console.log("Vas hacia el norte.");
}
```

### **Enums con Valores Personalizados**
Puedes asignar valores específicos a los miembros del enum:
```typescript
enum Estado {
  Activo = "activo",
  Inactivo = "inactivo",
  Pendiente = "pendiente",
}

let estadoUsuario: Estado = Estado.Activo;

console.log(estadoUsuario); // "activo"
```

### **Ejemplo Avanzado de Enums**
Imagina que estamos construyendo una aplicación de gestión de tareas:
```typescript
enum Prioridad {
  Baja = 1,
  Media,
  Alta,
}

interface Tarea {
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
}

const tarea1: Tarea = {
  titulo: "Hacer la compra",
  descripcion: "Comprar frutas y verduras",
  prioridad: Prioridad.Alta,
};

console.log(`La tarea "${tarea1.titulo}" tiene prioridad ${tarea1.prioridad}.`); // "La tarea "Hacer la compra" tiene prioridad 3."
```

## **Ejercicio 4: Uso de Enums**
Crea un enum llamado `Color` con valores como `Rojo`, `Verde` y `Azul`. Luego, crea una función que acepte un parámetro de tipo `Color` y devuelva un mensaje que indique el color seleccionado.

---

## **3.5. Uso de Módulos y Espacios de Nombres**

Los **módulos** y **espacios de nombres** permiten organizar el código y evitar conflictos de nombres, facilitando la reutilización y la estructura del código.

### **Definición de Módulo**
Para utilizar módulos, asegúrate de tener configurado el archivo `tsconfig.json` con `"module": "commonjs"` o `"module": "esnext"`.

```typescript
// archivo: matematicas.ts
export function sumar(a: number, b: number): number {
  return a + b;
}

export function restar(a: number, b: number): number {
  return a - b;
}
```

### **Importación de Módulo**
```typescript
// archivo: app.ts
import { sumar, restar } from './matematicas';

const suma = sumar(5, 10);
const diferencia = restar(10, 5);

console.log(`Suma: ${suma}`);         // Suma: 15
console.log(`Diferencia: ${diferencia}`); // Diferencia: 5
```

### **Espacios de Nombres**
Los espacios de nombres se utilizan para agrupar código relacionado:
```typescript
namespace Utilidades {
  export function log(mensaje: string): void {
    console.log(mensaje);
  }
}

// Uso del espacio de nombres
Utilidades.log("Este es un mensaje de log.");
```

### **Ejemplo de Espacios de Nombres**
Supongamos que tenemos varias utilidades matemáticas:
```typescript
namespace MathUtils {
  export function suma(a: number, b: number): number {
    return a + b;
  }

  export function resta(a: number, b: number): number {
    return a - b;
  }
}

// Uso del espacio de nombres
console.log(MathUtils.suma(3, 4)); // 7
console.log(MathUtils.resta(10, 5)); // 5
```

## **Ejercicio 5: Módulos y Espacios de Nombres**
Crea un módulo llamado `geometria.ts` que contenga funciones para calcular el área y el perímetro de un rectángulo. Luego, importa y utiliza estas funciones en otro archivo.

---

## **Conclusión del Capítulo 3**
En este capítulo, hemos explorado las interfaces, tipos avanzados, genéricos y enums en TypeScript. Comprender estas características es esencial para crear aplicaciones escalables y bien organizadas, permitiendo un código más legible y mantenible.
