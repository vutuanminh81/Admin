import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import AdminModel from "../../model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const UpdateProfile = () => {
  const location = useLocation();
  const email = location.state;
  const navigate = useNavigate();
  const [profile, setProfile] = useState(new AdminModel());
  const [listphone, setListPhone] = useState([]);

  const [fullnameError, setFullnameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

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

  function getPhoneList(){
    axios.get("http://localhost:3000/admin/checkPhone").then(async res=>{
    // await setCheckPhone(res.data);
     setListPhone(res.data);
  });
}

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getPhoneList();
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
                      
                    />
                    <label
                    style={{ color: "#ebe067", fontSize: "14px" }}
                    className="field-label-right"
                  >
                    {fullnameError}
                  </label>
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
                      
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {phoneError}
                    </label>
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
                      
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {addressError}
                    </label>
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
    </div>
  );

  function isRequired (input){
    if(input === ""){
      return true;
    }else{
      return false;
    }
  }

  function checkDupPhone(phone){
    var check = listphone.find(e=> e == phone);
    if(check){
      return true;
    }else{
      return false;
    }
  }

  function checkPhone(phone) {
    var isvalid = false;
    if(isRequired(phone)){
      setPhoneError("Phone cannot be blank");
      isvalid = false;
    }else if (!phone.match(/(|0)(1|3|5|7|8|9)+([0-9]{9})\b/)) {
      setPhoneError("Invalid phone number! (0123456789 or +84123456789)");
      isvalid = false;
    } else if(checkDupPhone()) {
      setPhoneError("This phone is already use!");
      isvalid = false;
    }else{
      setPhoneError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkFullname(fullname){
    var isvalid = false;
    if(isRequired(fullname)){
      setFullnameError("Fullname cannot be blank");
      isvalid= false;
    }else{
      setFullnameError("");
      isvalid= true;
    }
    return isvalid;
  }

  function checkAddress(address){
    var isvalid = false;
    if(isRequired(address)){
      setAddressError("Address cannot be blank");
      isvalid= false;
    }else{
      setAddressError("");
      isvalid= true;
    }
    return isvalid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    var phone = document.getElementById('txt_phone_number').value;
    var address = document.getElementById('txt_address').value;
    var fullname = document.getElementById('txt_full_name').value;

    var isvalidFullname = checkFullname(fullname),
    isvalidPhone = checkPhone(phone),
    isvalidAddress = checkAddress(address);
    var isvalidForm = isvalidAddress && isvalidFullname && isvalidPhone;
    if (isvalidForm) {
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
  }
};

export default UpdateProfile;
