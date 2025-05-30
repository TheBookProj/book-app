import { Modal, message } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function LogOut({ clicked, removeLogOutRequest }) {
    const navigate = useNavigate();
    const [visible, isVisible] = useState(clicked);

    useEffect(() => {
        if(clicked) {
            isVisible(true);
        } else {
            isVisible(false);
        }
    }, [clicked])

    const handleOk = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            isVisible(false);
            removeLogOutRequest();
            navigate('/');
        }).catch((error) => {
            message.error("We encountered an error in logging you out.")
        })
    }

    const handleCancel = () => {
        isVisible(false);
        removeLogOutRequest();
    }

    return (
        <Modal
            title="Log Out"
            closable={{ 'aria-label': 'Close Button' }}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Are you sure you'd like to log out?</p>
        </Modal>
    )
}

export default LogOut;