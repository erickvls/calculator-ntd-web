# NTD Software - Arithmetic Calculator UI

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Running the Application](#running-the-application)
   - [Prerequisites](#prerequisites)
   - [Docker Setup](#docker-setup)
   - [Docker File](#docker-file)
   - [Docker Compose File](#docker-compose-file)
5. [Integration with Backend](#integration-with-backend)
6. [Environment Variables](#environment-variables)
7. [Notes](#notes)

## Overview

This project is developed for **NTD** as part of an evaluation. It serves as the **UI** (frontend) of the arithmetic calculator platform, providing an interactive interface to perform basic operations such as addition, subtraction, multiplication, division, square root calculation, and random string generation. The frontend communicates with the API for processing requests.

- This project is composed of two modules:
   - **The API** - You can check it [here](https://github.com/erickvls/calculator-ntd-api)
   - **The UI** - This project

## Features

- User-friendly interface for interacting with calculator operations
- JWT-based authentication for securing API requests
- Displays user balance and operation history
- Allows users to perform basic arithmetic operations and random string generation

## Technologies Used

- **React** - UI library
- **Next.js** - Framework for server-side rendering and routing
- **Material-UI (MUI)** - UI components for styling
- **React Hook Form** - For form management
- **Docker** & **Docker Compose** - For containerization

## Running the Application

### Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Docker Setup

This project can run with Docker and Docker Compose. It depends on the backend API, so you need to run both frontend and backend services together.

To run the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/calculator-ntd-web.git
   cd calculator-ntd-web


2. Create an .env file at the root of the project with the following content:

   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

3. Start the application using Docker Compose:

   docker-compose up --build


This will build the frontend and start it along with the backend API (ensure that both docker-compose.yml files from the UI and API projects are up and running).

### Docker File
The Dockerfile builds a Next.js project and creates a lightweight image to run the frontend.

### Docker Compose File
The docker-compose.yml file includes services for the frontend and allows for easy deployment. To ensure full functionality, the backend API must also be running via its own Docker setup.


## Integration with Backend
This frontend is designed to interact with the API available at NTD Software - Arithmetic Calculator API. The UI consumes the API for user authentication, performing calculator operations, and handling user account information.

## Environment Variables
The following environment variables are used in the project:

     NEXT_PUBLIC_API_BASE_URL: This should point to the API backend endpoint.


## Notes
- This frontend communicates with the backend API via HTTP. Ensure the API is running and accessible.
- The logout functionality is based on set cache expirity. In real world scenario it should be handled in the api side.