import { useState, useEffect } from "react";
import API from "../services/api";

function AdminProducts() {
	const [products, setProducts] = useState([]);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [editingId, setEditingId] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await API.get("/products");
			setProducts(response.data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const handleAddOrEdit = async (e) => {
		e.preventDefault();

		const productData = {
			name,
			price: Number(price),
			description,
			image,
		};

		try {
			if (editingId) {
				await API.put(`/products/${editingId}`, productData);
				alert("Product Updated");
				setEditingId(null);
			} else {
				await API.post("/products", productData);
				alert("Product Added");
			}

			setName("");
			setPrice("");
			setDescription("");
			setImage("");
			fetchProducts();
		} catch (error) {
			console.error("Error:", error);
			alert("Error saving product");
		}
	};

	const handleEdit = (product) => {
		setName(product.name);
		setPrice(product.price);
		setDescription(product.description);
		setImage(product.image);
		setEditingId(product._id);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			try {
				await API.delete(`/products/${id}`);
				alert("Product Deleted");
				fetchProducts();
			} catch (error) {
				console.error("Error deleting product:", error);
				alert("Error deleting product");
			}
		}
	};

	const handleCancel = () => {
		setName("");
		setPrice("");
		setDescription("");
		setImage("");
		setEditingId(null);
	};

	return (
		<div className="admin-products">
			<h1>Product Management</h1>

			<form onSubmit={handleAddOrEdit} className="product-form">
				<h2>{editingId ? "Edit Product" : "Add New Product"}</h2>

				<input
					type="text"
					placeholder="Product Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>

				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
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

				<div className="form-buttons">
					<button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
					{editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
				</div>
			</form>

			<div className="products-list">
				<h2>All Products ({products.length})</h2>
				{products.length === 0 ? (
					<p>No products found</p>
				) : (
					<div className="products-table">
						{products.map((product) => (
							<div key={product._id} className="product-row">
								<div className="product-info">
									{product.image && <img src={product.image} alt={product.name} />}
									<div className="product-details">
										<h3>{product.name}</h3>
										<p className="description">{product.description}</p>
										<p className="price">Rs. {product.price}</p>
									</div>
								</div>
								<div className="product-actions">
									<button
										className="btn-edit"
										onClick={() => handleEdit(product)}
									>
										Edit
									</button>
									<button
										className="btn-delete"
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminProducts;
