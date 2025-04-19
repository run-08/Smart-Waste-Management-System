import { useState } from "react";
import DayInfoStyles from "../DayDetails/DayInfo.module.css";
import DayMonth from "./ZustandDayMonth";
const DayInfo = () => {
  const { day, month, display, setDisplay } = DayMonth();

  const [binsCollected, setBinsCollected] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [publicInfo, setPublicInfo] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [binsNotCollected, setBinsNotCollected] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [binsTakenByMunicipalities, setBinsTakenByMunicipalities] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const Month = [
    "January",
    "Feburary",
    "March",
    "Aprail",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className={`${DayInfoStyles.body} container }`}>
      <div
        className="row daily_info_panel "
        style={{ marginLeft: window.innerWidth < 500 ? "0px" : "700px" }}
      >
        <div
          className={`card  col-md-5  bg-dark text-white ${
            display == "none" ? "d-none" : "d-block"
          } `}
        >
          <div className="card_body ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
              cursor="pointer"
              className="float-end"
              style={{ position: "relative" }}
              onClick={() => {
                setDisplay("none");
              }}
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
            <div className="card-title  text-center d-inline">
              <h5 className="h5 px-5 py-4">Day : {day}</h5>{" "}
              <h5 className="h5">Month : {Month[month]}</h5>
            </div>
            <div className="card_text mt-5  bg-white">
              <h1 className="h5 text-success py-3  px-4">
                Total no of bins Collected : {" " + binsCollected}
              </h1>
              <h1 className="h5 text-info py-3 px-4">
                Information gained from public :{" " + publicInfo}
              </h1>
              <h1 className="h5 text-danger py-3  px-4">
                Total no of bins not Collected : {" " + binsNotCollected}
              </h1>
              <h1 className="h5 text-warning py-3  px-4">
                Bins taken by municipalities Members:
                {" " + binsTakenByMunicipalities}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DayInfo;
