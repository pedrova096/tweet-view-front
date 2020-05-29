import React, { useEffect } from "react";
import LoadingComponent from "./dump/Loading";
import * as qs from "querystring";
import { LANDING } from "../routes";

export default ({ history, location }) => {
  useEffect(() => {
    (async function getTwitterUser() {
      try {
        const getSearchParams = (search) =>
          search[0] === "?" ? qs.parse(search.slice(1)) : qs.parse(search);
        const params = getSearchParams(location.search);
        const userToken = localStorage.getItem("user-token");
        const paramsReq = { ...params, userToken };
        const data = await fetch(`${process.env.REACT_APP_API}/twitter-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paramsReq),
        }).then((result) => result.json());
        if (data.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.log(data.err);
          throw new Error("User not valid");
        }
        history.push(LANDING);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <LoadingComponent open text="Getting user" />;
};
