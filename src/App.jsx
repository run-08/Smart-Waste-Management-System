import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import Appstyle from "./App.module.css";
import Map from "./GoogleMap/Map";
import SWMSHomepage from "./HomePage/SWMSHome";
import Camera from "./ImageUploadPanel/Camera";
import RootPath from "./RootSWMS/RootPath";
import SignupPage from "./Signup/singnUppage";
import userDetails from "./Signup/UserDetails";

const App = () => {
  const [conversationCount, setConversationCount] = useState(2);
  const [showChatMessage, setShowChatMessgae] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const { setIsAuthorized } = userDetails();

  const alerVisitedCount = () => {
    setIsAuthorized(true);
    const cnt = localStorage.getItem("visited");
    var visited = cnt === null || cnt === undefined ? 1 : parseInt(cnt);
    alert(`Thanking you for revisiting ${visited + 1} times `);
    console.log(` visited : ${visited + 1}`);
    localStorage.setItem("visited", visited + 1);
  };
  useEffect(() => {
    if (localStorage.getItem("date") - new Date().getDate() == 0) {
      alerVisitedCount();
    }
  }, []);

  const [messages, setMessages] = useState([
    { bot: "Hello , I am Your SWMS Bot , How can I assist You" },
  ]);
  const [userQuery, setUserQuery] = useState();
  const handleMessage = async () => {
    setMessages((message) => [...message, { user: userQuery }]);
    setUserQuery("");
    try {
      const msg = `${userQuery}`;
      const response = await fetch(
        "https://dialogflowchatbot-459118.el.r.appspot.com/APIservice/sendToDialogFlow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: msg }),
        }
      );
      const result = await response.text();
      setMessages((message) => [...message, { bot: result }]);
    } catch (e) {
      console.log("Error : " + e);
      setMessages((message) => [
        ...message,
        { bot: "Something went Wrong , please try Again" },
      ]);
    }
  };
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
          onClick={(e) => {
            setShowChatMessgae(() => {
              return showChatMessage ? false : true;
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="-100 -960 11100 960"
            width="294px"
            fill="green"
          >
            <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z" />
          </svg>
        </button>

        {showChatMessage && (
          <div
            className="chat-container float-end my-5"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: `${isFull ? "1900" : "600"}px`,
              border: "2px solid green",
              borderRadius: "10px",
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            <div
              className="chat-header text-center fst-italic fs-4 pt-3 fw-bold text-white bg-success"
              style={{
                borderRadius: "5px",
              }}
            >
              SWMS Chatbot
              <span>
                {!isFull ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className={`float-end mx-2 ${Appstyle.expand}`}
                    style={{
                      cursor: "pointer",
                    }}
                    fill="#e3e3e3"
                    onClick={() => {
                      setIsFull(!isFull);
                    }}
                  >
                    <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    className={`float-end mx-2 ${Appstyle.shrink}`}
                    fill="#e3e3e3"
                    onClick={() => setIsFull(!isFull)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z" />
                  </svg>
                )}
              </span>
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
              {Object.entries(messages)?.map(([key, message]) => {
                return Object.keys(message)[0] === "bot" ? (
                  <>
                    <div
                      className="bot_message float-start col-12 my-3 fs-4 fst-italic px-2 rounded-3 w-75"
                      style={{ backgroundColor: "#66c166", color: "white" }}
                    >
                      <p className=" px-3 my-3 ">{message.bot}</p>
                    </div>
                    <hr className="w-100 h-100 text-success " />
                  </>
                ) : (
                  <>
                    <div className="user_message float-end my-3 px-3 text-white bg-success rounded-3 w-75  fs-4">
                      <p className="float-end my-3">{message.user}</p>
                    </div>
                    <hr className="w-100 h-100 text-success  " />
                  </>
                );
              })}
            </div>
            <div className="input mx-2  d-flex ">
              <input
                type="text"
                className={`form-control my-3 fs-5 ${Appstyle.msgBox}`}
                placeholder="Enter a message . . ."
                value={userQuery}
                onChange={(e) => {
                  setUserQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleMessage();
                  }
                }}
              />
              <button
                className={`btn mx-1 my-3 ${Appstyle.sendBtn}`}
                style={{
                  borderRadius: "50px",
                  width: "50px",
                  height: "50px",
                }}
                onClick={handleMessage}
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
        )}
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
//
// billing permission
// Get a bucket storage instance as a storage object admin
// then need to generate a service account key
// and then need to download the json file
// and then need to set the env variable in the terminal
// export GOOGLE_APPLICATION_CREDENTIALS="/path-to-your-service-account-file.json"
