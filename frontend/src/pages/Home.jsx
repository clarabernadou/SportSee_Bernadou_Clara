import React, { useEffect, useState } from "react";
import "./home.css"

import NavLeft from "../componants/navigationSection/navLeft/NavLeft";
import NavTop from "../componants/navigationSection/navTop/NavTop"
import Header from "../componants/dashboardSection/header/Header";
import WeightChart from "../componants/dashboardSection/graphic/weightChart/WeightChart";
import ObjectivesChart from "../componants/dashboardSection/graphic/objectivesChart/ObjectivesChart";

export default function Home() {
  const [userData, setUserData] = useState(null); // Define a state variable named 'userData' and initialize it to 'null'
  const [userActivity, setUserActivity] = useState(null);
  const [userAverageSessions, setUserAverageSessions] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/18');
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/18/activity');
        const data = await response.json();
        setUserActivity(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserActivity();
  }, []);

  useEffect(() => {
    const fetchAverageSessionsData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/18/average-sessions');
        const data = await response.json();
        setUserAverageSessions(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAverageSessionsData();
  }, []);
  
  console.log(userAverageSessions);
  
  return (
    <>
      <NavTop />
      <div className="bodyContainer">
        <NavLeft />
        <div className="dashboardContent">
          <Header userData={userData?.userInfos} /> {/* Pass the user data to the 'Header' component as a prop & Use the safety operator to avoid errors */}
          <WeightChart userActivity={userActivity?.sessions} />
          <ObjectivesChart userAverageSessions={userAverageSessions?.sessions} />
        </div>
      </div>

    </>
  );
}