import React, { useEffect, useState } from 'react';
import Service from './Service';

function Punch() {
  const [form, setForm] = useState({
    date: "",
    punchIn: "",
    punchOut: "",
    ApplicationUserId:"",
  });
  const user = JSON.parse(localStorage.getItem("userData")).userName;
  const userData = JSON.parse(localStorage.getItem("userData")).id;
  const userId = userData;
  const [formError, setFormError] = useState({
    date: "",
    punchIn: "",
    punchOut: "",
  });

  const [punch, setPunch] = useState([]);
  const [punchInClicked, setPunchInClicked] = useState(false);
  function resetForm() {
    setForm({
      date: "",
      punchIn: "",
      punchOut: "", 
    });
  }

  useEffect(() => {
    checkIfPunchedIn(userId);
    getAll(userId);
  }, [userId]);

  async function getAll() {
    try {
      const result = await Service.GetById(userId);
      setPunch(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function checkIfPunchedIn() {
    try {
      const result = await Service.checkpunch(userId); 
      setPunchInClicked(result.data);
    } catch (error) {
      console.error("Error checking punch status:", error);
    }
  }

  const saveClick = async () => {
    try {
      const currentDate = new Date();
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData.id;

      const dataToSend = {
        ...form,
        date: currentDate.toISOString(),
        punchIn: currentDate.toISOString(),
        punchOut: currentDate.toISOString(),
        ApplicationUserId: userId,
      };

      await Service.createpunch(dataToSend);
      resetForm();
      await getAll(userId);
      setPunchInClicked(true); 
    } catch (error) {
      console.error('Unable to submit data:', error);
    }
  };

  const UpdateClick = async () => {
    debugger;
    try {
      const currentDate = new Date();
      const userData = JSON.parse(localStorage.getItem("userData")).id;
      const userId = userData;

      const dataToSend = {
        ...form,
        date: currentDate.toISOString(),
        punchIn: currentDate.toISOString(),
        punchOut: currentDate.toISOString(),
        ApplicationUserId: userId,
      };

      await Service.updatepunch(userId, dataToSend);
      resetForm();
      await getAll();
      setPunchInClicked(false); 
    } catch (error) {
      console.error('Unable to submit data:', error);
    }
  };


  return (
    <div className="container mt-4 text-center">
    <h2 className="text-primary">Attendance List</h2>
    <div className="row">
      <div className="col-md-4">
        {punchInClicked ? (
          <button
            className="btn btn-danger text-left"
            data-toggle="modal"
            onClick={UpdateClick}
          >
            <i className="fas fa-sign-out-alt"></i> Punch Out
          </button>
        ) : (
          <button
            className="btn btn-primary text-left"
            data-toggle="modal"
            onClick={saveClick}
          >
            <i className="fas fa-sign-in-alt"></i> Punch In
          </button>
        )}
      </div>
    </div>
    <br /> <br />
    <div className="row">
      <div className="col-md-8 mx-auto">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
            </tr>
          </thead>
          <tbody>{renderPunch()}</tbody>
        </table>
      </div>
    </div>
  </div>
  );

  function renderPunch() {
    return punch.map((item) => {
      const formattedDate = item.date ? new Date(item.date).toLocaleDateString() : "";
      const formattedPunchIn = item.punchIn ? new Date(item.punchIn).toLocaleTimeString() : "";
      const formattedPunchOut = item.punchOut ? new Date(item.punchOut).toLocaleTimeString() : "";

      return (
        <tr key={item.id}>
          <td> {user && <strong>{user} </strong>}</td>
          <td>{formattedDate}</td>
          <td>{formattedPunchIn}</td>
          <td>{formattedPunchOut}</td>
        </tr>
      );
    });
  } 
}

export default Punch;
