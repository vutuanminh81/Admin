import React, { useState, useEffect } from "react";
import "./word_management.css";
import avatar from "./avatar.png";

const Create = () => {
  const textUpdate = (
    <div className="example">
      <div className="form-row">
        <input
          type="text"
          name="en_example"
          className="input-text"
          id="txt_en_example"
          placeholder="English Example"
          max="255"
          required
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          name="jp_example"
          className="input-text"
          id="txt_jp_example"
          placeholder="Japanese Example"
          max="255"
          required
        />
      </div>
      <div className="form-row">
        <input
          type="text"
          name="vn_example"
          className="input-text"
          id="txt_vn_example"
          placeholder="Vietnamese Example"
          max="255"
          required
        />
      </div>
    </div>
  );
  const [exampleList, setExampleList] = useState([textUpdate]);
  useEffect(() => {
    const addButton = document.querySelector("#btn_add");

    const handleClick = () => {
      if (exampleList.length < 3) {
        setExampleList((prev) => [...prev, textUpdate]);
      }
    };
    addButton.addEventListener("click", handleClick);
    return () => addButton.removeEventListener("click", handleClick);
  });
  useEffect(() => {
    const avatarDiv = document.querySelector(".avatar-pic");
    const avat = document.querySelector("#avatar");
    const photoUpload = document.querySelector("#fileUpload");
    const uploadFileBtn = document.querySelector("#btn_upload_img");
    avatarDiv.addEventListener("mouseenter", function () {
      uploadFileBtn.style.display = "block";
    });

    avatarDiv.addEventListener("mouseleave", function () {
      uploadFileBtn.style.display = "none";
    });

    photoUpload.addEventListener("change", function () {
      const chosenPhoto = this.files[0];

      if (chosenPhoto) {
        const photoReader = new FileReader();

        photoReader.addEventListener("load", function () {
          avat.setAttribute("src", photoReader.result);
        });
        photoReader.readAsDataURL(chosenPhoto);
      }
    });
  }, []);
  return (
    <div className="form-v10">
      <div className="page-content">
        <div className="form-v10-content">
          <form className="form-detail" action="#" method="post" id="myform">
            <div className="form-left">
              <div className="header-left">
                <h2>Create new word</h2>
              </div>
              <div className="form-row">
                <div className="avatar-pic">
                  <img src={avatar} id="avatar" />
                  <input type={"file"} id="fileUpload" />
                  <label htmlFor="fileUpload" id="btn_upload_img">
                    Choose a photograph
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row form-row-1">
                  <input
                    type="text"
                    name="en_word"
                    id="txt_en_word"
                    className="input-text"
                    placeholder="English Word"
                    max="10"
                    required
                  />
                </div>
                <div className="form-row form-row-2">
                  <input
                    type="text"
                    name="jp_word"
                    id="txt_jp_word"
                    className="input-text"
                    placeholder="Japanese Word"
                    max="10"
                    required
                  />
                </div>
                <div className="form-row form-row-3">
                  <input
                    type="text"
                    name="vn_word"
                    id="txt_vn_word"
                    className="input-text"
                    placeholder="Vietnamese Word"
                    max="10"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="audio_url"
                  className="input-text"
                  id="txt_audio_url"
                  placeholder="Audio URL"
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="video_url"
                  className="input-text"
                  id="txt_video_url"
                  placeholder="Video URL"
                  required
                />
              </div>
            </div>
            <div className="form-right">
              <div className="addButton">
                <input
                  type="submit"
                  name="register"
                  className="register"
                  id="btn_add"
                  value="Add more example"
                />
              </div>
              <div>
                {exampleList.map((item) => {
                  return item;
                })}
              </div>
              <div className="form-row-last">
                <input
                  type="submit"
                  name="register"
                  className="register"
                  id="btn_cancel"
                  value="Cancel"
                />
                <input
                  type="submit"
                  name="ex_button"
                  id="btn_add_exemple"
                  className="register"
                  value="Create"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
