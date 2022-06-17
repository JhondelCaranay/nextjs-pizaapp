import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
const Navbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);

	return (
		<div className={styles.container}>
			<div className={styles.item}>
				<div className={styles.callButton}>
					<Image
						src="/img/telephone.png"
						alt="telephone"
						width="32"
						height="32"
					/>
				</div>

				<div className={styles.texts}>
					<div className={styles.text}>ORDER NOW!</div>
					<div className={styles.text}>0995 460 9540</div>
				</div>
			</div>

			<div className={styles.item}>
				<ul className={styles.list}>
					<li className={styles.listItem}>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					<li className={styles.listItem}>Products</li>
					<li className={styles.listItem}>Menu</li>
					<Image
						src="/img/mylogo.png"
						alt=""
						width="160px"
						height="69px"
					/>
					<li className={styles.listItem}>Events</li>
					<li className={styles.listItem}>Blog</li>
					<li className={styles.listItem}>Contact</li>
				</ul>
			</div>

			<Link href="/cart" passHref>
				<div className={styles.item}>
					<div className={styles.cart}>
						<Image
							src="/img/cart.png"
							alt=""
							width="30px"
							height="30px"
						/>
						<div className={styles.counter}>{quantity}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
export default Navbar;
