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

		// Validation
		if (!name.trim()) {
			alert("Product name is required");
			return;
		}

		if (name.trim().length < 3) {
			alert("Product name must be at least 3 characters");
			return;
		}

		if (!price || Number(price) <= 0) {
			alert("Price must be greater than 0");
			return;
		}

		if (!description.trim()) {
			alert("Description is required");
			return;
		}

		if (description.trim().length < 10) {
			alert("Description must be at least 10 characters");
			return;
		}

		const productData = {
			name: name.trim(),
			price: Number(price),
			description: description.trim(),
			image: image.trim(),
		};

		try {
			if (editingId) {
				await API.put(`/products/${editingId}`, productData);
				alert("Product Updated Successfully");
				setEditingId(null);
			} else {
				await API.post("/products", productData);
				alert("Product Added Successfully");
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
		setImage(product.image || "");
		setEditingId(product._id);
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			try {
				await API.delete(`/products/${id}`);
				alert("Product Deleted Successfully");
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
					minLength={3}
					maxLength={100}
					required
				/>

				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min="1"
					step="0.01"
					required
				/>

				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					minLength={10}
					maxLength={500}
					required
				/>

				<input
					type="text"
					placeholder="Image URL (Optional)"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>

				{image && (
					<div style={{ marginTop: "10px" }}>
						<p>Image Preview:</p>
						<img
							src={image}
							alt="Preview"
							style={{
								width: "150px",
								height: "150px",
								objectFit: "cover",
								border: "1px solid #ccc",
								borderRadius: "8px",
							}}
							onError={(e) => {
								e.target.style.display = "none";
							}}
						/>
					</div>
				)}

				<div className="form-buttons">
					<button type="submit">
						{editingId ? "Update Product" : "Add Product"}
					</button>

					{editingId && (
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					)}
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
									<img
										src={
											product.image ||
											"https://via.placeholder.com/150?text=No+Image"
										}
										alt={product.name}
										style={{
											width: "100px",
											height: "100px",
											objectFit: "cover",
											borderRadius: "8px",
										}}
										onError={(e) => {
											e.target.src =
												"https://via.placeholder.com/150?text=No+Image";
										}}
									/>

									<div className="product-details">
										<h3>{product.name}</h3>
										<p className="description">
											{product.description}
										</p>
										<p className="price">
											Rs. {Number(product.price).toFixed(2)}
										</p>
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