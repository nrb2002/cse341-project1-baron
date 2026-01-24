const { response } = require("express");
const { getCollection } = require("../db/mongo");
const { ObjectId } = require("mongodb");

/**
 * GET single contact by id (query param)
 * Example: /contacts?id=65abc123...
 */
async function getContactById(req, res) {
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
  try {
    const { id } = req.query;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Contact id is required" });
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }

    const collection = getCollection();

    const result = await collection.updateOne(
      console.log("ID received: ", id),
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
