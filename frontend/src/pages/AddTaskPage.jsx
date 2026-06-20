import React, { useState } from "react";
import { createTask } from "../services/api";

const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!title.trim()) {
      temp.title = "Title is required";
    }

    if (description.length < 20) {
      temp.description =
        "Description must be at least 20 characters";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await createTask({
        title,
        description,
        status,
      });

      console.log(response.data);

      alert("Task Added Successfully");

      setTitle("");
      setDescription("");
      setStatus("Pending");
    } catch (error) {
      console.log(error);

      alert(
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow rounded">
      <h1 className="text-3xl font-bold mb-6">
        Add New Task
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">
            Task Title
          </label>

          <input
            type="text"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          {errors.title && (
            <p className="text-red-500">
              {errors.title}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Description
          </label>

          <textarea
            className="border p-2 w-full rounded"
            rows="5"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {errors.description && (
            <p className="text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Status
          </label>

          <select
            className="border p-2 w-full rounded"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Pending">
              Pending
            </option>
            <option value="In Progress">
              In Progress
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;