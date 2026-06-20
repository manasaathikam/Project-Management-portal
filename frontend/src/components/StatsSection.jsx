const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <div className="bg-blue-500 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">
          Total Tasks
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.totalTasks || 0}
        </p>
      </div>

      <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">
          Pending Tasks
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.pendingTasks || 0}
        </p>
      </div>

      <div className="bg-cyan-500 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">
          In Progress
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.inProgressTasks || 0}
        </p>
      </div>

      <div className="bg-green-500 text-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">
          Completed Tasks
        </h3>

        <p className="text-4xl font-bold mt-2">
          {stats.completedTasks || 0}
        </p>
      </div>

    </div>
  );
};

export default StatsSection;