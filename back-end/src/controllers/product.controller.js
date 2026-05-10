import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import cloudinary from "../lib/cloudinary.js";
import User from '../models/user.model.js';
import mongoose from 'mongoose';




export const uploadFile = async (file, oldPublicId = null) => {
   if (oldPublicId && typeof oldPublicId === "string") {
      await cloudinary.uploader.destroy(oldPublicId);
    }

  const result = await cloudinary.uploader.upload(file, {
    folder: "products"
  });

  return {
    url: result.secure_url,
    public_id: result.public_id
  };
};


// CREATE
export const createProduct = async (req, res) => {
  const { name, price, category, stock } = req.body;
  const file = req.file?.path || req.body?.image;

  try {
    if (!name || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let image = {};

    if (file) {
       image = await uploadFile(file);
    }

    const productExiste = await Product.findOne({name,category});

    if(productExiste){
      return res.status(400).json({message:"Product Already exists!"});
    }

    const product = await Product.create({
      name,
      price,
      category,
      stock,
      image
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.log("createProduct error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, stock } = req.body;
  const file = req.file?.path || req.body.image;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let image = product?.image;

    if (file) {
      image = await uploadFile(file, product.image?.public_id);
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.image = image;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    console.log("editProduct error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log("deleteProduct error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const searchProduct = async (req, res) => {
  const { search } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: search, $options: "i" }
    });

    res.status(200).json(products);

  } catch (error) {
    console.log("searchProduct error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allProduct = async (req, res) => {
  let {
    search,
    page,
    limit
  } = req.query;
  
  try {

    let filter = {};
    
    

    if(search){
      filter.name = {
        $regex:search,
        $options:"i"
      }
      const novoLimit = await Product.countDocuments(filter);
      limit = novoLimit;
    }

    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));

    const total = await Product.countDocuments(filter);
      const skip = (page - 1) * limit;
       const totalPages = Math.ceil((total / limit)) ;
       
    const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    res.status(200).json({
      products,
      totalPages,
      currentPage:page
    });

  } catch (error) {
    console.log("allProduct error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const productSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    console.log("productSingle error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required in query" });
    }

    // valida ObjectId

    const categoryName = await Category.findOne({name:category});
    
    if (!categoryName) {
      return res.status(400).json({ message: "Invalid category " });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find({ category })
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments({ category });

    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.log("getProductsByCategory error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update to get photo
export const addCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: productId } = req.params;
  let { quantity } = req.body;

  try {
    quantity = Number(quantity);

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid fields" });
    }

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ message: "Product or User not found" });
    }

    const existItem = user.carrinho.find(
      (item) => item.itemId.toString() === product._id.toString()
    );

    if (existItem) {
      existItem.quantity += quantity;
    } else {
      user.carrinho.push({
        itemId: product._id,
        quantity,
      });
    }

    await user.save();

    res.status(200).json({
      message: "AddToCart successfully",
      carrinho: user.carrinho,
    });

  } catch (error) {
    console.log("ErrorInAddToCart", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  const { _id } = req.user;

  try {
    if (!mongoose.isValidObjectId(_id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }

    const user = await User.findById(_id)
      .populate("carrinho.itemId", "name price image stock")
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Transformar resposta (opcional, mais limpo para frontend)
    const cart = user.carrinho.map((item) => ({
      product: item.itemId,
      quantity: item.quantity,
      subtotal: item.quantity * item.itemId.price,
    }));

    const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

    res.status(200).json({
      cart,
      total,
    });

  } catch (error) {
    console.log("ErrorInGetCartController", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

