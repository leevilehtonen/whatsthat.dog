import React, { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";
import { Animated } from "react-animated-css";

const ResultWindow = ({ canvas, predictResult }) => {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    if (canvasContainerRef.current.hasChildNodes()) {
      canvasContainerRef.current.replaceChild(
        canvas,
        canvasContainerRef.current.firstChild
      );
    } else {
      canvasContainerRef.current.appendChild(canvas);
    }
  }, [canvas]);

  // flex
  return (
    <div className="resultwindow">
      {!predictResult && (
        <progress className="progress is-small is-dark" max="100" />
      )}
      <div className="columns is-gapless is-mobile">
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInDuration={500}
          className="column"
        >
          <div className="resultwindow-canvas" ref={canvasContainerRef} />
        </Animated>

        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOutLeft"
          isVisible={predictResult ? true : false}
          animationInDuration={500}
          className="column"
        >
          <ResponsiveContainer width={canvas.width} height="100%">
            <BarChart
              data={predictResult.slice(0, 5)}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
            >
              <YAxis dataKey="Breed" type="category" />
              <XAxis type="number">
                <Label
                  value="Probability"
                  offset={-10}
                  position="insideBottom"
                />
              </XAxis>
              <Tooltip />
              <Bar dataKey="Probability" stroke="#2f0010" fill="#8a5060" />
            </BarChart>
          </ResponsiveContainer>
        </Animated>
      </div>
    </div>
  );
};

export default ResultWindow;

/*
<ResponsiveContainer width={canvas.width} height="100%">
                    <BarChart data={predictResult.slice(0, 5)}>
                        <XAxis dataKey="breed" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="prob" fill="#8884d8" label={{ position: 'top' }} />
                    </BarChart>
                </ResponsiveContainer>
{predictResult &&
    <div className="column">
        {predictResult.slice(0, 5).map((item) => <p>{item.breed}: {item.prob}</p>)}
    </div>}

    */
