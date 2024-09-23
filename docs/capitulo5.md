---
sidebar_position: 5
---
# Capítulo 5: Decoradores en TypeScript

Los **decoradores** son una característica avanzada de TypeScript que permite agregar meta-información a clases, métodos, propiedades y parámetros. Son similares a los patrones de anotación en otros lenguajes como Java o Python. Los decoradores proporcionan una manera estructurada de modificar el comportamiento de elementos en tiempo de compilación o ejecución.

En este capítulo, aprenderemos qué son los decoradores, cómo habilitarlos en TypeScript y cómo podemos utilizarlos en diferentes niveles de nuestras clases. Proporcionaremos ejemplos prácticos que demuestran su utilidad.

## **5.1. ¿Qué son los decoradores?**

Los **decoradores** son funciones especiales que se aplican a clases, propiedades, métodos o parámetros para añadir o modificar comportamientos. Un decorador toma como argumento el elemento que está decorando, lo analiza o lo transforma según sea necesario.

El propósito de un decorador es permitir modificar la clase o sus miembros sin cambiar el código original directamente. Los decoradores son una herramienta potente en el desarrollo de aplicaciones que requieren meta-programación, como frameworks de inyección de dependencias, bibliotecas ORM (Object-Relational Mapping), y otras.

### **Ejemplo simple de un decorador**
```typescript
function logClass(target: Function) {
  console.log(`Clase decorada: ${target.name}`);
}

@logClass
class MiClase {
  constructor() {
    console.log("Instancia creada");
  }
}

// Al instanciar la clase, se verá la salida en la consola:
const instancia = new MiClase(); 
// Salida:
// Clase decorada: MiClase
// Instancia creada
```

En este ejemplo, el decorador `@logClass` toma la clase como argumento y registra su nombre en la consola.

## **5.2. Habilitar decoradores en TypeScript**

Para utilizar decoradores en TypeScript, primero debemos habilitarlos en el archivo `tsconfig.json`. La opción `experimentalDecorators` debe estar activada:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "experimentalDecorators": true
  }
}
```

La opción `emitDecoratorMetadata` también se puede habilitar para generar metadatos adicionales que algunos frameworks, como NestJS o TypeORM, requieren para trabajar correctamente con decoradores.

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
}
```

## **5.3. Tipos de Decoradores**

En TypeScript, hay cuatro tipos principales de decoradores:

1. **Decoradores de Clase**
2. **Decoradores de Método**
3. **Decoradores de Propiedad**
4. **Decoradores de Parámetro**

Veamos cada uno de estos en detalle.

### **5.3.1. Decoradores de Clase**

Un decorador de clase se aplica directamente a la declaración de una clase. Toma el constructor de la clase como argumento y puede modificar o extender su comportamiento.

**Ejemplo:**
```typescript
function selloDeAprobacion(constructor: Function) {
  constructor.prototype.aprobado = true;
}

@selloDeAprobacion
class Producto {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

const producto = new Producto("Cerveza Artesanal");
console.log(producto.aprobado); // true
```

En este caso, el decorador `@selloDeAprobacion` agrega una nueva propiedad `aprobado` a todas las instancias de la clase decorada.

### **5.3.2. Decoradores de Método**

Los decoradores de método se aplican a funciones dentro de una clase. Se utilizan para modificar o extender el comportamiento de un método.

**Ejemplo:**
```typescript
function metodoConsola(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Llamando al método ${propertyKey} con argumentos: ${args.join(", ")}`);
    return metodoOriginal.apply(this, args);
  };
}

class Calculadora {
  @metodoConsola
  sumar(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculadora();
calc.sumar(2, 3); 
// Salida: Llamando al método sumar con argumentos: 2, 3
```

Este decorador modifica el método `sumar` para que registre en consola los argumentos con los que se llama al método.

### **5.3.3. Decoradores de Propiedad**

Los decoradores de propiedad se aplican a las propiedades de una clase. Pueden ser útiles para agregar validaciones, restricciones o realizar alguna transformación.

**Ejemplo:**
```typescript
function soloLectura(target: any, propertyKey: string) {
  const descriptor: PropertyDescriptor = {
    writable: false
  };
  return descriptor;
}

class Libro {
  @soloLectura
  titulo: string;

  constructor(titulo: string) {
    this.titulo = titulo;
  }
}

const miLibro = new Libro("El Señor de los Anillos");
miLibro.titulo = "Cambiar título"; // Error: no se puede asignar a 'titulo' porque es una propiedad de solo lectura.
```

El decorador `@soloLectura` asegura que la propiedad `titulo` no pueda ser modificada después de ser inicializada.

### **5.3.4. Decoradores de Parámetro**

Estos decoradores se utilizan para agregar metadatos sobre los parámetros de los métodos de una clase. Se pueden utilizar para validar los valores de los parámetros o inyectar dependencias.

**Ejemplo:**
```typescript
function logParametro(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`El parámetro en posición ${parameterIndex} es decorado en el método ${propertyKey}`);
}

class Usuario {
  login(@logParametro nombre: string, @logParametro clave: string) {
    console.log("Login ejecutado");
  }
}

const usuario = new Usuario();
usuario.login("Juan", "1234"); 
// Salida:
// El parámetro en posición 0 es decorado en el método login
// El parámetro en posición 1 es decorado en el método login
```

## **5.4. Ejemplos prácticos de uso de decoradores**

Los decoradores son comúnmente usados en marcos de trabajo como **NestJS** o **TypeORM**. Un ejemplo práctico puede ser un decorador que verifica si el usuario tiene permisos para acceder a un método:

```typescript
function requierePermiso(permiso: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const tienePermiso = verificarPermisoUsuario(permiso);
      if (tienePermiso) {
        return metodoOriginal.apply(this, args);
      } else {
        console.log("Acceso denegado");
        return null;
      }
    };
  };
}

class Servicio {
  @requierePermiso("admin")
  ejecutarTarea() {
    console.log("Tarea ejecutada");
  }
}

const servicio = new Servicio();
servicio.ejecutarTarea(); // "Acceso denegado" si el usuario no tiene el permiso "admin".
```

En este ejemplo, el método `ejecutarTarea` solo se ejecuta si el usuario tiene los permisos necesarios.

## **5.5. Composición de decoradores**

Puedes aplicar varios decoradores a un mismo elemento. Los decoradores se ejecutan en el orden inverso a como son declarados.

```typescript
function decorador1() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("Decorador 1 ejecutado");
  };
}

function decorador2() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("Decorador 2 ejecutado");
  };
}

class Ejemplo {
  @decorador1()
  @decorador2()
  metodo() {}
}

const e = new Ejemplo();
e.metodo(); 
// Salida:
// Decorador 2 ejecutado
// Decorador 1 ejecutado
```

## **5.6. Consideraciones de rendimiento y mejores prácticas**

Al usar decoradores, es importante tener en cuenta que, aunque proporcionan una forma poderosa de modificar el comportamiento de las clases, también pueden tener un impacto en el rendimiento si se abusa de ellos. Algunas mejores prácticas incluyen:

- Usar decoradores solo cuando sea necesario, y evitar la sobrecarga de lógica en los mismos.
- Asegurarse de que los decoradores no modifiquen el estado global o creen efectos secundarios inesperados.
- Utilizar decoradores de manera declarativa para mantener la claridad del código.

---

Este capítulo cubre los conceptos fundamentales y avanzados de decoradores en TypeScript, proporcionando ejemplos prácticos y casos de uso comunes. Si deseas más detalles o tienes algún punto en mente para mejorar, ¡házmelo saber!