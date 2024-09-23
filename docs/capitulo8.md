---
sidebar_position: 8
---
# Capítulo 8: Integración de TypeScript con Next.js y Prisma utilizando App Router

La combinación de **TypeScript**, **Next.js** y **Prisma** permite construir aplicaciones web robustas y escalables. En este capítulo, aprenderemos a integrar estos tres componentes utilizando el **App Router** de Next.js, lo que nos permitirá crear APIs eficientes y mantener un código bien tipado.

## **8.1. Creación de una API con Next.js y TypeScript**

Con el **App Router** de Next.js, puedes crear una API de manera sencilla y organizada. Las rutas se definen en la carpeta `app/api`, donde cada archivo puede exportar funciones para manejar diferentes tipos de peticiones HTTP.

### **Ejemplo de API GET:**

1. Crea un archivo llamado `route.ts` en `app/api/usuarios/`.

```typescript
// app/api/usuarios/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const usuarios = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "María" },
  ];

  return NextResponse.json(usuarios);
}
```

En este ejemplo, hemos creado un endpoint que devuelve una lista de usuarios en formato JSON.

### **Ejemplo de API POST:**

```typescript
// app/api/usuarios/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const nuevoUsuario = {
    id: Date.now(),
    ...data,
  };

  return NextResponse.json(nuevoUsuario);
}
```

Aquí, aceptamos un **POST** que recibe datos JSON y crea un nuevo usuario.

## **8.2. Tipado de datos en Next.js**

TypeScript permite tipar los datos que manejamos en Next.js, lo que mejora la seguridad del código. Vamos a definir un tipo para nuestros usuarios.

### **Definición de Tipo:**

```typescript
interface Usuario {
  id: number;
  nombre: string;
}
```

### **Uso del Tipo en la API:**

```typescript
export async function GET() {
  const usuarios: Usuario[] = [
    { id: 1, nombre: "Juan" },
    { id: 2, nombre: "María" },
  ];

  return NextResponse.json(usuarios);
}
```

Esto garantiza que la respuesta de nuestra API será un array de objetos del tipo `Usuario`.

## **8.3. Configuración de Prisma en un Proyecto TypeScript**

**Prisma** es un ORM que facilita la interacción con bases de datos. Para usarlo en Next.js con TypeScript, debemos configurarlo adecuadamente.

### **Pasos de Configuración:**

1. **Instalación**:

   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configura la base de datos en `.env`**:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mi_base_de_datos"
   ```

3. **Define el esquema Prisma** en `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Usuario {
     id      Int     @id @default(autoincrement())
     nombre  String
     email   String  @unique
   }
   ```

4. **Ejecuta la migración**:

   ```bash
   npx prisma migrate dev --name init
   ```

## **8.4. Definición de Modelos en Prisma con TypeScript**

Prisma genera automáticamente un cliente que podemos utilizar para interactuar con nuestra base de datos.

### **Ejemplo de Uso del Cliente Prisma**:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function obtenerUsuarios() {
  return await prisma.usuario.findMany();
}
```

Con esta función, podemos obtener todos los usuarios de la base de datos, asegurando que el resultado esté correctamente tipado.

## **8.5. Ejecución de Consultas Tipadas en Prisma**

Prisma proporciona un acceso seguro a los datos mediante consultas tipadas. Esto significa que cualquier error de tipo se detectará en tiempo de compilación.

### **Consulta con Prisma**:

```typescript
export async function obtenerUsuarioPorId(id: number) {
  return await prisma.usuario.findUnique({ where: { id } });
}
```

TypeScript garantiza que el resultado de esta función será del tipo `Usuario | null`, lo que nos obliga a manejar ambos casos en nuestro código.

## **8.6. Operaciones CRUD con Prisma**

Para completar nuestra API, implementaremos las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para manejar usuarios.

### **Paso 1: Crear Endpoints CRUD**

Crea el archivo `route.ts` en `app/api/usuarios/`.

#### **GET - Obtener todos los usuarios**:

```typescript
// app/api/usuarios/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}
```

#### **POST - Crear un nuevo usuario**:

```typescript
// app/api/usuarios/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  const nuevoUsuario = await prisma.usuario.create({ data });
  return NextResponse.json(nuevoUsuario);
}
```

#### **PUT - Actualizar un usuario**:

```typescript
// app/api/usuarios/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const usuarioActualizado = await prisma.usuario.update({
    where: { id: parseInt(params.id) },
    data,
  });

  return NextResponse.json(usuarioActualizado);
}
```

#### **DELETE - Eliminar un usuario**:

```typescript
// app/api/usuarios/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.usuario.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: 'Usuario eliminado' });
}
```

### **Conclusión del Capítulo**

En este capítulo, hemos aprendido a integrar **TypeScript**, **Next.js** y **Prisma** utilizando el **App Router**. Hemos creado una API REST completa que maneja operaciones CRUD para usuarios, asegurando que cada parte de nuestra aplicación esté tipada y sea fácil de mantener. Esta integración no solo mejora la productividad del desarrollo, sino que también garantiza la seguridad y la escalabilidad de nuestras aplicaciones.
