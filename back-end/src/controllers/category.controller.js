import Category from "../models/category.model.js";



// CREATE
export const createCategory = async (req, res) => {
  const { name, image } = req.body;

  try {
    if (!name || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await Category.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, image });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("ErrorInCreateCategory", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ALL
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1});

    res.status(200).json({ categories });
  } catch (error) {
    console.log("ErrorInGetCategories", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET ONE
export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.log("ErrorInGetCategory", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("ErrorInUpdateCategory", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("ErrorInDeleteCategory", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};