import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import InputTags from "../Components/FormComponents/InputTags";
import SignUpstyles from "./signuppage.module.css";
import userDetails from "./UserDetails";
const SignupPage = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const FormComponets = <InputTags></InputTags>;
  const { isSignUpPage } = userDetails();

  const generateBox = () => {
    setInterval(() => {
      if (!containerRef.current) return;
      for (let i = 0; i < 2; i++) {
        let box = document.createElement("div");
        box.classList.add(`${SignUpstyles.flowBox}`);
        var size = Math.floor(Math.random() * 100) + 50;
        box.style.width = size + "px";
        box.style.height = size + "px";
        box.style.left = Math.floor(Math.random() * 1500) + "px";
        box.style.right = Math.floor(Math.random() * 1000) + "px";
        box.style.top = Math.floor(Math.random() * 500) + "px";
        box.style.bottom = Math.floor(Math.random() * 500) + "px";
        containerRef.current.appendChild(box);
      }
    }, 3000);
    setInterval(() => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = "";
    }, [6000]);
  };
  useEffect(() => {
    generateBox();
  }, []);
  return (
    <div className={`container-fluid my-1 mx-5`}>
      <div
        className="row cols-1 my-5 px-5"
        style={{
          background: `url("https://static.wixstatic.com/media/e85cf7_d76a71fd5a4441e3989d2a2e47e7d550~mv2.png/v1/fill/w_1599,h_900,al_c/e85cf7_d76a71fd5a4441e3989d2a2e47e7d550~mv2.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="col-sm-5 offset-3 my-5 ">
          <div ref={containerRef} className="flowbox_container"></div>
          {location?.state?.flag && (
            <div className="d-flex justify-content-center ">
              <div
                className="alert alert-danger w-50  alert-dismissible"
                role="alert"
              >
                <p className=" text-center alert-link my-2 mx-3">
                  Register First{" "}
                </p>
                <button
                  className="btn-close my-2 mx-2"
                  data-bs-dismiss="alert"
                ></button>
              </div>
            </div>
          )}
          <div className={`card my-5 ${SignUpstyles.login_body}`}>
            <div className="card-header">
              <h4 className="text-center ">
                {isSignUpPage ? "Register" : "Login into"} Your Account
              </h4>
            </div>
            <div className="card-body ">
              {FormComponets ? (
                FormComponets
              ) : (
                <h5>Error Occurred While Loading</h5>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};
export default SignupPage;
