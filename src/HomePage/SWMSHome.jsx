import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeStyles from "../HomePage/HomePage.module.css";
import userDetails from "../Signup/UserDetails";
import Dashboard from "./Dashboard/dashboard";
const SWMSHomepage = () => {
  const { setIsSignUpPage, setIsLoginPage, isAuthorized, setIsAuthorized } =
    userDetails();
  console.log(setIsLoginPage);
  const navigate = useNavigate();
  const [quicksignup_btn, setQuicksignup_btn] = useState("white");
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
  const SignUp = async (email, password, name) => {
    try {
      const response = await fetch(
        `http://localhost:1001/getUser?email=${email}`
      );
      const data = await response.json();
      console.log(data);
      if (data != null) {
        setIsAuthorized(false);
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

        setIsAuthorized(true);
        alert("Registered Successfully");
      }
      const result = await response1.text;
    } catch (e) {
      console.log(e);
    }
  };
  const [display, setDisplay] = useState("block");
  useEffect(() => {
    const brand_colors = [
      "white",
      "black",
      "blue",
      "green",
      "orange",
      "yellow",
      "red",
      "purple",
      "teal",
      "darkblue",
      "lightgreen",
      "skyblue",
    ];
    var color_length = brand_colors.length;
    setInterval(() => {
      for (var i = 0; i < 4; i++) {
        const brand_name = document.querySelector(`.brand_name${i + 1}`);
        if (brand_name != null)
          brand_name.style.color =
            brand_colors[Math.floor(Math.random() * color_length)];
      }
    }, 100);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-secondary-subtle mt-1 ">
        <div className="container-fluid">
          <span
            href="#"
            className="display-6 me-4"
            onClick={(e) => {
              window.location.reload();
            }}
            onMouseMove={(e) => {
              e.target.style.cursor = "pointer";
            }}
          >
            <span className="brand_name1 brand_name">S</span>
            <span className="brand_name2 brand_name">W</span>
            <span className="brand_name3 brand_name">M</span>
            <span className="brand_name4 brand_name">S</span>
          </span>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#nav-content"
            type="btn-open"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="nav-content">
            <div className="d-flex flex-lg-row-reverse flex-sm-column   col-sm-12 navbar-nav">
              <hr className={`mt-3 text-dark`} />
              {!isAuthorized && (
                <li className="nav-item list-unstyled ">
                  <button
                    className="btn btn-outline-primary border-primary me-5 px-4 mt-sm-3"
                    type="button"
                    onClick={() => {
                      setIsSignUpPage();
                      navigate("/signUp");
                    }}
                  >
                    Touch with us
                  </button>
                </li>
              )}
              {!isAuthorized && (
                <li className="nav-item list-unstyled">
                  <button
                    className="btn btn-outline-success border-success me-5 px-4 mt-sm-3"
                    type="button"
                    onClick={() => {
                      setIsLoginPage();
                      navigate("/signUp");
                    }}
                  >
                    Sign in
                  </button>
                </li>
              )}
              {isAuthorized && (
                <li className="nav-item list-unstyled ">
                  <button
                    className="btn btn-outline-danger border-danger me-5 px-4 mt-sm-3"
                    type="button"
                    onClick={() => {
                      setIsSignUpPage();
                      navigate("/signUp");
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              <li className="nav-item list-unstyled me-5  mt-3 py-sm-2">
                <a
                  href="#"
                  className="nav-links  h5 "
                  onMouseOver={(e) => {
                    (e.target.style.textDecoration = "underline"),
                      (e.target.style.color = "aliceblue  "),
                      (e.target.style.textDecorationColor = "black");
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                    e.target.style.textDecorationColor = "white";
                  }}
                  style={{
                    textDecoration: "underline",
                    transition:
                      "color 0.5s ease-in-out , text-decoration-color 2s ease-in-out  ",
                    textUnderlineOffset: "5px",
                  }}
                >
                  Customers
                </a>
              </li>
              <li className="nav-item list-unstyled me-5 mt-3 py-sm-2">
                <a
                  href="#"
                  className="nav-links h5 "
                  onMouseOver={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecorationColor = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                    e.target.style.textDecorationColor = "white";
                  }}
                  style={{
                    textDecoration: "underline",
                    transition:
                      "color 0.5s ease-in-out , text-decoration-color 2s ease-in-out  ",
                    textUnderlineOffset: "5px",
                  }}
                >
                  About us
                </a>
              </li>
              <li className="nav-item list-unstyled me-5  mt-3 py-sm-2">
                <a
                  href="#"
                  className="nav-links  h5 "
                  onMouseOver={(e) => {
                    (e.target.style.textDecoration = "underline"),
                      (e.target.style.color = "aliceblue  "),
                      (e.target.style.textDecorationColor = "black");
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                    e.target.style.textDecorationColor = "white";
                  }}
                  style={{
                    textDecoration: "underline",
                    transition:
                      "color 0.5s ease-in-out , text-decoration-color 2s ease-in-out  ",
                    textUnderlineOffset: "5px",
                  }}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item list-unstyled me-5 mt-3 py-sm-2">
                <a
                  href="#"
                  className="nav-links h5 "
                  onMouseOver={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecorationColor = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                    e.target.style.textDecorationColor = "white";
                  }}
                  style={{
                    textDecoration: "underline",
                    transition:
                      "color 0.5s ease-in-out , text-decoration-color 2s ease-in-out  ",
                    textUnderlineOffset: "5px",
                  }}
                  onClick={() => {
                    navigate("/Map");
                  }}
                >
                  Map
                </a>
              </li>
              <li className="nav-item list-unstyled me-5 mt-3 py-sm-2">
                <a
                  href="#"
                  className="nav-links h5 "
                  onMouseOver={(e) => {
                    e.target.style.color = "white";
                    e.target.style.textDecorationColor = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "black";
                    e.target.style.textDecorationColor = "white";
                  }}
                  style={{
                    textDecoration: "underline",
                    transition:
                      "color 0.5s ease-in-out , text-decoration-color 2s ease-in-out  ",
                    textUnderlineOffset: "5px",
                  }}
                  onClick={() => {
                    navigate("/Camera");
                  }}
                >
                  Camera
                </a>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <div className={`${HomeStyles.mainContent} `}>
        <div className="row ">
          <h1
            className={`text-center p-5 my-5 fs-1 ${HomeStyles.headingAnime}`}
          >
            Welcome to Smart Waste Management System
          </h1>
        </div>
      </div>
      <div className="dashboard   ">
        <Dashboard></Dashboard>
      </div>

      {isAuthorized ? null : (
        <div
          className={`card offset-3 w-50 mt-5 border-white bg-success z-3 ${
            display === "none" ? "d-none" : "d-block"
          }`}
        >
          <div className=" text-white pt-3  text-center  offset-2 h4  ">
            Still Not Registered!
            <span
              className={`${window.innerWidth <= 769} ? d-inline : d-inline`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="-100 -900 900 900"
                width="30px"
                fill="black"
                className="ml-5 py-1 p-absolute"
              >
                <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              </svg>
            </span>
            <span className={`float-end  py-md-0`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -890 960 960"
                width="54px"
                fill={quicksignup_btn}
                onMouseOver={() => setQuicksignup_btn("black")}
                onMouseLeave={() => setQuicksignup_btn("white")}
                onClick={() => {
                  setDisplay("none");
                }}
                style={{ cursor: "pointer" }}
              >
                <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
            </span>
          </div>
          <hr className="m-0" />
          <div className="card-body">
            <div className="greet_Word_for_signup text-center">
              <span className="text-white h2 ">
                Touch with us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="-10 -1000 900 900"
                  width="38px"
                  fill="white"
                >
                  <path d="M419-80q-28 0-52.5-12T325-126L107-403l19-20q20-21 48-25t52 11l74 45v-328q0-17 11.5-28.5T340-760q17 0 29 11.5t12 28.5v472l-97-60 104 133q6 7 14 11t17 4h221q33 0 56.5-23.5T720-240v-160q0-17-11.5-28.5T680-440H461v-80h219q50 0 85 35t35 85v160q0 66-47 113T640-80H419Zm83-260ZM339-960q100 0 170 70t70 170q0 33-8.5 63.5T546-599l-52-30q12-20 18.5-43t6.5-48q0-75-52.5-127.5T339-900q-75 0-127.5 52.5T159-720q0 25 6 48t18 43l-52 29q-16-26-24-56.5T99-720q0-100 70-170t170-70Zm0 100q58 0 99 41t41 99q0 20-5 37.5T459-649l-52-30q5-9 8-19.5t3-21.5q0-33-23.5-56.5T338-800q-34 0-57 23.5T258-720q0 11 3 21.5t8 19.5l-52 30q-9-16-13.5-33.5T199-720q0-58 40.5-99t99.5-41Z" />
                </svg>
              </span>
            </div>
            <form action="/" className="mt-2 formQuickSignUp">
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="px-2 fw-bold text-white form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email "
                  className="form-control fw-bold"
                  value={"aru701567@gmail.com"}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="form-label text-white  px-1 fw-bold my-3"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  id="password"
                  className="form-control fw-bold"
                  value={"Arunda95!"}
                />
              </div>
              <div className="submit_form_btn d-flex justify-content-center mt-3">
                <button
                  type="submit"
                  className="btn btn-dark "
                  onClick={(e) => {
                    e.preventDefault();
                    const email = document.querySelector("#email").value;
                    const password = document.querySelector("#password").value;
                    if (
                      email === undefined ||
                      email === null ||
                      email.trim() === "" ||
                      !email.includes("@")
                    ) {
                      alert("Invalid Email");
                      return;
                    }
                    if (
                      password === undefined ||
                      password === null ||
                      password.trim() == ""
                    ) {
                      alert("Invalid Password");
                      return;
                    }
                    setEmail(email);
                    setPassword(password);
                    SignUp(email, password, "unknown User");
                    return;
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default SWMSHomepage;
