import { useState } from "react";
import API from "../services/api";

function AdminProducts() {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

	const addProduct = async (e) => {
		e.preventDefault();

		await API.post("/products", {
			name,
			price: Number(price),
			description,
			image,
		});

		alert("Product Added");

		setName("");
		setPrice("");
		setDescription("");
		setImage("");
	};

	return (
		<div>
			<h1>Product Management</h1>

			<form onSubmit={addProduct}>
				<input
					type="text"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>

				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<input
					type="text"
					placeholder="Image URL"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>

				<button type="submit">Add Product</button>
			</form>
		</div>
	);
}

export default AdminProducts;
