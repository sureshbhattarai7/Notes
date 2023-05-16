import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

const Form = () => {

    //title ra description ko value hamle setform ma store garna parxa ani formval ma automatic aauxa.
    const [formVal, setformVal] = useState({});
    const [apidata, setApidata] = useState([{}]);

    //note fetch garne api with function
    const getNote = async () => {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/notes");
        return response;
    }
   //note delete garne api with function
    const deletenote = async (id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/notes/${id}`);
        location.reload();
        return response;
    }
   //note edit garne api with function
    const editTxt = async (id, data1, data2) => {
        const data = {
            title: data1, description: data2
        }
        const response = await axios.patch(`http://127.0.0.1:8000/api/v1/notes/${id}`, data);
        location.reload();
        return response;
  }

    //page reload huda first mai function reload hunxaa. 
    useEffect(() => {
        getNote().then((res) => {
            setApidata(res.data.data.notes)
        })
            .catch((err) => console.log(err));
    }, []);

    //yesma hamle html form ko data state ma store garxau.
    const manageData = (e) => {
        const values = { ...formVal };
        values[e.target.name] = e.target.value;

        setformVal(values);
    }

    //html form submit garda hune action
    const sendData = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/v1/notes", {
            ...formVal,
        })
            .then(() => {
                location.reload();
            })
            .catch((err) => alert(err.response.data.message));
    }

    return (
        <div>
            <form
                onSubmit={sendData}
                className="form"
            >
                <input className="input" type="text" placeholder="Enter the title" name="title" onChange={manageData} />
                <br />
                <br />
                <input className="input" type="text" placeholder="Enter the description" name="description" onChange={manageData} />
                <br />
                <br />
                <input type="submit" className="button" />
            </form>

            <hr />
            <h2 style={{ textAlign: "center" }}>Your notes:</h2>

            <div className="notedata">
                {/* agi setapidata ma data store garera rakheko ani teslai get gareko */}
                {apidata?.map((cl) => (
                    <div key={String(cl._id).slice(0)} className="notecart">
                        {/* <p>{cl._id}</p>
                      <p>{ String(cl._id).slice(0) }</p> */}
                        <h2 className="title">{cl.title}</h2>
                        <hr />
                        <p className="desc">{cl.description}</p>
                        <div className="buttons">
                        <button className="deletebtn"
                            onClick={() => deletenote(String(cl._id))}
                        >Delete</button>
                            <button className="editbtn" onClick={() => {
                               let editTitle = prompt("Edit Title?");
                                let editDescription = prompt("Edit Description?");
                                console.log(editTitle, editDescription);
                                editTxt(String(cl._id), editTitle, editDescription);
                        }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Form