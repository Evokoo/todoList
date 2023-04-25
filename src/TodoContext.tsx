import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

export type Todo = {
	id: string | null;
	text: string | null;
};

export interface TodoContextInterface {
	todo: Todo;
	setTodo: Dispatch<SetStateAction<Todo>>;
}

const defaultState = {
	todo: {
		id: null,
		text: null,
	},
	setTodo: () => {},
} as TodoContextInterface;

type TodoProviderProps = {
	children: ReactNode;
};

export const TodoContext = createContext(defaultState);

export default function TodoContextProvider({ children }: TodoProviderProps) {
	const [todo, setTodo] = useState<Todo>({ id: null, text: null });

	return (
		<TodoContext.Provider value={{ todo, setTodo }}>
			{children}
		</TodoContext.Provider>
	);
}
