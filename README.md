# Pomodoro Timer - React Hooks

Este proyecto es un ejercicio práctico para dominar el uso de los hooks fundamentales de React: `useState`, `useEffect` y `useRef`. Se implementó un sistema de temporizador Pomodoro con tres niveles de complejidad progresiva.

## Características por Nivel

### Nivel 1: Temporizador Básico
Implementación de la lógica central del timer.
- Visualización de tiempo en formato `MM:SS`.
- Funcionalidad de Inicio, Pausa y Reinicio.
- Uso de `useRef` para la gestión eficiente del intervalo.
- **Screenshot:** `screenshots/nivel1.jpg`

### Nivel 2: Modos y Sesiones
Extensión de la lógica para soportar ciclos de trabajo y descanso.
- Alternancia automática entre modo **Trabajo** (25 min) y **Descanso** (5 min).
- Historial de sesiones completadas con registro de hora.
- Reinicio total del sistema (tiempo, modo e historial).
- **Screenshots:** `screenshots/level2wrk.jpg` (Trabajo), `screenshots/level2rest.jpg` (Descanso)

### Nivel 3: Personalización y Estadísticas
Nivel avanzado con control total del usuario y retroalimentación visual.
- Configuración personalizada de minutos de trabajo y descanso (1-60 min).
- **Barra de progreso visual** que se actualiza en tiempo real.
- **Estadísticas acumuladas:** Total de sesiones y tiempo total de enfoque.
- **Sesiones Parciales:** Botón para guardar el progreso actual sin interrumpir el timer.
- Alerta sonora al finalizar cada ciclo.
- **Screenshots:** `screenshots/lvl3pt1.jpg`, `screenshots/lvl3pt2.jpg`

---

## Interfaz Personalizada: "Deep Sea Focus"
El proyecto utiliza un diseño personalizado llamado **Deep Sea**, caracterizado por:
- Paleta de colores oscuros con acentos en **Jade** (Trabajo) y **Aqua** (Descanso).
- Efectos de brillo (glow) y animaciones de pulso orgánicas.
- Layout centrado y responsivo con navegación por pestañas para cada nivel.

---

## Cómo ejecutar el proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## Estructura del Proyecto

- `src/Level1.jsx`: Lógica base del temporizador.
- `src/Level2.jsx`: Lógica de alternancia de modos y registro simple.
- `src/Level3.jsx`: Lógica avanzada, configuración y estadísticas.
- `src/App.jsx`: Orquestador con navegación por niveles.
- `src/App.css`: Estilos unificados bajo el tema "Deep Sea".
