import { Button, Form, Input, Typography, message } from 'antd';
import styles from '../../../css/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { getMiddlewareService } from '../../../getServices/getMiddlewareService';
import { useEffect, useState } from "react"
import { useAuth } from "../../../firebase/authContext";
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState(false);
    const { Title } = Typography;
    const { user } = useAuth();
    const navigate = useNavigate();

    const submitForm = async (values) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            setEmail(values.email);
        })
        .catch((error) => {
            console.log(error.message)
            message.error("There was an issue with logging you in.");
        });
    }

    useEffect(() => {
        if(email && user) {
            user.getIdToken().then((tokenId) => {
                axios.get(`${getMiddlewareService()}/users/login?email=${email}`, { headers: { Authorization: `Bearer ${tokenId}`} }).then((response) => {
                    if(response.status == 200) {
                        //setToken(response.data.token);
                        Cookies.set('username', response.data.username, { expires: 7 }); // expires in a week
                        Cookies.set('email', email, { expires: 7 }); // expires in a week
                        Cookies.set('id', response.data.id, { expires: 7 }); // expires in a week
                        navigate('/home');
                    } else {
                        // should sign user out too
                        message.error("There was an issue with logging you in.")
                    }
                });
            });
        }

    }, [email, user]);

    return <div className={styles.page}>
        <Title>The Book Project</Title>
        <Title level={2}>Login</Title>
        <Form onFinish={submitForm}>
            <Form.Item
                label="Email"
                name="email"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
                <Button onClick={() => navigate('/sign-up')}>
                    Don't have an account yet? Sign up here!
                </Button>
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default Login;