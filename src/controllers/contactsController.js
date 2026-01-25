const { response } = require("express");
const { getCollection } = require("../db/mongo");
const { ObjectId } = require("mongodb");

/**
 * GET single contact by id (query param)
 * Example: /contacts?id=65abc123...
 */
async function getContactById(req, res) {
  //#swagger.tags=['Contacts']
  //#swagger.summary='Get Single Contact'
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }

    const collection = getCollection();
    const contact = await collection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}

//Get all contacts
async function getAllContacts(req, res) {
  //#swagger.tags=['Contacts']
  //#swagger.summary='Get All Contacts'
  try {
    const collection = getCollection();
    const contacts = await collection.find({}).toArray();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Create new contact
async function createContact(req, res){
  //#swagger.tags=['Contacts']
  //#swagger.summary='Create New Contact'
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Enter New Contact',
    required: true,
    schema: { 
      firstName: 'Rachel', 
      lastName: 'Ndomba', 
      email: 'rachel@gmail.com', 
      favoriteColor: 'Brown', 
      birthday: 'Feb 16' 
    }
  } */
  try {
    const collection = getCollection();
    const newContact = req.body;

    if (!newContact || Object.keys(newContact).length === 0) {
      return res.status(400).json({ message: "Contact data is required" });
    }

    const result = await collection.insertOne(newContact);

    res.status(201).json({
      message: "Contact created successfully",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

//Update a contact
async function updateContact(req, res){
  //#swagger.tags=['Contacts']
  //#swagger.summary='Update Contact Info'
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Edit relevant Contact's fields',
    required: true,
    schema: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@domain.com',
      favoriteColor: 'color',
      birthday: 'Jan 1'
    }
  } */
  try {
    const { id } = req.query;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }
    //Make the data to update
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }
    
    const collection = getCollection();

    console.log("ID received: ", id) //For testing purposes
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}

//Delete a contact
async function deleteContact(req, res){
  //#swagger.tags=['Contacts']
  //#swagger.summary='Delete Contact'
  //#swagger.description='Get Contact's ID to be able to delete it. '
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }

    const collection = getCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Invalid id format" });
  }
}


module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact   
}
