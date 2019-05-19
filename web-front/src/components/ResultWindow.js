import React, { useState, useRef, useEffect } from 'react'

const ResultWindow = ({ canvas }) => {
    const canvasContainerRef = useRef(null)

    useEffect(() => {
        console.log(canvas)
        if (canvasContainerRef.current.hasChildNodes()) {
            canvasContainerRef.current.replaceChild(canvas, canvasContainerRef.current.firstChild);
        } else {
            canvasContainerRef.current.appendChild(canvas);
        }

    }, [canvas])

    // flex
    return (
        <div className="resultwindow">
            <div className="columns is-gapless">
                <div className="column">
                    <div className="resultwindow-canvas" ref={canvasContainerRef} />
                </div>
                <div className="column">
                    Second column fepo pioewjoif jiewojmo fnjueown iufhjniu
                </div>
            </div>
        </div>

    )
}

export default ResultWindow;