# Pet Adoption Portal Frontend

Welcome to the frontend repository for the Pet Adoption Portal, a web application that connects Shelters and Adopters to facilitate pet adoption. This frontend is built using React.js with Vite, featuring a user-friendly interface for managing pets, viewing listings, and handling adoption requests.

## Overview

This frontend provides a responsive web interface for the Pet Adoption Portal, interacting with a backend API to manage user authentication, pet data, and adoption workflows. It supports role-based dashboards for Shelters and Adopters, with features like pet addition, listing, and adoption request management.

## Features
User authentication (login, register, logout).

Role-based dashboards (Shelter and Adopter).

Pet management for Shelters (add, view, update, delete pets with images).

Pet listings for Adopters with adoption request functionality.

Adoption request status tracking (request, cancel, approve, reject).

Responsive design with Tailwind CSS.

## Prerequisites
Node.js (v14.x or later)

npm 

A running instance of the Pet Adoption Portal Backend (e.g., http://localhost:5000)

## Installation

1. Clone the repository 
```
git clone https://github.com/CodeMaestro016/pet-adoption-portal-frontend.git
cd pet-adoption-portal-frontend
```
2. Install dependencies
```
npm install
```

## Running the Application
1. Ensure the backend is running at the configured URL.
2. Start the development server
```
npm run dev
```
## Pages and Components

Login: User authentication page.

Register: User registration page.

Dashboard: Role-based dashboard (pet management for Shelters, adoption requests for Adopters).

AddPet: Form for Shelters to add new pets.

ViewPets: List of pets for Shelters with edit/delete options.

PetListings: List of available pets for Adopters with request/cancel functionality.

NavBar: Navigation bar with role-based links.

## Dependencies
react: Core library for building the UI.

react-router-dom: Routing for navigation.

axios: HTTP client for API requests.

tailwindcss: CSS framework for styling.

## 📸 Screenshots
### HomePage
![Image](https://github.com/user-attachments/assets/2ffc21ee-03b0-419d-b9ba-46b94bdb45bf)

### Shelter Dashboard
![Image](https://github.com/user-attachments/assets/c22836fd-38a0-479c-aa39-981c5f3dea39)

### Pet Portal
![Image](https://github.com/user-attachments/assets/ef09afd5-d666-4165-9181-b2c2d4c4c7a7)

### Pet Portal Form 
![Image](https://github.com/user-attachments/assets/e671acb3-f291-40e0-b27c-b2cb315c69db)











