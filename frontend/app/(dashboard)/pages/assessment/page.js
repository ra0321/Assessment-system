'use client'
// import node module libraries
import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup, Modal, Form, Table, Container } from 'react-bootstrap';

// import widget as custom components
import { PageHeading } from 'widgets'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {fetchAssessment, saveAssessment} from 'services/assessment';

const Assessment = () => {
  const hasMounted = useMounted();

  const [modalShow, setModalShow] = useState(false);
  const [assessments, setAssessments] = useState([]);

  const NewAssessmentModal = (props) => {
    const onSaveAssessment = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      
      const assessment = await saveAssessment({
        title : formData.get('title')
      });

      if (assessment) {
        setAssessments([...assessments, assessment]);
        setModalShow(false);
      } else {
      }
    }
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="mb-1" id="billingAddressModalLabel">New Assessment</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={onSaveAssessment} action={onSaveAssessment}>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Assessment title</Form.Label>
                <Form.Control type="text" placeholder="" required name="title" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit" className="d-grid" >Save Assessment</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      // Perform async operations here
      const result = await fetchAssessment();
      setAssessments(result);
    };
  
    // Call the async function
    fetchData();
  }, []);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Assessments" />

      <Row className="mt-6">
        <Col xl={12} lg={12} md={12} xs={12}>
          <Row>
            <Col xs={12} className="mb-6">
              <Card>
                <Card.Body>
                  <div>
                    <div className="mb-6">
                      <h4 className="mb-1"></h4>
                    </div>
                    {hasMounted && 
                      <Table className="text-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessments.map((assessment, idx) => (
                            <tr key = {idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{assessment.title}</td>
                              <td>{new Date(assessment.createdAt).toLocaleString('en-US')}</td>
                              <td>{new Date(assessment.updatedAt).toLocaleString('en-US')}</td>
                              <td>
                                <ButtonGroup aria-label="Basic mixed styles example"  size="sm" >
                                  <Button variant="success" >Edit</Button>
                                  <Button variant="danger"  >Delete</Button>
                                </ButtonGroup>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th colSpan = "5">
                              <Button variant="primary"  onClick={() => setModalShow(true)}>
                                Add new Assessment
                              </Button>
                              <NewAssessmentModal show={modalShow} onHide={() => setModalShow(false)} />
                            </th>
                          </tr>                            
                        </tbody>
                      </Table>                    
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

export default Assessment