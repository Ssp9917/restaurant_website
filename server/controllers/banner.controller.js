import Banner from '../models/banner.model.js';

// Get all banners
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        console.log("Error in getBanners", error.message)
        res.status(500).json({ message: 'Error retrieving banners', error });
    }
};

// get single banner
export const getSingleBanner = async (req, res) => {
    try {
        const { id } = req.params;

        // Find recipe by ID and populate category name
        const banner = await Banner.findById(id);

        // Check if recipe exists
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.status(200).json(banner);
    } catch (error) {
        console.log("Error in getSingleBanners", error.message)
        res.status(500).json({ message: 'Error retrieving single banners', error });
    }
}

// Add a banner
export const addBanner = async (req, res) => {
    const { bannerName } = req.body;
    const bannerImage = req.file.path;

    try {
        const newBanner = new Banner({
            bannerImage,
            bannerName,
        });

        await newBanner.save();
        res.status(201).json({ message: 'Banner added successfully', banner: newBanner });
    } catch (error) {
        console.log("Error in addBanner controller", error.message)
        res.status(500).json({ message: 'Error adding banner', error });
    }
};

// Edit a banner
export const editBanner = async (req, res) => {
    const { bannerName } = req.body;
    const { id } = req.params;
    const bannerImage = req.file;



    try {
        // Check if the recipe exists
        const banner = await Banner.findById(id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        //update banner name
        banner.bannerName = bannerName || banner.bannerName;

        if (bannerImage) banner.bannerImage = bannerImage; // Update image if a new one is uploaded

        // Save the updated recipe
        await banner.save();

        res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (error) {
        console.log("Error in editBanner controller", error.message)
        res.status(500).json({ message: 'Error editing banner', error });
    }
}

// Delete a banner
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBanner = await Banner.findByIdAndDelete(id); // Delete the category

        if (!deletedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        console.error("Error in deleteBanner controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
