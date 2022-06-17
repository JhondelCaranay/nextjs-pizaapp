import dbConnect from "../../../util/mongoDb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
	const { method, cookies } = req;

	const token = cookies.token;

	const db = await dbConnect(); // connect to mongoDB

	if (method === "GET") {
		try {
			// sort by createdAt descending
			const products = await Product.find().sort({ createdAt: -1 });
			res.status(200).json(products);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	if (method === "POST") {
		if (!token || token !== process.env.TOKEN) {
			return res.status(401).json("Unauthorized");
		}

		try {
			console.log("INPUT", req.body);
			const product = await Product.create(req.body);
			console.log("OUTPUT", product);
			res.status(201).json(product);
		} catch (error) {
			res.status(500).json(error);
		}
	}
}
