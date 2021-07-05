import React from "react";
import { Container, Draggable } from "react-smooth-dnd";

import "./Column.scss";
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sorts";

function Column(props) {
	const { column, onCardDrop } = props;
	const cards = mapOrder(column.cards, column.cardOrder, "id");
	// const onCardDrop = (columnId, dropResult) => {
	// 	if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
	// 		console.log(dropResult);
	// 	}
	// }

	return (
		<div className="columns">
			<header className="header column-drag-handle">{column.title}</header>
			<div className="list-items">
				<Container
					// onDragStart={e => console.log("On Drag Start", e)}
					// onDragEnd={e => console.log("On Drag End", e)}
					// onDragEnter={e => console.log("On Drag Enter", e)}
					// onDragLeave={e => console.log("On Drag Leave", e)}
					orientation="vertical"
					groupName="col"
					onDrop={dropResult => onCardDrop(column.id, dropResult) }
					getChildPayload={index => cards[index]}
					dragClass="card-ghost"
					dropClass="card-ghost-drop"
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: "cards-drop-preview",
					}}
					animationDuration={200}
				>
					{cards.map((card, idx) => (
						<Draggable key={idx}>
							<Card card={card} />
						</Draggable>
					))}
				</Container>
			</div>
			<footer className="footer">
				<i className="fa fa-plus icon" />
				<div className="actions">Add another card</div>
			</footer>
		</div>
	);
}

export default Column;
