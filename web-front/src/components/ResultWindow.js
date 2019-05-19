import React, { useState, useRef, useEffect } from 'react'

const ResultWindow = ({ canvas, predictResult }) => {
    const canvasContainerRef = useRef(null)

    useEffect(() => {
        if (canvasContainerRef.current.hasChildNodes()) {
            canvasContainerRef.current.replaceChild(canvas, canvasContainerRef.current.firstChild);
        } else {
            canvasContainerRef.current.appendChild(canvas);
        }

    }, [canvas])

    // flex
    return (
        <div className="resultwindow">
            {!predictResult && <progress className="progress is-small is-dark" max="100"></progress>}
            <div className="columns is-gapless">
                <div className="column">
                    <div className="resultwindow-canvas" ref={canvasContainerRef} />
                </div>

                {predictResult &&
                    <div className="column">
                        {predictResult.slice(0, 5).map((item) => <p>{item.breed}: {item.prob}</p>)}
                    </div>}
            </div>
        </div>

    )
}

export default ResultWindow;