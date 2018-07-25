export function getData() {
	return (dispatch) => {
			const data = Data.instructions;
			dispatch({type: DATA_AVAILABLE, data: data});
	};
}