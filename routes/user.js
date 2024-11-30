import express from 'express';
import { getAllUsers, register, getMyProfile, login, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.get("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

//if only id is changing in routes for different methods
// router
//     .route("userid/:id")
//     .get(getUserDetails)
//     .put(updateUser)
//     .delete(deleteUser);

export default router;