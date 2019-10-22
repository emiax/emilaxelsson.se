import React from 'react';

import {
  eLetter,
  aLetter,
  eLine
} from './ea-constants';


function scale(points, scale) {
  return points.map((p) => [scale[0] * p[0], scale[1] * p[1]]);
}

function translate(points, offset) {
 return points.map((p) => [offset[0] + p[0], offset[1] + p[1]]); 
}

function polylineString(pointArray) {
  return pointArray.map(p => p[0] + "," + p[1]).join(" ");
}

export default props => {
  const size = [35, -35];
  const offset = [6, 60];

  const eLinePoints = translate(scale(eLine, size), offset);
  const ePoints = polylineString(translate(scale(eLetter, size), offset));
  const aPoints = polylineString(translate(scale(aLetter, size), offset));
  return (
    <svg onClick={props.onClick || (() => {})} className="logo" version="1.1" id="Layer_1" x="0px" y="0px"
       width="64px" height="32px" viewBox="0 0 128 64" enableBackground="new 0 0 128 64" space="preserve">
    <g>
        <polyline fill="none"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points={ePoints}
        />
        <polyline fill="none"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points={aPoints}
        />
        
        <line fill="none"
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              x1={eLinePoints[0][0]}
              y1={eLinePoints[0][1]}
              x2={eLinePoints[1][0]}
              y2={eLinePoints[1][1]}
        />
    </g>
    </svg>);
}