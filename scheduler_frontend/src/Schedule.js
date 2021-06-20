import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {AddSchedule} from './AddSchedule'
import {EditSchedule} from './EditSchedule'

export class Schedule extends Component{
    
    constructor(props){
        super(props);
        this.state = {schd:[] ,addModalShow:false,editModalShow:false}
    }

    // refreshList(){
    //     fetch(process.env.REACT_APP_API + 'candidate',{

    //         headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //            }

    //     }
        
    //     )
    //     .then(response =>response.json())
    //     .then(data=>{
    //         this.setState({list: data});
    //     })    
    // }
    refreshList(){
        fetch(' http://127.0.0.1:8000/schedule',{

            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }

        }
        
        )
        .then(response =>response.json())
        .then(data=>{
            this.setState({schd: data});
        })    
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSchd(schdid){
        if(window.confirm('Are you sure?')){
            fetch('http://127.0.0.1:8000/schedule/'+schdid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {schd, schdid, schdname, schdjd, schdstarttime, schdendtime } = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow:false})
        return(
            <div > 
            {/* This is  Candidate list  page */}

            <Table className="mt-4" striped bordered hover size="sm">
               <thead>
               <tr>
                    <th> Id </th>
                    <th> Candidate  Name</th>
                    <th> Joining Date</th>

                    <th> Start Time</th>
                    <th> End Time</th>
                    <th>Options</th>
                </tr>
               </thead>
                
                <tbody>
                {schd.map(sch=>
                <tr key={sch.ScheduleId} >
                        <td> {sch.ScheduleId} </td>
                        <td> {sch.ParticipantName} </td>
                        <td> {sch.JoiningDate} </td>
                        <td> {sch.StartTime} </td>
                        <td> {sch.EndTime} </td>
                        <td> 

                        <ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        schdid:sch.ScheduleId,schdname:sch.ParticipantName,schdjd:sch.JoiningDate ,schdstarttime:sch.StartTime,schdendtime:sch.EndTime })}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSchd(sch.ScheduleId)}>
            Delete
        </Button>

        <EditSchedule show={this.state.editModalShow}
        onHide={editModalClose}
        schdid={schdid}
        schdname={schdname}
        schdjd={schdjd}
        schdstarttime={schdstarttime}
        schdendtime={schdendtime}
        />
</ButtonToolbar>

                      </td>
                </tr>
    
                )}
                </tbody>
            
                
                
            </Table>

 
            <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Schedule</Button>

                    <AddSchedule show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>

            </div>
        )
    }
}