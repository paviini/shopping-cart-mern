import { useState } from "react";
import API from "../services/api";

function AdminCategories() {

  const [categoryName, setCategoryName] =
    useState("");

  const addCategory = async (e) => {

    e.preventDefault();

    await API.post(
      "/categories",
      {
        categoryName,
      }
    );

    alert("Category Added");

    setCategoryName("");
  };

  return (
    <div>

      <h1>Category Management</h1>

      <form onSubmit={addCategory}>

        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(
              e.target.value
            )
          }
        />

        <button type="submit">
          Add Category
        </button>

      </form>

    </div>
  );
}

export default AdminCategories;