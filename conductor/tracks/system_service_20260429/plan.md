# Implementation Plan: System Service & Public Branch Cleanup

## Phase 1: Environment Setup & Documentation
- [ ] Task: Update README.md with Live Demo section
    - [ ] Add "Live Demo" section to `README.md`
    - [ ] Insert link `https://monty-hall.kks.qzz.io`
- [ ] Task: Create DEPLOYMENT.md
    - [ ] Outline step-by-step setup instructions
    - [ ] Include details for running the Node.js server and systemd setup
- [ ] Task: Create systemd service file
    - [ ] Create `monty-hall.service` configured for `server.js` on port 8002
- [ ] Task: Conductor - User Manual Verification 'Environment Setup & Documentation' (Protocol in workflow.md)

## Phase 2: Public Branch Cleanup
- [ ] Task: Switch to `main` branch
    - [ ] Ensure working directory is clean
    - [ ] Checkout `main`
- [ ] Task: Remove private files from `main`
    - [ ] Remove `DESIGN.md`, `GEMINI.md`, `tests/`, and `plan.md` using `git rm`
- [ ] Task: Commit changes to `main`
    - [ ] Commit with message `chore: Remove private conductor artifacts from public branch`
- [ ] Task: Switch back to `conductor-private`
    - [ ] Checkout `conductor-private` branch
- [ ] Task: Conductor - User Manual Verification 'Public Branch Cleanup' (Protocol in workflow.md)