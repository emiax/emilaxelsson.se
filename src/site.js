import React, { useState, useEffect } from 'react';
import './site.css';

import WebGLComponent from './webglComponent';
import Logo from './artwork/logo';

const useBrowserDimensions = () => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const update = () => {
    setWidth(window.outerWidth);
    setHeight(window.outerHeight);
  };
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
  });
  return [width, height];
};

let coordinatesLocation = undefined;
let patternIntensityLocation = undefined;
let timeLocation = undefined;

const initializeGraphics = (gl, vertexShaderSource, fragmentShaderSource) => {
  const vertices = [
    -1, -1,
    1, -1,
    -1, 1,
    1, -1,
    -1, 1,
    1, 1,
  ];

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  console.log('Vertex Shader info:', gl.getShaderInfoLog(vertexShader) || 'OK');
  console.log('Fragment Shader info:', gl.getShaderInfoLog(fragmentShader) || 'OK');
  console.log('Shader Program info:', gl.getProgramInfoLog(shaderProgram) || 'OK');

  gl.useProgram(shaderProgram);

  coordinatesLocation = gl.getAttribLocation(shaderProgram, "coordinates");
  timeLocation = gl.getUniformLocation(shaderProgram, "time");
  patternIntensityLocation = gl.getUniformLocation(shaderProgram, "patternIntensity");

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(coordinatesLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coordinatesLocation);
}

let t = 2.0;
let targetT = 2.0;
const nudge = () => {
  targetT = Math.max(t, targetT) + 3.14;
  function f() {
    t = t * 0.95 + targetT * 0.05;
    if (targetT - t > 0.1) {
      requestAnimationFrame(f);
    }
  };
  f();
}

let patternIntensity = 0.0;

const renderGraphics = (gl, browserDimensions) => {
  if (patternIntensity < 1.0) {
    patternIntensity += 0.01;
  }

  gl.viewport(0, 0, browserDimensions[0], browserDimensions[1]);
  gl.enableVertexAttribArray(coordinatesLocation);
  gl.uniform1f(timeLocation, t += 0.005);
  gl.uniform1f(patternIntensityLocation, patternIntensity);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
  gl.disableVertexAttribArray(coordinatesLocation);
}

const Pattern = props => {
  const [vertexShader, setVertexShader] = useState();
  const [fragmentShader, setFragmentShader] = useState();
  const browserDimensions = useBrowserDimensions();

  useEffect(() => {
    // Get shaders.
    (async () => {
      const promises = [fetch('./logovertex.glsl'), fetch('./logofragment.glsl')];
      const shaders = await Promise.all(promises);
      const [vertexShaderSource, fragmentShaderSource] =
        await Promise.all(shaders.map(shader => shader.text()));
      setVertexShader(vertexShaderSource);
      setFragmentShader(fragmentShaderSource);
    })();
  });

  if (vertexShader && fragmentShader) {
    const render = gl => renderGraphics(gl, browserDimensions);
    const initialize = gl => initializeGraphics(gl, vertexShader, fragmentShader);

    return <WebGLComponent
      size={browserDimensions}
      className="background"
      initialize={initialize}
      render={render} />  
  } else {
    // Still loading shaders.
    return null;
  }
}

const Site = props =>
  <div>
      <Pattern/>
      <div className="overlay">
        <div className="wrapper">
          <Logo onClick={nudge}/>
          <h1>Hello, I'm Emil. </h1>
          <p>
            I like science, computer graphics, interaction design, open source, music,
            algorithms, software architecture and teamwork.
          </p>
          <ul>
            <li><a href="https://github.com/emiax"><i className="fab fa-github"></i>GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/emiax"><i className="fab fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="https://facebook.com/nils.emil.axelsson"><i className="fab fa-facebook"></i>Facebook</a></li>
            <li><a href="mailto:mail@emilaxelsson.se"><i className="fas fa-envelope"></i>mail@emilaxelsson.se</a></li>
            {<li><a href="https://www.youtube.com/user/EmilAxelsson"><i className="fab fa-youtube"></i>YouTube</a></li>}
            <li><a href="https://scholar.google.se/citations?user=wnSeyRsAAAAJ"><i className="fab fa-google"></i>Google Scholar</a></li>
          </ul>
        </div>
      </div>
  </div>

export default Site;
