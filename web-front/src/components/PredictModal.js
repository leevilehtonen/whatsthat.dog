import React, { useState, useEffect } from "react"
import CropWindow from "./CropWindow"
import ResultWindow from "./ResultWindow"
import { preprocess, classify } from "../services/AI"



const PredictModal = ({ open, onCancelClick, src, model }) => {
    const [canvas, setCanvas] = useState(null)
    const [modalState, setModalState] = useState("CROP")
    const [predictResult, setPredictResult] = useState(null)


    const onPredictClick = async () => {
        setModalState("RESULT")
        const result = classify(model, preprocess(canvas));
        setPredictResult(result)

    }



    return (
        <div className={"modal animated " + (open ? "is-active fadeIn faster" : "fadeOut faster")}>
            <div className="modal-background" onClick={() => onCancelClick()}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Crop image</p>
                </header>
                <section className="modal-card-body">
                    {modalState === "CROP" && <CropWindow src={src} setCanvas={setCanvas} />}
                    {modalState === "RESULT" && <ResultWindow canvas={canvas} predictResult={predictResult} />}
                </section>
                <footer className="modal-card-foot">
                    <button className={"button is-inverted " + (model === null ? "is-loading" : "")} onClick={() => onPredictClick()}>Predict</button>
                    <button className="button is-danger" onClick={() => onCancelClick()}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default PredictModal;

