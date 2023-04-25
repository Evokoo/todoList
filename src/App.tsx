//Components
import Items from "./components/Items";
import Form from "./components/Form";

//Styles
import "./styles.scss";

//Context
import TodoContextProvider from "./TodoContext";

function App() {
	return (
		<div id='App'>
			<TodoContextProvider>
				<Form />
				<Items />
			</TodoContextProvider>
		</div>
	);
}

export default App;
