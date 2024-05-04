import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import TabNavbar from "../components/Navbar";

function Router() {
  return (
    <>
      <TabNavbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default Router;
