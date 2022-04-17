import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import AdminModel from "../../model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";


axios.defaults.withCredentials = true;
const UpdateProfile = () => {
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(new AdminModel());
  const [openPopup, setOpepPopup] = useState(false);
  const [errOldPass, setErrOldPass] = useState("");
  const [errNewPass, setErrNewPass] = useState("");
  const [errRePass, setErrRePass] = useState("");

  const [OldPass, setOldPass] = useState("");
  const [NewPass, setNewPass] = useState("");
  const [RePass, setRePass] = useState("");


  var checkSession = false;
  const md5 = require("md5");
  var CheckSession = async () => {
    await axios.get("http://localhost:3000/get_session").then(async (respn) => {
      console.log("/////////   " + respn.data);
      if (respn.data === true) {
        checkSession = true;
      } else {
        checkSession = false;
      }
    }).catch((error) =>{
      checkSession = false;
    });
  };

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
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

  useEffect(() => {
    axios.get("http://localhost:3000/admin/adminProfile").then((res) => {
      setProfile(res.data);
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
            onSubmit={(e) => handleSubmit(e)}
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
                <input
                  type="button"
                  name="register"
                  className="register"
                  id="btn_change_password"
                  value="Change password"
                  onClick={() => setOpepPopup(true)}
                />
                <button
                  type="submit"
                  name="ex_button"
                  id="btn_update_profile"
                  className="register"
                  value="Update"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="reset_form">
        <Dialog open={openPopup} width="lg">
          <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'center' }}><label>Change Password</label></div>
          </DialogTitle>
          <DialogContent>
            <div className="password_field">
              <input
                type="password"
                className="input-password"
                id="txt_old_password"
                placeholder="Old password"
                maxLength="255"
                onChange={(e) => setOldPass(e.target.value)}
                required
              />
              <label style={{color: "#F85050"}}>{errOldPass}</label>
              <input
                type="password"
                className="input-password"
                id="txt_new_password"
                placeholder="New password"
                maxLength="255"
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
              <label style={{color: "#F85050"}}>{errNewPass}</label>
              <input
                type="password"
                className="input-password"
                id="txt_reenter_password"
                placeholder="Re-enter password"
                maxLength="255"
                onChange={(e) => setRePass(e.target.value)}
                required
              />
              <label style={{color: "#F85050"}}>{errRePass}</label>
            </div>
            <div style={{ display: 'flex' }}>
              <button
                type="submit"
                name="ex_button"
                id="btn_submit_changepass"
                className="password_register"
                onClick={(e) => handleSubmitChangePass(e)}
              >
                Submit
              </button>
              <button className="password_register" type="submit" onClick={(e) => handleCancel(e)}>
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
  function handleCancel(e) {
    setErrNewPass("");
    setErrOldPass("");
    setErrRePass("");
    setOpepPopup(false);
  }

  function isRequire(str) {
    if (str.toString().trim() === "") {
      return true;
    }
    else {
      return false;
    }
  }

  function checkOldPass() {
    var isvalid = false;
    if (isRequire(document.getElementById("txt_old_password").value)) {
      setErrOldPass("Old password cannot be blank");
      isvalid = false;
    } else {
      setErrOldPass("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkNewPass() {
    var isvalid = false;
    if (isRequire(document.getElementById("txt_new_password").value)) {
      setErrNewPass("New password cannot be blank");
      isvalid = false;
    } else if (NewPass === OldPass) {
      setErrNewPass("New password must be difference from old password");
      isvalid = false;
    }
    else if(!NewPass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
      setErrNewPass("Password is not strong");
    }
    else {
      setErrNewPass("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkRePass() {
    var isvalid = false;
    if (isRequire(document.getElementById("txt_reenter_password").value)) {
      setErrRePass("Re-enter password cannot be blank");
      isvalid = false;
    } else if (RePass != NewPass) {
      setErrRePass("Re-enter password does not match");
      isvalid = false;
    } else {
      setErrRePass("");
      isvalid = true;
    }
    return isvalid;
  }


  function handleSubmitChangePass(e) {
    e.preventDefault();
    // var oldPass = document.getElementById("txt_old_password").value;
    // var newPass = document.getElementById("txt_new_password").value;
    // var rePass = document.getElementById("txt_reenter_password").value;
    var isvalidOldPass = checkOldPass(), isvalidNewPass = checkNewPass(), isvalidRePass = checkRePass();

    if (isvalidOldPass && isvalidNewPass && isvalidRePass) {
      axios.get(
        "http://localhost:3000/admin/changePassword/" + md5(OldPass) + "/" + md5(NewPass)
      )
        .then((res) => {
          if (res.data) {
            alert("Change password success");
            setErrNewPass("");
            setErrOldPass("");
            setErrRePass("");
            setOpepPopup(false);
          } else {
            setErrOldPass("Old password is not correct");
          }

        });
    }
  }
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
    axios
      .put(
        "http://localhost:3000/admin/update/" + txt_user_name.value,
        adminUpdate
      )
      .then((res) => {
        alert("Update success");
      });
  }
};

export default UpdateProfile;
