import React, { useEffect } from "react";
import Banner from "../components/main/Banner";
import Location from "../components/main/Location";
import MakePlan from "../components/main/MakePlan";
import Popular from "../components/main/Popular";

const MainPage = ({ history }) => {
  const token = localStorage.getItem("token")
  
  if (!token) { 
    history.push("/login")
  }
  return (
    <div>
      <Banner />
      <MakePlan/>
      <Popular />
      <Location />
    </div>
  );
};

export default MainPage;
