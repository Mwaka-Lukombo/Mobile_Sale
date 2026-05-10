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


router.use(protectedRoute,isAdmin);

router.post("/", createCategory);        // criar
router.get("/", getCategories);          // listar todas
router.get("/:id", getCategory);         // obter uma
router.put("/:id", updateCategory);      // atualizar
router.delete("/:id", deleteCategory);   // excluir

export default router;