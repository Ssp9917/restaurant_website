import Banner from '../models/banner.model.js';

// Get all banners
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving banners', error });
    }
};

// Add a new banner
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
        res.status(500).json({ message: 'Error adding banner', error });
    }
};
