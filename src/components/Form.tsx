import { useContext, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, updateItem } from "../../api";
import { TodoContext } from "../TodoContext";

const Form = (): React.ReactElement => {
	const txtInput = useRef<HTMLInputElement>(null);
	const QC = useQueryClient();

	const { todo, setTodo } = useContext(TodoContext);

	if (todo.id && todo.text && txtInput.current) {
		txtInput.current.value = todo.text;
		txtInput.current.focus();
	}

	const modifyItem = useMutation({
		mutationFn: updateItem,
		onSuccess: () => QC.invalidateQueries(["items"]),
	});

	const createItem = useMutation({
		mutationFn: addItem,
		onSuccess: () => QC.invalidateQueries(["items"]),
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (txtInput.current !== null) {
			if (todo.id) {
				modifyItem.mutate({ id: todo.id, item: txtInput.current.value });
				setTodo({ id: null, text: null });
			} else {
				createItem.mutate({ item: txtInput.current.value });
			}

			txtInput.current.value = "";
			txtInput.current.focus();
		}
	};

	return (
		<section id='inputForm'>
			<h1>Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input type='text' ref={txtInput} required />
				<button type='submit'>{todo.id ? "Update" : "Add"} Item</button>
			</form>
		</section>
	);
};

export default Form;
