import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import AdminModel from "../model/admin";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";

const Profile = () => {
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

  const [profile, setProfile] = useState(new AdminModel());
  useEffect(() => {
    axios.get("http://localhost:3000/admin/admin1@gmail.com").then((res) => {
      setProfile(res.data);
    });
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
          <form
            className="form-detail"
            action="#"
            method="post"
            id="myform"
          >
            <div className="form-left">
              <div className="header-left">
                <h2>Profile</h2>
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
              <hr className="headline"></hr>
              <div>
                <div className="example">
                  <div className="form-row">
                    <label className="field-label-right">Username</label>
                    <input
                      value={profile.User_Name}
                      type="text"
                      className="input-text profile"
                      id="txt_user_name"
                      maxLength="20"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Fullname</label>
                    <input
                      type="text"
                      defaultValue={profile.Full_Name}
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
                      defaultValue={profile.Phone_Number}
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
                      defaultValue={profile.Address}
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
                {/* <input
                  type="submit"
                  name="register"
                  className="register"
                  id="btn_change_password"
                  value="Change password"
                  
                /> */}
                <Popup modal trigger = {<button>Change Password</button>}>
                    <div>
                    <form>
                        <input type="text" value= "Old Password"/>
                        <input type="text" value= "Old Password"/>
                        <input type="text" value= "Old Password"/>
                    </form>
                    </div>
                </Popup>
                <input
                  type="submit"
                  name="ex_button"
                  id="btn_update_profile"
                  className="register"
                  value="Update"
                  onClick= { () => handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );

//   function changePassword(e){
//     const rootElement = document.getElementById("root");
//     ReactDOM.render(<App />, rootElement);
//   }
  function handleSubmit(e) {
    e.preventDefault();
    const { txt_user_name, txt_full_name, txt_phone_number, txt_address } =
      e.target.elements;
    var adminUpdate = new AdminModel(
      txt_address.value,
      profile.Admin_Id,
      txt_full_name.value,
      profile.Password,
      txt_phone_number.value,
      profile.Status,
      txt_user_name.value
    );
    console.log(txt_full_name.value);
    axios.put("http://localhost:3000/admin/update/"+txt_user_name.value,adminUpdate).then(res=>{
        alert("Update success");
    });
  }
};

export default Profile;
