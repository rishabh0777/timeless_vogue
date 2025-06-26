import { Router } from "express"

import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress
} 
from "../controllers/address.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

//Secured routes
router.route("/get").get(verifyJWT, getAddress);
router.route("/add").post(verifyJWT, addAddress);
router.route("/update/:id").put(verifyJWT, updateAddress);
router.route("/delete/:id").delete(verifyJWT, deleteAddress);

export default router;

