import cookie from "cookie";

export default function handler(req, res) {
	if (req.method === "POST") {
		const { username, password } = req.body;

		if (
			username === process.env.USERNAME &&
			password === process.env.PASSWORD
		) {
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("token", process.env.TOKEN, {
					maxAge: 60 * 60, // 1 hour
					sameSite: "strict",
					path: "/",
				})
			);

			res.status(200).json("Successfull");
		} else {
			//reset cookie
			// res.setHeader(
			// 	"Set-Cookie",
			// 	cookie.serialize("token", "", {
			// 		maxAge: 0,
			// 		sameSite: "strict",
			// 		path: "/",
			// 	})
			// );

			res.status(400).json("Wrong credentials");
		}
	}
}
