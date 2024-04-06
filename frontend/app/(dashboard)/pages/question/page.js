'use client'
// import node module libraries
import { useState, useEffect } from 'react'
import { Row, Col, Card, Button, ButtonGroup, Modal, Form, Table, Container } from 'react-bootstrap';
import Link from 'next/link';

// import widget as custom components
import { FormSelect } from 'widgets';
import { PageHeading } from 'widgets'

// import hooks
import useMounted from 'hooks/useMounted';

// import services
import {fetchAssessment} from 'services/assessment';
import {fetchSection} from 'services/section';
import {fetchQuestion, saveQuestion} from 'services/question';

const Question = () => {
  const hasMounted = useMounted();

  const [modalShowNew, setModalShowNew] = useState(false);
  const [modalShowDetail, setModalShowDetail] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selAssessmentId, setSelAssessmentId] = useState(0);
  const [selSectionId, setSelSectionId] = useState(0);
  const [selQuestion, setSelQuestion] = useState();

  const NewQuestionModal = (props) => {

    const [answers, setAnswers] = useState([]);
    const [sectionsPopup, setSectionsPopup] = useState([]);

    const onAddAnswer = () => {
      if (answers.length < 4) {
        setAnswers([...answers, {
          body : "",
          isCorrect : false
        }]);
      }
    }

    const onRemoveAnswer = (index) => {
      const tempArr = [...answers];
      tempArr.splice(index, 1);
      setAnswers(tempArr)
    }

    const onChangeAnswerBody = (value, index) => {
      const tempArr = [...answers];
      tempArr[index].body = value;
      setAnswers(tempArr);
    }

    const onChangeAnswerIsCorrect = (index) => {
      const tempArr = [...answers];
      tempArr[index].isCorrect = !tempArr[index].isCorrect;
      setAnswers(tempArr);
    }

    const onChangeAssessmentPopup = async (event) => {
      const resultSection = await fetchSection(event.target.value);
      setSectionsPopup(resultSection);
    }

    const onSaveQuestion = async (event) => {
      event.preventDefault();

      console.log(answers);

      const formData = new FormData(event.currentTarget);

      if (formData.get('assessmentId') == '') return;
      if (formData.get('sectionId') == '') return;

      const question = await saveQuestion({
        body : formData.get('body'),
        assessmentId : formData.get('assessmentId'),
        sectionId : formData.get('sectionId'),
        answer : answers.map((item) => item.body),
        correctAnswer : answers.map((item, index) => item.isCorrect ? index : -1).filter((item) => item != -1),
        isMultiple : answers.map((item, index) => item.isCorrect ? index : -1).filter((item) => item != -1).length > 1 ? true : false
      });

      if (question) {
        setQuestions([...questions, question]);
        setModalShowNew(false);
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
            <h4 className="mb-1" id="billingAddressModalLabel">New Question</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" onSubmit={onSaveQuestion} action={onSaveQuestion}>
          <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Assessment</Form.Label>
                <Form.Control as={FormSelect} placeholder="Select Assessment" options={assessments.map((assessment) => { return {label:assessment.title, value:assessment.id}})} onChange={onChangeAssessmentPopup} required name = "assessmentId" />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Section</Form.Label>
                <Form.Control as={FormSelect} placeholder="Select Section" options={sectionsPopup.map((section) => { return {label:section.title, value:section.id}})} required name = "sectionId" />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Question</Form.Label>
                <Form.Control type="textarea" placeholder="" name = "body" required />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Answer</Form.Label>
                <Table className="text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Answer</th>
                      <th scope="col">is correct</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasMounted && answers.length > 0 && answers.map((answer, idx) => (
                      <tr key={idx}>
                        <td><Form.Control type="textarea" placeholder="" required value = {answer.body} onChange = {(e) => onChangeAnswerBody(e.target.value, idx)} /></td>
                        <td><Form.Check type="checkbox" placeholder="" checked = {answer.isCorrect} onChange = {(e) => onChangeAnswerIsCorrect(idx)} /></td>
                        <td><Button variant="danger" onClick={() => onRemoveAnswer(idx)} >Delete</Button></td>
                      </tr>
                    ))}
                    <tr>
                      <th colspan = "3">
                        {answers.length < 4 &&
                          <Button variant="secondary" onClick={() => onAddAnswer()}>
                            Add new Answer
                          </Button>
                        }
                      </th>
                    </tr>                            
                  </tbody>
                </Table>                      
              </Form.Group>
            </Col>            
            <Col xs={12}>
              <Button type="submit" className="d-grid" >Save Question</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const DetailQuestionModal = (props) => {

    return (
      selQuestion && selQuestion.hasOwnProperty('id') &&
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4 className="mb-1" id="billingAddressModalLabel">Question Detail</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row" >
          <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Assessment</Form.Label>
                <Form.Control type="text" value = {assessments.find((item) => item.id == selQuestion.assessmentId).title} disabled />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="country">
                <Form.Label>Section</Form.Label>
                <Form.Control type="text" value = {sections.find((item) => item.id == selQuestion.sectionId).title} disabled />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Question</Form.Label>
                <Form.Control type="textarea" value = {selQuestion.body} required />
              </Form.Group>
            </Col>
            <Col xs={12} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Answer</Form.Label>
                <Table className="text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">Answer</th>
                      <th scope="col">is correct</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasMounted && selQuestion.answer.length > 0 && selQuestion.answer.map((answer, idx) => (
                      <tr key={idx}>
                        <td>{answer}</td>
                        <td>{selQuestion.correctAnswer.indexOf(idx) >= 0 && <Form.Check type="checkbox" checked = {selQuestion.correctAnswer.indexOf(idx) >= 0} disabled />}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>                      
              </Form.Group>
            </Col>            
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
      const resultAssessment = await fetchAssessment();
      setAssessments(resultAssessment);

      const resultSection = await fetchSection(0);
      setSections(resultSection);

      const resultQuestion = await fetchQuestion(0, 0);
      setQuestions(resultQuestion);
    };
  
    // Call the async function
    fetchData();
  }, []);

  useEffect(() => {
    // Define your async function
    const fetchData = async () => {
      const resultQuestion = await fetchQuestion(selAssessmentId, selSectionId);
      setQuestions(resultQuestion);
    };
  
    // Call the async function
    fetchData();
  }, [selAssessmentId, selSectionId]);  

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Questions" />

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
                            <th scope="col">Question</th>
                            <th scope="col">is multiple</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {questions.length > 0 && sections.length > 0 && questions.map((question, idx) => (
                            <tr key = {idx}>
                              <th scope="row">{idx + 1}</th>
                              <td>{assessments.find((item) => item.id == question.assessmentId).title}</td>
                              <td>{sections.find((item) => item.id == question.sectionId).title}</td>
                              <td><Link href = "#" onClick = {() => {setSelQuestion(question); setModalShowDetail(true);}}>{question.body}</Link></td>
                              <td>{question.isMultiple ? 'Yes' : 'No'}</td>
                              <td>{new Date(question.createdAt).toLocaleString('en-US')}</td>
                              <td>{new Date(question.updatedAt).toLocaleString('en-US')}</td>
                              <td>
                                <ButtonGroup aria-label="Basic mixed styles example"  size="sm" >
                                  <Button variant="success" >Edit</Button>
                                  <Button variant="danger"  >Delete</Button>
                                </ButtonGroup>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th colspan = "8">
                              <Button variant="primary"  onClick={() => setModalShowNew(true)}>
                                Add new Question
                              </Button>
                              <NewQuestionModal show={modalShowNew} onHide={() => setModalShowNew(false)} />
                              <DetailQuestionModal show={modalShowDetail} onHide={() => setModalShowDetail(false)} />
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

export default Question