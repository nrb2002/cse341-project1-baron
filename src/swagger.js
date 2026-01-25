const swaggerAutogen = require('swagger-autogen')(); //import swagger package

//Build the documentation

const doc = {
    info: {
        title: 'Contacts API Documentation',
        version: "1.0.0",
        description: 'This is an API for storing and retrieving information about contacts. These contacts are to be stored in a MongoDB database and all interaction happen through the API. The API can be used by any frontend.',
    },
    host: process.env.NODE_ENV === 'production' ? 'cse341-project1-baron.onrender.com' : 'localhost:3000',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']

};

const outputFile = './swagger.json';
const endpointFiles = ['./server.js']; //get all endpoint files via the server to avoid routes confusion

swaggerAutogen(outputFile, endpointFiles, doc) //Generates the documentation

