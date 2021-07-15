import React, { useState, useEffect, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";

import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import { mapOrder } from "utilities/sorts";
import { MODAL_ACTIONS } from "utilities/constants";
import { saveWhenEnter, selectAllTextContent } from "utilities/contentEditable";
import { cloneDeep } from "lodash";

function Column(props) {
	const { column, onCardDrop, onUpdate } = props;
	const cards = mapOrder(column.cards, column.cardOrder, "id");
	const [isShow, setIsShow] = useState(false);
	const [columnTile, setColumnTitle] = useState("");
	const [isOpenCardForm, setIsOpenCardForm] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState("");

	const newCardRef = useRef(null);

	useEffect(() => {
		setColumnTitle(column.title);
	}, [column.title]);

	useEffect(() => {
		if (newCardRef && newCardRef.current) {
			newCardRef.current.focus();
			newCardRef.current.select();
		}
	}, [isOpenCardForm]);

	const toggleAddCardForm = () => {
		setIsOpenCardForm(!isOpenCardForm);
	}

	const onChangeColumnTitle = (e) => setColumnTitle(e.target.value);
	// const onCardDrop = (columnId, dropResult) => {
	// 	if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
	// 		console.log(dropResult);
	// 	}
	// }

	const onConfirmModal = (type) => {
		if (type === MODAL_ACTIONS.CONFIRM) {
			const newCol = { ...column };
			newCol._destroy = true;
			onUpdate(newCol);
		}
		toggleShowModal();
	}

	const toggleShowModal = () => setIsShow(!isShow);

	const onBlurColumnTitle = () => {
		const newCol = { ...column };
		newCol.title = columnTile;
		onUpdate(newCol);
	}

	const onChangeTitle = (e) => setNewCardTitle(e.target.value);

	const submitAddNew = () => {
		if (!newCardTitle) {
			newCardRef.current.focus();
			return;
		}

		const newCard = {
			id: Math.random().toString(36).substring(2, 5),
			boardId: column.boardId,
			columnId: column.id,
			title: newCardTitle.trim(),
			cover: null
		};

		let newColumn = cloneDeep(column);
		newColumn.cards.push(newCard);
		newColumn.cardOrder.push(newCard.id);
		onUpdate(newColumn);
		setNewCardTitle("");
		toggleAddCardForm();
	};

	return (
		<div className="columns">
			<header className="header column-drag-handle">
				<div className="column-title">
					<Form.Control
						size="sm"
						type="text"
						className="title editable"
						value={columnTile}
						spellCheck="false"
						onClick={selectAllTextContent}
						onChange={onChangeColumnTitle}
						onBlur={onBlurColumnTitle}
						onKeyDown={event => event.key === "Enter" && saveWhenEnter(event)}
						onMouseDown={event => event.preventDefault()}
					/>
				</div>
				<div className="column-action">
					<Dropdown>
						<Dropdown.Toggle
							id="dropdown-action"
							size="sm"
							className="dropdown-action"
						/>
						<Dropdown.Menu>
							<Dropdown.Item>Add Card</Dropdown.Item>
							<Dropdown.Item onClick={toggleShowModal}>Remove Column</Dropdown.Item>
							<Dropdown.Item>Remove All Card In This Column</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>

			</header>
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
				{
					isOpenCardForm &&
					<div className="add-new-card">
						<Form.Control
							size="sm"
							as="textarea"
							rows="3"
							placeholder="Enter a title for this card..."
							className="enter-new-card"
							ref={newCardRef}
							value={newCardTitle}
							onChange={onChangeTitle}
							onKeyDown={event => event.key === "Enter" && submitAddNew()}
						/>
					</div>
				}
			</div>
			<footer className="footer" onClick={toggleAddCardForm}>
				{
					isOpenCardForm &&
					<div className="action-add-card">
						<Button variant="success" size="sm" onClick={submitAddNew}>Add card</Button>
						<span className="cancel" onClick={toggleAddCardForm}><i className="fa fa-trash icon" /></span>
					</div>
				}
				{
					!isOpenCardForm &&
					<div className="actions">
						<i className="fa fa-plus icon" />
						Add another card
					</div>
				}
			</footer>
			<ConfirmModal
				isShow={isShow}
				title="Remove Column"
				content={`Are you sure you want to remove <strong>${column.title}</strong> column ?<br/> All related card also will be removed!`}
				onAction={onConfirmModal}
			/>
		</div>
	);
}

export default Column;
