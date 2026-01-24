const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

//Swagger route
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

module.exports = router;