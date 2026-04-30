# Deployment Instructions

This document provides step-by-step instructions for deploying the Monty Hall Simulator application as a persistent system service on a Linux server.

## 📋 Prerequisites

- **Node.js:** Ensure Node.js is installed.
- **Git:** For cloning or managing the repository.
- **Systemd:** For managing the application as a background service.

## ⚙️ Manual Setup

1. **Clone or Navigate to the Project:**
   ```bash
   cd /home/kira/Yandex.Disk/webapps/monty-hall-app-v2
   ```

2. **Verify Server Execution:**
   Run the server manually to ensure it works:
   ```bash
   node server.js
   ```
   The application should be accessible at `http://localhost:8002`.

## 🛠️ Systemd Service Configuration

To ensure the application starts automatically on boot and restarts if it fails, follow these steps to configure a systemd service.

1. **Create the Service File:**
   Create a new file at `/etc/systemd/system/monty-hall.service` with the following content (adjusting paths if necessary):

   ```ini
   [Unit]
   Description=Monty Hall Simulator Application
   After=network.target

   [Service]
   Type=simple
   User=kira
   WorkingDirectory=/home/kira/Yandex.Disk/webapps/monty-hall-app-v2
   ExecStart=/usr/bin/node server.js
   Restart=always
   # Optional: Environment variables can be added here
   # Environment=PORT=8002

   [Install]
   WantedBy=multi-user.target
   ```

2. **Enable and Start the Service:**
   Execute the following commands to register and start the service:

   ```bash
   # Reload systemd to recognize the new service
   sudo systemctl daemon-reload

   # Enable the service to start on boot
   sudo systemctl enable monty-hall.service

   # Start the service immediately
   sudo systemctl start monty-hall.service
   ```

3. **Monitor the Service:**
   Check the status of the service:
   ```bash
   sudo systemctl status monty-hall.service
   ```
   View logs in real-time:
   ```bash
   journalctl -u monty-hall.service -f
   ```

## 🌐 Public Access (Optional)

If you are using Cloudflare Tunnel for public access (as described in the `README.md`), ensure the tunnel points to `http://localhost:8002`.
