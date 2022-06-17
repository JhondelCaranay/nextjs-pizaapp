import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/CartSlice";

const Product = ({ pizza }) => {
	const [size, setSize] = useState(0);
	const [price, setPrice] = useState(pizza.prices[0]);

	const [extras, setExtras] = useState([]);
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	// console.log("PIZAAAAAAAA");

	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference = pizza.prices[sizeIndex] - pizza.prices[size];
		// pizza.prices[0] = 12			small size price
		// pizza.prices[1] = 13			medium size price
		// pizza.prices[2] = 14			latge size price

		//difference =  new price - current price

		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const { checked } = e.target;
		if (checked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]); // 	setExtras([...extras, option]);
		} else {
			changePrice(-option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	// console.log(extras);

	const handleClick = () => {
		dispatch(addProduct({ ...pizza, extras, price, quantity }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div
					className={styles.imgContainer}
					// style={{ width: `${imgWidth}%`, height: `${imgHeight}%` }}
				>
					<Image
						src={pizza.img}
						objectFit="contain"
						layout="fill"
						alt=""
						priority
					/>
				</div>
			</div>
			<div className={styles.right}>
				<h1 className={styles.title}>{pizza.title}</h1>
				<span className={styles.price}>${price}</span>
				<p className={styles.desc}>{pizza.desc}</p>

				<h3 className={styles.choose}>Choose the size</h3>

				<div className={styles.sizes}>
					<div className={styles.size} onClick={() => handleSize(0)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Small</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(1)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Medium</span>
					</div>
					<div className={styles.size} onClick={() => handleSize(2)}>
						<Image src="/img/size.png" layout="fill" alt="" />
						<span className={styles.number}>Large</span>
					</div>
				</div>

				<h3 className={styles.choose}>Choose additional ingredients</h3>

				<div className={styles.ingredients}>
					{pizza.extraOptions.map((option) => (
						<div className={styles.option} key={option._id}>
							<input
								type="checkbox"
								id={option.text}
								name={option.text}
								className={styles.checkbox}
								onChange={(e) => {
									handleChange(e, option);
								}}
							/>
							<label htmlFor={option.text}>{option.text}</label>
						</div>
					))}
				</div>
				<div className={styles.add}>
					<input
						type="number"
						// defaultValue={1}
						max={99}
						min={1}
						className={styles.quantity}
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button className={styles.button} onClick={handleClick}>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
};
export default Product;

export async function getServerSideProps(context) {
	const { id } = context.params;

	// console.log(context.params);
	// console.log(context.query);

	const res = await axios.get(process.env.BASE_URL + `/api/products/${id}`);

	console.log(res.data);

	return {
		props: {
			pizza: res.data,
		}, // will be passed to the page component as props
	};
}
