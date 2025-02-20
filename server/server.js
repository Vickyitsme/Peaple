const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const socketIo = require('socket.io');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/peaple', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   });

   // Routes
   app.get('/', (req, res) => {
       res.send('PEAPLE Backend is running!');
   });

   // Start server
   const server = app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });

   // Socket.io for real-time communication
   const io = socketIo(server, {
       cors: {
           origin: '*',
       },
   });

   io.on('connection', (socket) => {
       console.log('A user connected:', socket.id);

       socket.on('disconnect', () => {
           console.log('User disconnected:', socket.id);
       });
   });