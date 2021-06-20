import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import {Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg">
     <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
     
      <Nav>
    
        <NavLink className="d-inline p-2 bg-dark text-white" to="/"> Home </NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/Schedule"> Schedule an Interview</NavLink>
        <NavLink className="d-inline p-2 bg-dark text-white" to="/Candidate"> Candidate List </NavLink>
        </Nav>
         </Navbar.Collapse>
        </Navbar>
    
        )
  }
}
