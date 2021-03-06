import React, { useState, useEffect } from "react";
import "./word_management.css";
import avatar from "./avatar.png";
import WordModel from "../../model/Word";
import Word_DescriptionModel from "../../model/Word_Description";
import ExampleModel from "../../model/example";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { app } from "../../config";


import FooterPage from "../../Component/footer/footer";
import Navbar from "../../Component/navbar/Navbar";
// import {firebase} from "firebase";

var idList = ["txt_en_example", "txt_jp_example", "txt_vn_example"];
var idNewList = [];
axios.defaults.withCredentials = true;
var count = 1;
var listWorddesCount;
idNewList.push(
  <div>
    <div className="form-row">
      <input
        type="text"
        name="en_example"
        className="input-text"
        id={idList[0] + count}
        placeholder="English Example"
        max="255"
      />
      <label
        style={{ color: "#ebe067", fontSize: "14px" }}
        className="field-label-right"
        id={idList[0] + count + "Error"}
      ></label>
    </div>
    <div className="form-row">
      <input
        type="text"
        name="jp_example"
        className="input-text"
        id={idList[1] + count}
        placeholder="Japanese Example"
        max="255"
      />
      <label
        style={{ color: "#ebe067", fontSize: "14px" }}
        className="field-label-right"
        id={idList[1] + count + "Error"}
      ></label>
    </div>
    <div className="form-row">
      <input
        type="text"
        name="vn_example"
        className="input-text"
        id={idList[2] + count}
        placeholder="Vietnamese Example"
        max="255"
      />
      <label
        style={{ color: "#ebe067", fontSize: "14px" }}
        className="field-label-right"
        id={idList[2] + count + "Error"}
      ></label>
    </div>
  </div>
);
const Create = () => {
  // var  = false;
  const [changeImage, setChangeImage] = useState(false);
  var tempListAllWord = [];
  var youtubeId = "";
  var imageURL = "";
  var imageEndName = "";
  const [listWordVN, setListWordVN] = useState([]);
  const [listWordENG, setListWordENG] = useState([]);
  const [listWordJAP, setListWordJAP] = useState([]);

  const [currentId, setCurrentId] = useState("");
  const storage = app.storage();

  const [engWordError, setEngWordError] = useState("");
  const [vnWordError, setVNWordError] = useState("");
  const [japWordError, setJAPWordError] = useState("");
  const [audioError, setAudioError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [imageError, setImageError] = useState("");

  const [imageAnimal, setImageAnimal] = useState(null);
  var navigate = useNavigate();
  var checkSession = false;
  var CheckSession = async () => {
    await axios
      .get("http://localhost:3000/get_session")
      .then(async (respn) => {
        console.log("/////////   " + respn.data);
        if (respn.data === true) {
          checkSession = true;
        } else {
          checkSession = false;
        }
      })
      .catch((error) => {
        checkSession = false;
      });
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege...",
  };

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    }
  });

  async function getCurrentId(){
    await axios.get("http://localhost:3000/worddes/numberlist")
      .then(async (respn) => {
        setCurrentId(respn.data);
      });
  }

  const textUpdate = <div className="example">{idNewList}</div>;
  const [exampleList, setExampleList] = useState([textUpdate]);
  useEffect(() => {
    const addButton = document.querySelector("#btn_add");

    const handleClick = () => {
      if (count <= 2) {
        count = count + 1;
        console.log("count/////////", count);
        idNewList.push(
          <div>
            <div className="form-row">
              <input
                type="text"
                name="en_example"
                className="input-text"
                id={idList[0] + count}
                placeholder="English Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[0] + count + "Error"}
              ></label>
            </div>
            <div className="form-row">
              <input
                type="text"
                name="jp_example"
                className="input-text"
                id={idList[1] + count}
                placeholder="Japanese Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[1] + count + "Error"}
              ></label>
            </div>
            <div className="form-row">
              <input
                type="text"
                name="vn_example"
                className="input-text"
                id={idList[2] + count}
                placeholder="Vietnamese Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[2] + count + "Error"}
              ></label>
            </div>
          </div>
        );
        setExampleList((prev) => [null, textUpdate]);
      }
    };
    addButton.addEventListener("click", handleClick);
    return () => addButton.removeEventListener("click", handleClick);
  });

  async function getWorddesCount() {
    await axios
      .get("http://localhost:3000/worddes/numberlist")
      .then(async (respn) => {
        listWorddesCount = respn.data;
      });
  }

  async function getAllWord() {
    await axios.get("http://localhost:3000/word").then(async (respn) => {
      tempListAllWord = respn.data;
    });
  }

  async function getLanguageList() {
    tempListAllWord.forEach((res) => {
      if (res.Language_Id === 1) {
        setListWordVN((listWordVN) => [...listWordVN, res.Word]);
      } else if (res.Language_Id === 2) {
        setListWordENG((listWordENG) => [...listWordENG, res.Word]);
      } else {
        setListWordJAP((listWordJAP) => [...listWordJAP, res.Word]);
      }
    });
  }

  useEffect(async () => {
    setImageAnimal(avatar);
    await getCurrentId();
    await getAllWord();
    await getLanguageList();
    await getWorddesCount();
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
    <div className="containers">
      <div className="navbarr">
        <Navbar />
      </div>
      <div className="otherPages">
        <div className="form-v10">
          <div className="page-content">
            <div className="form-v10-content">
              <form
                className="form-detail"
                action="#"
                method="post"
                id="myform"
                onSubmit={async (e) => await AddWord(e)}
              >
                <div className="form-left">
                  <div className="header-left">
                    <h2>Create new word</h2>
                  </div>
                  <div className="form-row">
                    <div className="avatar-pic">
                      <img src={avatar} id="avatar" />
                      <input
                        type={"file"}
                        id="fileUpload"
                        accept=".jpg, .png, .jpeg"
                        onChange={(e) => {
                          setImageAnimal(e.target.files[0]);
                          setChangeImage(true);
                        }}
                      />
                      <label htmlFor="fileUpload" id="btn_upload_img">
                        Choose a photograph
                      </label>
                    </div>
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >{imageError}</label>
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
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {engWordError}
                      </label>
                    </div>
                    <div className="form-row form-row-2">
                      <input
                        type="text"
                        name="jp_word"
                        id="txt_jp_word"
                        className="input-text"
                        placeholder="Japanese Word"
                        max="10"
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {japWordError}
                      </label>
                    </div>
                    <div className="form-row form-row-3">
                      <input
                        type="text"
                        name="vn_word"
                        id="txt_vn_word"
                        className="input-text"
                        placeholder="Vietnamese Word"
                        max="10"
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {vnWordError}
                      </label>
                    </div>
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      name="audio_url"
                      className="input-text"
                      id="txt_audio_url"
                      placeholder="Audio URL"
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {audioError}
                    </label>
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      name="video_url"
                      className="input-text"
                      id="txt_video_url"
                      placeholder="Video URL"
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {videoError}
                    </label>
                  </div>
                </div>
                <div className="form-right">
                  <div className="addButton">
                    {/* <input type="button" value="Add more example" name="register" className="register" id="btn_add"/> */}
                    <input
                      type="button"
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
                      type="button"
                      name="register"
                      className="register"
                      id="btn_cancel"
                      value="Cancel"
                      onClick={(e) => navigate("/word_management")}
                    />
                    {/* <input
                  type="submit"
                  name="ex_button"
                  id="btn_add_exemple"
                  className="register"
                  value="Create"
                /> */}
                    <button
                      type="submit"
                      name="ex_button"
                      id="btn_add_exemple"
                      className="register"
                      value="Add"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <FooterPage />
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

  function checkExample() {
    var isvalid = false;
    for (var i = 1; i <= count; i++) {
      idList.forEach((id) => {
        var example = document.getElementById(id + i).value;
        if (isRequired(example)) {
          document.getElementById(id + i + "Error").innerHTML =
            "This example cannot be empty";
          isvalid = false;
        } else {
          document.getElementById(id + i + "Error").innerHTML = "";
          isvalid = true;
        }
      });
    }
    return isvalid;
  }

  function checkDupVN(word) {
    var check = listWordVN.find((e) => e == word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkDupENG(word) {
    var check = listWordENG.find((e) => e == word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkDupJAP(word) {
    var check = listWordJAP.find((e) => e == word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function getIdYoutube(url) {
    var totalString = url.split("v=")[1];
    var longUrl = totalString.indexOf("&");
    if (longUrl == -1) {
      return totalString.substring(0, 11);
    } else {
      return totalString.substring(0, longUrl);
    }
  }

  function checkImageName(name){
    if(name!=""){
      var getname = name.split(".")[1];
      if(getname != "png" && getname != "jpg" && getname != "jpge"){
        setImageError("Please choose file end with .png, .jpg, .jpge");
        return false;
      }else{
        imageEndName = "."+getname;
        setImageError("");
        return true;
      }
    }
  }

  function checkVNWord(input) {
    var isvalid = false;
    if (isRequired(input)) {
      setVNWordError("Vietnamese word cannot be empty");
      isvalid = false;
    } else if (checkDupVN(input)) {
      setVNWordError("This word is already used. Please try anther word");
      isvalid = false;
    } else {
      setVNWordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkENGWord(input) {
    var isvalid = false;
    if (isRequired(input)) {
      setEngWordError("English word cannot be empty");
      isvalid = false;
    } else if (checkDupENG(input)) {
      setEngWordError("This word is already used. Please try anther word");
      isvalid = false;
    } else {
      setEngWordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkJAPWord(input) {
    var isvalid = false;
    if (isRequired(input)) {
      setJAPWordError("Japanses word cannot be empty");
      isvalid = false;
    } else if (checkDupJAP(input)) {
      setJAPWordError("This word is already used. Please try anther word");
      isvalid = false;
    } else {
      setJAPWordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkAudio(input) {
    var isvalid = false;
    if (isRequired(input)) {
      setAudioError("Audio link cannot be empty");
      isvalid = false;
    } else {
      setAudioError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkVideo(input) {
    var isvalid = false;
    if (isRequired(input)) {
      setVideoError("Video link cannot be empty");
      isvalid = false;
    } else if (
      !input.match(
        /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/
      )
    ) {
      setVideoError(
        "Invalid youtube link (Must be like https://www.youtube.com/watch?v=Onc5mFqGu44)"
      );
      isvalid = false;
    } else {
      youtubeId = getIdYoutube(input);
      setVideoError("");
      isvalid = true;
    }
    return isvalid;
  }

  async function uploadImage() {
    var finalName = currentId+imageEndName;
    const storageRef = storage.ref("Image/");
    const fileRef = storageRef.child(finalName);
    await fileRef.put(imageAnimal);
    await fileRef.getDownloadURL().then(async (res) => {
      imageURL = res;
      console.log("ttttttttttttt");
    });
  }

  async function AddWord(e) {
    e.preventDefault();
    var audioURL = document.getElementById("txt_audio_url").value;
    var videoURL = document.getElementById("txt_video_url").value;
    var engWord = document.getElementById("txt_en_word").value;
    var japWord = document.getElementById("txt_jp_word").value;
    var vnWord = document.getElementById("txt_vn_word").value;

    var isvalidVNWord = checkVNWord(vnWord),
      isvalidENGWord = checkENGWord(engWord),
      isvalidJAPWord = checkJAPWord(japWord),
      isvalidVideo = checkVideo(videoURL),
      isvalidAudio = checkAudio(audioURL),
      isvalidExample = checkExample(),
      isvalidImage;

    var isvalidForm =
      isvalidVNWord &&
      isvalidENGWord &&
      isvalidJAPWord &&
      isvalidAudio &&
      isvalidVideo &&
      isvalidExample;
    if (!changeImage) {
      imageURL =
        "https://firebasestorage.googleapis.com/v0/b/ranwildimal.appspot.com/o/Image%2Favatar.png?alt=media&token=87bd3080-6807-477a-99a8-1c0b4fe90a2c";
    } else {
      isvalidImage =  checkImageName(imageAnimal.name);
      if(isvalidImage){
        await uploadImage();
      }
    }
    if (imageURL != "") {
      if (isvalidForm) {
        var wordDesAPI = new Word_DescriptionModel(
          0,
          0,
          1,
          imageURL,
          audioURL,
          0,
          youtubeId
        );
        axios
          .post("http://localhost:3000/worddes/create", wordDesAPI)
          .then((respn) => {
            var WordDesId = Number(respn.data);
            var WordVnAPI = new WordModel(1, vnWord, WordDesId, 1, 0);
            axios
              .post("http://localhost:3000/word/create", WordVnAPI)
              .then((respn) => {
                var WordIdVN = Number(respn.data);
                var exampleVNList = [];
                for (var i = 1; i <= count; i++) {
                  var exampleGet = document.getElementById(idList[2] + i).value;
                  var exampleAPIVN = new ExampleModel(
                    1,
                    0,
                    exampleGet,
                    WordIdVN
                  );
                  exampleVNList.push(exampleAPIVN);
                }
                axios
                  .post("http://localhost:3000/example/create", exampleVNList)
                  .then((respn) => {
                    var WordEngAPI = new WordModel(2, engWord, WordDesId, 1, 0);
                    axios
                      .post("http://localhost:3000/word/create", WordEngAPI)
                      .then((respn) => {
                        var WordIdEng = Number(respn.data);
                        var exampleENGList = [];
                        for (var i = 1; i <= count; i++) {
                          var exampleGet = document.getElementById(
                            idList[0] + i
                          ).value;
                          var exampleAPIENG = new ExampleModel(
                            1,
                            0,
                            exampleGet,
                            WordIdEng
                          );
                          exampleENGList.push(exampleAPIENG);
                        }
                        axios
                          .post(
                            "http://localhost:3000/example/create",
                            exampleENGList
                          )
                          .then((respn) => {
                            var WordJapAPI = new WordModel(
                              3,
                              japWord,
                              WordDesId,
                              1,
                              0
                            );
                            axios
                              .post(
                                "http://localhost:3000/word/create",
                                WordJapAPI
                              )
                              .then((respn) => {
                                var WordIdJAP = Number(respn.data);
                                var exampleJAPList = [];
                                for (var i = 1; i <= count; i++) {
                                  var exampleGet = document.getElementById(
                                    idList[1] + i
                                  ).value;
                                  var exampleAPIJAP = new ExampleModel(
                                    1,
                                    0,
                                    exampleGet,
                                    WordIdJAP
                                  );
                                  exampleJAPList.push(exampleAPIJAP);
                                }
                                axios
                                  .post(
                                    "http://localhost:3000/example/create",
                                    exampleJAPList
                                  )
                                  .then((res) => {
                                    alert("You have added the word successfully");
                                    navigate("/word_management");
                                  });
                              });
                          });
                      });
                  });
              });
          });
      }
    }
  }
};

export default Create;
