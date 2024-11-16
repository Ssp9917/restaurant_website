import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    try {
        const { title, description, discount } = req.body;
        const offerImage = req.file ? req.file.path : null;

        const newOffer = new Offer({
            title,
            description,
            discount,
            offerImage,
            // startDate,
            // endDate,
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

        res.status(200).json({ message: "offer get successfully", offers })
    } catch (error) {
        console.log("Error in getAllOffer controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

// get single banner
export const getSingleOffer = async (req, res) => {
    try {
        const { id } = req.params;

        // Find recipe by ID and populate category name
        const offer = await Offer.findById(id);

        // Check if recipe exists
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json(offer);
    } catch (error) {
        console.log("Error in getSingleOffer", error.message)
        res.status(500).json({ message: 'Error retrieving single banners', error });
    }
}

// Edit a offer
export const editOffer = async (req, res) => {
    const { title, description, discount } = req.body;
    const { id } = req.params;
    const offerImage = req.file ? req.file.path : null;

    console.log(req.body)

    try {
        // Check if the recipe exists
        const offer = await Offer.findById(id);

        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        //update banner name
        offer.title = title || offer.title;
        offer.description = description || offer.description
        offer.discount = discount || offer.discount

        if (offerImage) offer.offerImage = offerImage; // Update image if a new one is uploaded

        // Save the updated recipe
        await offer.save();

        res.status(200).json({ message: "Offer updated successfully", offer });
    } catch (error) {
        console.log("Error in editOffer controller", error.message)
        res.status(500).json({ message: 'Error editing offer', error });
    }
}

export const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });

    } catch (error) {
        console.log("Error in deleteOffer controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}