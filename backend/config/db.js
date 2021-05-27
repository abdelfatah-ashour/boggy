const mongoose = require("mongoose");

module.exports = {
	connectDB: async (url) => {
		return await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
	},
};
