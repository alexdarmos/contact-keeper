const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//using async await to connect mngoDB
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}

	//ALTERNATE WAY OF CONNECTING DB

	// mongoose
	// .connect(db, {
	// 	useNewUrlParser: true,
	// 	useCreateIndex: true,
	// 	useFindAndModify: false
	// })
	// .then(() => console.log('mongoDB Connected'))
	// .catch(err => {
	// 	console.error(err.message);
	// 	process.exit(1);
	// });
};

module.exports = connectDB;
