import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Animated } from "react-animated-css";
import loadImage from "blueimp-load-image";
import PredictModal from "../components/PredictModal";
import { init } from "../services/AI";
import Notification from "../components/Notification";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const [model, setModel] = useState(null);
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    type: "is-white"
  });

  const initMLmodel = async () => {
    if (model === null) {
      try {
        setNotification({
          visible: true,
          text:
            "Initializing AI model in background. First time might take time.",
          type: "is-white"
        });
        await new Promise((res, rej) => setTimeout(() => res(), 500));
        const loadedModel = await init();
        setNotification({ visible: false });
        setModel(loadedModel);
        setTimeout(
          () =>
            setNotification({
              visible: true,
              text: "AI model was successfully loaded.",
              type: "is-success"
            }),
          500
        );
        setTimeout(() => setNotification({ visible: false }), 3000);
      } catch (error) {
        setNotification({
          visible: true,
          text:
            "Error fetching model from server. Try clearing cache and hard reloading the website. Please also check that your connection is up and running.",
          type: "is-danger"
        });
      }
    }
  };

  const onSelectFile = async e => {
    const loadCanvas = event =>
      new Promise((res, rej) => {
        loadImage(event.target.files[0], img => res(img), {
          orientation: true
        });
        event.target.value = "";
      });
    const createUrl = canvas =>
      new Promise((res, rej) => {
        canvas.toBlob(blob => {
          res(URL.createObjectURL(blob));
        }, "image/jpeg");
      });

    const canvas = await loadCanvas(e);
    const src = await createUrl(canvas);

    setSrc(src);
    setOpen(true);
  };

  const onCancelClick = () => {
    setOpen(false);
    setSrc(null);
  };

  return (
    <div className="container page">
      <Animated animationIn="fadeIn">
        <h1 className="title is-spaced">What's that dog?</h1>
        <h2 className="subtitle is-spaced is-4">
          Did you run into some cool dog and you want now to find out which
          breed it was? Let this AI powered web application help you to find
          out. All you have to do is load a picture of the cool dog and the AI
          will do the rest.
        </h2>
        <div className="file is-boxed is-white">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="dog"
              onChange={onSelectFile}
              onClick={() => initMLmodel()}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FontAwesomeIcon icon="upload" />
              </span>
              <span className="file-label is-size-4">
                Choose an image file...
              </span>
            </span>
          </label>
        </div>
      </Animated>
      {src && (
        <PredictModal
          open={open}
          src={src}
          model={model}
          onCancelClick={onCancelClick}
          setNotification={setNotification}
        />
      )}
      {notification.visible && (
        <Notification
          text={notification.text}
          type={notification.type}
          visible={notification.visible}
          setVisible={() => setNotification({ visible: false })}
        />
      )}
    </div>
  );
};

export default Index;
