import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "../../HomePage/AuthenticationZustand";
import SignupStyles from "../../Signup/signuppage.module.css";
const Inputs = () => {
  const decrypt = (password) => {
    let decryptedPassword = "";
    for (let i = 0; i < password.length; i += 2) {
      if (
        password.charCodeAt(i + 1) >= 97 &&
        password.charCodeAt(i + 1) <= 122
      ) {
        let char =
          password.charAt(i + 1) == "a"
            ? "z"
            : "" + String.fromCharCode(password.charCodeAt(i + 1) - 1);
        decryptedPassword += char;
      } else if (
        password.charCodeAt(i + 1) >= 65 &&
        password.charCodeAt(i + 1) <= 91
      ) {
        let char =
          password.charAt(i + 1) == "A"
            ? "Z"
            : "" + String.fromCharCode(password.charCodeAt(i + 1) - 1);
        decryptedPassword += +char;
      } else {
        decryptedPassword += password.charAt(i + 2);
        i++;
      }
    }
  };
  const encrypt = (password) => {
    let encryptedPassword = "";
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        let char =
          password.charAt(i) == "z"
            ? "a"
            : "" + String.fromCharCode(password.charCodeAt(i) + 1);
        encryptedPassword += "/" + char;
      } else if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 91) {
        let char =
          password.charAt(i) == "Z"
            ? "A"
            : "" + String.fromCharCode(password.charCodeAt(i) + 1);
        encryptedPassword += "/" + char;
      } else encryptedPassword += "//" + password.charAt(i);
    }
    return encryptedPassword;
  };
  const storeInDB = async (email, password, name) => {
    try {
      const response = await fetch(
        `http://localhost:1001/getUser?email=${email}`
      );
      const data = await response.json();
      if (data != null) {
        setIsAuthenticated(false);
        alert("user Already Exists");
        return;
      } else {
        password = encrypt(password);
        const response1 = await fetch("http://localhost:1001/saveUserDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        });
        setIsAuthenticated(true);
        alert("Registered Successfully");
        navigate("/homePage");
      }
      const result = await response1.text;
    } catch (e) {
      console.log(e);
    }
  };
  const [form, setForm] = useState({
    name: "ArunThangavel",
    email: "aru701567@gmail.com",
    password: "Arunda95!",
    confirmPassword: "Arunda95!",
  });
  const { isAuthenticated, setIsAuthenticated } = Authentication();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const whereFrom = useLocation()?.state?.path || "/signup";

  const validate = (event) => {
    event.preventDefault();
    const { name, password, confirmPassword, email } = form;
    if (name === null || name === undefined || name.trim() === "") {
      alert("InValid name");
      return;
    }
    if (
      email === null ||
      email === undefined ||
      email.trim() === "" ||
      !email.includes("@")
    ) {
      alert("Invalid Email");
      return;
    }
    if (
      confirmPassword !== password ||
      password.trim() === "" ||
      password.length <= 0 ||
      password === undefined ||
      password === null
    ) {
      setIsValid(false);
      alert("password is Invalid");
      return;
    }
    storeInDB(email, password, name);
  };
  const Form = [
    <>
      {isValid ? null : (
        <div
          className="alert alert-danger alert-dismissible fade show "
          role="alert"
        >
          <h3 className=" text-center"></h3>
          {formErrorMessage}

          <button
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => {
              setIsValid(true);
              setFormErrorMessage(null);
            }}
          ></button>
        </div>
      )}
      <form action="" onSubmit={validate} key="form">
        <div className="form-container">
          <div
            className="form-group signin py-2"
            style={{ display: whereFrom === "/signin" ? "none" : "block" }}
          >
            <label htmlFor="userName" className="form-label h6">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${SignupStyles.input}`}
              placeholder="Enter Your Name"
              value={form?.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="from-group signin py-2 h6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              value={form?.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className=" px-1 pt-2 text-primary">
              <mark className={"text-danger bg-transparent"}>*</mark>We will
              never share your email with other persons
            </div>
          </div>
          <div className="from-group signin py-2">
            <label htmlFor="password" className="form-label h6">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your Password"
              value={form.password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <small className="text-danger">
              {!isValid
                ? "The Password Must be contains with a minimum length of 8 including Capital letter , Small letter , One Digit Number , And Any OneSpecial Character"
                : null}
            </small>
          </div>
          <div
            className="form-group py-2"
            style={{ display: whereFrom === "/signin" ? "none" : "block" }}
          >
            <label htmlFor="password" className="form-label h6">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter final  Password"
              className="form-control"
              value={form.confirmPassword || ""}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="form-group d-block  mx-5  text-center ">
            <button
              type="submit"
              className={`btn  mt-3  mb-0  ${SignupStyles.button}`}
              style={{
                marginLeft: window.innerWidth < 400 ? "-40px" : "0px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      ,
    </>,
  ];
  return Form;
};
export default Inputs;
