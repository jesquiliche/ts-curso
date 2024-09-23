---
sidebar_position: 7
---
# Capítulo 7: Decoradores en TypeScript

Los **decoradores** en TypeScript son una característica poderosa que permite modificar el comportamiento de clases, métodos, propiedades, y parámetros de manera declarativa. Los decoradores se inspiran en los patrones de programación orientada a aspectos y ofrecen una forma limpia de añadir funcionalidad adicional sin modificar directamente el código base. Son ampliamente utilizados en frameworks como **Angular** y **NestJS**, y son una herramienta clave para estructurar código de manera más eficiente y mantenible.

En este capítulo exploraremos qué son los decoradores, cómo se usan, y cómo podemos crear nuestros propios decoradores en TypeScript.

## **7.1. ¿Qué es un Decorador?**

Un **decorador** es una función especial que se aplica a clases, métodos, propiedades o parámetros. Puede ser visto como un envoltorio que "decora" o añade funcionalidades adicionales a estos elementos. Los decoradores en TypeScript aún están en una etapa experimental y requieren que habilites las opciones `experimentalDecorators` y `emitDecoratorMetadata` en tu archivo `tsconfig.json` para usarlos:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### **7.1.1. Sintaxis básica de los Decoradores**

La sintaxis de un decorador consiste en anteponer el símbolo `@` antes del nombre del decorador y aplicarlo directamente a un elemento (clase, método, propiedad, etc.). Los decoradores se invocan en el momento de la compilación, no en el momento de ejecución.

```typescript
function MiDecorador(target: any) {
  console.log("Decorador aplicado a:", target);
}

@MiDecorador
class MiClase {
  constructor() {
    console.log("Clase inicializada");
  }
}
```

Al ejecutar este código, el decorador `MiDecorador` se ejecuta antes de que se inicialice la clase.

## **7.2. Tipos de Decoradores en TypeScript**

TypeScript admite varios tipos de decoradores. A continuación, exploramos los cuatro tipos principales de decoradores.

### **7.2.1. Decoradores de Clases**

Un **decorador de clase** se aplica directamente a una clase, lo que permite modificar o extender su comportamiento. El decorador recibe como argumento el constructor de la clase.

#### Ejemplo:

```typescript
function Sellable(constructor: Function) {
  constructor.prototype.isSellable = true;
}

@Sellable
class Producto {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

const prod = new Producto("Laptop");
console.log((prod as any).isSellable); // true
```

En este ejemplo, el decorador `Sellable` añade una nueva propiedad `isSellable` a cualquier clase a la que se aplique.

### **7.2.2. Decoradores de Métodos**

Los **decoradores de métodos** permiten modificar el comportamiento de un método. Reciben tres parámetros:

1. El prototipo de la clase.
2. El nombre del método.
3. La descripción del método (descriptor).

#### Ejemplo:

```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Llamando a ${propertyKey} con argumentos: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculadora {
  @Log
  sumar(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculadora();
console.log(calc.sumar(5, 10)); 
```

El decorador `Log` intercepta la ejecución del método `sumar` y añade un registro de los argumentos antes de llamar al método original.

### **7.2.3. Decoradores de Propiedades**

Los **decoradores de propiedades** permiten añadir metadatos o modificar el comportamiento de las propiedades de una clase. Reciben dos parámetros:

1. El prototipo de la clase.
2. El nombre de la propiedad.

#### Ejemplo:

```typescript
function MinLength(length: number) {
  return function (target: any, propertyKey: string) {
    let value: string;

    const getter = () => value;
    const setter = (newVal: string) => {
      if (newVal.length < length) {
        throw new Error(`${propertyKey} debe tener al menos ${length} caracteres.`);
      }
      value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

class Usuario {
  @MinLength(5)
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

const usuario = new Usuario("Juan"); // Error: nombre debe tener al menos 5 caracteres
```

En este ejemplo, el decorador `MinLength` asegura que la propiedad `nombre` tenga al menos 5 caracteres.

### **7.2.4. Decoradores de Parámetros**

Los **decoradores de parámetros** permiten modificar el comportamiento de los parámetros de un método. Reciben tres parámetros:

1. El prototipo de la clase.
2. El nombre del método.
3. El índice del parámetro.

#### Ejemplo:

```typescript
function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parámetro decorado en ${propertyKey}, índice: ${parameterIndex}`);
}

class Vehiculo {
  arrancar(@LogParameter velocidad: number) {
    console.log(`El vehículo arranca a ${velocidad} km/h`);
  }
}

const coche = new Vehiculo();
coche.arrancar(100); 
```

El decorador `LogParameter` añade un log cada vez que un parámetro es decorado.

## **7.3. Creación de Decoradores Personalizados**

Ahora que entendemos los diferentes tipos de decoradores, veamos cómo crear nuestros propios decoradores personalizados. El proceso es simple: basta con definir una función y aplicar la lógica que queramos.

### **7.3.1. Decorador de Clase con Argumentos**

Podemos crear decoradores que acepten argumentos personalizados, lo que permite una mayor flexibilidad.

```typescript
function Etiqueta(etiqueta: string) {
  return function (constructor: Function) {
    constructor.prototype.etiqueta = etiqueta;
  };
}

@Etiqueta("Clase de Producto")
class Producto {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }
}

const prod = new Producto("Mesa");
console.log((prod as any).etiqueta); // "Clase de Producto"
```

Este decorador añade una propiedad `etiqueta` a la clase `Producto`, utilizando el argumento proporcionado al decorador.

### **7.3.2. Decorador de Método con Temporizador**

Un decorador interesante que se puede crear es un temporizador para medir cuánto tarda un método en ejecutarse.

```typescript
function Temporizador(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.time(propertyKey);
    const resultado = originalMethod.apply(this, args);
    console.timeEnd(propertyKey);
    return resultado;
  };

  return descriptor;
}

class Tareas {
  @Temporizador
  ejecutarTarea(tiempo: number) {
    for (let i = 0; i < tiempo; i++) {
      // Simulando trabajo
    }
  }
}

const tarea = new Tareas();
tarea.ejecutarTarea(1000000); 
```

Este decorador `Temporizador` mide el tiempo que tarda en ejecutarse el método `ejecutarTarea`.

## **7.4. Decoradores en Frameworks Populares**

TypeScript permite que los decoradores se integren perfectamente con frameworks como Angular y NestJS. En estos frameworks, los decoradores son utilizados para definir componentes, controladores, servicios, y más.

### **7.4.1. Decoradores en Angular**

En Angular, los decoradores son esenciales para definir componentes, directivas y otros elementos.

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi Aplicación Angular';
}
```

En este ejemplo, el decorador `@Component` marca la clase como un componente de Angular, asociando la lógica de la clase con una vista HTML.

### **7.4.2. Decoradores en NestJS**

NestJS utiliza decoradores para definir controladores y rutas de manera declarativa.

```typescript
@Controller('usuarios')
export class UsuarioController {
  @Get()
  obtenerUsuarios(): string {
    return "Lista de usuarios";
  }
}
```

Aquí, el decorador `@Controller` define una clase como un controlador de NestJS, mientras que `@Get` define una ruta GET para el método `obtenerUsuarios`.

## **7.5. Limitaciones y Consideraciones**

A pesar de su poder, los decoradores también tienen algunas limitaciones:

- **Experimental**: Como se mencionó antes, los decoradores son una característica experimental en TypeScript. Aunque se espera que se mantengan en futuras versiones, aún no son parte del estándar oficial de JavaScript.
- **Complejidad**: Un uso

 excesivo de decoradores puede complicar la legibilidad del código si no se utilizan con moderación.
- **Compatibilidad**: No todos los entornos de ejecución soportan decoradores, por lo que es importante verificar su compatibilidad si estás trabajando en aplicaciones multiplataforma.

---

Con esto concluye el **Capítulo 7: Decoradores en TypeScript**. Hemos cubierto los fundamentos de los decoradores, los tipos más comunes y cómo crear nuestros propios decoradores personalizados. Los decoradores permiten añadir funcionalidad de manera más declarativa y estructurada, facilitando la lectura y mantenimiento del código.
