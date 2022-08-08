import React, { useState } from "react";
import "./UploadUser.css"
function UploadUser(){

    const [test, setTests] = useState("");

    const saveTestDataHandler = (enteredNewTestData) =>{
        setTests(enteredNewTestData);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const data = new FormData();
        const fileInput = document.querySelector("#fileInput");
        console.log(fileInput.files[0]);

        data.append('emplist', fileInput.files[0]);
        console.log(data);

        fetch("http://localhost:5000/users/upload", {
            // mode: 'no-cors',
            method: "POST",
            headers: {
                //"Content-Type": "multipart/form-data",
                "accept": "application/json",
                //"type": "formData"
            },
            body: data 
            })
            .then((res) => {
            console.log(res);
            console.log(res.status);
            //console.log(res.json());
            saveTestDataHandler(res.status);
            if (res.status == 200) {
                //alert("Perfect! ");
                saveTestDataHandler("Users successfully uploaded");
            } else if (res.status == 400) {
                //res.json();
                //alert("Invalid CSV file uploaded! ");
                // console.log(res.json().then());
                // console.log((res.json()))

                res.json().then((data) => {
                    saveTestDataHandler(data["error"]);
                })

            }
            }, function (e) {
                saveTestDataHandler("Error submitting the form!");
            //alert("Error submitting form!");
            });
        };

    return(
        <div class = "container">
        <form  onSubmit= {submitHandler} encType = "multipart/form-data">
        <input type = "file" name = "emplist"  accept=".csv" id = "fileInput" required></input>
        <input type= "submit" value = "upload"></input>
        <p>Upload Status: </p>
        <p>{test} </p>
        </form>
        </div>
    );

}

export default UploadUser;