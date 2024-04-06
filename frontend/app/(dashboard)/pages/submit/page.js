'use client'
// import node module libraries
import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup, Modal, Form, Table, Container, Badge  } from 'react-bootstrap';

// import widget as custom components
import { FormSelect } from 'widgets';
import { PageHeading } from 'widgets'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {fetchAssessment} from 'services/assessment';
import {fetchSection} from 'services/section';
import {fetchQuestion} from 'services/question';
import {saveScore} from 'services/score';

const Submit = () => {
  const hasMounted = useMounted();

  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selAssessmentId, setSelAssessmentId] = useState(0);
  const [selSection, setSelSection] = useState({});

  const DetailScoreModal = (props) => {

    const onSubmitScore = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      let totalScore = 0;

      const score = await saveScore({
        assessmentId : selSection.assessmentId,
        sectionId : selSection.id,
        userId : localStorage.getItem('userId'),
        answer : questions.map((question) => {
          const answer = question.answer.map((item, idx) => {
            return formData.get(question.id + '-' + idx) ? idx : -1
          }).filter((item) => item >= 0);

          if (JSON.stringify(question.correctAnswer) === JSON.stringify(answer)) totalScore ++;
          return {
            questionId : question.id,
            answer : answer,
          }
        }),
        totalScore : totalScore
      });

      if (score) {
        setModalShowDetail(false);
      } else {
      }
    }

    return (
      selSection.hasOwnProperty('id') &&
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="mb-1" id="billingAddressModalLabel">Score Detail</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={onSubmitScore} action={onSubmitScore} >
          <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>Assessment :</b> {assessments.find((item) => item.id == selSection.assessmentId).title} </Form.Label>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>Section :</b> {selSection.title}</Form.Label>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>User :</b> {localStorage.getItem('email')}</Form.Label>
              </Form.Group>
            </Col>
              {hasMounted && questions.length > 0 && questions.map((question, index) => (
                <Row key = {index}>
                  <Col xs={12} className="mb-3">
                    <Form.Group controlId="title">
                      <Form.Control type="textarea" value = {question.body} disabled />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="mb-3">
                    <Form.Group controlId="title">
                      <Table className="text-nowrap">
                        <tbody>
                          {hasMounted && question.answer.length > 0 && question.answer.map((answer, idx) => (
                            <tr key={idx}>
                              <td>
                                <Form.Check type="checkbox" name = {question.id + '-' + idx} />
                              </td>
                              <td>{answer}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>                      
                    </Form.Group>
                  </Col>
                </Row>
            ))}
            {
              hasMounted && questions.length == 0 &&
              <Col xs={12} className="mb-3">
                <Form.Group controlId="country">
                <Form.Control type="textarea" value = "No question" disabled />
                </Form.Group>
              </Col>              
            }
            <Col xs={12}>
              {hasMounted && questions.length > 0 && <Button type="submit" className="d-grid" >Submit Answer</Button> }
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const onChangeAssessment = async (event) => {
    setSelAssessmentId(event.target.value);

    const resultSection = await fetchSection(event.target.value);
    setSections(resultSection);
  }

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {

      const resultAssessment = await fetchAssessment();
      setAssessments(resultAssessment);

      const resultSection = await fetchSection(0);
      setSections(resultSection);
    };
  
    // Call the async function
    fetchData();
  }, []);

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      const resultQuestion = await fetchQuestion(0, selSection.id);
      setQuestions(resultQuestion);
    };
  
    // Call the async function
    fetchData();
  }, [selSection]);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Test Sections" />

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
                              <Form.Control as={FormSelect} placeholder="Select Assessment" options={assessments.map((assessment) => { return {label:assessment.title, value:assessment.id}})} onChange={onChangeAssessment} value = {selAssessmentId} />
                            </th>
                            <th>
                              Section
                            </th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sections.length > 0 && sections.map((section, idx) => (
                            <tr key = {idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{assessments.find((item) => item.id == section.assessmentId).title}</td>
                              <td>{section.title}</td>
                              <td>{new Date(section.createdAt).toLocaleString('en-US')}</td>
                              <td>
                                <ButtonGroup aria-label="Basic mixed styles example"  size="sm" >
                                  <Button variant="success" onClick = {() => { setSelSection(section); setModalShowDetail(true);}} >Test</Button>
                                </ButtonGroup>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    }
                    <DetailScoreModal show={modalShowDetail} onHide={() => setModalShowDetail(false)} />
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

export default Submit