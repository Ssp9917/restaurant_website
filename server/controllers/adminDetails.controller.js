import AdminDetails from "../models/adminDetail.model.js";

export const addAdminDetails = async (req, res) => {
    try {
        const { file } = req;
        const adminLogo = file ? file.filename : null;

        const newAdminDetails = new AdminDetails({ adminLogo });
        await newAdminDetails.save();

        res.status(201).json({ message: "Admin details added successfully", adminDetails: newAdminDetails });
    } catch (error) {
        console.log("Error in Add Admin Details", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAdminDetails = async (req, res) => {
    try {
        const adminDetails = await AdminDetails.findOne();

        if (!adminDetails) {
            return res.status(404).json({ message: "Admin details not found" });
        }

        res.status(200).json({ adminDetails });
    } catch (error) {
        console.log("Error in Get Admin Details", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateAdminDetails = async (req, res) => {
    try {
        const { file } = req;
        const adminLogo = file ? file.filename : null;

        const updatedAdminDetails = await AdminDetails.findOneAndUpdate(
            {},
            { adminLogo },
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );

        res.status(200).json({ message: "Admin details updated successfully", adminDetails: updatedAdminDetails });
    } catch (error) {
        console.log("Error in Update Admin Details", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
