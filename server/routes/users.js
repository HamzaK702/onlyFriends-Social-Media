import express from "express";
import { getUser , getUsersFriends , addRemoveFriend, getAllUsers, deleteUser } from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// Read Routes
router.get("/all", verifyToken, getAllUsers);
router.get("/:id" , verifyToken , getUser);
router.get("/:id/friends" , verifyToken , getUsersFriends);
//delete route
router.delete("/:id/delete" , verifyToken , deleteUser);
// update Routes
router.patch("/:id/:friendId" ,verifyToken , addRemoveFriend);

export default router;