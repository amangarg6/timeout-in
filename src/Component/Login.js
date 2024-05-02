import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Service from "./Service";


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state && state.from === "privateRoute") {
      // Open login modal or handle as needed
      console.log("Open login modal");
    }
  }, [state]);
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      debugger;
      try {
        const response = await Service.login(values);
        navigate("/app/punch");
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        alert("Wrong username / password");
      }
    },
  });
  return (
    <div className="container">
      {/* <div className="container-fluid homepage-bgimage"> */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header text-center">Login</div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${
                      formik.touched.username && formik.errors.username
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter your username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-info w-100"
                    disabled={formik.isSubmitting}
                  >
                    Login
                  </button>
                </div>

                <p className="text-center mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="btn btn-link">
                    Register now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;
