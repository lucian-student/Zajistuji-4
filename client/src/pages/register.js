import React, { Fragment, useContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setAccessToken } from '../utils/accessToken';
import { transport } from '../axios/cookieAxios';
import { AuthContext } from '../context/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ValidateUnneceserrySpaceUsage, ValidateTextInput } from '../utils/validators';
import '../responsiveCss/registerLoginCss.css';
import axios from 'axios';
import firebase from '../config/firebase';
/*
Stranka, co souzi pro registraci uzivatele
handleRegister zaregistruje uzivatele
*/
function Register() {
    let btnRef = useRef();
    const source = useRef(axios.CancelToken.source());
    const [loginErrors, setLoginErrors] = useState(null);
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel();
        }
    }, []);
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    const [valdiPassword, setValidPassword] = useState(true);
    const { register, handleSubmit, errors } = useForm();
    const { loginUser } = useContext(AuthContext);
    async function handleRegister(data) {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        const { email, password, username, confirmpassword } = data;
        if (password === confirmpassword) {
            setValidPassword(true);
            return await transport({
                method: 'post',
                data: { email, password, username },
                headers: { 'Content-Type': 'application/json' },
                cancelToken: source.current.token,
                url: '/users/register/'
            })
                .then(res => {
                    firebase.auth().signInWithCustomToken(res.data.firebaseToken)
                        .then(() => {
                            setAccessToken(res.data.accessToken);
                            loginUser();
                        })
                        .catch((error) => {
                            console.log(error.message)
                        });
                })
                .catch(err => {
                    if (err.response) {
                        setLoginErrors(err.response.data);
                    }
                    if (btnRef.current) {
                        btnRef.current.removeAttribute("disabled");
                    }
                    console.error(err.message)
                });
        } else {
            btnRef.current.removeAttribute("disabled");
            setValidPassword(false);
        }
    }
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <Form onSubmit={handleSubmit(handleRegister)}>
                        {loginErrors && (
                            <Form.Text className="helperText">{loginErrors}</Form.Text>
                        )}
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoComplete="on"
                                name='username'
                                type="text"
                                placeholder="Username"
                                ref={register({
                                    required: true,
                                    minLength: 3,
                                    validate: {
                                        positive: value => ValidateTextInput(String(value)),
                                        positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                    }
                                })} />
                            {errors.username && errors.username.type === "required" && (
                                <Form.Text className="helperText">Username is empty!</Form.Text >
                            )}
                            {errors.username && errors.username.type === "minLength" && (
                                <Form.Text className="helperText">Username has to be atleast 3 chars long!</Form.Text >
                            )}
                            {errors.username && errors.username.type === "positive" && (
                                <Form.Text className="helperText">Dont use space at start and end!</Form.Text >
                            )}
                            {errors.username && errors.username.type === "positive2" && (
                                <Form.Text className="helperText">Dont use more than one space in row!</Form.Text >
                            )}
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control autoComplete="on"
                                name='email'
                                type="email"
                                placeholder="Enter email"
                                ref={register({
                                    pattern: regEx,
                                    required: true
                                })} />
                            {errors.email && errors.email.type === "pattern" && (
                                <Form.Text className="helperText">Email has to be valid!</Form.Text>
                            )}
                            {errors.email && errors.email.type === "required" && (
                                <Form.Text className="helperText">Email is empty!</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control autoComplete="off"
                                name='password'
                                type="password"
                                placeholder="Password"
                                ref={register({
                                    required: true,
                                    minLength: 8,
                                    validate: {
                                        positive: value => ValidateTextInput(String(value)),
                                        positive2: value => ValidateUnneceserrySpaceUsage(String(value))
                                    }
                                })} />
                            {errors.password && errors.password.type === "required" && (
                                <Form.Text className="helperText">Password is empty!</Form.Text>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <Form.Text className="helperText">Password has to be atleast 8 chars long!</Form.Text>
                            )}
                            {errors.password && errors.password.type === "positive" && (
                                <Form.Text className="helperText">Dont use space at start and end!</Form.Text>
                            )}
                            {errors.password && errors.password.type === "positive2" && (
                                <Form.Text className="helperText">Dont use more than one space in row!</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control autoComplete="off"
                                name='confirmpassword'
                                type="password"
                                placeholder="Confirm Password"
                                ref={register({
                                    required: true,
                                    minLength: 8,
                                })} />
                            {errors.confirmpassword && errors.confirmpassword.type === "required" && (
                                <Form.Text className="helperText">Confirm Password is empty!</Form.Text>
                            )}
                            {errors.confirmpassword && errors.confirmpassword.type === "minLength" && (
                                <Form.Text className="helperText">Confirm Password has to be atleast 8 chars long!</Form.Text>
                            )}
                            {!valdiPassword && (
                                <Form.Text className="helperText">Password doesnt match!</Form.Text>
                            )}
                        </Form.Group>
                        <Button type='submit' ref={btnRef} onClick={() => { setLoginErrors(null) }}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;
