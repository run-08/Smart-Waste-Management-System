import { useState } from "react";
import AuthenticationVerify from "../AuthenticationZustand";
import DashboardStyles from "../Dashboard/dashboard.module.css";
import DayInfo from "../DayDetails/DayInfo";
import DayMonth from "../DayDetails/ZustandDayMonth";
const Dashboard = () => {
  let startMonth = 0;
  const month = [
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
  const { setDay, setMonth, display, setDisplay } = DayMonth();
  const { isAuthenticated } = AuthenticationVerify();
  const [monthNumber, setMonthNumber] = useState({
    0: 31,
    1: new Date().getFullYear() % 4 != 0 ? 28 : 29,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
  });
  const generateBoxes = () => {
    let boxes = [];
    const no_of_boxes = window.innerWidth < 1400 ? 1 : 5;
    for (let i = 0; i < no_of_boxes; i++) {
      boxes.push(
        <div className="single_box col-2 me-3">
          <div
            className={`${DashboardStyles.box} bg-secondary row`}
            style={{
              height: "390px",
              width: "370px",
              borderRadius: "10px",
              padding: "10px",
              margin: "20px",
            }}
          >
            <h1 className="text-center text-white my-1">{month[startMonth]}</h1>
            {generateInnerBoxes()}
          </div>
        </div>
      );
    }
    return boxes;
  };
  const ChangeStartMonth = () => {
    setStartMonth(startMonth + 1);
    if (startMonth >= 12) setStartMonth(0);
  };
  const generateInnerBoxes = () => {
    let InnerBoxes = [];
    for (let i = 0; i < monthNumber[startMonth]; i++) {
      InnerBoxes.push(
        <div className="col-2 mt-2">
          <button
            value={startMonth}
            className="btn btn-info fw-bold "
            onClick={(e) => {
              setDay(i + 1), setMonth(e.target.value);
              setDisplay("block");
            }}
          >
            {i + 1}
          </button>
        </div>
      );
    }
    startMonth++;
    return InnerBoxes;
  };
  const [selectedMonth, setSelectedMonth] = useState("Select Specific Month");
  return (
    <div className={`row mt-5`}>
      <div
        className="month_bars"
        style={{
          opacity: display == "block" ? 0.2 : 1,
          transition: "all 1.5s ease-in-out",
        }}
      >
        <div className={`month_dropdown dropdown offset-9`}>
          <button
            className="btn dropdown-toggle-split dropdown-toggle px-5 w-75 fw-bold"
            data-bs-toggle="dropdown"
            onMouseMove={(e) => {
              (e.target.style.backgroundColor = "#bbb"),
                (e.target.style.color = "white");
            }}
            onMouseLeave={(e) => {
              (e.target.style.backgroundColor = "black"),
                (e.target.style.color = "white");
            }}
          >
            {selectedMonth}
          </button>
          <ul className="dropdown-menu  bg-dark px-5 mx-4 ">
            {month.map((month, key) => {
              return (
                <li key={key} className="mx-5 my-1">
                  <a
                    href="#"
                    className="dropdown-item text-white fw-bold"
                    onMouseMove={(e) => {
                      (e.target.style.backgroundColor = "transparent"),
                        (e.target.style.color = "white");
                      e.target.style.transform = "scale(1.1) ";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1) ";
                    }}
                    onClick={(e) => {
                      setSelectedMonth(month);
                      startMonth = key;
                      generateBoxes();
                    }}
                    style={{ transition: "all 0.2s ease-in-out" }}
                  >
                    {month}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="bars mt-5">
            <div className="bar row"></div>
          </div>
        </div>
        <div className="bars mt-5 h-auto ">
          <div className="row mt-5  d-flex justify-content-around align-items-center ">
            {generateBoxes()}
          </div>
        </div>
      </div>
      <DayInfo className={`${DashboardStyles.Dayinfo}`}></DayInfo>
      <div className="today_details"></div>
      <div className="past_details"></div>
    </div>
  );
};
export default Dashboard;
