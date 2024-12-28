// Import required modules
const io = require('socket.io-client');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');

// Server URI
const SERVER_URI = "https://your-server-uri.com"; // Replace with your server URI

// Connect to the server
const socket = io(SERVER_URI);

socket.on('connect', () => {
    console.log('Connected to the server successfully!');
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server. Retrying...');
});

socket.on('you send$', async () => {
    console.log('Received request to capture a screenshot');

    try {
        // Capture the screenshot
        const imageBuffer = await screenshot();
        
        // Encode the image to base64
        const base64Image = imageBuffer.toString('base64');

        // Prepare the message payload
        const messageData = {
            message: "Screenshot captured successfully", // Placeholder message
            image: base64Image, // Base64 encoded image
            username: "pc",
            room_name: "myroom"
        };

        // Send the screenshot to the server
        socket.emit('message', messageData);
        console.log('Screenshot sent successfully!');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
    }
});
