import React, { useState, useEffect } from "react";

function Post({ blog }) {
  return (
    <>
      <div
        class="ui link cards"
        style={{ display: "inline-block", marginRight: "3rem" }}
      >
        <div class="card">
          <div class="image">
            <img src={blog.image_url} style={{ height: "50%", width: "50%" }} />
          </div>
          <div class="content">
            <div class="header">{blog.title}</div>
            <div class="meta">
              <a>{blog.author}</a>
            </div>
            <div class="description">{blog.content}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
