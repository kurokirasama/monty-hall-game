# Monty Hall Simulator Application

A web-based simulator for the classic [Monty Hall Problem](https://en.wikipedia.org/wiki/Monty_Hall_problem). This interactive application helps users understand the counter-intuitive probability puzzle through gameplay and real-time statistics.

## 🎮 Features

-   **Interactive Gameplay:** Simulate the TV show experience: pick a door, decide to switch or stay, and see the outcome.
-   **Real-time Statistics:** Track wins, losses, and percentages for both "Switched" and "Stayed" strategies to visualize the probability advantage.
-   **Retro Aesthetic:** Features a pixel-art inspired visual style with distinct color schemes.
-   **Audio Feedback:** Sound effects for winning and losing conditions.
-   **Bilingual Support:** The interface text is primarily in Spanish.

## 🔗 Live Demo

Experience the live application here: [https://monty-hall.kks.qzz.io](https://monty-hall.kks.qzz.io)

## 🛠️ Technologies

-   **HTML5:** Semantic structure.
-   **CSS3:** Responsive design and retro styling.
-   **Vanilla JavaScript:** Game logic, state management, and statistics tracking.
-   **Node.js:** Simple HTTP server for local development.

## 📂 Project Structure

```
/
├── index.html      # Main application entry point
├── style.css       # Application styling
├── script.js       # Core game logic
├── server.js       # Local HTTP server script
├── images/         # Game assets (cars, goats)
├── sounds/         # Audio assets (win, lose)
└── fonts/          # Custom typography
```

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) installed on your machine.

### Running Locally

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Start the local server:**
    ```bash
    node server.js
    ```

3.  **Open the application:**
    Visit `http://localhost:8002/` in your web browser.

## 🌐 Deployment (Optional)

The application can be exposed to the internet using **Cloudflare Tunnel**.

1.  **Install Cloudflared:** Follow [Cloudflare's documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/).
2.  **Authenticate:** `cloudflared tunnel login`.
3.  **Create a Tunnel:** `cloudflared tunnel create monty-hall-tunnel`.
4.  **Configure:** Create a `config.yml` mapping your domain to `http://localhost:8002`.
5.  **Run:** `cloudflared tunnel run monty-hall-tunnel`.

## 👨‍💻 Development

-   **Game State:** Managed via a centralized `game` object.
-   **Statistics:** Accumulated per session (reset on page reload).
-   **Audio:** Initialized on DOM load to comply with autoplay policies.

---
*Developed as an educational tool to demonstrate probability concepts.*
