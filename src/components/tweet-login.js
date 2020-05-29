import React, { useState, useEffect, useCallback } from "react";
import * as qs from "querystring";

const TweetLogin = ({ location, history }) => {
  const [error, setError] = useState();
  useEffect(() => {
    (async function init() {
      try {
        const { search } = location;
        const userToken = localStorage.getItem("user-token");
        const params = { ...getSearchParams(search), userToken };
        // console.log(params);
        const data = await fetch(`${process.env.REACT_APP_API}/twitter-user`, {
          method: "POST",
          body: params,
          headers: {
            "Content-Type": "application/json",
          },
        }).then((result) => result.json());
        if (data.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          history.push("/");
        } else {
          console.log(data.err);
          throw new Error("User not valid");
        }
      } catch (err) {
        this.setState({ err });
        console.log(err);
      }
    })();
  }, []);

  const getSearchParams = useCallback((search) => {
    return search[0] === "?" ? qs.parse(search.slice(1)) : qs.parse(search);
  }, []);

  return null;
};

export default TweetLogin;
