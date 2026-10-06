# Longterm Memory System

The Longterm Memory System is a multi-tiered architecture designed to provide LLM agents with persistent context across sessions. It consists of:
- **Episodic Memory**: Project-specific logs stored in `AGENTS_MEMORY/monty-hall-app-v2/` in the Obsidian vault. The `[project-slug]` MUST be the same name as the project folder (e.g., for `/home/kira/Yandex.Disk/llms_configs`, use `AGENTS_MEMORY/llms_configs/`). These logs contain dated entries of decisions, milestones, and task summaries.
- **Semantic & Identity Memory**: Global files (`BRAIN.md` and `SOUL.md`) that store high-level facts, active project summaries, and the agent's core identity and personality within `AGENTS_MEMORY/` in the Obsidian vault.
- **Orchestration**: A coordination layer (`longterm-memory-orchestrator`) that defines the system objectives and triggers specialized sub-skills for reading and writing.

**MANDATORY PRE-TASK PROTOCOL:** At the beginning of every session, BEFORE proceeding with any user tasks, the agent MUST load project context and global awareness. Follow the instructions in the `longterm-memory-reader` skill (invoking `init-session`) and internalize the contents of `BRAIN.md` and `SOUL.md`. This ensures continuity of identity and high-level project awareness.

## Skill Quick Reference
- `longterm-memory-orchestrator`: High-level orchestrator that defines system objectives and activation triggers for specialized sub-skills.
- `longterm-memory-reader`: Handles all memory retrieval, searching, and parsing operations, including session initialization and consolidation data gathering.
- `longterm-memory-writer`: Handles all memory persistence and setup operations, including manual updates, note initialization, and global context updates.
- `conductor-core-protocols`: Defines mandatory operational guidelines, including Nushell-first usage, mandatory pre-task memory retrieval, and Discord notification sequencing.
- `cron-conductor-monitor`: Autonomously monitors Conductor projects for pending work and high-level project state, outputting structured status summaries.
- `initialize-conductor`: Standardizes the setup and update of Conductor framework guidelines and project-specific documentation tracks.
- `initialize-course`: Automates and standardizes the setup of Conductor-managed workspaces for university course repositories.
- `initialize-research`: Scaffolds LaTeX-based research projects, including reports and articles, from predefined project templates.
- `initialize-thesis-folder`: Specialized initializer for UBB Statistics Engineering thesis projects, integrating Audit & Guide workflows.
- `session-retro`: Analyzes session transcripts to identify new issues and key insights, generating retrospective notes with two-way memory linking.
- `obsidian-memory-expert`: Expert for managing long-term memory via the Obsidian CLI, specializing in retrieving insights and project-specific metadata.




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

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any shell command containing `curl` or `wget` will be intercepted and blocked. Do NOT retry.
Instead use:
- `mcp__context-mode__ctx_fetch_and_index(url, source)` to fetch and index web pages
- `mcp__context-mode__ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any shell command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` will be intercepted and blocked. Do NOT retry with shell.
Instead use:
- `mcp__context-mode__ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch / web browsing — BLOCKED
Direct web fetching is blocked. Use the sandbox equivalent.
Instead use:
- `mcp__context-mode__ctx_fetch_and_index(url, source)` then `mcp__context-mode__ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Shell (>20 lines output)
Shell is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `mcp__context-mode__ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `mcp__context-mode__ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### read_file (for analysis)
If you are reading a file to **edit** it → read_file is correct (edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `mcp__context-mode__ctx_execute_file(path, language, code)` instead. Only your printed summary enters context.

### grep / search (large results)
Search results can flood context. Use `mcp__context-mode__ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `mcp__context-mode__ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `mcp__context-mode__ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `mcp__context-mode__ctx_execute(language, code)` | `mcp__context-mode__ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `mcp__context-mode__ctx_fetch_and_index(url, source)` then `mcp__context-mode__ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `mcp__context-mode__ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `doctor` MCP tool, run the returned shell command, display as checklist |

# Track Cleanup and Synchronization
Once a track is archived or deleted, the agent **MUST** activate the `git-sync` skill to ensure the local repository is fully synchronized (pull/push loop) with the remote origin. This is a non-optional MUST to ensure the remote origin is synchronized immediately after cleanup operations.


# Output feedback and Discord notifications

## Mandatory Discord Notification for User Input (CRITICAL)
Whenever you are about to use the `ask_user` (or equivalent) tool to request feedback, clarification, or approval, you **MUST** first send a Discord notification. This ensures the user is alerted that the agent is blocked and waiting for input.

**CRITICAL:** ALWAYS execute `to-discord` nushell command and WAIT for it to finish BEFORE executing the `ask_user` tool. This sequential ordering is mandatory to ensure the user is notified that the agent is blocked and waiting.

- **Notification Content**:
    - **Exact Question**: Include the literal question(s) being that will be asked via `ask_user` (or equivalent).
    - **Task Metadata**: State the current Track ID, Phase Name, and Task Description.
    - **Context for Review/Opinion**: If asking for a review or opinion on changes:
        - List the modified files.
        - Provide a high-level conceptual summary of the changes.
        - Include a simplified `git diff` (markdown code block ````diff````) focusing on relevant logic.
        - **Visibility Mandate**: The exact same information sent to Discord (question, metadata, context) MUST also be explicitly included in the `ask_user` call (or equivalent) so it is visible to the user in the chat interface.
        - **Diff Management**: If the diff or total message exceeds 2000 characters, split it into several messages.

- **Command**: Execute the nushell `evaluate` tool with `to-discord $message -p`.
