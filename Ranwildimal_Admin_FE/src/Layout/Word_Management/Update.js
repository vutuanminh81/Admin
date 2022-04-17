import React, { useState, useEffect } from "react";
import "./word_management.css";
import avatar from "./avatar.png";
import WordModel from "../../model/Word";
import Example from "../../model/example";
import Word_DescriptionModel from "../../model/Word_Description";
import ExampleModel from "../../model/example";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
var idList = ["txt_en_example", "txt_jp_example", "txt_vn_example"];
var idNewList = [];

var count = 0;

const Update = () => {
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
  var wordENId;
  var wordVNId;
  var wordJPId;
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

  var getWordByWordDesId = async () => {
    await axios
      .get("http://localhost:3000/word/getByWordDes/38")
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

  var getWordDesByWordDesId = async () => {
    await axios
      .get("http://localhost:3000/worddes/38")
      .then((res) => {
        setWordDes(res.data);
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

  var loadExample = async () => {
    console.log(exampleArrayEN.length);
    for (var i = 0; i < exampleArrayEN.length; i++) {
      count = count + 1;
      console.log(count);
      //console.log(idNewList);
      idNewList.push(
        <div>
          <div className="form-row">
            <input
              type="text"
              name="en_example"
              className="input-text"
              id={idList[0] + (i + 1)}
              placeholder="English Example"
              max="255"
              defaultValue={exampleArrayEN[i].Example}
              required
            />
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
              required
            />
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
              required
            />
          </div>
        </div>
      );
    }
  };

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
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="jp_example"
                className="input-text"
                id={idList[1] + count}
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
                id={idList[2] + count}
                placeholder="Vietnamese Example"
                max="255"
                required
              />
            </div>
          </div>
        );
        setExampleList((prev) => [null, textUpdate]);
      }
    };
    addButton.addEventListener("click", handleClick);
    return () => addButton.removeEventListener("click", handleClick);
  });

  useEffect(async () => {
    await CheckSession();
    console.log("check Session" + checkSession);
    if (!checkSession) {
      navigate("/login");
    } else {
      await getWordDesByWordDesId();
      await getWordByWordDesId();
      await getExampleByWordId(wordENId, 2);
      await getExampleByWordId(wordJPId, 3);
      await getExampleByWordId(wordVNId, 1);
      await loadExample();
      setExampleList((prev) => [null, textUpdate]);
    }
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
                <h2>Update word</h2>
              </div>
              <div className="form-row">
                <div className="avatar-pic">
                  <img src={wordDes.Word_Image} id="avatar" />
                  <input type={"file"} id="fileUpload" />
                  <label htmlFor="fileUpload" id="btn_upload_img">
                    Choose a photograph
                  </label>
                </div>
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
                    required
                  />
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
                    required
                  />
                </div>
                <div className="form-row form-row-3">
                  <div className="label-left">
                    <label className="field-label-left-word">
                      Vietnamese Word
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
                    required
                  />
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
                  required
                />
              </div>
              <div className="form-row">
                <label className="field-label-left">Video URL</label>
                <input
                  type="text"
                  name="video_url"
                  defaultValue={
                    "https://www.youtube.com/watch?v=" + wordDes.Word_Video
                  }
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
                  id="btn_update_exemple"
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

export default Update;
