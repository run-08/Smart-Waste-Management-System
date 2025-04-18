import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import InputTags from "../Components/FormComponents/InputTags";
import SignUpstyles from "./signuppage.module.css";
const SignupPage = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const FormComponets = <InputTags></InputTags>;
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
    <div className={`container-fluid my-5 mx-5 ${SignUpstyles.body} `}>
      <div className="row cols-1 my-5 ">
        <div className="col-sm-5 offset-3 my-5 ">
          <div ref={containerRef} className="flowbox_container"></div>
          <div className={`card my-5 ${SignUpstyles.login_body}`}>
            <div className="card-header">
              <h4 className="text-center ">Register Your Account </h4>
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
