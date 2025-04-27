import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Map from "./GoogleMap/Map";
import SWMSHomepage from "./HomePage/SWMSHome";
import Camera from "./ImageUploadPanel/Camera";
import RootPath from "./RootSWMS/RootPath";
import SignupPage from "./Signup/singnUppage";
const App = () => {
  return (
    <>
      <div className={`container-fluid `}>
        <SWMSRoute></SWMSRoute>
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
