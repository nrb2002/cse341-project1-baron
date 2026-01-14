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

module.exports = {
  getAllContacts,
  getContactById
};
