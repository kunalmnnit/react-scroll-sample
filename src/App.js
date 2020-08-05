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
    if (page >= 5) {
      window.removeEventListener("scroll", handleScroll);
      setIsFetching(false);
    }

    setVisibleColleges([...colleges.slice(0, page * 10)]);
    setIsFetching(false);
  }, [isFetching, page, colleges]);
  return (
    <React.Fragment>
      {visibleColleges.map((college) => (
        <div key={college.college_name} className="card">
          <div className={college.promoted ? "ribbon" : null}>Promoted</div>
          <div className="rating-badge">
            <span style={{ fontSize: "15px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>3.9</span>
              /5
              {"    "}
              {college.rating_remarks}
            </span>
          </div>
          <div className="ranking-badge">#{college.ranking}</div>
          <div className="tags-row">{college.tags[0]}</div>
          <div className="tags-row" style={{ marginLeft: "175px" }}>
            {college.tags[1]}
          </div>
          <div className="upper">
            <img className="image" src="./college_02.jpg" alt="college-pic" />
          </div>
          <div>
            <h3 id="college-name" style={{ display: "inline-block" }}>
              {college.college_name}
            </h3>
            <div id="star" style={{ display: "inline-block" }}>
              <span className={college.rating >= 1 ? "checked-star" : null}>
                ☆
              </span>
              <span className={college.rating >= 2 ? "checked-star" : null}>
                ☆
              </span>
              <span className={college.rating >= 3 ? "checked-star" : null}>
                ☆
              </span>
              <span className={college.rating >= 4 ? "checked-star" : null}>
                ☆
              </span>
              <span className={college.rating >= 5 ? "checked-star" : null}>
                ☆
              </span>
            </div>
            <div id="price-discount" style={{ float: "right" }}>
              <p className="discount">₹{college.original_fees}</p>
              <div className="discount-label red">
                {" "}
                <span>₹{college.discount}</span>
              </div>
            </div>
            <div id="address">
              <p id="nearest_place">
                {college.nearest_place[0]} |{" "}
                <span style={{ color: "gray" }}>
                  {college.nearest_place[1]}
                </span>
              </p>
              <p id="famous_nearest_places">
                <span style={{ color: "0A9BF5", fontWeight: "600" }}>
                  93% Match:
                </span>{" "}
                {college.famous_nearest_places}
              </p>
              <p id="offertext">{college.offertext}</p>
            </div>
            <div id="price">
              <p id="discounted-fees">{college.discounted_fees}</p>
              <p id="semester">Per Semester(3 months)</p>
            </div>
            <div id="amenities">
              <p id="amenties1">{college.amenties[1]} . </p>
              <p id="amenties2">{college.amenties[0]}</p>
            </div>
          </div>
        </div>
      ))}
      <div
        className={visibleColleges.length !== colleges.length ? "loader" : null}
      ></div>
    </React.Fragment>
  );
}

export default App;
