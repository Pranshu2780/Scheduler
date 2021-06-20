import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {AddCandidate} from './AddCandidate'
import {EditCandidate} from './EditCandidate'

export class Candidate extends Component{
    
    constructor(props){
        super(props);
        this.state = {list:[] ,addModalShow:false,editModalShow:false}
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

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCan(canid){
        if(window.confirm('Are you sure?')){
            fetch('http://127.0.0.1:8000/candidate/'+canid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
        console.log(canid)
    }

    render(){

        const {list, canid, canmail, canname,canresume } = this.state;
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
                    <th> Candidate  Email</th>
                    {/* <th> Candidate  Resume</th> */}
                    <th>Options</th>
                </tr>
               </thead>
                
                <tbody>
                {list.map(lis=>
                <tr key={lis.CandidateId} >
                        <td> {lis.CandidateId} </td>
                        <td> {lis.CandidateName} </td>
                        
                        <td> {lis.CandidateEmail} </td>
                        {/* <td> {lis.Resume} </td> */}
                        <td> 

                        <ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        canid:lis.CandidateId,canname:lis.CandidateName,canmail:lis.CandidateEmail })}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCan(lis.CandidateId)}>
            Delete
            
        </Button>

        <EditCandidate show={this.state.editModalShow}
        onHide={editModalClose}
        canid={canid}
        canname={canname}
        canmail={canmail}
        // canresume={canresume}
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
                    Add Candidate</Button>

                    <AddCandidate show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>

            </div>
        )
    }
}