import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [stars, setStars] = useState('');
  const [issues, setIssues] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/search/repositories?q=created:>2021-08-13&sort=stars&order=desc')
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }, []);

  const setData = ({ name, description, avatar_url, stargazers_count, open_issues_count, created_at }) => {
    setName(name);
    setDescription(description);
    setAvatar(avatar_url);
    setStars(stargazers_count);
    setIssues(open_issues_count);
    setTime(created_at);
  };




  return (
    <div className="App py-5" >
      <Card className="mx-auto" style={{ width: '55rem' }}>
        <Row>
          <Col xs={6}>
            <Card.Img src={avatar} />
          </Col>

            <Col xs={6}>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <h5>{description}</h5>
                <Row>
                  <Col xs={4}>
                    <Card.Footer>
                      Stars: {stars}
                    </Card.Footer>
                  </Col>

                  <Col xs={4}>
                    <Card.Footer>
                      Issues: {issues}
                    </Card.Footer>
                  </Col>

                  <Col xs={4}> 
                    <p> Submitted on {time} by {name} </p>
                  </Col>
                </Row>
              </Card.Body>
            </Col>

          </Row>
      </Card>
    </div>
  );
}

export default App;
