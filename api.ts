import PocketBase from "pocketbase";

const DB = new PocketBase(import.meta.env.VITE_DB_URL);

export const updateItem = async (data: Item) => {
	const response = await DB.collection("items").update(`${data.id}`, data);
	return response;
};

export const addItem = async (data: Item) => {
	const response = await DB.collection("items").create(data);
	return response;
};

export const removeItem = async (id: string) => {
	const response = await DB.collection("items").delete(id);
	return response;
};

export const fetchItems = async () => {
	const response = await DB.collection("items").getFullList();
	return response;
};

//GLOBAL DB WATCHER
DB.collection("items").subscribe("*", function (e) {
	console.log(e);
});
