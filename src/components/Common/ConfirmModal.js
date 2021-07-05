import React from "react";
import { Modal, Button } from "react-bootstrap";
import HtmlReactParser from "html-react-parser";

import { MODAL_ACTIONS } from "utilities/constants";

function ConfirmModal(props) {
	const { title, content, isShow, onAction } = props
	return (
		<Modal
			show={isShow}
			onHide={() => onAction(MODAL_ACTIONS.CLOSE)}
			backdrop="static"
			keyboard={false}
			animation={false}
		>
			<Modal.Header>
				<Modal.Title className="h5">
					{ title }
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{ HtmlReactParser(content) }</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => onAction(MODAL_ACTIONS.CLOSE)}>
					Close
				</Button>
				<Button variant="primary" onClick={() => onAction(MODAL_ACTIONS.CONFIRM)}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmModal;
