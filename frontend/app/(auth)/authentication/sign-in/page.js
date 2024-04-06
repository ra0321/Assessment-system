'use client'
import { useState } from 'react'

// import node module libraries
import { Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter  } from 'next/navigation'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {userLogin} from 'services/user';

const SignIn = () => {

  const [errorShow, setErrorShow] = useState(false);
  const router = useRouter()

  const onLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginResult = await userLogin(formData.get('email'), formData.get('password'));

    if (!loginResult || !loginResult.success) {
      setErrorShow(true);
    } else {
      localStorage.setItem('userId', loginResult.userId);
      localStorage.setItem('email', loginResult.email);
      localStorage.setItem('isAdmin', loginResult.isAdmin);

      if (loginResult.isAdmin)
        router.replace('/pages/user')
      else
        router.replace('/pages/score')
    }
  }

  const hasMounted = useMounted();
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted &&
              <Form onSubmit={onLogin} action={onLogin} >
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter address here" required />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="**************" required />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                {errorShow &&
                <div>
                  <Alert variant="danger" >Invalid email or password !</Alert>
                </div>
                }
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">Sign In</Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">Create An Account </Link>
                    </div>
                    <div>
                      <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                    </div>
                  </div>
                </div>
              </Form>}


          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}


export default SignIn