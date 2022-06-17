import dbConnect from "../../../util/mongoDb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
	const {
		method,
		query: { id },
	} = req;

	const db = await dbConnect(); // connect to mongoDB

	if (method === "GET") {
		try {
			const order = await Order.findById(id);

			res.status(200).json(order);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	if (method === "PUT") {
		try {
			const order = await Order.findByIdAndUpdate(id, req.body, {
				new: true,
			});
			res.status(200).json(order);
		} catch (error) {
			res.status(500).json(error);
		}
	}

	if (method === "DELETE") {
		// try {
		// } catch (error) {
		// 	res.status(500).json(error);
		// }
	}
}
