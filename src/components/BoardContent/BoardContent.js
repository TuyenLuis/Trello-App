import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Container as ContainerBootstrap, Row, Col, Form, Button } from "react-bootstrap";
import { isEmpty } from "lodash";

import "./BoardContent.scss";
import Column from "components/Column/Column";
import { initialData } from "actions/initialData";
import { mapOrder } from "utilities/sorts";
import { applyDrag } from "utilities/dragDrop";

function BoardContent() {
	const [board, setBoard] = useState({});
	const [columns, setColumns] = useState([]);
	const [isOpenColumnForm, setIsOpenColumnForm] = useState(false);
	const [newColumnTitle, setNewColumnTitle] = useState("");

	const newColumnRef = useRef(null);

	useEffect(() => {
		const boardFromDB = initialData.boards.find(board => board.id === "board-1");
		if (boardFromDB) {
			setBoard(boardFromDB);
			boardFromDB.columns = mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id");
			setColumns(boardFromDB.columns);
		}
	}, []);

	useEffect(() => {
		if (newColumnRef && newColumnRef.current) {
			newColumnRef.current.focus();
			newColumnRef.current.select();
		}
	}, [isOpenColumnForm]);

	const onChangeTitle = useCallback((e) => setNewColumnTitle(e.target.value), []);

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
	};

	const onCardDrop = (columnId, dropResult) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			let newColumns = [...columns];
			let currentColumn = columns.find(col => col.id === columnId);
			let newCard = applyDrag(currentColumn.cards, dropResult);
			currentColumn.cards = newCard;
			currentColumn.cardOrder = newCard.map(item => item.id);
			setColumns(newColumns);
		}
	};

	const toggleAddColumnForm = () => {
		setIsOpenColumnForm(!isOpenColumnForm);
	};

	const submitAddNew = () => {
		if (!newColumnTitle) {
			newColumnRef.current.focus();
			return;
		}

		const newCol = {
			id: Math.random().toString(36).substring(2, 5),
			boardId: board.id,
			title: newColumnTitle.trim(),
			cardOrder: [],
			cards: []
		};

		let listColumn = [...columns];
		listColumn.push(newCol);
		setColumns(listColumn);

		let newBoard = { ...board };
		newBoard.columns = listColumn;
		newBoard.columnOrder = newBoard.columnOrder.push(newCol.id);
		setBoard(newBoard);

		setNewColumnTitle("");
		toggleAddColumnForm();
	};


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
			<ContainerBootstrap className="no-pd column">
				{ !isOpenColumnForm &&
					<Row>
						<Col className="add-column" onClick={toggleAddColumnForm}>
							<i className="fa fa-plus icon" />
							<div className="actions">Add another column</div>
						</Col>
					</Row>
				}
				{ isOpenColumnForm &&
					<Row>
						<Col className="enter-column">
							<Form.Control
								size="sm"
								type="text"
								placeholder="Enter column title..."
								className="title"
								ref={newColumnRef}
								value={newColumnTitle}
								onChange={onChangeTitle}
								onKeyDown={event => event.key === "Enter" && submitAddNew()}
							/>
							<Button variant="success" size="sm" onClick={submitAddNew}>Add column</Button>
							<span className="cancel" onClick={toggleAddColumnForm}><i className="fa fa-trash icon" /></span>
						</Col>
					</Row>
				}
			</ContainerBootstrap>
		</div>
	);


}

export default BoardContent;
