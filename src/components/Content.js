import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

export default (props) => {
  return (
    <div className="main-container">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <Card bg="dark" text="white" style={{ width: '100%' }} >
              <Card.Header className="card-user__header" />
              <Card.Body>
                <Card.Img variant="top" src={props.profile_image_url.replace("_normal.png", ".png")} className="card-user__img" />
                <Card.Title>{props.name}<br />
                  <Badge pill variant="primary" className="card-user__username">{props.screen_name}</Badge>
                </Card.Title>
                <hr style={{ background: "white" }} />
                <Card.Text>{props.description}</Card.Text>
              </Card.Body>
              <Card.Footer className=""><small>{`Since: ${props.created_at}`}</small></Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={8} >
          </Col>
        </Row>
      </Container>
    </div>
  )
}