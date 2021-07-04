import React from "react";
import "./Card.scss";

function Card(props) {
	const { card } = props;
	return (
		<div className="item">
			{card.cover &&
				<img
					className="image"
					src={card.cover}
					alt=""
					onMouseDown={e => e.preventDefault()}
				/>}
			{card.title}
		</div>
	);
}

export default Card;
