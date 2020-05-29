import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

const useFetch = () => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let tweets = [];
      try {
        const userToken = localStorage.getItem("user-token");
        const { data } = await fetch(
          `${process.env.REACT_APP_API}/user-tweets`,
          {
            method: "POST",
            body: JSON.stringify({ userToken }),
          }
        );
        if (data.ok) {
          tweets = data.data;
        } else {
          throw new Error("not OK");
        }
      } catch (error) {
        console.log({ error });
        tweets = [];
      }
      setTweets(tweets);
    }
    fetchData();
  }, []);
  return { tweets };
};

const TIME = {
  //"years": 31536000,
  months: 2592000,
  //"weeks": 604800,
  days: 86400,
  hours: 3600,
  minutes: 60,
  seconds: 1,
};
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const getDiffNow = (date) => {
  date = new Date(date);
  const now = new Date();
  if (date.getFullYear() < now.getFullYear()) {
    return (
      date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear()
    );
  } else {
    let diff = Math.abs(date.getTime() - now.getTime()) / 1000;
    if (diff > TIME.months) {
      return MONTHS[date.getMonth()] + " " + date.getDate();
    }
    if (diff > TIME.days) {
      return Math.floor(diff / TIME.days) + "d";
    } else if (diff > TIME.hours) {
      return Math.floor(diff / TIME.hours) + "h";
    } else {
      return Math.floor(diff / TIME.minutes) + "min";
    }
  }
};

export default (props) => {
  const { tweets } = useFetch();

  const getRichTweet = useCallback((text = "", entities) => {
    const components = [];
    let i = 0;
    let value = "";
    let urls = [];
    entities.hashtags.forEach(({ indices }) => {
      value = text.substring(i, indices[0]);
      urls = entities.urls.filter((f) => value.includes(f.url));
      value && components.push(value);
      /*.forEach(({ url, expanded_url, indices }) => {
        text = text.replace(url, expanded_url.startsWith("https://twitter.com/") ? "" : expanded_url)
      });*/
      components.push(<a href="#">{text.substring(indices[0], indices[1])}</a>);
      i = indices[1];
    });
    value = text.substring(i);
    value && components.push(value);
    return components;
  }, []);

  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Card bg="dark" text="white">
              <Card.Header className="card-user__header" />
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={props.profile_image_url.replace("_normal.png", ".png")}
                  className="card-user__img"
                />
                <Card.Title>
                  {props.name}
                  <br />
                  <Badge pill variant="primary" className="card-user__username">
                    {props.screen_name}
                  </Badge>
                </Card.Title>
                <hr style={{ background: "white" }} />
                <Card.Text>{props.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="">
                <small>{`Since: ${props.created_at}`}</small>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={8}>
            {tweets.map(
              ({ id, text, quoted_status, created_at, entities }, i) => {
                return (
                  <Row key={`row-${id}`} id={id}>
                    <Card text="dark" className="card-tweet">
                      <Card.Img
                        variant="top"
                        src={props.profile_image_url}
                        className="card-tweet__img"
                      />
                      <Card.Body className="card-tweet__body">
                        <Card.Title className="card-tweet__title">
                          <a href={`#${id}`}>@{props.screen_name}</a>
                          <small className="card-tweet__time">
                            {getDiffNow("2018-05-27T20:23:00")}
                          </small>
                        </Card.Title>
                        <Card.Text>
                          {getRichTweet(text, entities)}
                          {quoted_status && (
                            <Alert
                              as="span"
                              variant="secondary"
                              className="card-reetweet"
                            >
                              <b>
                                {" "}
                                {quoted_status.user.name}{" "}
                                <a>@{quoted_status.user.screen_name}</a>
                              </b>
                              <hr style={{ margin: ".5rem 0" }} />
                              {getRichTweet(
                                quoted_status.text,
                                quoted_status.entities
                              )}
                            </Alert>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Row>
                );
              }
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
