import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../firebase/authContext";
import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Typography, Button } from 'antd';
import { getMiddlewareService } from "../../getServices/getMiddlewareService";
import styles from "../../css/UserDetails.module.css"

function UserDetails() {
    const { userId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ userDetails, setUserDetails ] = useState(null);
    const { user } = useAuth();

    const { Title } = Typography;

    useEffect(() => {
        const fetchUserData = () => {
            setLoading(true);
            user.getIdToken().then((tokenId) => {
                axios.get(`${getMiddlewareService()}/users/get/${userId}`, { headers: { Authorization: `Bearer ${tokenId}` }}).then((response) => {
                    if(response.status == 200) {
                        setUserDetails(response.data.user);
                        setLoading(false);
                    }
                });
            });
        };
        if (user) {
            fetchUserData();
        }
    }, [userId]);

    const handleChat = () => {
        console.log("Will provide soon!")
    }

    return <div className={styles.page}>
        <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
        />

        <Title className={styles.username} level={2}>
            {userDetails?.username}
            <Button className={styles.messageBtn} onClick={handleChat} title={`Chat with ${userDetails?.username}`} shape="circle" icon={<MessageOutlined />}></Button>
        </Title>
        
    </div>
}

export default UserDetails;