'use client'
// import node module libraries
import { useState } from 'react'
import { Row, Col, Card, Button, Form, Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import hooks
import useMounted from 'hooks/useMounted';

const Login = () => {
  const hasMounted = useMounted();

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Login" />

      <Row className="mt-6">
        <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }} md={12} xs={12}>
          <Row>
            <Col xs={12} className="mb-6">
              <Card>
                <Card.Body>
                  <div>
                    <div className="mb-6">
                      <h4 className="mb-1">Please fill login information</h4>
                    </div>
                    {hasMounted && 
                    <Form>
                      {/* row */}
                      <Row className="mb-3">
                        <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="email">Email</Form.Label>
                        <Col md={8} xs={12}>
                          <Form.Control type="email" placeholder="Email" id="email" required />
                        </Col>
                      </Row>
                      {/* Password */}
                      <Row className="align-items-center">
                        <Form.Label className="col-sm-4" htmlFor="password">Password</Form.Label>

                        <Col md={8} xs={12}>
                          <Form.Control type="password" placeholder="Enter Password" id="password" required />
                        </Col>

                        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </Col>

                      </Row>
                    </Form>
                    }
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Login