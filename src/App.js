import React, { useState, useEffect } from "react";
import colleges from "./data/colleges.json";
import "./App.css";

function App() {
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };

  const fetchMoreColleges = () => {
    setTimeout(() => {
      setColleges((prevState) => [
        ...prevState,
        ...Array.from(Array(20).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
  };

  const [colleges, setColleges] = useState(
    Array.from(Array(30).keys(), (n) => n + 1)
  );
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreColleges();
  }, [isFetching]);
  return (
    <div>
      {colleges.map((college) => (
        <h1 key={college}>{college}</h1>
      ))}
      {isFetching && <p>Loading...</p>}
    </div>
  );
}

export default App;
