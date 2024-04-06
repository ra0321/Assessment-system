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
import {fetchUser} from 'services/user';
import {fetchScore} from 'services/score';

const Score = () => {
  const hasMounted = useMounted();

  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [sections, setSections] = useState([]);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [selAssessmentId, setSelAssessmentId] = useState(0);
  const [selSectionId, setSelSectionId] = useState(0);
  const [selUserId, setSelUserId] = useState(0);
  const [selScore, setSelScore] = useState({});

  const DetailScoreModal = (props) => {

    let showQuestions = [];
    
    if (selScore.hasOwnProperty('id'))
    showQuestions = questions.filter((item) => selScore.answer.map((p) => p.questionId).indexOf(item.id) >= 0);

    return (
      showQuestions.length > 0 && sections.length > 0 &&
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
          <Form className="row" >
          <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>Assessment :</b> {assessments.find((item) => item.id == selScore.assessmentId).title} </Form.Label>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>Section :</b> {sections.find((item) => item.id == selScore.sectionId).title}</Form.Label>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>User :</b> {users.find((item) => item.id == selScore.userId).email}</Form.Label>
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label><b>Score :</b> {selScore.totalScore}</Form.Label>
              </Form.Group>
            </Col>
              {hasMounted && showQuestions.length > 0 && showQuestions.map((question, index) => (
                <Row key = {index}>
                  <Col xs={12} className="mb-3">
                    <Form.Group controlId="title">
                      <Form.Control type="textarea" value = {question.body} disabled />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="mb-3">
                    <Form.Group controlId="title">
                      <Table className="text-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Answer</th>
                            <th scope="col">Correct</th>
                            <th scope="col">user selection</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hasMounted && question.answer.length > 0 && question.answer.map((answer, idx) => (
                            <tr key={idx}>
                              <td>{answer}</td>
                              <td>{question.correctAnswer.indexOf(idx) >= 0 && <Form.Check type="checkbox" checked = {question.correctAnswer.indexOf(idx) >= 0} disabled />}</td>
                              <td>
                                {selScore.answer.filter((item) => item.questionId == question.id)[0].answer.indexOf(idx) >= 0 &&
                                  <Form.Check type="radio" checked disabled />
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>                      
                    </Form.Group>
                  </Col>
                </Row>
            ))}            
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const onChangeAssessment = async (event) => {
    setSelSectionId(0);
    setSelAssessmentId(event.target.value);

    const resultSection = await fetchSection(event.target.value);
    setSections(resultSection);
  }

  const onChangeSection = async (event) => {
    setSelSectionId(event.target.value);
  }

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      // Perform async operations here
      const resultUser = await fetchUser();
      setUsers(resultUser);

      const resultAssessment = await fetchAssessment();
      setAssessments(resultAssessment);

      const resultSection = await fetchSection(0);
      setSections(resultSection);

      const resultScore = await fetchScore(0, 0);
      setScores(resultScore);
    };
  
    // Call the async function
    fetchData();
  }, []);

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      const resultScore = await fetchScore(selAssessmentId, selSectionId);
      setScores(resultScore);

      const resultQuestion = await fetchQuestion(selAssessmentId, selSectionId);
      setQuestions(resultQuestion);
    };
  
    // Call the async function
    fetchData();
  }, [selAssessmentId, selSectionId]);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Scores" />

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
                              <Form.Control as={FormSelect} placeholder="Select Section" options={sections.map((section) => { return {label:section.title, value:section.id}})} onChange={onChangeSection} />
                            </th>
                            <th>
                              <Form.Control as={FormSelect} placeholder="Select User" options={users.map((user) => { return {label:user.email, value:user.id}})} onChange={(e) => {setSelUserId(e.target.value)}} />
                            </th>
                            <th scope="col">Score</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {scores.length > 0 && sections.length > 0 && scores.map((score, idx) => (
                            (selUserId == 0 || selUserId == '' || selUserId == score.userId) &&
                            <tr key = {idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{assessments.find((item) => item.id == score.assessmentId).title}</td>
                              <td>{sections.find((item) => item.id == score.sectionId).title}</td>
                              <td>{users.find((item) => item.id == score.userId).email}</td>
                              <td>{score.totalScore}</td>
                              <td>{new Date(score.createdAt).toLocaleString('en-US')}</td>
                              <td>
                                <ButtonGroup aria-label="Basic mixed styles example"  size="sm" >
                                  <Button variant="success" onClick = {() => { setSelScore(score); setModalShowDetail(true);}} >Detail</Button>
                                  <Button variant="danger" >Delete</Button>
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

export default Score