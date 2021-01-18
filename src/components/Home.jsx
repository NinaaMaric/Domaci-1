import React, { useState, useEffect } from "react";
import Post from "./Post";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(
      "https://jsonblob.com/api/jsonBlob/bad7c143-5803-11eb-ab2d-21b39a64b43d"
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setData(response);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const add = () => {
    window.location = "/add-post";
  }

  return (
    <div className="w-100 h-100">
      <div style={{ textAlign: "right" }}>
        <button className="ui primary button" onClick={add}> Dodaj post</button>
      </div>

      {loading
        ? "UCITAVANJE..."
        : data.map((item) => {
            return <Post key={item.id} blog={item} />;
          })}
    </div>
  );
}

export default Home;
