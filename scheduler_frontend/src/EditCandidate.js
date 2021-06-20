import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditCandidate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    fetch(' http://127.0.0.1:8000/candidate',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            CandidateId:event.target.CandidateId.value,
            CandidateName:event.target.CandidateName.value,
            CandidateEmail:event.target.CandidateEmail.value,
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
    },
    (error)=>{
        alert('Failed');
    })
}

  render() {
    return (
      <div className="Container">
      
        <Modal  {...this.props}
          size="lg" aria-labelledby="contained-modal-title-vcenter" centered
       >
         

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Candidate
                </Modal.Title>
            </Modal.Header>
      
         
         <Modal.Body>
             <Row>
                 <Col sm={6}>
                     <Form onSubmit={this.handleSubmit}>
                        
                     <Form.Group controlId="CandidateId">
                            <Form.Label>
                                 CandidateId
                            </Form.Label>
                            <Form.Control type="text" name="CandidateId" required placeholder="CandidateId" 
                            defaultValue = {this.props.canid} disabled
                            />
                        </Form.Group>


                        <Form.Group controlId="CandidateName">
                            <Form.Label>
                                 CandidateName
                            </Form.Label>
                            <Form.Control type="text" name="CandidateName" required placeholder="CandidateName"
                            defaultValue = {this.props.canname}
                            />
                        </Form.Group>

                        <Form.Group controlId="CandidateEmail">
                            <Form.Label>
                                 CandidateEmail
                            </Form.Label>
                            <Form.Control type="text" name="CandidateEmail" required placeholder="CandidateEmail"
                            defaultValue = {this.props.canmail}
                            />
                        </Form.Group>


                        <Form.Group>
                        <Button variant="primary" type="submit">
                            Edit Candidate
                        </Button>
                    </Form.Group>

                     </Form>
                 </Col>
             </Row>
         </Modal.Body>

         <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>
    
        {/* <button>Add Candidate</button>

        <form onSubmit={this.handleSubmit}>
          <label>Candidate Name</label>
          <input type="text" required placeholder="Enter CandidateName" />
          <label>Candidate Email</label>
        </form>

        <button type="submit">Submit</button>

        <button onClick={this.props.onHide}>Close</button> */}
        </Modal>
      </div>
    );
  }
}
