import React, { useState,useRef, useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import Cock from "./img/Cockodrillo.svg"
import "./Account.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { Form, Button, Tooltip, Input, Radio, Layout, Space, Menu, Image, } from "antd";
import { UnlockOutlined } from "@ant-design/icons";

const { Content } = Layout;
function Verification() {
    
    let { state } = useLocation();
    const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0, { behavior: "smooth" });
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const toastId = useRef(null)

  let navigate = useNavigate();

    const handleVerify = () => {
        toastId.current = toast.loading("Verifying...")
        Axios.post('http://192.168.250.52:3000/verify', {
        email: state.email,
        verificationCode:verificationCode
      }
      ).then((response) => {
        console.log(response);
        navigate('/')
          toast.update(toastId.current, {
            render: "Email verification successful. Your account is now verified.",
            isLoading: false,
            autoClose: 2000,
            type: "success"
          });
          
      }).catch((error) => {
        if (error) {
          toast.update(toastId.current, {
            render: "Something went wrong",
            type: "error",
            autoClose: 2000,
            
            isLoading: false
          })
        
        if (error.response.status === 400) {
            toast.update(toastId.current, {
                render: "Incorrect verification code. Please try again.",
                isLoading: false,
                type: "error",
                autoClose: 2000
              });
          } 
        else if (error.response.status === 404) {
          toast.update(toastId.current, {
            render: "Server is not open",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        } else {
          toast.update(toastId.current, {
            render: "Registration Failed",
            type: "error",
            autoClose: 2000,
            isLoading: false
          })
        }
    }
      });
    };

    return (
        <Layout style={{ overflow: "hidden", marginTop: 100, bottom: -10, marginBottom: -92 }}>
            <Content>
                <div style={{ overflowY: "hidden", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 880, pbottom: 1 }} className="bodyBackground">
                    <div style={{ marginTop: "-15%", width: "30%", height: "50%", zIndex: 1, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 11px rgba(33,33,33,1)" }}>
                        <div class="insideVerification">
                            <img src={Cock} style={{ width: "20%", fill: "red", paddingTop: "3.5%" }} />
                            <p style={{ fontSize: "40px", justifySelf: "center", fontFamily: "Poppins, sans-serif", letterSpacing: "1px", fontWeight: "bolder" }}>Account Verification</p>
                            <p class="descrizioneVerifica">An email with you verification code has been sent to your email {state.email}<br /> <br />Copy the code and insert it here to proceed!</p>
                            <Form
                                name="normal_login"
                                className="pezzoInserimentoEmail"
                                initialValues={{
                                    remember: true,
                                }}
                            ><Space style={{marginLeft:62,marginTop:-26}} size={48} wrap>
                                <Form.Item
                                    name="verificationCode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your verification code!',
                                        },
                                        {
                                            min: 6,
                                            message: 'the verification code has 6 characters',
                                        },
                                    ]}
                                >
                                    <Input status={error} size="large" placeholder="Inserisci il codice di verifica" className="inserEmail" onChange={(e) => {setVerificationCode(e.target.value)}} prefix={<UnlockOutlined className="site-form-item-icon" />}/></Form.Item>
                                    {error=="error"? <div style={{fontColor:"red"}}>Something went wrong</div>:<></>}
                                    <Form.Item> <Button size="large" type="primary" onClick={handleVerify}> Submit</Button></Form.Item>
                                    </Space>
                                </Form>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default Verification;
