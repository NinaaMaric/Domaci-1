import React, { useState, useEffect } from "react";
import './components.css'

function Post({ blog }) {
  return (
    <>
      <div
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
    </>
  );
}

export default Post;
