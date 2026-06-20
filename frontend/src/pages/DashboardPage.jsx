import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  deleteTask,
  updateTaskStatus,
  fetchStats,
} from "../services/api";
import StatsSection from "../components/StatsSection";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalPages: 1,
  });

  const loadData = async () => {
    try {
      setLoading(true);

      const taskRes = await fetchTasks({
        search,
        status,
        sort,
        page,
      });

      const statsRes = await fetchStats();

      setTasks(taskRes.data.tasks || []);

      setPagination(
        taskRes.data.pagination || {
          totalPages: 1,
        }
      );

      setStats(statsRes.data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, status, sort, page]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateTaskStatus(id, "Completed");
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">

      <StatsSection stats={stats} />

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search Tasks..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>

          <option value="pending">
            Pending First
          </option>

          <option value="completed">
            Completed First
          </option>
        </select>

      </div>

      {loading ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">
            Loading Tasks...
          </h2>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center mt-10">
          <div className="text-6xl">
            📋
          </div>

          <h2 className="text-2xl font-bold mt-3">
            No Tasks Found
          </h2>

          <p>
            Create your first task to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {tasks.map((task) => (
              <div
                key={task._id}
                className="border rounded shadow-lg p-4"
              >
                <h2 className="font-bold text-xl">
                  {task.title}
                </h2>

                <p className="my-2">
                  {task.description}
                </p>

                <p className="font-semibold">
                  Status: {task.status}
                </p>

                <p className="text-sm mt-2">
                  Created:
                  {" "}
                  {new Date(
                    task.created_at
                  ).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    disabled={
                      task.status === "Completed"
                    }
                    onClick={() =>
                      handleComplete(task._id)
                    }
                    className="bg-green-500 text-white px-3 py-2 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task._id)
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>

          <div className="flex justify-center gap-3 mt-8">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
            >
              Previous
            </button>

            <span>
              Page {page} of{" "}
              {pagination.totalPages}
            </span>

            <button
              disabled={
                page ===
                pagination.totalPages
              }
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;