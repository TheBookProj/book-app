import { Modal, message } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function LogOut({ clicked, onCancel }) {
    const navigate = useNavigate();
    const [visible, isVisible] = useState(clicked);

    useEffect(() => {
        if(clicked) {
            isVisible(true);
        }
    }, [clicked])

    const handleOk = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            isVisible(false);
            navigate('/');
        }).catch((error) => {
            message.error("We encountered an error in logging you out.")
        })
    }

    const handleCancel = () => {
        isVisible(false);
        onCancel();
    }

    return (
        <Modal
            title="Log Out"
            closable={{ 'aria-label': 'Close Button' }}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default LogOut;