import Testimonial from '../models/testimonial.model.js';

// Controller to add a testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { title, name } = req.body;
    const image = req.file ? req.file.path : null; // Multer stores file path in req.file

    if (!title || !name || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTestimonial = new Testimonial({ title, name, image });
    await newTestimonial.save();

    res.status(201).json({ message: 'Testimonial added successfully', testimonial: newTestimonial });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to delete a testimonials
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

// Controller to edit a testimonials

export const editTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // If an image is uploaded, add its path to updatedData
    if (req.file) {
      updatedData.categoryImage = req.file.path;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on the updated data
    });

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial updated successfully', updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};


// Controller to get a single testimonial
// getCategoryById
export const getTestimonialById = async (req, res) => {

  const { id } = req.params

  try {
    const testimonial = await Testimonial.findById(id);
    res.status(200).json(testimonial);
  } catch (error) {
    console.log("Error in getTestimonialById controller", error.message)
    res.status(500).json({ message: "Internal server error" });
  }
}