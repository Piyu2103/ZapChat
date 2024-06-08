import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import { getUsersForSidebar } from "../controllers/user.js";

const router=express.Router()

router.get("/",protectRoute,getUsersForSidebar);

export default router;