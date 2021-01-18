import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validation } from "../scheme/Scheme";

function AddPost() {
  const [data, setData] = useState([]);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: validation,
  });

  useEffect(() => {
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
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const putBlob = (newPosts) => {
    let url =
      "http://jsonblob.com/api/jsonBlob/bad7c143-5803-11eb-ab2d-21b39a64b43d";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newPosts),
    })
      .then((response) => console.log(response.json()))
      .then((data) => window.location('/'))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  };

  const onSubmit = (submittedData) => {
    console.log(data);
    if (data.length > 0) {
      let last = data.length - 1;
      let newId = data[last].id;
      console.log(newId, submittedData);
      const payload = {
        id: newId,
        title: submittedData.title,
        image_url: submittedData.image_url,
        author: submittedData.author,
        content: submittedData.content,
      };
      putBlob(payload);
    } else {
      let newD = 1;
      const payload = {
        id: newD,
        title: submittedData.title,
        image_url: submittedData.image_url,
        author: submittedData.author,
        content: submittedData.content,
      };
      putBlob(payload);
    }
  };

  return (
    <div style={{ width: "50%", marginLeft: "3rem", marginTop: "3rem" }}>
      <form onSubmit={handleSubmit(onSubmit)} className="ui form">
        <input
          type="text"
          id="title"
          name="title"
          placeholder={"Unesite naslov"}
          ref={register}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
        <input
          type="text"
          id="image_url"
          name="image_url"
          placeholder={"Unesite url slike"}
          ref={register}
        />
        {errors.image_url && (
          <span className="error-message">{errors.image_url.message}</span>
        )}
        <input
          type="text"
          id="author"
          name="author"
          placeholder={"Unesite autora"}
          ref={register}
        />
        {errors.author && (
          <span className="error-message">{errors.author.message}</span>
        )}
        <textarea
          id="content"
          name="content"
          rows="2"
          placeholder={"Unesite sadrzaj posta"}
          ref={register}
        />
        {errors.content && (
          <span className="error-message">{errors.content.message}</span>
        )}
        <br />
        <button className="ui primary button">Sacuvajte</button>
      </form>
    </div>
  );
}

export default AddPost;
