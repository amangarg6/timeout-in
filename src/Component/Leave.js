import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Service from "./Service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Leave() {
  const userData = JSON.parse(localStorage.getItem("userData")).id;
  const userId = userData;
  const [form, SetForm] = useState({
    isLeave: false,
    date: new Date(),
    ApplicationUserId: userId,
  });

  const [FormError, SetFormError] = useState({
    isLeave: false,
    date: new Date(),
    ApplicationUserId: userId,
  });
  const [leave, setleave] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAll(userId);
  }, [userId]);

  const changeHandler = (e) => {
    if (e.target.name === "date") {
      SetForm({ ...form, [e.target.name]: e.target.value });
    } else if (e.target.name === "isLeave") {
      SetForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      SetForm({ ...form, [e.target.name]: e.target.value });
    }
    SetFormError({ ...FormError, [e.target.name]: "" });
  };

  function resetForm() {
    SetForm({
        isLeave: false,
        date: new Date(),
        ApplicationUserId: userId,
    });
  }

  const getAll = async () => {
    debugger;
    try {
      const result = await Service.getuserbyId(userId);
      setleave(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function renderLeave() {
    return leave?.map((item) => {
      const formattedDate = item.date
        ? new Date(item.date).toLocaleDateString()
        : "";
      const leaveStatus = item.isLeave ? "On Leave" : "Not On Leave";
      return (
        <tr key={item.id}>
          <td>{leaveStatus}</td>
          <td>{formattedDate}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#editModal"
              className="btn btn-info m-2"
              onClick={() => {
                SetForm(item);
              }}
            >
            <i className="bi bi-pencil"></i> Edit     Edit
            </button>
            <button
              onClick={() => deleteClick(item.id)}
              className="btn btn-danger m-2"
            >
           <i className="bi bi-trash"></i> Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  const saveClick = async () => {
    try {
      await Service.createleave(form);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "leave added successfully!",
      });
      await getAll();
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add leave!",
      });
    }
  };

  const updateClick = async () => {
    try {
      await Service.updateleave(form);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "leave updated successfully!",
      });
      await getAll();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update leave!",
      });
    }
  };

  const deleteClick = async (id) => {
    Swal.fire({
      title: "Delete leave",
      text: "Are you sure you want to delete this leave?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Service.removeleave(id);
          await getAll();
          Swal.fire({
            title: "Success",
            text: "leave deleted successfully!",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error",
            text: "Unable to delete leave!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-left">Leave Status</h2>
      <div className="row">
        <div className="col-md-9">
          <table className="table table-bordered table-striped table-active">
            <thead>
              <tr>
                <th>Leave</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderLeave()}</tbody>
          </table>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#newModal"
          >
         <i className="fas fa-plus"></i>    Add leave
          </button>
        </div>
      </div>
      {/* save status */}
      <div className="modal" id="newModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">New leave</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtDate">Date: </label>
                  <DatePicker
                    selected={form.date}
                    onChange={(date) => SetForm({ ...form, date })}
                    id="txtDate"
                    name="date"
                    placeholderText="Select Date"
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                    minDate={new Date()}
                  />
                </div>

                <div className="form-group text-left">
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="chkLeave" style={{ marginRight: "10px" }}>
                      Leave:
                    </label>
                    <input
                      type="checkbox"
                      id="chkLeave"
                      name="isLeave"
                      checked={form.isLeave}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={saveClick}
                data-dismiss="modal"
              >
              <i className="bi bi-check"></i>    Apply Leave
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
           <i className="bi bi-x"></i>      Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* edit status */}
      <div className="modal" id="editModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Edit leave</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtDate">Date: </label>
                  <DatePicker
                    selected={form.date}
                    onChange={(date) => SetForm({ ...form, date })}
                    id="txtDate"
                    name="date"
                    placeholderText="Select Date"
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                    minDate={new Date()}
                  />
                </div>
                <div className="form-group text-left">
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="chkLeave" style={{ marginRight: "10px" }}>
                      Leave:
                    </label>
                    <input
                      type="checkbox"
                      id="chkLeave"
                      name="isLeave"
                      checked={form.isLeave}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={updateClick}
                data-dismiss="modal"
              >
            <i className="bi bi-pencil"></i>Update Leave
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
            <i className="bi bi-x"></i>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leave;
