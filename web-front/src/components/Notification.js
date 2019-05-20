import React from 'react';
import { Animated } from "react-animated-css";

const Notification = ({ text, type, visible, setVisible }) => {



    return (
        <Animated animationIn="fadeInUp" animationOut="fadeOut" animationInDuration={500} animationOutDuration={500} isVisible={visible} className="notification-container">
            <div className={"notification " + type}>
                <button className="delete" onClick={() => setVisible(false)}></button>
                <p className={"is-size-5 " + (type === "is-danger" ? "" : "has-text-black")}>{text}</p>
            </div>
        </Animated>
    )
}

export default Notification