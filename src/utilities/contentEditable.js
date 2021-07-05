export const saveWhenEnter = (event) => {
	event.target.blur();
};

export const selectAllTextContent = (event) => {
	event.target.focus();
	event.target.select();
};
