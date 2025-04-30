import { Button, Form, Input, Typography } from 'antd';
import styles from '../../css/Signup.module.css'

function Signup() {

    const { Title } = Typography;

    return <div className={styles.page}>
        <Title>The Book Project</Title>
        <Title level={2}>Signup</Title>
        <Form>
            <Form.Item
                label="Username"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="Email"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="confirm password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default Signup;