import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./components.css";

function Post({ blog , viewPost}) {
  const [oneBlog, setOneBlog] = useState({
    id: "",
    title: "",
    image_url: "",
    author: "",
    content: "",
  });

  let { id } = useParams();

  const url = window.location.pathname;

  useEffect(() => {
    if (url.includes("post")) {
      console.log("funkcija", id);
      const fetchData = () => {
        fetch(
          "https://jsonblob.com/api/jsonBlob/bad7c143-5803-11eb-ab2d-21b39a64b43d"
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log(response);
            // response.map((item) => {
            //   console.log(item.id);
            //   item.id === idPost && console.log("ulazi", item.id);
            //    const blog = {
            //     id: item.id,
            //     title: item.title,
            //     image_url: item.image_url,
            //     author: item.author,
            //     content: item.content,
            //   };
            //   setOneBlog(blog);
            // });
            const res = response.filter(item => item.id === id);
            console.log(res)
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      fetchData();
    }
  }, [id]);

  return (
    <>
      {url.includes("/post") ? (
        <div
          onClick={() => viewPost(oneBlog.id)}
          className="ui link cards"
          style={{ marginRight: "3rem" }}
        >
          <div className="card">
            <div className="image">
              <img src={oneBlog.image_url} />
            </div>
            <div className="content">
              <div className="header">{oneBlog.title}</div>
              <div className="meta">
                <a>{oneBlog.author}</a>
              </div>
              <div className="description">{oneBlog.content}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => viewPost(blog.id)}
          className="ui link cards"
          style={{ marginRight: "3rem" }}
        >
          <div className="card">
            <div className="image">
              <img src={blog.image_url} />
            </div>
            <div className="content">
              <div className="header">{blog.title}</div>
              <div className="meta">
                <a>{blog.author}</a>
              </div>
              <div className="description">{blog.content}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
