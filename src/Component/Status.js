import React, { useEffect, useState } from "react";
import Service from "./Service";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Status() {
  const userData = JSON.parse(localStorage.getItem("userData")).id;
  const userId = userData;
  const [form, SetForm] = useState({
    project: "",
    module: "",
    profile: "",
    date: new Date(),
    memo: "",
    ApplicationUserId:userId,
  });
  const [FormError, SetFormError] = useState({
    project: "",
    module: "",
    profile: "",
    date: "",
    memo: "",
    ApplicationUserId:userId,
  });
  const [status, setstatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAll(userId);
  }, [userId]);

  const changeHandler = (e) => {
    if (e.target.name === "date") {
      SetForm({ ...form, [e.target.name]: e.target.value });
    } else {
      SetForm({ ...form, [e.target.name]: e.target.value });
    }
    SetFormError({ ...FormError, [e.target.name]: "" });
  };
  function resetForm() {
    SetForm({
      project: "",
      module: "",
      profile: "",
      date: new Date(),
      memo: "",
      ApplicationUserId:userId,
    });
  }

  const getAll = async () => {
    debugger;
    try {
      const result = await Service.userbyId(userId);
      setstatus(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function renderStatus() {
    return status?.map((item) => {
      const formattedDate = item.date ? new Date(item.date).toLocaleDateString() : '';
      return (
        <tr key={item.id}>
          <td>{item.project}</td>
          <td>{item.module}</td>
          <td>{item.profile}</td>
          <td>{formattedDate}</td>
          <td>{item.memo}</td>
          <td>
            <button
              data-toggle="modal"
              data-target="#editModal"
              className="btn btn-info m-2"
              onClick={() => SetForm(item)}
            >
              <i className="bi bi-pencil"></i> Edit
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
    debugger;
    try {
      await Service.create(form);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Status added successfully!",
      });
      await getAll();
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add Status!",
      });
    }
  };

  const updateClick = async () => {
    try {
      await Service.update(form);
      resetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Status updated successfully!",
      });
      await getAll();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update Status!",
      });
    }
  };

  const deleteClick = async (id) => {
    Swal.fire({
      title: "Delete Status",
      text: "Are you sure you want to delete this Status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Service.remove(id);
          await getAll();
          Swal.fire({
            title: "Success",
            text: "Status deleted successfully!",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error",
            text: "Unable to delete Status!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary text-left">Status</h2>
      <div className="row">
        <div className="col-md-9">
          <table className="table table-bordered table-striped table-active">
            <thead>
              <tr>
                <th>Project</th>
                <th>Module</th>
                <th>Profile</th>
                <th>Date</th>
                <th>Memo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderStatus()}</tbody>
          </table>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#newModal"
          >
        <i className="fas fa-plus"></i>    Add status
          </button>
        </div>
      </div>
      {/* save status */}
      <div className="modal" id="newModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">New status</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtProject">Project:</label>
                  <input
                    onChange={changeHandler}
                    id="txtProject"
                    type="text"
                    name="project"
                    placeholder="Enter project"
                    className="form-control"
                    value={form.project}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtModule">Module:</label>
                  <input
                    onChange={changeHandler}
                    id="txtModule"
                    type="text"
                    name="module"
                    placeholder="Enter Module"
                    className="form-control"
                    value={form.module}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtProfile">Profile:</label>
                  <input
                    onChange={changeHandler}
                    id="txtProfile"
                    type="text"
                    name="profile"
                    placeholder="Enter Profile"
                    className="form-control"
                    value={form.profile}
                  />
                </div>
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
                    minDate={
                      new Date(new Date().setDate(new Date().getDate() - 3))
                    } // Set the minimum date to today - 3 days
                    maxDate={new Date()} // Set the maximum date to today
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtMemo">Memo:</label>
                  <textarea
                    onChange={changeHandler}
                    id="txtMemo"
                    name="memo"
                    placeholder="Enter Memo"
                    className="form-control"
                    value={form.memo}
                    style={{ height: "100px" }} // Set the desired height
                  />
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
                   <i className="bi bi-check"></i> Save Status
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                  <i className="bi bi-x"></i> Close
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
              <h5 className="modal-title">Edit status</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtProject">Project:</label>
                  <input
                    onChange={changeHandler}
                    id="txtProject"
                    type="text"
                    name="project"
                    placeholder="Enter project"
                    className="form-control"
                    value={form.project}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtModule">Module:</label>
                  <input
                    onChange={changeHandler}
                    id="txtModule"
                    type="text"
                    name="module"
                    placeholder="Enter Module"
                    className="form-control"
                    value={form.module}
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtProfile">Profile:</label>
                  <input
                    onChange={changeHandler}
                    id="txtProfile"
                    type="text"
                    name="profile"
                    placeholder="Enter Profile"
                    className="form-control"
                    value={form.profile}
                  />
                </div>
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
                    minDate={
                      new Date(new Date().setDate(new Date().getDate() - 3))
                    } // Set the minimum date to today - 3 days
                    maxDate={new Date()} // Set the maximum date to today
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtMemo">Memo:</label>
                  <textarea
                    onChange={changeHandler}
                    id="txtMemo"
                    name="memo"
                    placeholder="Enter Memo"
                    className="form-control"
                    value={form.memo}
                    style={{ height: "100px" }} // Set the desired height
                  />
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
                 <i className="bi bi-pencil"></i> Update Status
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
           <i className="bi bi-x"></i> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
