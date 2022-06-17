import styles from "../../styles/Admin.module.css";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const Index = ({ orders, products }) => {
	const [pizzaList, setPizzaList] = useState(products);
	const [orderList, setOrderList] = useState(orders);

	const status = ["preparing", "on the way", "delivered"];
	const paymenMethod = ["cash", "paid"];

	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`/api/products/${id}`);
			setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	const handleStatus = async (id) => {
		const item = orderList.filter((order) => order._id === id)[0];
		const currentStatus = item.status;
		try {
			const res = await axios.put(`/api/orders/${id}`, {
				status: currentStatus + 1,
			});

			setOrderList([
				...orderList.filter((order) => order._id !== id),
				res.data,
			]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<h1 className={styles.title}>Products</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Image</th>
							<th>Id</th>
							<th>Title</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</tbody>
					<tbody>
						{pizzaList.map((product) => (
							<tr className={styles.trTitle} key={product._id}>
								<td>
									<Image
										src={product.img}
										width={50}
										height={50}
										objectFit="cover"
										alt=""
									/>
								</td>
								<td>{product._id.slice(0, 5)}...</td>
								<td>{product.title}</td>
								<td>${product.prices[0]}</td>
								<td>
									<button className={styles.button}>
										Edit
									</button>
									<button
										className={styles.button}
										onClick={() =>
											handleDelete(product._id)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className={styles.item}>
				<h1 className={styles.title}>Orders</h1>
				<table className={styles.table}>
					<tbody>
						<tr className={styles.trTitle}>
							<th>Id</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Payment</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</tbody>
					<tbody>
						{/* sort by createdAt desc */}
						{orderList
							.sort(
								// (a, b) => new Date(a.createdAt) - new Date(b.createdAt) sort by ascending
								(a, b) =>
									new Date(b.createdAt) -
									new Date(a.createdAt) // sort by desc
							)
							.map((order) => (
								<tr className={styles.trTitle} key={order._id}>
									<td>{order._id.slice(0, 5)}...</td>
									<td>{order.customer}</td>
									<td>${order.total}</td>
									<td>{paymenMethod[order.method]}</td>
									<td>{status[order.status]}</td>
									<td>
										<button
											onClick={() =>
												handleStatus(order._id)
											}
										>
											Next Stage
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Index;

export async function getServerSideProps(context) {
	// console.log(context);
	console.log(context.req.cookies);

	// const myCookie = context.req.headers.cookie || "";
	// const token = myCookie.split("=")[1];

	// console.log("FROM ADMIN COOKIE INDEX", myCookie);
	// console.log("FROM ADMIN ENV INDEX", process.env.TOKEN);

	if (context.req.cookies.token !== process.env.TOKEN) {
		return {
			redirect: {
				destination: "/admin/login",
				permanent: false,
			},
		};
	}

	const productRes = await axios.get("http://localhost:3000/api/products/");
	const orderRes = await axios.get("http://localhost:3000/api/orders/");

	return {
		props: {
			orders: orderRes.data,
			products: productRes.data,
		},
	};
}
