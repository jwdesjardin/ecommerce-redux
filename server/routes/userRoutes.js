import express from 'express';

import {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST to '/' registers a user
router.route('/').post(registerUser).get(protect, admin, getUsers);

// POST to '/login' authorizes a user
router.post('/login', authUser);

// GET '/profile' gives user data - protected route
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// DELETE user
router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);
export default router;
