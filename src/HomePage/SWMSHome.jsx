import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonFormData from "../CommonDetails/CommonFormData";
import HomeStyles from "../HomePage/HomePage.module.css";
import userDetails from "../Signup/UserDetails";
import Dashboard from "./Dashboard/dashboard";
const SWMSHomepage = () => {
  const email = "aru701567@gmail.com";
  const phoneNo = "6381416285";
  const {
    setIsSignUpPage,
    setIsLoginPage,
    isAuthorized,
    setIsAuthorized,
    isPublicUser,
    isMunicipalities,
    isInvestor,
  } = userDetails();

  const navigate = useNavigate();
  const { setCustomerPage, setDashboardPage, isDashboardPage, isCustomerPage } =
    CommonFormData();

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
      <nav
        className="navbar navbar-expand-lg bg-secondary-subtle mt-1 "
        style={{ width: "99vw" }}
      >
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
                      return;
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
                      return;
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
                      setIsLoginPage();
                      navigate("/signUp");
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              <li
                className={`nav-item list-unstyled me-5  mt-3 py-sm-2 ${
                  isCustomerPage ? "active" : ""
                } `}
              >
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
                  onClick={() => {
                    if (!isAuthorized) {
                      setIsLoginPage();
                      navigate("/signUp", { state: { flag: true } });
                      return;
                    }
                    setCustomerPage();
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
                  onClick={() => {
                    if (!isAuthorized) {
                      setIsLoginPage();
                      navigate("/signUp", { state: { flag: true } });
                      return;
                    }
                  }}
                >
                  About us
                </a>
              </li>
              {isInvestor && (
                <li
                  className={`nav-item list-unstyled me-5  mt-3  h5 ${
                    isDashboardPage ? "active" : ""
                  } `}
                >
                  <a
                    href="#"
                    className="nav-link  h5 "
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
                    onClick={() => {
                      if (!isAuthorized) {
                        setIsLoginPage();
                        navigate("/signUp", { state: { flag: true } });
                        return;
                      }
                      setDashboardPage();
                    }}
                  >
                    Dashboard
                  </a>
                </li>
              )}
              {(isMunicipalities || isPublicUser) && (
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
                      if (!isAuthorized) {
                        setIsLoginPage();
                        navigate("/signUp", { state: { flag: true } });
                        return;
                      }
                      navigate("/Map");
                    }}
                  >
                    Map
                  </a>
                </li>
              )}
              {(isMunicipalities || isPublicUser) && (
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
                      if (!isAuthorized) {
                        setIsLoginPage();
                        navigate("/signUp", { state: { flag: true } });
                        return;
                      }
                      navigate("/Camera");
                    }}
                  >
                    Camera
                  </a>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={`${HomeStyles.mainContent} `}>
        <div className="row ">
          <div
            className={`  ${HomeStyles.headingAnime} px-5 `}
            style={{
              height: "100vh",
              overflow: "auto",
            }}
          >
            <div className="d-flex align-items-center justify-content-center my-5 py-5">
              <h1 className={`my-5 py-5 ${HomeStyles.heading}`}>
                Welcome to Smart Waste Management System
              </h1>
            </div>
          </div>
        </div>
      </div>
      {isInvestor && (
        <div className="dashboard   ">
          <Dashboard></Dashboard>
        </div>
      )}

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
      <div className={`${HomeStyles.aboutus_page}  row bg-dark my-1 `}>
        <div
          className={`${HomeStyles.borderMultiColor}  customer_details col-3 px-2 mx-2 my-3 `}
          style={{
            overflow: "hidden",
            border: "1px solid transparent",
            borderRightColor: "white",
            overflowX: "auto",
            maxWidth: "500px",
          }}
        >
          <h1
            className="h1 mx-3 fst-italic mb-3 text-white "
            style={{
              letterSpacing: "5px",
            }}
          >
            Your Details
          </h1>
          <div className="d-flex about_user flex-direction-column px-4 ">
            <ul className=" my-1 ">
              <li
                className=" fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Profile
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Create an another account ?
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Forgot Password ?
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Edit
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Payment Options :{" "}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="terms_and_conditions col-3 px-5 text-white my-3 "
          style={{
            overflow: "hidden",
            border: "1px solid transparent",
            borderRightColor: "white",
            overflowX: "auto",
            maxWidth: "500px",
          }}
        >
          <h1
            style={{
              letterSpacing: "10px",
            }}
            className="fst-italic px-5 mb-3"
          >
            SWMS{" "}
          </h1>
          <div className="d-flex flex-direction-column px-4">
            <ul className=" my-1 ">
              <li
                className="text-white fs-4"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Blog
              </li>
              <li
                className="text-white fs-4"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Customer And Support
              </li>
              <li
                className="text-white fs-4"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Terms And Condition
              </li>
              <li
                className="text-white fs-4 mb-2"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Contact :{" "}
              </li>
              <span className="phone_no py-5 mx-4 my-3 text-nowrap ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className=" ml-5"
                  fill="green"
                >
                  <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                </svg>
                <span
                  className="  fs-4 text-nowrap"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.4s ease-in-out",
                  }}
                  onClick={(e) => {
                    navigator.clipboard
                      .writeText(`${phoneNo}`)
                      .then(() => {
                        alert("Phone number copied Successfully !");
                      })
                      .catch((err) => {
                        alert("Failed to copy!");
                      });
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "green";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                  }}
                >
                  {`${phoneNo}`}
                </span>
              </span>
              <span className="email mx-4 text-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="my-2"
                  fill="rgba(138,74,243,1)"
                >
                  <path d="M560-520h280v-200H560v200Zm140-50-100-70v-40l100 70 100-70v40l-100 70ZM80-120q-33 0-56.5-23.5T0-200v-560q0-33 23.5-56.5T80-840h800q33 0 56.5 23.5T960-760v560q0 33-23.5 56.5T880-120H80Zm556-80h244v-560H80v560h4q42-75 116-117.5T360-360q86 0 160 42.5T636-200ZM360-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM182-200h356q-34-38-80.5-59T360-280q-51 0-97 21t-81 59Zm178-280q-17 0-28.5-11.5T320-520q0-17 11.5-28.5T360-560q17 0 28.5 11.5T400-520q0 17-11.5 28.5T360-480Zm120 0Z" />
                </svg>
                <span
                  className="email fs-4"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.4s ease-in-out",
                  }}
                  onClick={(e) => {
                    navigator.clipboard
                      .writeText(`${email}`)
                      .then(() => {
                        alert("Email copied Successfully !");
                      })
                      .catch((err) => {
                        alert("Failed to copy!");
                      });
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "rgba(138,74,243,1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                  }}
                >{` ${email}`}</span>
              </span>
            </ul>
          </div>
        </div>

        <div
          className="Have_an_dustbin col-3  text-white my-3"
          style={{
            border: "1px solid transparent",
            borderRightColor: "white",
            overflowX: "auto",
            maxWidth: "500px",
          }}
        >
          <h1
            className="h1 mx-3 fst-italic mb-3 text-white"
            style={{
              letterSpacing: "5px",
            }}
          >
            Need an Help?{" "}
          </h1>
          <div className="d-flex about_user flex-direction-column  ">
            <ul className=" my-1 ">
              <li
                className=" fs-4 text-white text-nowrap"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Need to Change your dustbin location ?
              </li>

              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Complaint About Payment ?
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Need to delete bin Details ?
              </li>
              <li
                className=" list-group-action fs-4 text-white"
                style={{
                  listStyleType: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: "white ",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = "underline";
                  e.target.style.textDecorationColor = "blue";
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecorationColor = "white";
                }}
                onMouseDown={(e) => {
                  e.target.style.textDecorationColor = "rgba(138,74,243,1)";
                }}
              >
                Other Complaints ?{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};
export default SWMSHomepage;
