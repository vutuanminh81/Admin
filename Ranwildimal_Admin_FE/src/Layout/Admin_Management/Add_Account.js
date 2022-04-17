import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminModel from "../../model/admin";
axios.defaults.withCredentials = true;


const Add_Account = () => {
  const [checkPhone,setCheckPhone] = useState(false);
  const [checkEmail,setCheckMail] = useState(false);
  const navigate = useNavigate();
  function backToList(){
    navigate("/admin_managemnet");
  }

  async function checkDupEmail(email){
    await axios.get("http://localhost:3000/admin/checkEmail/"+email).then( async res=>{
      // await setCheckMail(res.data);
      return res.data;
    });
  }
  
  
  async function checkDupPhone(phone){
      await axios.get("http://localhost:3000/admin/checkPhone/"+phone).then(async res=>{
      // await setCheckPhone(res.data);
      return res.data;
    });
  }
  var checkSession = false;
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
                      required
                    />
                    {checkEmail ? showMailError() : null}
                  </div>
                  <div className="form-row">
                    <label className="field-label-right">Password</label>
                    <input
                      type="text"
                      className="input-text profile"
                      id="txt_password"
                      placeholder="Password"
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
                    {checkPhone ? showPhoneError() : null}
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
 async function handleSubmit(e) {
    e.preventDefault();
    const { txt_user_name, txt_password, txt_full_name, txt_phone_number, txt_address } =
      e.target.elements;
    setCheckMail(await checkDupEmail(txt_user_name.value));
    setCheckPhone(await checkDupPhone(txt_phone_number.value));
    console.log("after",checkDupEmail(txt_user_name.value));
    console.log("after",checkDupPhone(txt_phone_number.value));
    if(!checkEmail && !checkPhone){
      
      // var adminAdd = new AdminModel(
      //   txt_address.value,
      //   0,
      //   txt_full_name.value,
      //   txt_password.value,
      //   txt_phone_number.value,
      //   2,
      //   txt_user_name.value
      // );
      // axios.post("http://localhost:3000/admin/create/",adminAdd).then(res=>{
      //   alert("Add success");
      //   backToList();
      // });
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
