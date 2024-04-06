'use client'
import { useState } from 'react'

// import node module libraries
import { Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter  } from 'next/navigation'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {saveUser} from 'services/user';

const SignUp = () => {
  const hasMounted = useMounted();
  const [errorShow, setErrorShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const router = useRouter()

  const onSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    if (formData.get('password') != formData.get('confirm-password')) return;

    const user = await saveUser({
      email : formData.get('email'),
      password : formData.get('password')
    });

    if (user) {
      setSuccessShow(true);

      setTimeout(() => {
        router.replace('/authentication/sign-in');
      }, 5000);
    } else {
      setErrorShow(true);
    }
  }

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
            <Form className="row" onSubmit={onSignUp} action={onSignUp}>

              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter address here" required />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="**************" required />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirm-password" placeholder="**************" required />
              </Form.Group>

              {/* Checkbox */}
              <div className="mb-3">
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input type="checkbox" required />
                  <Form.Check.Label>
                    I agree to the <Link href="#"> Terms of Service </Link> and <Link href="#"> Privacy Policy.</Link>
                  </Form.Check.Label>
                </Form.Check>
              </div>
              {errorShow &&
              <div>
                <Alert variant="danger" >Problem in server side</Alert>
              </div>
              }
              {successShow &&
              <div>
                <Alert variant="success" >Congratulations, you can sign in to system</Alert>
              </div>
              }              
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">Create Free Account</Button>
                </div>
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">Already member? Login </Link>
                  </div>
                  <div>
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                  </div>
                </div>
              </div>
            </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default SignUp