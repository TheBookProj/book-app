import { Button, Form, Input, Typography } from 'antd';
import styles from '../../css/Login.module.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const { Title } = Typography;
    const navigate = useNavigate();

    return <div className={styles.page}>
        <Title>The Book Project</Title>
        <Title level={2}>Login</Title>
        <Form>
            <Form.Item
                label="Username"
                name="username"
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