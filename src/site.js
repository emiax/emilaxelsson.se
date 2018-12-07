import React, { Component } from 'react';
import './site.css';

class Site extends Component {
  render() {
    return (
      <div>
        <header>
          <svg className="logo" version="1.1" id="Layer_1" x="0px" y="0px"
             width="64px" height="32px" viewBox="0 0 128 64" enableBackground="new 0 0 128 64" space="preserve">
          <g>
              <polyline fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
              66.351,38.341 38.655,58.463 10.959,38.341 21.538,5.782 55.772,5.782   "/>
              <polyline fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
              73.034,58.463 62.455,25.904 90.151,5.782 117.847,25.904 107.268,58.463  "/>
              <line fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="10.959" y1="38.341" x2="38.655" y2="29.698"/>
          </g>
          </svg>
        </header>
        <div className="container">
          <h1>Hi, I'm Emil.</h1>

          <p className="ingress">
            I like science, computer graphics, interaction design, open source, playing and recording music,
            interacting with people, art, elegant algorithms and software architecture.
          </p>
          <p>
            Luckily, almost all of those things are part of my role as a Research Engineer at Linköping University
            where I'm developing visualization software for immersive environments.
            I'm devoting most of my time to the open source software <a href="http://openspaceproject.com">OpenSpace</a>, designed
            to visualize the known universe.
          </p>
          <footer>
            <ul>
              <li><a href="https://liu.se/en/employee/emiax61"><i className="fas fa-briefcase"></i>Linköping University</a></li>
              <li><a href="https://github.com/emiax"><i className="fab fa-github"></i>GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/emiax"><i className="fab fa-linkedin"></i>LinkedIn</a></li>
              <li><a href="mailto:mail@emilaxelsson.se"><i className="fas fa-envelope"></i>mail@emilaxelsson.se</a></li>
              <li><a href="https://www.youtube.com/user/EmilAxelsson"><i className="fab fa-youtube"></i>YouTube</a></li>
              <li><a href="https://scholar.google.se/citations?user=wnSeyRsAAAAJ"><i className="fab fa-google"></i>Google Scholar</a></li>
            </ul>
          </footer>
        </div>
      </div>
    );
  }
}

export default Site;
