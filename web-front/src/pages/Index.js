import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PredictModal from '../components/PredictModal';
import { init } from '../services/AI'

const Index = () => {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState(null)
  const [model, setModel] = useState(null)

  const onSelectFile = e => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setSrc(reader.result)
      setOpen(true)
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const onCancelClick = () => {
    setOpen(false)
    setSrc(null)
  }


  useEffect(() => {
    async function initMLmodel() {
      const loadedModel = await init()
      setModel(loadedModel)
    }
    initMLmodel();
  }, []);

  return (
    <div className="container page">
      <h1 className="title is-spaced animated fadeIn slow">What's that dog?</h1>
      <h2 className="subtitle is-spaced animated fadeIn slow">
        Did you run into some cool dog and you want now to find out which breed it was? Let this AI powered web application help you to find out. All you have to do is to load a picture of the dog.
      </h2>
      <div className="file is-boxed is-white animated fadeIn slow">
        <label className="file-label">
          <input className="file-input" type="file" name="dog" onChange={onSelectFile} />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon="upload" />
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
        </label >
      </div>
      {src && <PredictModal open={open} src={src} model={model} onCancelClick={onCancelClick} />}

    </div>
  );
};

export default Index;

