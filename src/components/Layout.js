import React, { useState, useEffect, useMemo, useCallback } from "react";
import HeaderComponent from "./dump/Header";
import LandingComponent from "./dump/Landing";
import LoadingComponent from "./dump/Loading";
import ContentComponent from "./Content";

export default ({ history }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState({ open: false, text: "" });

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    } catch (err) {
      console.error("getUserData", err);
    }
  }, []);

  const handleStart = useCallback(async () => {
    try {
      setLoading({ open: true, text: "redirecting" });
      const data = await fetch(
        `${process.env.REACT_APP_API}/twitter-login`, {
          method: "GET",
        }
      ).then(result => result.json());
      localStorage.setItem("user-token", data.userToken);
      window.location = data.URLToken;
    } catch (error) {
      setLoading({ open: false, text: "There was an error, try later" });
      console.error("onGetStarted", error);
    }
  }, []);

  const handleLogoutUser = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-token");
    setUserData(null);
  }, []);

  const hasData = useMemo(() => !!userData, [userData]);

  return (
    <>
      <HeaderComponent
        title={hasData ? `Welcome ${userData.name}` : "Welcome to Tweet Viewer"}
        onLogout={hasData ? handleLogoutUser : null}
      />
      {hasData ? (
        <ContentComponent {...userData} />
      ) : (
        <>
          <LandingComponent onGetStarted={handleStart} />
          <LoadingComponent open={loading.open} text={loading.text} />
        </>
      )}
    </>
  );
};
