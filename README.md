<p align="center">
  <img src="public/assets/sibic-logo.png" alt="SIBIC" width="280" />
</p>

<p align="center">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.4.6-000?logo=nextdotjs&logoColor=white" /></a>
  <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" /></a>
  <a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" /></a>
  <a href="https://tailwindcss.com"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white" /></a>
  <img alt="Progressive Web App" src="https://img.shields.io/badge/PWA-progressive%20web%20app-5A0FC8" />
</p>

<p align="center">
  Aplicación web progresiva para consultar candidaturas, comparar propuestas y recorrer el contexto de las elecciones desde el celular o el escritorio.
</p>

SIBIC es una progressive web app: se puede instalar en el teléfono o en el escritorio y abrirse como una aplicación. Lee candidatos, temas, propuestas y preguntas desde una hoja de Google. Esa hoja es la fuente de los datos: la aplicación no vuelve a crear filas que se hayan borrado. Las cuentas y las respuestas de Aprende y de Mi Brújula sí se guardan en la hoja cuando alguien inicia sesión o contesta.

## Ejecución

Requiere Node.js 20 o posterior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Completa `.env.local` con el id de la hoja, la cuenta de servicio que tenga acceso a ella y el secreto de autenticación. Las variables están nombradas en `.env.example`.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Sirve la compilación |
| `npm run lint` | Revisa el código |
| `npm run sheets:bootstrap` | Crea las pestañas que falten, solo con encabezados |

`sheets:bootstrap` no escribe candidatos, propuestas ni preguntas. Si una pestaña ya existe, la deja como está.

## Qué incluye

- **Elecciones.** Listado de candidaturas y ficha de cada persona.
- **Compara.** Propuestas agrupadas por tema.
- **Aprende.** Recorrido por secciones, con sesión iniciada.
- **Mi Brújula.** Cuestionario cuyas respuestas quedan ligadas a la persona que las dio.
