import React from 'react';
import { Form, Nav, Navbar } from 'react-bootstrap';
import NavBarCtr from './navbarCtr';
import logo from '../../assets/img/logo.png'
import { Link } from "react-router-dom";

const NavBar: React.FC<NavBarCtr> = (props: NavBarCtr) => {
    return (<Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
      MASSEQ
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {/* <Nav.Link href="#">Cliente</Nav.Link> */}
                <Link to="/client" className="nav-link">Cliente</Link>
            </Nav>
            <Form inline>
                {props.props.state.isLogged ? (<Link to="#"> <i onClick={props.props.changeStateSession} className="fas fa-sign-out-alt"></i></Link>) : (<Link to="/login" className="nav-link"><i className="fas fa-sign-in-alt"></i></Link>)}


            </Form>
        </Navbar.Collapse>
    </Navbar>);
}

export default NavBar;