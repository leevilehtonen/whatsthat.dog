import React, { useState, useEffect } from "react"
import { Animated } from "react-animated-css";
import CropWindow from "./CropWindow"
import ResultWindow from "./ResultWindow"
import { preprocess, classify } from "../services/AI"



const PredictModal = ({ open, onCancelClick, src, model }) => {
    const [canvas, setCanvas] = useState(null)
    const [modalState, setModalState] = useState("CROP")
    const [predictResult, setPredictResult] = useState(null)


    const onPredictClick = async () => {
        setModalState("RESULT")
        async function classifyData() {
            const result = classify(model, preprocess(canvas));
            setPredictResult(result)
        }
        classifyData();
    }

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={open}>
            <div className={"modal animated is-active"}>
                <div className="modal-background" onClick={() => onCancelClick()}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{modalState === "CROP" ? "Crop image" : "Prediction results"}</p>
                    </header>
                    <section className="modal-card-body">
                        {modalState === "CROP" && <CropWindow src={src} setCanvas={setCanvas} />}
                        {modalState === "RESULT" && <ResultWindow canvas={canvas} predictResult={predictResult} />}
                    </section>
                    <footer className="modal-card-foot">
                        {modalState === "CROP" && <button className={"button is-inverted " + (model === null ? "is-loading" : "")} onClick={() => onPredictClick()}>Predict</button>}
                        <button className="button is-primary" onClick={() => onCancelClick()}>{modalState === "CROP" ? "Cancel" : "Finish"}</button>
                    </footer>
                </div>
            </div>
        </Animated>

    )
}

export default PredictModal;

