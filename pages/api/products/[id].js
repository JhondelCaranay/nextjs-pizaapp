import dbConnect from "../../../util/mongoDb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
	const {
		method,
		cookies,
		query: { id },
	} = req;
	const token = cookies.token;
	const db = await dbConnect(); // connect to mongoDB

	if (method === "GET") {
		try {
			const product = await Product.findById(id);
			res.status(200).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	if (method === "PUT") {
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json("Unauthorized");
		}
		try {
			const product = await Product.findByIdAndUpdate(id, req.body, {
				new: true,
			});

			res.status(200).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	if (method === "DELETE") {
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json("Unauthorized");
		}
		try {
			await Product.findByIdAndDelete(id);
			res.status(200).json("The product has been deleted");
		} catch (error) {
			res.status(500).json(error);
		}
	}
}
