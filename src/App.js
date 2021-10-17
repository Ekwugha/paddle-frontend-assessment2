import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1)

  const fetchRepo = () => {
    fetch(`https://api.github.com/search/repositories?q=created:>2021-08-13&sort=stars&order=desc&page=${page}`)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }

  useEffect(() => {
    fetchRepo()
  }, [page]);

  useEffect(() => {
    console.log(data)
  }, [data])


  return (
    <div className="App" >
    <h1 className="text-center my-5 bg-light"> GitHub Repo's With The Highest Stars </h1>
    <Button onClick={() => setPage(2)}> Next Page </Button>
    {data?.items?.map(item => (
      <Card className="mx-auto" style={{ width: '40rem' }}>
        <Row>
          <Col xs={3}>
            <Card.Img className="m-5" alt={item.name} src={item.owner.avatar_url} />
          </Col>

            <Col xs={9}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <p>{item.description}</p>
                <Row>
                  <Col  md={4}>
                    <Card.Footer>
                      Stars: {item.stargazers_count}
                    </Card.Footer>
                  </Col>

                  <Col  md={4}>
                    <Card.Footer>
                      Issues: {item.open_issues_count}
                    </Card.Footer>
                  </Col>

                  <Col  md={4}> 
                    <p> Submitted on {item.created_at.substring(0,10)} by {item.name} </p>
                  </Col>
                </Row>
              </Card.Body>
            </Col>

          </Row>
      </Card>
    ))}
      
    </div>
  );
}

export default App;
