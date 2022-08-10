import React, { useState } from "react";
import "./UploadUser.css"
function UploadUser(){

    const [test, setTests] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const saveTestDataHandler = (enteredNewTestData) =>{
        setTests(enteredNewTestData);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        const fileInput = document.querySelector("#fileInput");

        data.append('emplist', fileInput.files[0]);
        setIsLoading(true);
        fetch("http://localhost:5000/users/upload", {
            method: "POST",
            headers: {
                "accept": "application/json",
            },
            body: data 
            })
            .then((res) => {
            saveTestDataHandler(res.status);
            setIsLoading(false);
            if (res.status == 200) {
                saveTestDataHandler("Users successfully uploaded");
            } else if (res.status == 400) {
                res.json().then((data) => {
                    saveTestDataHandler(data["error"]);
                })
            }
            }, function (e) {
                saveTestDataHandler("Error submitting the form! Please try refreshing and reuploading file");
            });
        };

    return(
        <div className = "container">
        <form  onSubmit= {submitHandler} encType = "multipart/form-data">
        <input type = "file" name = "emplist"  accept=".csv" id = "fileInput" required></input>
        <input type= "submit" value = "upload"></input>
        <p>Upload Status: </p>
        { isLoading && (
            <p>Loading...</p>
        )}
        <p>{test} </p>
        </form>
        </div>
    );

}

export default UploadUser;