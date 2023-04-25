import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchItems, removeItem } from "../../api";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import { TodoContext } from "../TodoContext";

const Items = (): React.ReactElement => {
	//EDIT ITEM
	const { setTodo } = useContext(TodoContext);

	//CROSS ITEM OUT
	const checkItem = (e: React.MouseEvent<HTMLDivElement>): void => {
		const text = (e.target as HTMLElement).parentElement;
		if (text) text?.classList.toggle("complete");
	};

	//DELETE
	const QC = useQueryClient();
	const destroyItem = useMutation({
		mutationFn: removeItem,
		onSuccess: () => QC.invalidateQueries(["items"]),
	});

	//FETCH
	const { data, isLoading, isError } = useQuery(["items"], fetchItems);
	if (isLoading) return <h2>Loading....</h2>;
	if (isError) return <h2>Error!...</h2>;

	return (
		<ul className='ItemList'>
			{data &&
				data.map((item) => (
					<li key={item.id}>
						<div className='checkBox' onClick={(e) => checkItem(e)} />
						<p>{item.item}</p>
						<FaEdit onClick={() => setTodo({ id: item.id, text: item.item })} />
						<FaTrash onClick={() => destroyItem.mutate(item.id)} />
					</li>
				))}
		</ul>
	);
};

export default Items;
