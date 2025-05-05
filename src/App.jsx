import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRoutes } from "react-router-dom";
import Appstyle from "./App.module.css";
import Map from "./GoogleMap/Map";
import SWMSHomepage from "./HomePage/SWMSHome";
import Camera from "./ImageUploadPanel/Camera";
import RootPath from "./RootSWMS/RootPath";
import SignupPage from "./Signup/singnUppage";
const App = () => {
  return (
    <>
      <div className={`container-fluid bg-light`}>
        <SWMSRoute></SWMSRoute>
        <button
          className="btn float-end my-3"
          style={{
            borderRadius: "350%",
            height: "70px",
            width: "70px",
            backgroundColor: "#b7cd9d",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="-100 -960 11100 960"
            width="294px"
            fill="green"
            // style={{ cursor: "pointer", width: "200px" }}
          >
            <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
          </svg>
        </button>

        <div
          className="chat-container float-end my-5"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "500px",
            border: "2px solid green",
            borderRadius: "10px",
          }}
        >
          <div
            className="chat-header text-center fst-italic fs-4  fw-bold text-white bg-success"
            style={{ borderRadius: "5px" }}
          >
            SWMS Chatbot
          </div>
          <div
            className="chat-body"
            style={{
              overflowY: "auto",
              flex: "1",
              padding: "10px",
              background: "#f5f5f5",
            }}
          >
            <div className="bot_message float-start col-12 my-1">
              {"Hello , I am The SWMS ChatBot"}
              <hr />
            </div>

            <div className="user_message float-end ">
              {"I am the user , I have a One Query?"}
            </div>
          </div>
          <div className="input mx-2 mt-5 d-flex ">
            <input
              type="text"
              className="form-control my-3 fs-5"
              placeholder="Enter a message . . ."
            />
            <button
              className={`btn mt-2 mx-1 ${Appstyle.sendBtn}`}
              style={{
                borderRadius: "50px",
                width: "50px",
                height: "50px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="450 -960 960 960"
                width="50px"
                fill="green"
                style={{ cursor: "pointer" }}
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
const SWMSRoute = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <RootPath></RootPath>,
      children: [
        {
          path: "/homePage",
          element: <SWMSHomepage></SWMSHomepage>,
        },
        {
          path: "/signUp",
          element: <SignupPage></SignupPage>,
        },
        {
          path: "/map",
          element: <Map></Map>,
        },
        {
          path: "/camera",
          element: <Camera></Camera>,
        },
      ],
    },
  ]);
  return routes;
};
