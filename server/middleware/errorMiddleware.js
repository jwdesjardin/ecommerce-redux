const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// my personal global handler prior to this
// app.use((err, req, res, next) => {
// 	res.status(err.status || 500).json({
// 			message: err.message,
// 			stack: process.env.NODE_ENV === 'production' ? null : err.stack
// 	});
// });

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});
};

export { notFound, errorHandler };
