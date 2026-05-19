import express from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { 
    isAdmin, 
    protectedRoute 
} from "../middlewares/Protected.js";

const router = express.Router();


router.use(protectedRoute);
router.get("/", getCategories);          
router.get("/:id", getCategory);

router.use(isAdmin);
router.post("/", createCategory);                 
router.put("/:id", updateCategory);      
router.delete("/:id", deleteCategory);   

export default router;