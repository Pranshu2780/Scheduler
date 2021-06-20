import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state={list:[]}
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(' http://127.0.0.1:8000/candidate',{

        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }

    }
    
    )
    .then(response =>response.json())
    .then(data=>{
        this.setState({list: data});
    })
  }

  handleSubmit(event){
    let a = event.target.StartTime.value
    let b = event.target.EndTime.value

    let timezone1 = a.split(" ")[1];
    let timezone2 = b.split(" ")[1];
    let st = parseInt(a.split(":")[0])*60*60 + parseInt(a.split(":")[1])*60 + parseInt(a.split(":")[2]);
    let et = parseInt(b.split(":")[0])*60*60 + parseInt(b.split(":")[1])*60 + parseInt(b.split(":")[2]);

    console.log(st,et)
    if(st>=et&&timezone1=="AM"&&timezone2=="AM" ||st>=et&&timezone1=="PM"&&timezone2=="PM" || timezone1=="PM"&&timezone2=="AM" ){
        alert("There is conflict between timing")
    }else{

    event.preventDefault();
    fetch(' http://127.0.0.1:8000/schedule',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            ScheduleId:null,
            ParticipantName:event.target.ParticipantName.value,
            JoiningDate:event.target.JoiningDate.value,
            StartTime:event.target.StartTime.value,
            EndTime:event.target.EndTime.value,
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
}

  render() {
    return (
      <div className="Container">
      
       {/* {this.state.list.length<2 ? alert('length is less than 2'):  */}

        <Modal  {...this.props}
          size="lg" aria-labelledby="contained-modal-title-vcenter" centered
       >
         

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Schedule
                </Modal.Title>
            </Modal.Header>
      
         
         <Modal.Body>
             <Row>
                 <Col sm={6}>
                     <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="ParticipantName">
                            <Form.Label>
                                 ParticipantName
                            </Form.Label>
                            <Form.Control as="select" > {this.state.list.map(lis=>
                                <option key={lis.CandidateId} >{lis.CandidateName} </option>
                                )}  </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="JoiningDate">
                            <Form.Label>
                                 JoiningDate
                            </Form.Label>
                            <Form.Control  type="date" name="JoiningDate" required placeholder="Date"  />
                        </Form.Group>

                        <Form.Group controlId="StartTime">
                            <Form.Label>
                                 StartTime
                            </Form.Label>
                            <Form.Control type="time" name="StartTime" required placeholder="StartTime" />
                        </Form.Group>

                        <Form.Group controlId="EndTime">
                            <Form.Label>
                                 EndTime
                            </Form.Label>
                            <Form.Control type="time" name="EndTime" required placeholder="EndTime" />
                        </Form.Group>

                        <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Schedule
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
    {/* } */}
      </div>
    );
  }
}
