import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// if the authorization header exists and it starts with bearer
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// decode the jwt using the .env secret
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// set the user on the request to the user we decoded minus the password
			req.user = await User.findById(decoded.id).select('-password');

			console.log(decoded);

			next();
		} catch (error) {
			//token auth failed
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	//token was never found
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as an admin');
	}
};

export { protect, admin };
