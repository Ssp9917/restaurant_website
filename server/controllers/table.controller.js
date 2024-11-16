import Table from '../models/table.model.js'



export const getAllTable = async (req, res) => {
  try {
    // Fetch all tables from the database
    const tables = await Table.find();

    // If no tables are found, return a message
    if (!tables || tables.length === 0) {
      return res.status(404).json({ message: "No tables found." });
    }

    // Return the list of tables
    res.status(200).json({
      message: "Tables fetched successfully",
      tables,
    });
  } catch (error) {
    console.log("Error in getAllTable controllers:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const addTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    // Validate request body
    if (!tableNumber || !capacity) {
      return res.status(400).json({ message: "Table number and capacity are required." });
    }

    // Check if the table number already exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({ message: "Table number already exists." });
    }

    // Create a new table
    const newTable = new Table({
      tableNumber,
      capacity,
    });

    const savedTable = await newTable.save(); // Save the table in the database

    res.status(201).json({
      message: "Table added successfully!",
      table: savedTable,
    });
  } catch (error) {
    console.error("Error in addTable Controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
