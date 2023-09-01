import React, { useState } from "react";
import "../style/FileUpload.css";
import Output from "./Output";
import axios from "axios";
import Loading from "react-loading";

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [ficheros, setFicheros] = useState(null);
  const [filename, setFilename] = useState([]);
  const [showForm, setShowForm] = useState("form");
  const [showLoading, setShowLoading] = useState(true);
  const [data, setData] = useState({});

  const handleFileSelection = (event) => {
    setFicheros(event.target.files);
    const temp = [];
    for (const iterator of event.target.files) {
      temp.push(iterator.filename);
    }
    setFilename(temp);
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (evt) => {
    evt.preventDefault();
    const formdata = new FormData();
    filename.forEach((filename, index) => {
      formdata.append("files", ficheros[index], filename);
    });
    setShowForm("loading");
    const response = await axios
      .post("http://127.0.0.1:5000/upload", formdata)
      .then((response) => {
        console.log(response.data);
        // showLoading(false)
        setData(response.data);
        setShowForm("output");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response.data);
  };

  // return (
  //   <div style={{}}>
  //     <form>
  //       <label for="images" class="drop-container">
  //         <span class="drop-title">Drop files here</span>
  //         <input type="file" id="images" accept="pdf/*" multiple required onChange={handleFileSelection} />
  //       </label>
  //       <br/> <br/>
  //       <button type="submit" class="uploadbutton" onClick={handleUpload}><h3>Upload Files</h3></button>
  //     </form>
  //   </div>
  // );
  return showForm === "form" ? (
    <div>
      <form>
        {/* <form onSubmit={handleSubmit}> */}
        <label for="images" class="drop-container">
          <span class="drop-title">Drop files here</span>
          <input
            type="file"
            id="images"
            accept="pdf/*"
            required
            multiple
            onChange={handleFileSelection}
          />
        </label>
        <br /> <br />
        <button type="submit" class="uploadbutton" onClick={handleUpload}>
          <h3>Upload Files</h3>
        </button>
      </form>
    </div>
  ) : showForm === "loading" ? (
    <Loading type="spin" color="#ffffff" height={20} width={20} />
  ) : (
    <>
      {console.log(data)}
      <Output data={data} />
    </>
  );
}

export default FileUpload;
