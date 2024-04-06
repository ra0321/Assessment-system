'use client'
// import node module libraries
import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup, Modal, Form, Table, Container } from 'react-bootstrap';

// import widget as custom components
import { FormSelect } from 'widgets';
import { PageHeading } from 'widgets'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {fetchAssessment} from 'services/assessment';
import {fetchSection, saveSection} from 'services/section';

const Section = () => {
  const hasMounted = useMounted();

  const [modalShow, setModalShow] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [sections, setSections] = useState([]);

  const NewSectionModal = (props) => {

    const onSaveSection = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      if (formData.get('assessmentId') == '') return;

      const section = await saveSection({
        title : formData.get('title'),
        assessmentId : formData.get('assessmentId')
      });

      if (section) {
        setSections([...sections, section]);
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
            <h4 className="mb-1" id="billingAddressModalLabel">New Section</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={onSaveSection} action={onSaveSection}>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Assessment</Form.Label>
                <Form.Control as={FormSelect} placeholder="Select Assessment" options={assessments.map((assessment) => { return {label:assessment.title, value:assessment.id}})} required name = "assessmentId" />                              
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Section title</Form.Label>
                <Form.Control type="text" placeholder="" required name="title"/>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button type="submit" className="d-grid" >Save Section</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const onChangeAssessment = async (event) => {
    const resultSection = await fetchSection(event.target.value);
    setSections(resultSection);
  }

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      // Perform async operations here
      const resultAssessment = await fetchAssessment();
      setAssessments(resultAssessment);

      const resultSection = await fetchSection(0);
      setSections(resultSection);
    };
  
    // Call the async function
    fetchData();
  }, []);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Sections" />

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
                            <th>
                              <Form.Control as={FormSelect} placeholder="Select Assessment" options={assessments.map((assessment) => { return {label:assessment.title, value:assessment.id}})} onChange = {onChangeAssessment} />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sections.map((section, idx) => (
                            <tr>
                              <th scope="row">{idx + 1}</th>
                              <td>{assessments.find((item) => item.id == section.assessmentId).title}</td>
                              <td>{section.title}</td>
                              <td>{new Date(section.createdAt).toLocaleString('en-US')}</td>
                              <td>{new Date(section.updatedAt).toLocaleString('en-US')}</td>
                              <td>
                                <ButtonGroup aria-label="Basic mixed styles example"  size="sm" >
                                  <Button variant="success" >Edit</Button>
                                  <Button variant="danger"  >Delete</Button>
                                </ButtonGroup>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th colspan = "6">
                              <Button variant="primary"  onClick={() => setModalShow(true)}>
                                Add new Section
                              </Button>
                              <NewSectionModal show={modalShow} onHide={() => setModalShow(false)} />
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

export default Section