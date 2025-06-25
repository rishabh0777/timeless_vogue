import { Router } from "express";

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
router.route("/address/get/:id").get(verifyJWT, getAddress);
router.route("/address/add").post(verifyJWT, addAddress);
router.route("/address/update/:id").put(verifyJWT, updateAddress);
router.route("/address/delete/:id").delete(verifyJWT, deleteAddress);

export default router;

