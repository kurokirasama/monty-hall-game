# Specification: System Service & Public Branch Cleanup

## Overview
This track focuses on cleaning up private artifacts from the public `main` branch, implementing a systemd service for deploying the app, generating setup instructions, and adding a live demo link to the README.

## Functional Requirements
1. **Public Branch Cleanup:**
   - Ensure the following files/directories are deleted from the `main` branch: `DESIGN.md`, `GEMINI.md`, `tests/`, `plan.md`.
   - Ensure these files remain intact in the private `conductor-private` branch.
2. **Systemd Service:**
   - Create a systemd service file named `monty-hall.service`.
   - The service should manage the execution of the app's Node.js server (`server.js` on port 8002), analogous to the setups in `../quaeris` and `../algorithms_cei`.
3. **Setup Instructions:**
   - Create a `DEPLOYMENT.md` file containing clear, step-by-step instructions on how to set up the app and the systemd service.
4. **README Update:**
   - Add a new "Live Demo" section to `README.md`.
   - The section must contain the link: `https://monty-hall.kks.qzz.io`.

## Acceptance Criteria
- [ ] `main` branch no longer contains private artifacts, while `conductor-private` still has them.
- [ ] `monty-hall.service` is correctly configured to run the Node.js server.
- [ ] `DEPLOYMENT.md` exists and clearly documents the setup process.
- [ ] `README.md` includes the "Live Demo" section with the correct URL.

## Out of Scope
- Modifying the application logic or UI.
- Configuring a reverse proxy (like Nginx) unless explicitly defined in DEPLOYMENT.md as a manual step.