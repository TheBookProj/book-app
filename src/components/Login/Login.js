import { Button, Form, Input, Typography, message } from 'antd';
import styles from '../../css/Login.module.css'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const { Title } = Typography;
    const navigate = useNavigate();

    const submitForm = async (values) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            console.log(userCredential.user);
            navigate('/home')
        })
        .catch((error) => {
            console.log(error.message)
            message.error("There was an issue with logging you in.");
        });
    }

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