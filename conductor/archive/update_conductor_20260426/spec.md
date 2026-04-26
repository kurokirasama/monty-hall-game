# Specification: Update Conductor Environment

## Overview
This track (Chore) focuses on updating the existing Conductor framework guidelines and project documentation within the workspace. The update will enforce the latest core guidelines as per the `initialize-conductor` and `conductor-core-protocols` skills.

## Functional Requirements
- **Core Mandates:** Integrate the Nushell-first mandate and Context Workflow (Discovery -> Synthesis -> Planning -> Execution via context-expert) into `workflow.md`.
- **Reporting & Checks:** Explicitly add Discord notifications for user inputs and long tasks, and autonomous execution of simple manual tasks into `workflow.md`.
- **Cleanup & Sync:** Add the `git-sync` skill execution behavior post-archiving into `workflow.md`.
- **Strict Compliance:** Overwrite existing rules to strictly match the new templates, disregarding existing custom formatting if it conflicts.

## Acceptance Criteria
- `workflow.md` accurately reflects the latest `conductor-core-protocols` requirements.
- The project index and other core files remain intact and correctly link to the updated protocols.