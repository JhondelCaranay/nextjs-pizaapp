import styles from "../styles/PizzaList.module.css";
// import Image from "next/image";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>HE BEST PIZZA IN TOWN</h1>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Provident asperiores atque magni officiis maxime optio iusto
				accusamus, voluptas sequi vel dolor esse.
			</p>

			<div className={styles.wrapper}>
				{pizzaList.map((pizza) => (
					<PizzaCard key={pizza._id} pizza={pizza} />
				))}
			</div>
		</div>
	);
};
export default PizzaList;
