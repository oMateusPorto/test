import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextType } from '../contexts/userContext';

export default function NavBar() {

    const { user } = useContext(UserContext) as UserContextType

    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate('/')
      };

    return (
        <Navbar bg="light" expand="sm">
            <Container>
                <Navbar.Brand >Manutenção de Aeronaves</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto ">
                        <NavDropdown align='end' title={user?.login} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
} 