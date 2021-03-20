let { Product, User } = require('../../models/')

exports.getProducts = async (req, res) => {
	try{
		const productsFromDb = await Product.findAll({
			include: [
				{	
					model: User,
					attributes:{
						exclude: ["createdAt", "updatedAt", "role"]
					}
				}
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});

		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				productsFromDb,
			},
	    });
	} catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.getProductsByUser = async (req, res) => {
	try{
		const {id} = req.params;
		const user = await Product.findAll({
			where: {
				userId: id
			},
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				user,
			},
	    });
	}catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}

exports.getDetailProduct = async (req, res) => {
	try{
		const {id} = req.params;
		const user = await Product.findOne({
			where: {
				id
			},
			include: [
				{	
					model: User,
					attributes:{
						exclude: ["createdAt", "updatedAt", "role"]
					}
				}
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "userId", "UserId"]
			}
		});
		res.send({
			status: "success",
			message: "Users Succesfully Get",
			data: {
				user,
			},
	    });
	}catch (err) {
		console.log(err);
	    res.status(500).send({
	        status: "error",
	        message: "Server Error",
	    });
	}
}