# Pokédex Monorepo (React + Node.js + Desktop App)

Este repositorio contiene una aplicación Pokédex moderna que consume datos de [PokeAPI](https://pokeapi.co/). El proyecto está estructurado como un monorepo para facilitar su ejecución local, desarrollo móvil/escritorio y el despliegue automático en Vercel.

---

## Estructura del Repositorio

- `frontend/`: Aplicación SPA creada en React + Vite + TailwindCSS.
- `backend/`: Servidor API Proxy creado en Node.js (Express), encargado de consultar PokeAPI, normalizar las respuestas, manejar errores y cachear peticiones en memoria.
- `desktop/`: Aplicación de escritorio creada en Python utilizando `pywebview` para cargar el build de producción del frontend en una interfaz nativa sin bordes (frameless).
- `api/`: Carpeta contenedora del punto de entrada serverless para el despliegue en Vercel.

---

## Requisitos Previos

Asegúrate de tener instalados en tu sistema:
1. **Node.js** (versión 18 o superior) y **npm**.
2. **Python** (versión 3.9 o superior) y **pip**.

---

## 1. Ejecución Local (Desarrollo)

Para ejecutar el frontend y el backend en paralelo en tu entorno local de desarrollo:

### Paso 1: Instalar dependencias
Desde la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias de todas las áreas:
```bash
npm run install-all
```

### Paso 2: Iniciar el Servidor Backend (Express)
El servidor Express escucha en el puerto `3001` y actúa de proxy de PokeAPI.
```bash
npm run dev-backend
```
*También puedes hacerlo directamente en la carpeta `/backend` usando `npm install` y luego `npm run dev`.*

### Paso 3: Iniciar el Servidor Frontend (Vite)
Abre otra consola en la raíz del proyecto e inicia el servidor de desarrollo de React:
```bash
npm run dev-frontend
```
*O ingresando a `/frontend` con `npm run dev`. La aplicación web local estará disponible en `http://localhost:5173`.*

---

## 2. Despliegue en Vercel (Plan Gratuito)

Este repositorio está preconfigurado para desplegarse de manera unificada (Frontend + Backend Serverless) en un único proyecto de Vercel.

### Instrucciones de despliegue:

1. Crea un proyecto nuevo en **Vercel** conectado a este repositorio de GitHub.
2. Configura los siguientes parámetros en la interfaz de Vercel:
   - **Framework Preset**: `Other` o `Vite`.
   - **Root Directory**: `./` (la raíz del repositorio).
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
3. Haz clic en **Deploy**.

Vercel compilará automáticamente el frontend en `frontend/dist` y levantará las API routes expuestas a través de la carpeta raíz `/api` conectadas al backend Express.

---

## 3. Aplicación de Escritorio (Desktop Python + pywebview)

La aplicación desktop se ejecuta sobre Python y carga localmente los archivos compilados del frontend (`frontend/dist`) dentro de una ventana de escritorio nativa sin bordes (frameless) con controles personalizados diseñados en HTML/CSS/JS.

### Paso 1: Generar el build de producción del frontend
Desde la raíz, ejecuta el siguiente comando para generar los archivos estáticos de producción:
```bash
npm run build
```
*(Esto colocará el build final en `/frontend/dist`)*

### Paso 2: Configurar entorno de Python
1. Dirígete a la carpeta `desktop/`:
   ```bash
   cd desktop
   ```
2. Crea un entorno virtual (opcional pero recomendado) y actívalo:
   - **En Windows:**
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **En macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
3. Instala las dependencias necesarias:
   ```bash
   pip install -r requirements.txt
   ```

### Paso 3: Ejecutar la aplicación
Ejecuta el script principal de Python:
```bash
python app.py
```
*Nota: La aplicación de escritorio interactúa directamente con el backend local. Asegúrate de tener corriendo el servidor Express (`npm run dev-backend`) para cargar los Pokémon y gestionar los equipos en tiempo real.*
