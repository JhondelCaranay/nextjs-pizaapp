import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

import axios from "axios";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
// import Logo from "../public/img/mylogo.png";

export default function Home({ pizzas, admin }) {
	const [close, setClose] = useState(true);
	const [pizzaList, setPizzaList] = useState(pizzas);
	return (
		<div className={styles.container}>
			<Head>
				<title>Tasty Fizza</title>
				<meta
					name="description"
					content="Tasty Fizza is a pizza delivery service that delivers fresh, tasty pizzas to your door."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Featured />
			{admin && <AddButton setClose={setClose} />}
			<PizzaList pizzaList={pizzaList} />
			{!close && (
				<Add
					setClose={setClose}
					pizzaList={pizzaList}
					setPizzaList={setPizzaList}
				/>
			)}
		</div>
	);
}

export async function getServerSideProps(context) {
	const myCookie = context.req.cookies.token || "";
	let admin = false;

	if (myCookie === process.env.TOKEN) {
		admin = true;
	}

	const res = await axios.get("http://localhost:3000/api/products");

	// console.log(response);
	return {
		props: {
			pizzas: res.data,
			admin,
		}, // will be passed to the page component as props
	};
}
