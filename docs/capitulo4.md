---
sidebar_position: 4
---
# Capítulo 4: Programación Orientada a Objetos (OOP) en TypeScript

## **Objetivo del Capítulo**
Al finalizar este capítulo, los lectores comprenderán los principios fundamentales de la programación orientada a objetos y cómo aplicarlos en TypeScript, utilizando clases, herencia, encapsulamiento, polimorfismo, clases abstractas y el uso de getters y setters.

---

## **4.1. Introducción a la Programación Orientada a Objetos**

La programación orientada a objetos es un paradigma que organiza el software en "objetos". Cada objeto combina datos (atributos) y comportamientos (métodos), permitiendo a los desarrolladores modelar problemas de una manera más intuitiva y cercana a cómo percibimos el mundo real. Por ejemplo, al pensar en una clase como un plano, podemos imaginar que cada objeto creado a partir de este plano tiene características y acciones específicas.

Los principales beneficios de la OOP son:

- **Modularidad**: Los objetos encapsulan datos y comportamientos, lo que permite una mejor organización del código.
- **Reutilización**: Las clases y métodos pueden ser reutilizados en diferentes partes del código o en diferentes proyectos.
- **Mantenibilidad**: Al estar bien estructurado, es más fácil realizar cambios y mejoras en el código.

## **4.2. Clases y Objetos**

En TypeScript, una clase se define usando la palabra clave `class`. Una clase actúa como un molde que describe un tipo particular de objeto. Por ejemplo, considera la clase `Persona`, que define propiedades como `nombre` y `edad`, y métodos como `presentar`.

### **Definición de una Clase**
```typescript
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  presentar(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
  }
}
```

Cuando creamos un objeto a partir de esta clase, como `juan`, estamos instanciando un molde específico con características únicas.

### **Creación de Objetos**
```typescript
const juan = new Persona("Juan", 30);
console.log(juan.presentar()); // "Hola, soy Juan y tengo 30 años."
```

## **4.3. Métodos Públicos y Privados**

Los métodos en TypeScript también pueden ser definidos con modificadores de acceso. Los métodos públicos son accesibles desde cualquier parte del código, mientras que los métodos privados solo son accesibles dentro de la propia clase. Esto permite controlar el acceso a la lógica de la clase y mantener su integridad.

- **Métodos Públicos**: Son el tipo predeterminado de método y pueden ser llamados desde cualquier lugar donde la instancia de la clase esté accesible.
- **Métodos Privados**: Se definen usando la palabra clave `private` y no pueden ser llamados desde fuera de la clase.

### **Ejemplo de Métodos Públicos y Privados**
```typescript
class CuentaBancaria {
  private saldo: number;

  constructor(saldoInicial: number) {
    this.saldo = saldoInicial;
  }

  public depositar(monto: number): void {
    this.saldo += monto;
  }

  public obtenerSaldo(): number {
    return this.saldo;
  }

  private registrarTransaccion(monto: number): void {
    console.log(`Transacción de ${monto} realizada.`);
  }
}

const cuenta = new CuentaBancaria(1000);
cuenta.depositar(500);
console.log(cuenta.obtenerSaldo()); // 1500
// cuenta.registrarTransaccion(500); // Error: Property 'registrarTransaccion' is private
```

## **4.4. Encapsulamiento**

El encapsulamiento es el principio que restringe el acceso a algunos de los componentes de un objeto. Imagina que un objeto es como una caja que guarda información. En el caso de una cuenta bancaria, no quieres que cualquiera pueda ver tu saldo o hacer retiros sin autorización. En TypeScript, esto se logra mediante modificadores de acceso como `private` y `protected`.

## **4.5. Getters y Setters**

Los getters y setters son métodos que permiten acceder y modificar propiedades privadas de una clase de manera controlada. Proporcionan una forma de encapsular la lógica de acceso a las propiedades, lo que puede ser útil para realizar validaciones o cálculos adicionales.

### **Uso de Getters y Setters**
```typescript
class Persona {
  private _nombre: string;
  private _edad: number;

  constructor(nombre: string, edad: number) {
    this._nombre = nombre;
    this._edad = edad;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }

  get edad(): number {
    return this._edad;
  }

  set edad(nuevaEdad: number) {
    if (nuevaEdad >= 0) {
      this._edad = nuevaEdad;
    } else {
      console.log("La edad no puede ser negativa.");
    }
  }

  presentar(): string {
    return `Hola, soy ${this._nombre} y tengo ${this._edad} años.`;
  }
}

const juan = new Persona("Juan", 30);
console.log(juan.presentar()); // "Hola, soy Juan y tengo 30 años."
juan.nombre = "Carlos";
juan.edad = -5; // "La edad no puede ser negativa."
console.log(juan.presentar()); // "Hola, soy Carlos y tengo 30 años."
```

## **4.6. Herencia**

La herencia permite que una clase (subclase) herede propiedades y métodos de otra clase (superclase), fomentando la reutilización del código. Piensa en una clase base `Animal` de la que pueden derivar clases como `Perro` y `Gato`. Ambas comparten características generales, pero pueden tener comportamientos específicos.

### **Definición de Herencia**
```typescript
class Animal {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  hacerSonido(): void {
    console.log(`${this.nombre} hace un sonido.`);
  }
}

class Perro extends Animal {
  constructor(nombre: string, public raza: string) {
    super(nombre); // Llama al constructor de la clase base
    console.log(`${nombre} es un perro de raza ${raza}.`);
  }

  hacerSonido(): void {
    console.log(`${this.nombre} ladra.`);
  }

  presentar(): void {
    super.hacerSonido(); // Llamada al método de la superclase
  }
}

class Gato extends Animal {
  hacerSonido(): void {
    console.log(`${this.nombre} maulla.`);
  }

  presentar(): void {
    super.hacerSonido(); // Llamada al método de la superclase
  }
}

const miPerro = new Perro("Rex", "Labrador");
const miGato = new Gato("Miau");

miPerro.presentar(); // "Rex hace un sonido." y "Rex ladra."
miGato.presentar(); // "Miau hace un sonido." y "Miau maulla."
```

## **4.7. Sobrescritura del Constructor**

En TypeScript, el constructor de una clase puede ser sobrescrito en una subclase. Al crear una subclase, puedes definir un nuevo constructor que llame al constructor de la clase base usando la palabra clave `super()`. Esto permite inicializar la parte de la clase base y luego agregar lógica adicional en el constructor de la subclase.

### **Ejemplo de Sobrescritura del Constructor**
```typescript
class Animal {
  constructor(public nombre: string) {
    console.log(`${nombre} ha sido creado.`);
  }
}

class Perro extends Animal {
  constructor(nombre: string, public raza: string) {
    super(nombre); // Llama al constructor de la clase base
    console.log(`${nombre} es un perro de raza ${raza}.`);
  }
}

const miPerro = new Perro("Rex", "Labrador");
// Salida:
// "Rex ha sido creado."
// "Rex es un perro de raza Labrador."
```

## **4.8. Polimorfismo**

El polimorfismo permite que diferentes objetos respondan de manera distinta a la misma acción. Esto significa que puedes usar la misma interfaz para distintos tipos de objetos, y cada uno de ellos implementará la acción de acuerdo con su propio comportamiento.

#### **Ejemplo de Polimorfismo**
```typescript
class Vehiculo {
  mover(): void {
    console.log("El vehículo se mueve.");
  }
}

class Coche extends Vehiculo {
  mover(): void {
    console.log("El coche se mueve por la carretera.");
  }
}

class Bicicleta extends Vehiculo {
  mover(): void {
    console.log("La bicicleta se mueve en dos ruedas.");
  }
}

const vehiculos: Vehiculo[] = [new Coche(), new Bicicleta()];

vehiculos.forEach(vehiculo => vehiculo.mover());
// Salida:
// "El coche se mueve por la carretera."
// "La bicicleta se mueve en dos ruedas."
```

## **4.9. Clases Abstractas**

Las clases abstractas son clases que no pueden ser instanciadas directamente y se utilizan para definir un conjunto de métodos y propiedades que deben ser implementados por las subclases. Esto

 permite establecer un contrato que las subclases deben seguir, asegurando que ciertos métodos estén presentes.

### **Ejemplo de Clase Abstracta**
```typescript
abstract class Animal {
  constructor(public nombre: string) {}

  abstract hacerSonido(): void; // Método abstracto

  presentar(): void {
    console.log(`Soy ${this.nombre}.`);
  }
}

class Perro extends Animal {
  hacerSonido(): void {
    console.log("Guau!");
  }
}

class Gato extends Animal {
  hacerSonido(): void {
    console.log("Miau!");
  }
}

const miPerro = new Perro("Rex");
const miGato = new Gato("Miau");

miPerro.presentar(); // "Soy Rex."
miPerro.hacerSonido(); // "Guau!"
miGato.presentar(); // "Soy Miau."
miGato.hacerSonido(); // "Miau!"
```

## **4.10. Ejemplo Completo: Sistema de Gestión de Usuarios**

Aquí hay un ejemplo completo que combina varias de las características discutidas en este capítulo:

```typescript
interface IUsuario {
  nombre: string;
  edad: number;
  presentar(): string;
}

abstract class Usuario implements IUsuario {
  constructor(public nombre: string, public edad: number) {}

  abstract presentar(): string;
}

class Admin extends Usuario {
  presentar(): string {
    return `Admin: ${this.nombre}, Edad: ${this.edad}`;
  }
}

class UsuarioRegular extends Usuario {
  presentar(): string {
    return `Usuario: ${this.nombre}, Edad: ${this.edad}`;
  }
}

const usuarios: Usuario[] = [
  new Admin("Carlos", 35),
  new UsuarioRegular("Ana", 28),
];

usuarios.forEach(usuario => console.log(usuario.presentar()));
// Salida:
// "Admin: Carlos, Edad: 35"
// "Usuario: Ana, Edad: 28"
```

## **4.11. Consideraciones Finales sobre OOP en TypeScript**

La programación orientada a objetos proporciona una forma poderosa de organizar y estructurar el código. A medida que los sistemas se vuelven más complejos, los principios de OOP facilitan la creación de aplicaciones más mantenibles y escalables.

- **Principio de Responsabilidad Única**: Cada clase debe tener una única responsabilidad.
- **Abierto/Cerrado**: Las clases deben estar abiertas para la extensión pero cerradas para la modificación.
- **Sustitución de Liskov**: Los objetos de una clase deben ser sustituibles por objetos de una clase base sin alterar el correcto funcionamiento del programa.
- **Segregación de Interfaces**: Las interfaces deben ser específicas para el cliente y no forzar a las clases a implementar métodos que no utilizan.
- **Inversión de Dependencias**: Las dependencias deben ser de abstracciones, no de concretos.

## **Conclusión del Capítulo 4**
En este capítulo, hemos explorado los conceptos de programación orientada a objetos en TypeScript, incluyendo clases, métodos públicos y privados, encapsulamiento, getters y setters, herencia, polimorfismo, clases abstractas e interfaces. También discutimos la sobrescritura del constructor, que permite a las subclases personalizar su inicialización. Al pensar en términos de objetos y sus interacciones, los desarrolladores pueden crear sistemas más robustos y adaptables a cambios futuros.
