import React, { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import { fetchLaunches } from "./services/api";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const LIMIT = 10;

  // Load launches on mount or offset change
  useEffect(() => {
    loadLaunches();
  }, [offset]);

  // Filter launches on search query change
  useEffect(() => {
    setFilteredLaunches(
      launches.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, launches]);

  const loadLaunches = async () => {
    setLoading(true);
    try {
      const data = await fetchLaunches(offset, LIMIT);
      if (data.length < LIMIT) setHasMore(false);
      const newLaunches = offset === 0 ? data : [...launches, ...data];
      setLaunches(newLaunches);
      setFilteredLaunches(newLaunches);
    } catch (error) {
      console.error("Failed to fetch launches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50 &&
      !loading &&
      hasMore
    ) {
      setOffset(offset + LIMIT);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <header>
        <h1>SpaceX Launches</h1>
        <input
          type="text"
          placeholder="Search for a mission"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <div className="cards-container">
        {filteredLaunches.map((launch) => (
          <Card key={launch.flight_number} launch={launch} />
        ))}
      </div>
      {loading && (
        <div className="spinner">
          <div></div>
        </div>
      )}
      {!hasMore && <div className="end-message">End of List!</div>}
    </div>
  );
}

export default App;
