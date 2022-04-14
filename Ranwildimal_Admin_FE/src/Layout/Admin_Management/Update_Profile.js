import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Update_Profile = () => {
  var navigate = useNavigate();
  var checkSession;
  var CheckSession = async () => {
    await axios.get("http://localhost:3000/get_session").then(async (respn) => {
      console.log("/////////   " + respn.data);
      if (respn.data === true) {
        checkSession = true;
      } else {
        checkSession = false;
      }
    });
  };

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  });
  // useEffect(() => {
  //     const addButton = document.querySelector("#btn_add");

  //     const handleClick = () => {
  //         if (exampleList.length < 3) {
  //             setExampleList((prev) => [...prev, textUpdate]);
  //         }
  //     };
  //     addButton.addEventListener("click", handleClick);
  //     return () => addButton.removeEventListener("click", handleClick);
  // });

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
                <h2>Update Profile</h2>
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
            </div>
            <div className="form-right">
              <hr className="headline" />
              <div>
                <div className="example">
                  <div className="form-row">
                    <label className="field-label-right">Username</label>
                    <input
                      type="text"
                      className="input-text"
                      id="txt_user_name"
                      placeholder="Username"
                      maxLength="20"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Fullname</label>
                    <input
                      type="text"
                      className="input-text"
                      id="txt_full_name"
                      placeholder="Fullname"
                      maxLength="30"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Phone number</label>
                    <input
                      type="text"
                      className="input-text"
                      id="txt_phone_number"
                      placeholder="Phone number"
                      maxLength="13"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Address</label>
                    <input
                      type="text"
                      className="input-text"
                      id="txt_address"
                      placeholder="Address"
                      maxLength="100"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-row-last">
                <input
                  type="submit"
                  name="register"
                  className="register"
                  id="btn_change_password"
                  value="Cancel"
                />
                <input
                  type="submit"
                  name="ex_button"
                  id="btn_update_profile"
                  className="register"
                  value="Update"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update_Profile;
