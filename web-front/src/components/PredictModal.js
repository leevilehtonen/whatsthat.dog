import React, { useState, useEffect } from "react"
import CropWindow from "./CropWindow"
import ResultWindow from "./ResultWindow"
import model from "../services/AI"



const PredictModal = ({ open, setOpen, src }) => {
    const [canvas, setCanvas] = useState(null)
    const [modalState, setModalState] = useState("CROP")




    return (
        <div className={"modal animated " + (open ? "is-active fadeIn faster" : "fadeOut faster")}>
            <div className="modal-background" onClick={() => setOpen(false)}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Crop image</p>
                </header>
                <section className="modal-card-body">
                    {modalState === "CROP" && <CropWindow src={src} setCanvas={setCanvas} />}
                    {modalState === "RESULT" && <ResultWindow canvas={canvas} />}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-inverted" onClick={() => setModalState("RESULT")}>Predict</button>
                    <button className="button is-danger" onClick={() => setOpen(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default PredictModal;

