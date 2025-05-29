import { useEffect, useState } from 'react';
import { MailOutlined, ProfileOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from '../../css/NavBar.module.css'
import { useAuth } from "../../firebase/authContext";

function NavBar({requestedLogOut}) {
    const [collapsed, setCollapsed] = useState(true);
    const [visible, isVisible] = useState(false);
    const { user } = useAuth();
    
    useEffect(() => {
        isVisible(user !== null)
    }, [user]);

    const handleSettings = () => {
        console.log("clicked")
    }

    const handleMessages = () => {
        console.log("clicked")
    }

    const handleLogout = () => {
        requestedLogOut();
    }
    const handleHome = () => {
        console.log("clicked")
    }

    const items = [
        {
            key: '1',
            label: 'Home',
            icon: <HomeOutlined />,
            onClick: handleHome
        },
        {
            key: '2',
            label: 'Settings',
            icon: <ProfileOutlined />,
            onClick: handleSettings
        },
        {
            key: '3',
            label: 'Messages',
            icon: <MailOutlined />,
            onClick: handleMessages
        },
        {
            key: '4',
            label: 'Log Out',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    const handleOnMouseOverEvent = () => {
        if(collapsed) {
            setCollapsed(false);
        }
    };

    const handleOnMouseLeaveEvent = () => {
        if(!collapsed) {
            setCollapsed(true);
        }
    };

    return (visible &&
        <div className={styles.container}>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                onMouseOver={handleOnMouseOverEvent}
                onMouseLeave={handleOnMouseLeaveEvent}
            />
        </div>
    );
}

export default NavBar;