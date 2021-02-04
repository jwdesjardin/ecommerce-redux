// this file contains the functions that make changes to the database

import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    auth user, get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// find a user that matches email
	const user = await User.findOne({ email });

	// if there is a user and the password matches
	if (user && (await user.matchPassword(password))) {
		//respond with the logged in users data plus a generated token
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		//if there is not valid email, password
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	// if their is a user with this email respond with error
	const userExists = await User.findOne({ email });
	if (userExists) {
		// 400 - bad request
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({ name, email, password });

	if (user) {
		// 201 - user was created  - respond with user data plus generated token
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		// error - user was unable to be created
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		// respond with user data without token or password
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		// if user is not found in db with id
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    get all users
// @route   GET /api/users
// @access  private / admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();

		// respond with user data with token, no password
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id)
		});
	} else {
		// if user is not found in db with id
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    delete a user
// @route   DELETE /api/users/:id
// @access  private / admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: 'User removed' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    get user by id
// @route   GET /api/users/:id
// @access  private / admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  private / admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser
};
