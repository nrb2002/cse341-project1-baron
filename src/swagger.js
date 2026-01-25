const swaggerAutogen = require('swagger-autogen')(); //import swagger package

//Build the documentation

const doc = {
    info: {
        title: 'Contacts API',
        version: "1.0.0",
        description: 'This is an API for storing and retrieving information about contacts. These contacts are to be stored in a MongoDB database and all interaction happen through the API. The API can be used by any frontend.',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./server.js']; //Swagger to get all endpoint files via the server to avoid routes confusion

swaggerAutogen(outputFile, endpointFiles, doc) //Generates the documentation

