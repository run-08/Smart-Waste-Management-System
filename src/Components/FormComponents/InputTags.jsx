import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupStyles from "../../Signup/signuppage.module.css";
import userDetails from "../../Signup/UserDetails";
const Inputs = () => {
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
  const {
    isSignUpPage,
    isLoginPage,
    setIsAuthorized,
    setIsPublicUser,
    setIsMunicipalities,
    setIsInvestor,
  } = userDetails();

  const reteriveDB = async (email, password) => {
    try {
      const response = await fetch(
        `http://localhost:1001/getUser?email=${email}`
      );
      const data = await response.json();
      if (data == null) {
        alert("User doesn't exists!");
        setIsAuthorized(false);
        return;
      } else {
        let encryptedPassword = encrypt(password);
        if (encryptedPassword != data?.user?.password) {
          console.log(encryptedPassword);
          alert("Password is Incorrect !");
          setIsAuthorized(false);
          return;
        }
        const mode = data?.user?.mode;
        console.log(mode);
        if (mode === "publicUser") setIsPublicUser();
        else if (mode === "Investor") setIsInvestor();
        else setIsMunicipalities();
        setIsAuthorized(true);
        navigate("/HomePage");
      }
    } catch (e) {
      console.log("It is The Error in Login fetching Details ");
    }
  };
  const storeInDB = async (email, password, name, mode) => {
    try {
      const response = await fetch(
        `http://localhost:1001/getUser?email=${email}`
      );
      const data = await response.json();
      if (data != null) {
        setIsAuthorized(true);
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
            mode: mode,
          }),
        });
        if (mode === "PublicUser") setIsPublicUser();
        else if (mode === "Investor") setIsInvestor();
        else setIsMunicipalities();
        setIsAuthorized(true);
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
    mode: "publicUser",
  });

  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const validate = (event) => {
    event.preventDefault();
    const { name, password, confirmPassword, email, mode } = form;
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
    if (mode === undefined || mode === null) {
      alert("Select Any Mode!");
      return;
    }
    if (isSignUpPage) storeInDB(email, password, name, mode);
    else reteriveDB(email, password);
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
          {isSignUpPage && (
            <div
              className="form-group signin py-2"
              style={{ display: "block" }}
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
          )}
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
          {isSignUpPage && (
            <div className="form-group py-2" style={{ display: "block" }}>
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
          )}
          <div className="form-group py-2">
            <label htmlFor="UserMode" className="form-check-label h6">
              Mode{" "}
            </label>
            <select name="usermode" className="form-select text-bold h6">
              <option
                value="publicUser"
                className="text-white h5 text-bold bg-secondary"
              >
                Public User
              </option>
              <option
                value="municipalities"
                className="text-white h5 text-bold bg-secondary"
              >
                Municipalities
              </option>
              <option
                value="investors"
                className="text-white h5 text-bold bg-secondary"
                onClick={(e) => setForm({ ...form, mode: e.target.value })}
              >
                Investor
              </option>
            </select>
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
    </>,
  ];
  return Form;
};
export default Inputs;
