require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const PORT = process.env.PORT || 3000;

//Import routes
const router = require('./routes');
const contactsRoutes = require('./routes/contactsRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

//Get database info
const { connectDB } = require('./db/mongo'); 

app.use(cors()); //controls origin access
app.use(express.json());


//Make api work accross sites
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Acces-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();  
// });

app.use('/', router); //Get default route
app.use('/contacts', contactsRoutes); //Get Contacts route
app.use('/api-docs', swaggerRoutes); //Get API documentation's route

//Connect to database
connectDB().then(() => {
  console.log('MongoDB connected, starting server...'); //For testing

  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

