# Pomodoro Timer - React Hooks

Este proyecto es un ejercicio para practicar el uso de los hooks `useState`, `useEffect` y `useRef` en React.

## Nivel 1: Timer Básico (Completado)

Se ha implementado un temporizador Pomodoro con las siguientes funcionalidades:
- Visualización del tiempo en formato `MM:SS`.
- Botón para iniciar y pausar el temporizador.
- Botón para reiniciar el temporizador a 25 minutos.
- Uso de `useEffect` para la lógica del intervalo y limpieza.
- Uso de `useRef` para almacenar el ID del intervalo.

## Cómo ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

- `src/Pomodoro.jsx`: Componente principal del temporizador.
- `src/App.jsx`: Contenedor principal.
- `src/App.css`: Estilos básicos.
