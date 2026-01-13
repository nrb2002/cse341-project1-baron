const { getCollection } = require("../db/mongo");

async function getProfessional(req, res) {
  try {
    const collection = getCollection();
    const professional = await collection.findOne({});

    if (!professional) {
      return res.status(404).json({ message: "No professional data found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getProfessional
};
