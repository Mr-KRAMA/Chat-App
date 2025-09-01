# Real-time Chat Application

This project is a simple real-time chat application with a backend WebSocket server and a React frontend. It allows multiple users to join chat rooms and exchange messages instantly.

## Project Structure

- **backend/**: Node.js backend using TypeScript and the `ws` WebSocket library.
  - `src/index.ts`: WebSocket server that manages user connections, rooms, and message broadcasting.
- **Frontend/chat/**: React frontend using TypeScript, Vite, and Tailwind CSS.
  - `src/App.tsx`: Main chat UI component with WebSocket client integration.
  - `src/main.tsx`: React app entry point.
  - Tailwind CSS for styling and responsive UI.

## Technologies

- **Backend**: Node.js, TypeScript, WebSocket (ws), Express, JSON Web Token
- **Frontend**: React, TypeScript, Vite, Tailwind CSS

## Features

- Real-time messaging using WebSocket.
- Multiple users can join the same chat room.
- Messages are displayed in a clean WhatsApp/Instagram style UI.
- User messages and other users' messages are visually distinct.
- Supports sending text messages (image sending support can be added in future).
- Responsive and accessible UI with keyboard support.

## Screenshots

![Chat Interface Screenshot 1](img/Screenshot%202025-09-01%20232650.png)
![Chat Interface Screenshot 2](img/Screenshot%202025-09-01%20232702.png)


## Setup and Run

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build and start the backend server:
   ```bash
   npm run dev
   ```

   The WebSocket server will start on port 8080.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the browser at the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

- Open multiple browser windows or tabs to simulate multiple users.
- Messages sent from one client will appear in other clients connected to the same room.
- The UI shows message bubbles with timestamps and sender distinction.

## Notes

- The backend currently supports a single hardcoded room (`roomId: "red"`).
- The WebSocket server filters messages to only broadcast to users in the same room.
- The frontend uses React hooks and Tailwind CSS for a clean and simple UI.

## Future Improvements

- Add user authentication and dynamic room creation.
- Persist chat history in a database.
- Improve UI with avatars and typing indicators.
- Add message delivery/read receipts.

## License

This project is open source and available under the MIT License.
