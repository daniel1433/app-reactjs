import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';


const Login: React.FC<any> = (props: any) => {
    return <div className="row align-items-center">
        <div className="col"></div>
        <div className="col">
            <Form>
                <h1 className="text-center mb-4 pb-3">Login</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="userName" onChange={props.handleChangeInput} value={props.state.userName} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={props.handleChangeInput} value={props.state.password} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="button" onClick={props.handleLogin}>
                    Login
                </Button>

                <Form.Group className="mt-2">
                    {props.state.showMessage ? (<Alert key={1} variant="danger">
                            {props.state.message}
                        </Alert>) : ""}    
                </Form.Group>                
            </Form>
        </div>
        <div className="col"></div>
    </div>;
}

export default Login;