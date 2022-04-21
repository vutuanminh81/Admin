import React, { useState, useEffect } from "react";
import "./word_management.css";
import avatar from "./avatar.png";
import WordModel from "../../model/Word";
import Example from "../../model/example";
import Word_DescriptionModel from "../../model/Word_Description";
import ExampleModel from "../../model/example";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { app } from "../../config";
import { useLocation } from "react-router-dom";
import Navbar from "../../Component/navbar/Navbar";
import FooterPage from "../../Component/footer/footer";

axios.defaults.withCredentials = true;
var idList = ["txt_en_example", "txt_jp_example", "txt_vn_example"];
const imageChange = false;
var wordENId;
var wordVNId;
var wordJPId;
const Update = () => {
  
  var [count, setCount] = useState(0);
  const [listWordVN, setListWordVN] = useState([]);
  const [listWordENG, setListWordENG] = useState([]);
  const [listWordJAP, setListWordJAP] = useState([]);
  const location = useLocation();
  const wordDesId = location.state;

  var [idNewList, setNewList] = useState([]);
  const [imageAnimal, setImageAnimal] = useState(null);
  const [wordVideo, setWordVideo] = useState("");
  const [exampleEN, setExampleEN] = useState([]);
  const [exampleVN, setExampleVN] = useState([]);
  const [exampleJP, setExampleJP] = useState([]);
  const [wordEN, setWordEN] = useState(new WordModel());
  const [wordVN, setWordVN] = useState(new WordModel());
  const [wordJP, setWordJP] = useState(new WordModel());
  const [wordDes, setWordDes] = useState(new Word_DescriptionModel());
  var wordArray = [];
  var exampleArrayEN = [];
  var exampleArrayJP = [];
  var exampleArrayVN = [];

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

  var getWordByWordDesId = async (wordDes) => {
    console.log("check///////////////////", wordDes);
    await axios
      .get("http://localhost:3000/word/getByWordDes/" + wordDes)
      .then((res) => {
        wordArray = res.data;
        wordArray.forEach((element) => {
          if (element.Language_Id == 1) {
            setWordVN(element);
            wordVNId = element.Word_Id;
          } else if (element.Language_Id == 2) {
            setWordEN(element);
            wordENId = element.Word_Id;
          } else if (element.Language_Id == 3) {
            setWordJP(element);
            wordJPId = element.Word_Id;
          }
        });
      })
      .catch(() => {});
  };

  var getWordDesByWordDesId = async (wordDes) => {
    await axios
      .get("http://localhost:3000/worddes/" + wordDes)
      .then((res) => {
        setWordDes(res.data);
        setWordVideo("https://www.youtube.com/watch?v=" + res.data.Word_Video);
      })
      .catch(() => {});
  };

  var getExampleByWordId = async (wordId, languageId) => {
    await axios
      .get("http://localhost:3000/example/" + wordId)
      .then((res) => {
        if (languageId == 1) {
          setExampleVN(res.data);
          exampleArrayVN = res.data;
        } else if (languageId == 2) {
          setExampleEN(res.data);
          exampleArrayEN = res.data;
        } else if (languageId == 3) {
          setExampleJP(res.data);
          exampleArrayJP = res.data;
        }
      })
      .catch(() => {});
  };
  const [exampleList, setExampleList] = useState([]);
  var loadExample = async () => {
    console.log(exampleArrayEN.length);
    for (var i = 0; i < exampleArrayEN.length; i++) {
      setCount(count + 1);
      //console.log(idNewList);
      var itemList = (
        <div className="example">
          <div className="form-row">
            <input
              type="text"
              name="en_example"
              className="input-text"
              id={idList[0] + (i + 1)}
              placeholder="English Example"
              max="255"
              defaultValue={exampleArrayEN[i].Example}
            />
            <label
              style={{ color: "#ebe067", fontSize: "14px" }}
              className="field-label-right"
              id={idList[0] + (i + 1) + "Error"}
            ></label>
          </div>
          <div className="form-row">
            <input
              type="text"
              name="jp_example"
              className="input-text"
              id={idList[1] + (i + 1)}
              placeholder="Japanese Example"
              max="255"
              defaultValue={exampleArrayJP[i].Example}
            />
            <label
              style={{ color: "#ebe067", fontSize: "14px" }}
              className="field-label-right"
              id={idList[1] + (i + 1) + "Error"}
            ></label>
          </div>
          <div className="form-row">
            <input
              type="text"
              name="vn_example"
              className="input-text"
              id={idList[2] + (i + 1)}
              placeholder="Vietnamese Example"
              max="255"
              defaultValue={exampleArrayVN[i].Example}
            />
            <label
              style={{ color: "#ebe067", fontSize: "14px" }}
              className="field-label-right"
              id={idList[2] + (i + 1) + "Error"}
            ></label>
          </div>
        </div>
      );
      // setListWordVN((listWordVN) => [...listWordVN, res.Word]);
      setExampleList((prev) => [...prev, itemList]);
    }
  };

  // const textUpdate = <div className="example">{idNewList}</div>;

  useEffect(() => {
    const addButton = document.querySelector("#btn_add");
    const handleClick = () => {
      if (count <= 2) {
        setCount(count + 1);
        console.log("count/////////", count);
        var itemList = (
          <div className="example">
            <div className="form-row">
              <input
                type="text"
                name="en_example"
                className="input-text"
                id={idList[0] + (count + 1)}
                placeholder="English Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[0] + (count + 1) + "Error"}
              ></label>
            </div>
            <div className="form-row">
              <input
                type="text"
                name="jp_example"
                className="input-text"
                id={idList[1] + (count + 1)}
                placeholder="Japanese Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[1] + (count + 1) + "Error"}
              ></label>
            </div>
            <div className="form-row">
              <input
                type="text"
                name="vn_example"
                className="input-text"
                id={idList[2] + (count + 1)}
                placeholder="Vietnamese Example"
                max="255"
              />
              <label
                style={{ color: "#ebe067", fontSize: "14px" }}
                className="field-label-right"
                id={idList[2] + (count + 1) + "Error"}
              ></label>
            </div>
          </div>
        );
        setExampleList((prev) => [...prev, itemList]);
      }
    };
    addButton.addEventListener("click", handleClick);
    return () => addButton.removeEventListener("click", handleClick);
  });

  var tempListAllWord = [];
  const storage = app.storage();
  var imageURL = "";
  var youtubeId = "";
  var imageEndName = "";
  const [engWordError, setEngWordError] = useState("");
  const [vnWordError, setVNWordError] = useState("");
  const [japWordError, setJAPWordError] = useState("");
  const [audioError, setAudioError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [imageError, setImageError] = useState("");
  const [changeImage, setChangeImage] = useState(false);

  async function getAllWord() {
    await axios.get("http://localhost:3000/word").then(async (respn) => {
      tempListAllWord = respn.data;
    });
  }

  async function getLanguageList() {
    tempListAllWord.forEach((res) => {
      // if (res.Language_Id === 1) {
      //   setListWordVN(res.Word);
      // } else if (res.Language_Id === 2) {
      //   setListWordENG(res.Word);
      // } else {
      //   setListWordJAP(res.Word);
      // }
      if (res.Language_Id === 1 && res.Word !== wordVN) {
        setListWordVN((listWordVN) => [...listWordVN, res.Word]);
      } else if (res.Language_Id === 2) {
        setListWordENG((listWordENG) => [...listWordENG, res.Word]);
      } else {
        setListWordJAP((listWordJAP) => [...listWordJAP, res.Word]);
      }
    });
  }

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    } else {
    }

    console.log(".............", wordDesId);
    await getAllWord();
    await getWordDesByWordDesId(wordDesId);
    await getWordByWordDesId(wordDesId);
    await getExampleByWordId(wordENId, 2);
    await getExampleByWordId(wordJPId, 3);
    await getExampleByWordId(wordVNId, 1);
    await loadExample();
    await getLanguageList();
    // setExampleList((prev) => [null, textUpdate]);

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
                onSubmit={(e) => updateWord(e)}
              >
                <div className="form-left">
                  <div className="header-left">
                    <h2>Update word</h2>
                  </div>
                  <div className="form-row">
                    <div className="avatar-pic">
                      <img src={wordDes.Word_Image} id="avatar" />
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
                      <div className="label-left">
                        <label className="field-label-left-word">
                          English Word
                        </label>
                      </div>
                      <input
                        type="text"
                        name="en_word"
                        defaultValue={wordEN.Word}
                        id="txt_en_word"
                        className="input-text"
                        placeholder="English Word"
                        maxLength="10"
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {" "}
                        {engWordError}
                      </label>
                    </div>
                    <div className="form-row form-row-2">
                      <div className="label-left">
                        <label className="field-label-left-word">
                          Japanese Word
                        </label>
                      </div>
                      <input
                        type="text"
                        name="jp_word"
                        defaultValue={wordJP.Word}
                        id="txt_jp_word"
                        className="input-text"
                        placeholder="Japanese Word"
                        maxLength="10"
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {" "}
                        {japWordError}
                      </label>
                    </div>
                    <div className="form-row form-row-3">
                      <div className="label-left">
                        <label className="field-label-left-word">
                          Vienamese Word
                        </label>
                      </div>
                      <input
                        type="text"
                        name="vn_word"
                        defaultValue={wordVN.Word}
                        id="txt_vn_word"
                        className="input-text"
                        placeholder="Vietnamese Word"
                        maxLength="10"
                      />
                      <label
                        style={{ color: "#ebe067", fontSize: "14px" }}
                        className="field-label-right"
                      >
                        {" "}
                        {vnWordError}
                      </label>
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="field-label-left">Audio URL</label>
                    <input
                      type="text"
                      name="audio_url"
                      defaultValue={wordDes.Word_Pronounce}
                      className="input-text"
                      id="txt_audio_url"
                      placeholder="Audio URL"
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {" "}
                      {audioError}
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="field-label-left">Video URL</label>
                    <input
                      type="text"
                      name="video_url"
                      defaultValue={wordVideo}
                      className="input-text"
                      id="txt_video_url"
                      placeholder="Video URL"
                    />
                    <label
                      style={{ color: "#ebe067", fontSize: "14px" }}
                      className="field-label-right"
                    >
                      {" "}
                      {videoError}
                    </label>
                  </div>
                </div>
                <div className="form-right">
                  <div className="addButton">
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
                    <input
                      type="submit"
                      name="ex_button"
                      id="btn_update_exemple"
                      className="register"
                      value="Save"
                    />
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

  function checkDupVN(word, current) {
    const newlist = listWordVN.filter((item) => item != current);
    // console.log(newlist);
    var check = newlist.find((e) => e === word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkDupENG(word, current) {
    const newlist = listWordENG.filter((item) => item != current);
    // console.log(newlist);
    var check = newlist.find((e) => e === word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkDupJAP(word, current) {
    const newlist = listWordJAP.filter((item) => item != current);
    // console.log(newlist);
    var check = newlist.find((e) => e === word);
    if (check) {
      return true;
    } else {
      return false;
    }
  }

  function checkVNWord(input, currentWord) {
    var isvalid = false;
    if (isRequired(input)) {
      setVNWordError("Vietnamese word cannot be empty");
      isvalid = false;
    } else if (checkDupVN(input, currentWord)) {
      setVNWordError("This word is already used. Please try anther word");
      isvalid = false;
    } else {
      setVNWordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkENGWord(input, currentWord) {
    var isvalid = false;
    if (isRequired(input)) {
      setEngWordError("English word cannot be empty");
      isvalid = false;
    } else if (checkDupENG(input, currentWord)) {
      setEngWordError("This word is already used. Please try anther word");
      isvalid = false;
    } else {
      setEngWordError("");
      isvalid = true;
    }
    return isvalid;
  }

  function checkJAPWord(input, currentWord) {
    var isvalid = false;
    if (isRequired(input)) {
      setJAPWordError("Japanses word cannot be empty");
      isvalid = false;
    } else if (checkDupJAP(input, currentWord)) {
      console.log("loi o day");
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

  function getIdYoutube(url) {
    var totalString = url.split("v=")[1];
    var longUrl = totalString.indexOf("&");
    if (longUrl == -1) {
      return totalString;
    } else {
      return totalString.substring(0, longUrl);
    }
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
    var finalName = wordDes.Word_Des_Id + imageEndName;
    const storageRef = storage.ref("Image/");
    const fileRef = storageRef.child(finalName);
    await fileRef.put(imageAnimal);
    await fileRef.getDownloadURL().then(async (res) => {
      imageURL = res;
    });
  }

  function checkImageName(name) {
    if (name != "") {
      var getname = name.split(".")[1];
      console.log(getname);
      if (getname != "png" && getname != "jpg" && getname != "jpge") {
        setImageError("Please choose file end with .png, .jpg, .jpge");
        return false;
      } else {
        imageEndName = "."+getname;
        setImageError("");
        return true;
      }
    }
  }

  async function updateWord(e) {
    e.preventDefault();
    var audioURL = document.getElementById("txt_audio_url").value;
    var videoURL = document.getElementById("txt_video_url").value;
    var engWord = document.getElementById("txt_en_word").value;
    var japWord = document.getElementById("txt_jp_word").value;
    var vnWord = document.getElementById("txt_vn_word").value;

    var isvalidVNWord = checkVNWord(vnWord, wordVN.Word),
      isvalidENGWord = checkENGWord(engWord, wordEN.Word),
      isvalidJAPWord = checkJAPWord(japWord, wordJP.Word),
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
      imageURL = wordDes.Word_Image;
      console.log("ko change");
    } else {
      isvalidImage = checkImageName(imageAnimal.name);
      if (isvalidImage) {
        console.log("co change");
        await uploadImage();
      }
    }
    if (imageURL != "") {
      console.log("ahihihihihih");
      if (isvalidForm) {
          var wordDesAPI = new Word_DescriptionModel(
            wordDes.num_Of_Scan,
            wordDes.num_Of_Search,
            wordDes.Word_Des_Id,
            imageURL,
            audioURL,
            wordDes.Word_Status,
            youtubeId
          );
          console.log("ahihihihihih");
          axios
            .put(
              "http://localhost:3000/worddes/update/" + wordDes.Word_Des_Id,
              wordDesAPI
            )
            .then((respn) => {
              var WordDesId = Number(respn.data);
              var WordVnAPI = new WordModel(
                1,
                vnWord,
                wordDes.Word_Des_Id,
                wordVNId,
                1
              );
              axios
                .put("http://localhost:3000/word/update/" + wordVNId, WordVnAPI)
                .then((respn) => {
                  var exampleVNList = [];
                  var i = 1;
                  exampleVN.forEach((res) => {
                    var exampleGet = document.getElementById(
                      idList[2] + i
                    ).value;
                    var exampleAPIVN = new ExampleModel(
                      res.Ex_Id,
                      res.Ex_Status,
                      exampleGet,
                      wordVNId
                    );
                    exampleVNList.push(exampleAPIVN);

                    i++;
                  });
                  if (exampleVN.length != count) {
                    for (var j = exampleVN.length + 1; j <= count; j++) {
                      var exampleGet = document.getElementById(
                        idList[2] + j
                      ).value;
                      var exampleAPIVN = new ExampleModel(
                        0,
                        1,
                        exampleGet,
                        wordVNId
                      );
                      exampleVNList.push(exampleAPIVN);
                    }
                  }
                  console.log(exampleVNList);
                  axios
                    .put("http://localhost:3000/example/update", exampleVNList)
                    .then((respn) => {
                      var WordEngAPI = new WordModel(
                        2,
                        engWord,
                        wordDes.Word_Des_Id,
                        wordENId,
                        1
                      );
                      axios
                        .put(
                          "http://localhost:3000/word/update/" + wordENId,
                          WordEngAPI
                        )
                        .then((respn) => {
                          var exampleENGList = [];
                          var i = 1;
                          exampleEN.forEach((res) => {
                            var exampleGet = document.getElementById(
                              idList[0] + i
                            ).value;
                            var exampleAPIENG = new ExampleModel(
                              res.Ex_Id,
                              res.Ex_Status,
                              exampleGet,
                              wordENId
                            );
                            exampleENGList.push(exampleAPIENG);
                            i++;
                          });
                          if (exampleEN.length != count) {
                            for (
                              var j = exampleEN.length + 1;
                              j <= count;
                              j++
                            ) {
                              var exampleGet = document.getElementById(
                                idList[0] + j
                              ).value;
                              var exampleAPIENG = new ExampleModel(
                                0,
                                1,
                                exampleGet,
                                wordENId
                              );
                              exampleENGList.push(exampleAPIENG);
                            }
                          }
                          axios
                            .put(
                              "http://localhost:3000/example/update",
                              exampleENGList
                            )
                            .then((respn) => {
                              var WordJapAPI = new WordModel(
                                3,
                                japWord,
                                wordDes.Word_Des_Id,
                                wordJPId,
                                1
                              );
                              axios
                                .put(
                                  "http://localhost:3000/word/update/" +
                                    wordJPId,
                                  WordJapAPI
                                )
                                .then((respn) => {
                                  var exampleJAPList = [];
                                  var i = 1;
                                  exampleJP.forEach((res) => {
                                    var exampleGet = document.getElementById(
                                      idList[1] + i
                                    ).value;
                                    var exampleAPIJAP = new ExampleModel(
                                      res.Ex_Id,
                                      res.Ex_Status,
                                      exampleGet,
                                      wordJPId
                                    );
                                    exampleJAPList.push(exampleAPIJAP);
                                    i++;
                                  });
                                  if (exampleJP.length != count) {
                                    for (
                                      var j = exampleJP.length + 1;
                                      j <= count;
                                      j++
                                    ) {
                                      var exampleGet = document.getElementById(
                                        idList[1] + j
                                      ).value;
                                      var exampleAPIJAP = new ExampleModel(
                                        0,
                                        1,
                                        exampleGet,
                                        wordJPId
                                      );
                                      exampleJAPList.push(exampleAPIJAP);
                                    }
                                  }
                                  axios
                                    .put(
                                      "http://localhost:3000/example/update",
                                      exampleJAPList
                                    )
                                    .then((res) => {
                                      alert("Update word successful");
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

export default Update;
