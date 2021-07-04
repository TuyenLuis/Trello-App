import React, { useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";

import "./BoardContent.scss";
import Column from "components/Column/Column";
import { initialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";
import { applyDrag } from "utilities/dragDrop";

function BoardContent() {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);

	useEffect(() => {
		const boardFromDB = initialData.boards.find(board => board.id === "board-1");
		if (boardFromDB) {
			setBoard(boardFromDB);
			boardFromDB.columns = mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id");
			setColumns(boardFromDB.columns);
		}
	}, []);

	if (isEmpty(board)) {
		return (
			<div className="not-found" style={{ "padding": "10px", "color": "white" }}>Board not found</div>
		);
	}

	const onColumnDrop = (dropResult) => {
		let newColumns = [...columns];
		newColumns = applyDrag(newColumns, dropResult);
		let newBoard = { ...board };
		newBoard.columnOrder = newColumns.map(item => item.id);
		newBoard.columns = newColumns;
		setColumns(newColumns);
		setBoard(newBoard);
	}

	const onCardDrop = (columnId, dropResult) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			let newColumns = [...columns];
			let currentColumn = columns.find(col => col.id === columnId);
			let newCard = applyDrag(currentColumn.cards, dropResult);
			currentColumn.cards = newCard;
			currentColumn.cardOrder = newCard.map(item => item.id);
			setColumns(newColumns);
		}
	}

	return (
		<div className="board-content">
			<Container
				orientation="horizontal"
				onDrop={ onColumnDrop }
				getChildPayload={index => columns[index]}
				dragHandleSelector=".column-drag-handle"
				dropPlaceholder={{
					animationDuration: 150,
					showOnTop: true,
					className: "columns-drop-preview",
				}}
			>
				{ columns.map((col, idx) => {
					return (
						<Draggable
							key={idx}
						>
							<Column column={col} onCardDrop={onCardDrop} />
						</Draggable>
					)
				}) }
			</Container>
			<div className="add-column">
				<i className="fa fa-plus icon" />
				<div className="actions">Add another column</div>
			</div>
		</div>
	);


}

export default BoardContent;
