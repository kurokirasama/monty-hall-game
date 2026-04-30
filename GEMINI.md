# Monty Hall Simulator Application

## Project Overview

This project implements a web-based simulator for the classic Monty Hall Problem. The application is built using HTML, CSS, and vanilla JavaScript, providing an interactive way for users to understand the probabilistic puzzle. It features a retro-inspired visual style, game logic for simulating door choices, revealing losing doors, and calculating outcomes. Comprehensive statistics are tracked for both "switched" and "stayed" choices, including win/loss counts and percentages. The application is designed to be a static client-side experience, served by a lightweight Node.js HTTP server.

**Key Technologies:**
*   **HTML:** For structuring the web page.
*   **CSS:** For styling, including responsive design and a retro aesthetic.
*   **Vanilla JavaScript:** For core game logic, user interaction, state management, and statistics tracking.
*   **Node.js (server.js):** A simple HTTP server to serve the static files locally.

## File Structure

The project has the following main files and directories:
*   `index.html`: The main entry point of the application, defining the game's structure, controls, and statistics display.
*   `style.css`: Contains all CSS rules for the application's visual presentation.
*   `script.js`: Implements the game's logic, handles user interactions, manages game state, updates statistics, and plays win/loss sounds.
*   `server.js`: A Node.js script to serve the static files over HTTP.
*   `plan.md`: The original development plan document.
*   `images/`: Contains image assets (`car.png`, `goat.png`) used in the game.
*   `sounds/`: Contains audio assets (`win.mp3`, `lose.mp3`) for game feedback.

## Building and Running

Since this is a client-side application served by a Node.js static server, there are no complex build steps.

**To run the application locally:**

1.  **Ensure Node.js is installed:** If not already installed, download and install it from [nodejs.org](https://nodejs.org/).
2.  **Start the static server:**
    *   Open your terminal in the project's root directory.
    *   Run the command: `node server.js`
    *   The server will start on `http://localhost:8002/`.
3.  **Access the application:** Open your web browser and navigate to `http://localhost:8002/`.

**To publish to the internet using Cloudflare Tunnel:**

*Prerequisites:*
*   **Cloudflare Account:** An active Cloudflare account is required.
*   **`cloudflared` installed:** The Cloudflare Tunnel daemon (`cloudflared`) must be installed on your system. Refer to the [Cloudflare documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/) for installation instructions.
*   **Authenticated `cloudflared`:** Authenticate `cloudflared` with your Cloudflare account by running `cloudflared tunnel login` and following the browser prompts.

*Steps:*
1.  **Start the local server:** Ensure your `server.js` is running on `http://localhost:8002/` in a terminal.
2.  **Create a Tunnel:**
    *   Choose a name for your tunnel (e.g., `monty-hall-tunnel`).
    *   Run: `cloudflared tunnel create monty-hall-tunnel`
    *   Note down the `<TUNNEL-ID>` provided in the output.
3.  **Create a Configuration File:**
    *   Create a file named `config.yml` in your project directory (or a central `~/.cloudflared` directory).
    *   Add the following content, replacing `<TUNNEL-ID>` and `your-domain.com`:
        ```yaml
        tunnel: <TUNNEL-ID>
        credentials-file: ~/.cloudflared/<TUNNEL-ID>.json # Adjust path if config.yml is not in ~/.cloudflared

        ingress:
          - hostname: your-domain.com  # Replace with your actual domain or a subdomain
            service: http://localhost:8002
          - service: http_status:404
        ```
    *   **Important:** `your-domain.com` must be a domain you own and manage through Cloudflare.
4.  **Run the Tunnel:**
    *   In a new terminal, navigate to the directory containing `config.yml`.
    *   Run: `cloudflared tunnel run monty-hall-tunnel`
5.  **Verify DNS Records:** Cloudflare Tunnel automatically creates the necessary CNAME DNS records. Verify this in your Cloudflare dashboard.

## Development Conventions

*   **Design System:** CRITICAL: Always consult and strictly follow the visual tokens and design rationale defined in [DESIGN.md](./DESIGN.md) for any UI/UX modifications.
*   **Language:** HTML, CSS, Vanilla JavaScript.
*   **Styling:** Follows a retro, pixel-art inspired aesthetic with distinct color schemes for different UI elements.
*   **Game State Management:** Centralized `game` object for tracking current game status and a `stats` object for accumulating player statistics.
*   **Statistics Handling:** Statistics are reset on initial page load but accumulate across multiple games within a session. `localStorage` is not used for persistence.
*   **Audio:** Sound effects (`win.mp3`, `lose.mp3`) are played on game outcome. Audio initialization is handled via `DOMContentLoaded` to respect browser autoplay policies.
*   **Internationalization:** User-facing text is translated into Spanish.
