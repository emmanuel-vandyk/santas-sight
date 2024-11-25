export const ChristmasTree = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L3 20h18L12 2z" />
    <path d="M12 6l-3 6h6l-3 6" />
    <line x1="12" y1="20" x2="12" y2="22" />
  </svg>
);

export const Reindeer = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    <path d="M12 6v2" />
    <path d="M12 16v2" />
    <path d="M6 12h2" />
    <path d="M16 12h2" />
    <path d="M8 8l1.5 1.5" />
    <path d="M14.5 14.5L16 16" />
    <path d="M8 16l1.5-1.5" />
    <path d="M14.5 9.5L16 8" />
  </svg>
);

export const ChristmasElf = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M12 14v8" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

export const ChristmasSnowflake = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M4.93 4.93l14.14 14.14" />
    <path d="M4.93 19.07l14.14-14.14" />
  </svg>
);

export const ChristmasLogout = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
  </svg>
);

export const ChristmasSantaSleight = (props) => (
  <img
    src="src/assets/santasleigh.png"
    alt="Santa's Sleigh"
    className="w-64"
    {...props}
  />
);

export const ChristmasSanta = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    fill="none"
    {...props}
  >
    {/* Tree trunk */}
    <rect x="45" y="100" width="10" height="20" fill="#8B4513" />

    {/* Tree layers */}
    <path d="M50 10 L80 50 H20 Z" fill="#228B22" />
    <path d="M50 30 L85 80 H15 Z" fill="#228B22" />
    <path d="M50 50 L90 110 H10 Z" fill="#228B22" />

    {/* Star */}
    <path
      d="M50 0 L53 9 L62 9 L55 14 L58 23 L50 18 L42 23 L45 14 L38 9 L47 9 Z"
      fill="#FFD700"
    />

    {/* Ornaments */}
    <circle cx="35" cy="45" r="3" fill="#FF0000" />
    <circle cx="65" cy="45" r="3" fill="#0000FF" />
    <circle cx="50" cy="60" r="3" fill="#FF69B4" />
    <circle cx="30" cy="75" r="3" fill="#FFD700" />
    <circle cx="70" cy="75" r="3" fill="#FF4500" />
    <circle cx="45" cy="90" r="3" fill="#00CED1" />
    <circle cx="55" cy="90" r="3" fill="#FF1493" />

    {/* Garland */}
    <path
      d="M30 40 Q50 30 70 40"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M25 65 Q50 55 75 65"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M20 90 Q50 80 80 90"
      stroke="#FFD700"
      strokeWidth="2"
      fill="none"
    />

    {/* Snow */}
    {[...Array(20)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 100}
        cy={Math.random() * 120}
        r={Math.random() * 1.5 + 0.5}
        fill="#FFFFFF"
      />
    ))}
  </svg>
);

export const ChristmasSantaClaus = (props) => (
  <svg
    fill="#e95555"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 103.834 103.834"
    xmlSpace="preserve"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M74.122 97.179c-5.611-.169-12.44 4.313-14.412 6.655h18.974c-.001 0 1.043-6.497-4.562-6.655m-36.764 0c-5.611.158-4.564 6.655-4.564 6.655h18.972c-1.978-2.342-8.797-6.824-14.408-6.655m51.498-45.183c2.024-4.337 1.081-10.795-1.52-14.963-2.631-4.219-8.358-5.416-11.728-9.521-.865-1.047-1.904-1.835-3.021-2.505.221 1.68.058 3.132-.037 3.931l-.048.396q0 .314-.063.578a6.16 6.16 0 0 1 1.529 4.055 6.26 6.26 0 0 1-1.661 4.253 8.17 8.17 0 0 1 1.456 4.672 8.25 8.25 0 0 1-2.263 5.674l8.343 4.817c3.006 1.735 2.199 6.871 1.719 9.002-.748 3.238-2.225 4.166-3.327 4.388l2.905 7.119c2.126-2.542 3.829-5.728 5.633-8.138 4.782-6.375-.011-9.271 2.083-13.758m-58.681-3.85c.53-.448.875-1.055 1.062-1.729.886-.454 1.896-1.791 2.06-3.428.177-1.917-.907-3.441-1.814-3.689l2.365-4.092c1.748-3.035.707-6.924-2.328-8.672-3.035-1.751-6.924-.709-8.667 2.325a1.731 1.731 0 0 0 2.995 1.735c.796-1.379 2.571-1.854 3.937-1.055a2.876 2.876 0 0 1 1.06 3.937l-2.953 5.115c-1.416-1.092-2.378-.594-4.034 1.031-1.814 1.788-2.808 3.839-.422 6.653l.011.01-9.326 16.15a1.72 1.72 0 0 0 .633 2.367c.82.48 1.891.201 2.365-.633l9.06-15.69c1.425.702 2.802.681 3.996-.335m.206-6.604c-.029-.053-.077-.103-.108-.15l.113-.201c0 .119-.011.226-.005.351" />
    <path d="M76.031 64.853c2.257 1.677 3.628-.179 4.219-2.763.712-3.133.717-6.503-1.076-7.531a171 171 0 0 0-3.085-1.703c-.1.889-.601 2.052-1.218 3.328-.38-1.309-1.224-1.783-1.993-1.725-.676.068-1.25.343-.939 1.692a9 9 0 0 0-1.249-1.261c-.554-.453-1.019-.754-1.445-.967.053-.156.105-.314.158-.459.517-1.5.976-2.764 1.683-3.333-.285-.155-.56-.306-.85-.459-.332.237-.728.385-1.102.567-.364.189-.733.39-1.129.524a8.2 8.2 0 0 1-2.025.396c-.042 0-.079.016-.115.021-.786 4.717-4.994 9.547-10.104 9.547-3.473 0-6.499-2.246-8.353-5.109h.005a12.7 12.7 0 0 1-1.073-2.052c-.029-.071-.066-.14-.092-.211a10 10 0 0 1-.622-2.181c-.907-.045-1.753-.303-2.566-.622a10 10 0 0 1-.825-.377c-2.521-1.34-4.308-3.884-4.448-6.9l-.896-.52c0-1.226-.432-2.323-1.621-3.008-.269-.15-.53-.114-.789-.19 1.891 1.142 1.036 4.203-.29 6.497-1.318 2.296-3.543 4.564-5.482 3.493.195.195.295.438.562.588 1.393.807 2.753.406 3.942-.491l7.364 3.101-11.826 28.4c0 1.351 2.602 2.584 6.755 3.533.596 2.089 3.159 3.924 6.992 5.221 2.843 4.019-3.256 6.476-1.479 6.476 6.827 0 11.422 7.689 13.057 6.866 1.329-.675 1.601-7.625 1.658-10.241.061 2.61.33 9.566 1.656 10.241 1.635.833 6.233-6.866 13.057-6.866 1.772 0-4.324-2.457-1.477-6.476 3.823-1.297 6.387-3.122 6.987-5.21 4.177-.949 6.803-2.184 6.803-3.544l-6.818-16.363c.02.018.067.06.089.071m-11.143-3.301c2.367 1.856 5.194 2.657 7.014 1.782-.929 3.702-1.424 8.996-1.889 10.009-.543 1.165-2.246 0-2.246 0V69.61s-1.393 4.667-2.12 2.806c-.723-1.867-.512-4.557-.512-4.557s-2.594 3.718-4.145 4.313c.733-1.392 1.35-5.125 1.35-5.125s-1.339.231-2.89 1.519c.244-1.414 3.059-4.252 5.438-7.014m-9.149 3.659a2.357 2.357 0 0 1 2.356 2.363 2.35 2.35 0 0 1-2.356 2.352 2.35 2.35 0 0 1-2.36-2.352 2.36 2.36 0 0 1 2.36-2.363m0 8.101a2.357 2.357 0 0 1 2.356 2.362 2.35 2.35 0 0 1-2.356 2.352 2.35 2.35 0 0 1-2.36-2.352 2.36 2.36 0 0 1 2.36-2.362m0 18.635a4 4 0 0 1-.314-.1c.108 0 .206.01.314.01.107 0 .205-.01.313-.01-.129.048-.303.1-.313.1m26.024-10.288c-1.651 1.813-10.484 4.224-26.004 4.224-15.633 0-24.867-2.246-26.048-4.566-.433-.865.783-3.564 1.603-3.871s13.577 4.219 24.445 4.219c10.863 0 23.746-4.861 24.49-4.234.739.627 1.946 3.749 1.514 4.228" />
    <circle cx={49.798} cy={32.962} r={1.988} />
    <path d="M61.713 30.974c1.102 0 1.988.891 1.988 1.988a1.987 1.987 0 1 1-3.971 0c0-1.097.887-1.988 1.983-1.988" />
    <path d="M40.358 29.328c0 .161.024.285.061.388.082.2.248.319.448.351-1.184.907-1.972 2.294-1.972 3.905 0 1.7.865 3.206 2.173 4.097a6.9 6.9 0 0 0-1.967 4.828c0 3.829 3.106 6.945 6.94 6.945.285 0 .557-.05.825-.087v.076c0 4.098 3.977 9.548 8.889 9.548 4.915 0 8.886-5.45 8.886-9.548v-.076c.279.031.548.087.828.087a6.943 6.943 0 0 0 6.939-6.945c0-1.88-.754-3.58-1.967-4.828a4.97 4.97 0 0 0 2.173-4.097c0-1.598-.786-2.982-1.951-3.89.189-.031.484-.177.484-.754q.001-.181.059-.546c.179-1.595.611-5.321-2.067-8.327-.38-.438-.833-.828-1.318-1.194-2.331-5.772-.127-10.455.079-13.088a3.82 3.82 0 0 0 3.021 1.495 3.83 3.83 0 0 0 3.834-3.833C74.754 1.717 73.041 0 70.92 0s-3.839 1.717-3.839 3.834c0 .134.026.258.042.393-.438-.248-1.055-.393-1.988-.393-6.465 0-17.687 5.777-20.914 15.061-.696.464-1.329.971-1.854 1.561-2.685 3.006-2.247 6.732-2.062 8.327.032.242.053.424.053.545m15.401 18.093c-3.288 0-5.961-3.536-5.961-4.638 0-1.097 2.668-1.323 5.961-1.323 3.296 0 5.959.227 5.959 1.323-.005 1.103-2.668 4.638-5.959 4.638m11.65-8.084c-2.263.369-7.589-1.187-9.139-2.046-.454.715-1.403 1.01-2.511 1.01s-2.057-.29-2.51-1.01c-1.551.859-6.879 2.41-9.142 2.041-3.024-.485-1.529-3.336-2.808-9.329a3.4 3.4 0 0 0 .475-.298c1.16-.793 4.677-3.214 13.985-3.214s12.825 2.42 13.985 3.214c.189.135.338.227.475.298-1.281 5.999.211 8.844-2.81 9.334m-3.144-24.682.944.536-1.007.427-.206 1.062-.723-.82-1.07.124.559-.933-.453-.989 1.06.243.797-.733zm-2.13-8.176.548.126.412-.379.047.562.485.276-.512.222-.115.542-.37-.419-.554.063.29-.475zm-.332 3.219.796.185.602-.556.073.814.712.403-.754.327-.169.796-.538-.615-.812.093.422-.701zM57.721 7.28l.543.124.411-.379.048.556.485.277-.517.222-.111.546-.363-.422-.56.063.296-.48zm-3.164 3.562 2.223.515 1.68-1.54.2 2.268 1.983 1.123-2.104.892-.453 2.23-1.493-1.717-2.262.259 1.176-1.954zm-3.828 1.627.799.182.604-.551.071.817.717.403-.762.325-.155.799-.541-.614-.814.089.422-.701zm-2.152 2.515.541.124.411-.377.053.562.488.274-.519.221-.108.546-.366-.422-.557.066.293-.475zm-5.463 6.128c2.278-2.563 6.539-3.865 12.646-3.865s10.368 1.302 12.646 3.865c2.384 2.679 1.988 6.093 1.814 7.552 0 .053-.011.105-.016.155-1.419-.979-5.058-3.319-14.444-3.319-9.384 0-13.022 2.341-14.444 3.319-.005-.05-.016-.103-.016-.155-.175-1.453-.567-4.873 1.814-7.552" />
    <path d="M55.728 34.544a2.39 2.39 0 0 0-2.204 1.463c.54-.622 1.308-1.031 2.193-1.031.912 0 1.692.448 2.236 1.107a2.39 2.39 0 0 0-2.225-1.539M21.226 45.267a11 11 0 0 0-.495 3.019l1.144-1.982c-.221-.346-.485-.692-.649-1.037m9.619 27.37 7.986-19.167-5.46-2.294c-1.608.949-3.272 1-4.767.135-.406-.227-.638-.535-.778-.72l-.274-.269c-.261-.021-.525-.103-.783-.167l-3.607 6.249c1.305 4.262 1.883 8.375 4.222 12.225 1.149 1.866 2.293 3.09 3.461 4.008m-1.173-39.839c.013-.016 0-.037.005-.053-.448.53-.907 1.062-1.355 1.582a97 97 0 0 0-1.954 2.334c.042 0 .077-.019.114-.019.298 0 .562.137.831.245zm5.342 3.085-1.257 2.181 1.089.195c.319.037.693.087 1.097.319 1.097.63 1.729 1.619 2.036 2.803.216-1.124.567-2.21 1.226-3.154a6.3 6.3 0 0 1-1.659-4.255c0-1.5.551-2.927 1.529-4.056a2.5 2.5 0 0 1-.066-.583l-.042-.385c-.108-.912-.288-2.668.098-4.633-1.685.876-3.127 2.03-4.493 3.268.53.74.968 1.556 1.21 2.462a7.68 7.68 0 0 1-.768 5.838" />
  </svg>
);

export const ChristmasCookies = (props) => (
  <svg
    height={200}
    width={200}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      style={{
        fill: "#e8e8e8",
      }}
      d="M399.315 144.699v-37.956h-286.63v37.956c-14.797 0-26.793 11.995-26.793 26.793v313.715c0 14.797 11.995 26.793 26.793 26.793h286.63c14.797 0 26.793-11.995 26.793-26.793V171.492c0-14.797-11.996-26.793-26.793-26.793M256 436.472c-59.763 0-108.218-48.443-108.218-108.218 0-59.763 48.454-108.218 108.218-108.218s108.218 48.454 108.218 108.218c0 59.774-48.455 108.218-108.218 108.218"
    />
    <path
      style={{
        fill: "#8cf28e",
      }}
      d="M304.803 16.902v11.23c0 9.34-7.562 16.902-16.902 16.902h-60.574c-9.329 0-16.902-7.562-16.902-16.902v-11.23c0-9.34 7.573-16.902 16.902-16.902h60.574c9.34 0 16.902 7.562 16.902 16.902"
    />
    <path
      style={{
        fill: "#f4768f",
      }}
      d="M366.705 45.033h-221.41c-18.016 0-32.61 14.606-32.61 32.61v29.1h286.63v-29.1c0-18.003-14.595-32.61-32.61-32.61"
    />
    <path
      style={{
        fill: "#ff9a52",
      }}
      d="M256 220.036c59.763 0 108.218 48.454 108.218 108.218 0 59.775-48.454 108.218-108.218 108.218s-108.218-48.443-108.218-108.218c0-59.763 48.455-108.218 108.218-108.218"
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={256}
      cy={397.087}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={304.668}
      cy={376.933}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={324.833}
      cy={328.254}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={304.668}
      cy={279.586}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={256}
      cy={259.421}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={207.332}
      cy={279.586}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={187.167}
      cy={328.254}
      r={8.44}
    />
    <circle
      style={{
        fill: "#91281d",
      }}
      cx={207.332}
      cy={376.933}
      r={8.44}
    />
    <path
      style={{
        fill: "#fff",
      }}
      d="M392.35 486.681h-33.758c-4.661 0-8.44-3.778-8.44-8.44s3.779-8.44 8.44-8.44h33.758c4.661 0 8.44 3.778 8.44 8.44s-3.778 8.44-8.44 8.44m-67.517 0H119.65c-4.661 0-8.44-3.778-8.44-8.44s3.779-8.44 8.44-8.44h205.183c4.661 0 8.44 3.778 8.44 8.44s-3.778 8.44-8.44 8.44"
    />
    <path
      style={{
        fill: "#8cf28e",
      }}
      d="M400.858 115.188H111.142c-4.661 0-8.44-3.778-8.44-8.44s3.779-8.44 8.44-8.44h289.716c4.661 0 8.44 3.778 8.44 8.44s-3.779 8.44-8.44 8.44"
    />
    <path
      style={{
        fill: "#fff",
      }}
      d="M365.56 153.143H146.44c-4.661 0-8.44-3.778-8.44-8.44s3.779-8.44 8.44-8.44h219.12c4.661 0 8.44 3.778 8.44 8.44s-3.779 8.44-8.44 8.44"
    />
  </svg>
);
