#!/bin/bash

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Run WSL setup script 
./environment/wsl-playwright-setup.sh
