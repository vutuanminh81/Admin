import React, { useState, useEffect } from "react";
import "./profile.css";
import avatar from "./avatar.png";
import axios from "axios";
import AdminModel from "../../model/admin";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const Error_Page = () => {
  return (
    <div class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>
              <div class="contant_box_404">
                <h3 class="h2">Look like you're lost</h3>
                <p>the page you are looking for not avaible!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function isRequired(input) {
    if (input === "") {
      return true;
    } else {
      return false;
    }
  }

  function checkDupPhone(phone) {
    var check = listphone.find((e) => e == phone);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkPhone(phone) {
    var isvalid = false;
    if (isRequired(phone)) {
      setPhoneError("Phone number cannot be empty");
      isvalid = false;
    } else if (!phone.match(/(|0)(1|3|5|7|8|9)+([0-9]{8})\b/)) {
      setPhoneError("Invalid phone number (Must be like 0123456789)");
      isvalid = false;
    } else if (checkDupPhone(phone)) {
      setPhoneError(
        "This phone number is already used. Please try anther phone number"
      );
      isvalid = false;
    } else {
      setPhoneError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkFullname(fullname) {
    var isvalid = false;
    if (isRequired(fullname)) {
      setFullnameError("Fullname cannot be empty");
      isvalid = false;
    } else {
      setFullnameError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkAddress(address) {
    var isvalid = false;
    if (isRequired(address)) {
      setAddressError("Address cannot be empty");
      isvalid = false;
    } else {
      setAddressError("");
      isvalid = true;
    }
    return isvalid;
  }

  function resetPassword(e) {
    e.preventDefault();
    var email = document.getElementById("txt_user_name").value;
    axios
      .put("http://localhost:3000/admin/resetPassword/" + email)
      .then((res) => {
        if (res.data == true) {
          alert("Reset password successful");
        } else {
          alert("Reset password fail");
        }
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    var phone = document.getElementById("txt_phone_number").value;
    var address = document.getElementById("txt_address").value;
    var fullname = document.getElementById("txt_full_name").value;
    console.log("sdadadasdasda", profile.Full_Name);
    console.log("////////////////", fullname);

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
          backToList();
        });
    }
  }
};

export default Error_Page;
