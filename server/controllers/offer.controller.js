import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    try {
        const { title, description, discount, startDate, endDate } = req.body;
        const offerImage = req.file ? req.file.path : null;

        const newOffer = new Offer({
            title,
            description,
            discount,
            offerImage,
            startDate,
            endDate,
        });

        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (error) {
        console.log("Error in addOffer controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllOffer = async (req, res) => {
    try {

        const offers = await Offer.find()

        res.status(200).json({message:"offer get successfully",offers})
    } catch (error) {
        console.log("Error in getAllOffer controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}