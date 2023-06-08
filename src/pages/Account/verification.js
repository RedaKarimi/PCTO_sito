import React, { useState, useEffect } from "react";
import Login from "./Login"
import { useSearchParams } from 'react-router-dom';
import Register from "./Register"
import "./Account.css";

import { Form, Button, Tooltip, Input, Radio, Layout, Space, Menu, Image, } from "antd";
import Background from "./img/club.avif";

const { Content } = Layout;

function Verification() {
  const [searchParams] = useSearchParams();
  const receivedValue = searchParams.get("email");
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ verificationCode }),
            });

            if (response.ok) {

            } else {
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    console.log(receivedValue)
    return (
        <Layout style={{ overflowY: "hidden", marginTop: 100, bottom: -10, marginBottom: -92 }}>
            <Content>
                <div style={{ overflowY: "hidden", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 880, pbottom: 1 }} className="bodyBackground">
                    <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", height:"50%", zIndex: 1, backgroundColor: "white", borderRadius: 10, boxShadow: "0 0 11px rgba(33,33,33,1)" }}>
                        <div>
                            <h1>recieved email={receivedValue}</h1>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default Verification;
