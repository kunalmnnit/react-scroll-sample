import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [colleges, setColleges] = useState([]);
  const [visibleColleges, setVisibleColleges] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    setIsFetching(true);
    setPage((prevState) => prevState + 1);
  };

  const fetchMoreColleges = () => {
    if (page >= 5) {
      window.removeEventListener("scroll", handleScroll);
      setIsFetching(false);
    }

    setTimeout(() => {
      setVisibleColleges([...colleges.slice(0, page * 10)]);
      setIsFetching(false);
    }, 2000);
  };

  useEffect(() => {
    axios.get("./colleges.json").then((res) => {
      setColleges(res.data.colleges);
      const data = res.data.colleges.slice(0, 10);
      setVisibleColleges(data);
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreColleges();
  }, [isFetching, page]);
  return (
    <div>
      {visibleColleges.map((college) => (
        <div key={college.college_name} style={{ height: "200px" }}>
          {college.college_name}
        </div>
      ))}
      {isFetching && <p>Loading...</p>}
    </div>
  );
}

export default App;
