import { useState,useEffect } from "react";
import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import TaskTable from "./components/TaskTable";
import { useTasks } from "./hooks/useTasks";
const PAGE_SIZE = 10;


export default function App() {
  // const { tasks, total, loading, error } = useTasks(query, status, page, 10);

  // const totalPages = Math.ceil(total / 10);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { tasks, total, loading, error } = useTasks(
    query,
    status,
    page,
    PAGE_SIZE,
  );

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Internal task management</p>
      </header>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      <TaskTable tasks={tasks} loading={loading} error={error} />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
