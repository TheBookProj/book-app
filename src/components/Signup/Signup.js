import { Button, Form, Input, Typography, message } from 'antd';
import styles from '../../css/Signup.module.css'
import { app } from '../../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getUsersService } from '../../getServices/getUsersService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const { Title } = Typography;
    const navigate = useNavigate();

    const submitForm = async (values) => {
        const auth = getAuth(app)

        axios.put(`${getUsersService()}/users/add`, { username: values.username, email: values.email })
        .then((response) => {
            if(response.status == 200) {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    message.success("Successfully created your account.")
                    console.log(userCredential.user)
                    navigate('/')
                  })
                  .catch((error) => {
                    message.error("There was an error in creating your account.")
                    console.log(error);
                  });
            } else {
                message.error("There was an error in creating your account.")
            }
        })
        .catch((error) => {
            message.error("There was an error in creating your account.")
            console.log(error)
        })

    }

    return <div className={styles.page}>
        <Title>The Book Project</Title>
        <Title level={2}>Signup</Title>
        <Form onFinish={submitForm}>
            <Form.Item
                label="Username"
                name="username"
            >
                <Input />
            </Form.Item>
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
            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
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