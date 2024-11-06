import * as React from "react";

const SnowFlakeComponent = (props) => (
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 390"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150"
        {...props}
      >
        <style>
          {
            '@keyframes pathAnim-0{0%,25%,50%,75%,to{d:path("M 0,400 L 0,150 C 205.71428571428572,192.85714285714286 822.8571428571429,171.42857142857144 1440,150 L 1440,400 L 0,400 Z")}}'
          }
        </style>
        <defs>
          <linearGradient id="gradient" x1="21%" y1="10%" x2="79%" y2="90%">
            <stop offset="5%" stopColor="#f8f8f8" />
            <stop offset="95%" stopColor="#abb8c3" />
          </linearGradient>
        </defs>
        <path
          d="M0 400V150c205.714 42.857 822.857 21.429 1440 0v250z"
          strokeWidth={0}
          fill="url(#gradient)"
          className="transition-all duration-300 ease-in-out delay-150"
          transform="rotate(-180 720 200)"
          style={{
            animation: "pathAnim-0 4s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        />
      </svg>
    );    
export default SnowFlakeComponent;
