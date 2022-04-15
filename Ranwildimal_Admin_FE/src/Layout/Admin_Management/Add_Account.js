import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminModel from "../../model/admin";
axios.defaults.withCredentials = true;
const md5 = require("md5");

const Add_Account = () => {

  const [listphone, setListPhone] = useState([]);
  const [listUsername, setListUsername] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [addressError, setAddressError] = useState("");

  const navigate = useNavigate();
  function backToList(){
    navigate("/admin_managemnet");
  }

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
     setListPhone(res.data);
  });
}
function getUsernamelList(){
  axios.get("http://localhost:3000/admin/checkEmail").then(async res=>{
    setListUsername(res.data);
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
    getUsernamelList();
    getPhoneList();
    
    // const avatarDiv = document.querySelector(".avatar-pic");
    // const avat = document.querySelector("#avatar");
    // const photoUpload = document.querySelector("#fileUpload");
    // const uploadFileBtn = document.querySelector("#btn_upload_img");
    // avatarDiv.addEventListener("mouseenter", function () {
    //   uploadFileBtn.style.display = "block";
    // });

    // avatarDiv.addEventListener("mouseleave", function () {
    //   uploadFileBtn.style.display = "none";
    // });

    // photoUpload.addEventListener("change", function () {
    //   const chosenPhoto = this.files[0];

    //   if (chosenPhoto) {
    //     const photoReader = new FileReader();

    //     photoReader.addEventListener("load", function () {
    //       avat.setAttribute("src", photoReader.result);
    //     });
    //     photoReader.readAsDataURL(chosenPhoto);
    //   }
    // });
  }, []);
  return (
    <div className="form-v10">
      <div className="page-content">
        <div className="form-v10-content">
          <form className="form-detail" action="#" method="post" id="myform"  onSubmit=  { handleSubmit}>
            <div className="form-left">
              <div className="header-left">
                <h2>Add new account</h2>
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
                      type="text"
                      className="input-text profile"
                      id="txt_user_name"
                      placeholder="Username"
                      maxLength="20"
                      onChange={(event) => setUsername(event.target.value)}
                      
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {usernameError}
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Password</label>
                    <input
                      type="password"
                      className="input-text profile"
                      id="txt_password"
                      placeholder="Password"
                      maxLength="20"
                      onChange={(event) => setPassword(event.target.value)}
                      
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {passwordError}
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Fullname</label>
                    <input
                      type="text"
                      className="input-text"
                      id="txt_full_name"
                      placeholder="Fullname"
                      maxLength="30"
                      onChange={(event) => setFullname(event.target.value)}
                      
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
                      className="input-text"
                      id="txt_phone_number"
                      placeholder="Phone number"
                      maxLength="13"
                      onChange={(event) => setPhone(event.target.value)}
                      
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
                      className="input-text"
                      id="txt_address"
                      placeholder="Address"
                      maxLength="100"
                      onChange={(event) => setAddress(event.target.value)}
                      
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
                  type="submit"
                  name="register"
                  className="register"
                  id="btn_cancel"
                  onClick={backToList}
                  value="Cancel"
                />
                <input
                  type="submit"
                  name="ex_button"
                  id="btn_add_account"
                  className="register"
                  value="Add"
                />
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

  function checkDupPhone(){
    var check = listphone.find(e=> e == phone);
    if(check){
      return true;
    }else{
      return false;
    }
  }

  function checkDupUsername(){
    var check = listUsername.find(e=> e == username);
    if(check){
      return true;
    }else{
      return false;
    }
  }

  function checkPhone() {
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

  function checkEmail() {
    var isvalid = false;
    if(isRequired(username)){
      setUsernameError("Username cannot be blank");
      isvalid = false;
    }else if (!username.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
      setUsernameError("Invalid phone email! (abc@gmail.com)");
      isvalid = false;
    } else if(checkDupUsername()) {
      setUsernameError("This email is already used!");
      isvalid = false;
    }else{
      setUsernameError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkPassword() {
    var isvalid = false;
    if(isRequired(password)){
      setPasswordError("Password cannot be blank");
      isvalid = false;
    }else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPasswordError("Your password need to: include both lower and upper case character, include at least one number or symbol, be at least 8 characters long");
      isvalid = false;
    }else{
      setPasswordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkFullname(){
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

  function checkAddress(){
    var isvalid = false;
    if(isRequired(address)){
      setAddressError("Fullname cannot be blank");
      isvalid= false;
    }else{
      setAddressError("");
      isvalid= true;
    }
    return isvalid;
  }

 async function handleSubmit(e) {
    e.preventDefault();
    var isvalidEmail = checkEmail(),
    isvalidPhone = checkPhone(),
    isvalidPassword = checkPassword(),
    isvalidAddress = checkAddress(),
    isvalidFullname = checkFullname();
    var isvalidForm = isvalidEmail && isvalidPassword && isvalidPhone && isvalidAddress && isvalidFullname;
    if(isvalidForm){
      const { txt_user_name, txt_password, txt_full_name, txt_phone_number, txt_address } =
      e.target.elements;
      var adminAdd = new AdminModel(
        txt_address.value,
        0,
        txt_full_name.value,
        md5(txt_password.value),
        txt_phone_number.value,
        2,
        txt_user_name.value
      );
      axios.post("http://localhost:3000/admin/create/",adminAdd).then(res=>{
        alert("Add success");
        backToList();
      });
      console.log("ngu");
    }
  }
};

const showPhoneError = () =>(
  <label className="field-label-right" style={{color: "#b30000"}} >This phone is already used !</label>
)
const showMailError = () =>(
  <label className="field-label-right" style={{color: "#b30000"}} >This email is already used !</label>
)
export default Add_Account;
