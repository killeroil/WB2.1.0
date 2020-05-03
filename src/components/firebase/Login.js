import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "./base.js";
import { AuthContext } from "./Auth.js";
import baruch from '../images/baruchlogo.png';
import {Button,Container,Row,Col,ButtonGroup,Dropdown} from 'react-bootstrap';
import{Link} from 'react-router-dom';
import bearcats from '../images/Bearcats.png';



const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="HomeBG">
        <center><img src={baruch} width="200px" className="startpageicon" alt="baruch logo"/></center>
        <Container>
            <Row>
                <Col md={6}>
                <div>
                    <strong><h2>Please Log in</h2></strong>
                    <hr/>
                    <form onSubmit={handleLogin}>
                        <label className="expand">
                        <strong>Email</strong><br/>
                        <input name="email" type="email" placeholder="Email" />
                        </label>
                        <label className="expand">
                        <strong>Password</strong> <br/>
                        <input name="password" type="password" placeholder="Password" />
                        </label>
                        <br/>
                        <ButtonGroup vertical>
                        <Dropdown as={ButtonGroup} >
                        <Button size="md" variant="primary" type="submit"><strong>Login</strong></Button>
                        <Dropdown.Toggle split variant="primary" className="loginbtn" id="dropdown-split-basic"/>
                        <Dropdown.Menu>
                          <Dropdown.Item componentClass={Link} href="/P_login" to="/">Login as Professor</Dropdown.Item>
                          {/*<Dropdown.Item componentClass={Link} href="/SignUp" to="/">Login as Administrator</Dropdown.Item>*/}
                        </Dropdown.Menu>
                        </Dropdown>
                        
                        {/*<Button size='sm' variant="info" className="expand" componentClass={Link} href="/signup" to="/"><strong>Register</strong></Button>*/}
                        </ButtonGroup>
                    </form>
                    </div>
                
                </Col>
                <Col md={6}>
                <img src={bearcats} width="100%" alt="bearcats" className="startpageicon"/>
                <h3><strong>Welcome To <a href="https://www.baruch.cuny.edu" target="_blank" alt="Baruch Homepage Website">Baruch</a></strong></h3>
                </Col>
            </Row>

        </Container>
        </div>
  );
};

export default withRouter(Login);
