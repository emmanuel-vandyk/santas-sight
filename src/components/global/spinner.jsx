export default function SantaChristmasSpinner({
  size = 100,
  color = "#c41e3a",
}) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="animate-spin"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          className="opacity-25"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray="70 200"
          strokeLinecap="round"
          className="opacity-75"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" width="80%" height="80%">
          {/* Santa */}
          <g>
            {/* Body */}
            <circle cx="50" cy="60" r="25" fill={color} />

            {/* Face */}
            <circle cx="50" cy="40" r="20" fill="#FFE4B5" />

            {/* Eyes */}
            <circle cx="43" cy="35" r="3" fill="#000000" />
            <circle cx="57" cy="35" r="3" fill="#000000" />

            {/* Nose */}
            <circle cx="50" cy="42" r="5" fill="#FF6347">
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Beard */}
            <path d="M30 45 Q50 70 70 45" fill="white" />

            {/* Hat */}
            <path d="M30 30 Q50 10 70 30" fill={color} />
            <rect x="30" y="30" width="40" height="10" fill={color} />
            <circle cx="70" cy="30" r="5" fill="white">
              <animate
                attributeName="r"
                values="5;4;5"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Snowflakes */}
          {[...Array(5)].map((_, index) => (
            <circle
              key={index}
              cx={20 + index * 15}
              cy={15 + index * 15}
              r="2"
              fill="white"
            >
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur={`${1 + index * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
