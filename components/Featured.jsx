import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
	const [index, setindex] = useState(0);

	const images = ["/img/f1.jpg", "/img/f2.jpg", "/img/f3.jpg", "/img/f4.jpg"];

	const handleArrow = (direction) => {
		if (direction === "left") {
			setindex(index !== 0 ? index - 1 : 3);
		}
		if (direction === "right") {
			setindex(index !== 3 ? index + 1 : 0);
		}
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.arrowContainer}
				style={{ left: 0 }}
				onClick={() => handleArrow("left")}
			>
				<Image
					src="/img/arrowl.png"
					alt="arrow-left"
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<div
				className={styles.wrapper}
				style={{ transform: `translateX(${-100 * index}vw)` }}
			>
				{images.map((image, index) => (
					<div className={styles.imgContainer} key={index}>
						<Image
							src={image}
							alt=""
							layout="fill"
							objectFit="contain"
							priority
						/>
					</div>
				))}
			</div>
			<div
				className={styles.arrowContainer}
				style={{ right: 0 }}
				onClick={() => handleArrow("right")}
			>
				<Image
					src="/img/arrowr.png"
					alt="arrow-right"
					layout="fill"
					objectFit="contain"
				/>
			</div>
		</div>
	);
};
export default Featured;
