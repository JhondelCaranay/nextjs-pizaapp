import styles from "../styles/OrderDetail.module.css";
import { useState } from "react";
const OrderDetail = ({ total, createOrder, setCash }) => {
	const [customer, setCustomer] = useState("");
	const [address, setAddress] = useState("");

	const handleClick = () => {
		createOrder({ customer, address, total, method: 0 });
	};

	return (
		<div className={styles.container} onClick={() => setCash(false)}>
			<div
				className={styles.wrapper}
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className={styles.title}>
					you will pay $12 after delivery
				</h1>
				<div className={styles.item}>
					<label className={styles.label}>Name Surname</label>
					<input
						type="text"
						placeholder="john doe"
						className={styles.input}
						value={customer}
						onChange={(e) => setCustomer(e.target.value)}
					/>
				</div>

				<div className={styles.item}>
					<label className={styles.label}>Phone Number</label>
					<input
						type="text"
						placeholder="+1 234 567 89"
						className={styles.input}
					/>
				</div>
				<div className={styles.item}>
					<label className={styles.label}>Address</label>
					<textarea
						rows={5}
						placeholder="Elton St. 505 NY"
						type="text"
						className={styles.textarea}
						onChange={(e) => setAddress(e.target.value)}
						row={8}
					/>
				</div>

				<div className={styles.buttons}>
					<button className={styles.button} onClick={handleClick}>
						Order
					</button>
					<button
						className={styles.exitButton}
						onClick={() => setCash(false)}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
export default OrderDetail;
