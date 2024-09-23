---
sidebar_position: 9
---
# Capítulo 9: TypeScript en React

## 9.1. Introducción a TypeScript en React

React 18 introduce mejoras en la forma en que construimos aplicaciones, y TypeScript potencia esta experiencia al ofrecer tipado estático. Esto ayuda a detectar errores en tiempo de desarrollo y proporciona autocompletado y documentación contextual en tu IDE.

## 9.2. Configuración del Proyecto

Para comenzar a usar TypeScript con React, puedes crear un nuevo proyecto utilizando Create React App:

```bash
npx create-react-app my-app --template typescript
```

Esto configurará un nuevo proyecto de React con TypeScript preinstalado.

## 9.3. Tipado de Componentes

En React, puedes definir componentes utilizando funciones o clases. A continuación, se muestra cómo tipar un componente funcional:

```typescript
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

## 9.4. Estado y Props Tipados

Puedes tipar tanto el estado como las props en componentes de clase y funcionales. Aquí tienes un ejemplo utilizando hooks:

```typescript
import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
```

## 9.5. Manejo de Eventos

El manejo de eventos en TypeScript es similar al de JavaScript, pero puedes tipar los eventos para mayor claridad:

```typescript
const Button: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', event);
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

## 9.6. Ejemplo Práctico: Formulario con Varios Campos

A continuación, un ejemplo de formulario que recopila información del usuario utilizando diferentes tipos de campos. Este formulario incluye campos de texto, fecha y número:

```typescript
import React, { useState } from 'react';

// Definimos la interfaz para los datos del formulario
interface FormData {
  name: string;
  email: string;
  birthDate: string;
  age: number | '';
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    birthDate: '',
    age: '',
  });

  // Handler para los cambios en los campos del formulario
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler para el envío del formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Aquí puedes agregar la lógica para enviar los datos a la API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min={1}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
```

## **Conclusión**

En este capítulo, hemos explorado cómo utilizar TypeScript en React 18, incluyendo la configuración del proyecto, tipado de componentes, manejo de estado y eventos, y la creación de un formulario interactivo. Estas prácticas mejoran la calidad y mantenibilidad del código en tus aplicaciones React.
