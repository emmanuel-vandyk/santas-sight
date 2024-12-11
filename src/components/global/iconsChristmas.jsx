import { Baby } from "lucide-react";

export const ChristmasTree = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-tree-pine"
  >
    <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
    <path d="M12 22v-3" />
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

export const ChristmasElf = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-users"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Letters = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-mail-open"
  >
    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
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
    src="src/assets/santasleigh.webp"
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

export const Route = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-route"
  >
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
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

export const ChildrenIcon = (props) => {
  return <Baby />;
};

export const ReindeerIcon = (props) => (
  <svg
    height="64px"
    width="64px"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#000000"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <style type="text/css">{" .st0{fill:#78350F;} "}</style>
      <g>
        <path
          className="st0"
          d="M460.713,186.826c-43.5-4.348-84.83,8.698-102.23,36.982c0,0-15.717,0.14-36.414,0.331 c4.357-35.484,52.809-52.624,113.473-83.536c81.904-41.744,72.189-78.179-13.055-136.309c-15.948-10.872-27.548,0-5.072,20.305 c46.559,42.049,39.151,52.921,19.578,70.325c-13.41,11.914-25.993,19.33-32.628,14.509c-15.952-11.608-31.992-39.304-41.325-49.308 c-10.153-10.88-23.82-4.762-11.604,15.229c15.949,26.101,34.075,45.671,13.778,58.726c-20.301,13.055-50.028,25.01-68.518,45.67 c-18.474,20.661-21.12,37.048-21.107,44.786c-6.854,0.066-13.489,0.116-19.59,0.166c-6.098-0.05-12.732-0.1-19.59-0.166 c0.016-7.738-2.629-24.125-21.107-44.786c-18.486-20.66-48.212-32.615-68.514-45.67c-20.301-13.055-2.174-32.625,13.778-58.726 c12.215-19.991-1.451-26.108-11.604-15.229c-9.334,10.004-25.373,37.7-41.325,49.308c-6.635,4.821-19.222-2.596-32.628-14.509 C55.434,77.52,48.026,66.648,94.585,24.598c22.476-20.305,10.876-31.177-5.076-20.305c-85.24,58.13-94.954,94.565-13.05,136.309 c60.664,30.912,109.116,48.052,113.473,83.536c-20.698-0.19-36.415-0.331-36.415-0.331c-17.403-28.284-58.729-41.33-102.229-36.982 c-43.5,4.341,8.698,113.102,84.826,117.45c0,0-17.114,207.724,119.885,207.724c137.002,0,119.885-207.724,119.885-207.724 C452.011,299.927,504.213,191.166,460.713,186.826z M131.471,260.987c-4.931,9.235-20.95,7.391-33.897,0.612 c-12.939-6.78-27.73-27.11-20.334-36.982c7.395-9.855,27.73-1.844,39.441,5.556C128.391,237.564,136.403,251.744,131.471,260.987z M197.273,347.781c-8.408,0-15.224-6.821-15.224-15.221c0-8.408,6.816-15.229,15.224-15.229c8.408,0,15.225,6.82,15.225,15.229 C212.498,340.96,205.681,347.781,197.273,347.781z M255.998,452.184c-22.823,0-41.326-18.511-41.326-41.33 c0-22.818,18.503-41.321,41.326-41.321c22.822,0,41.33,18.503,41.33,41.321C297.328,433.673,278.821,452.184,255.998,452.184z M314.727,347.781c-8.412,0-15.229-6.821-15.229-15.221c0-8.408,6.817-15.229,15.229-15.229c8.408,0,15.225,6.82,15.225,15.229 C329.952,340.96,323.135,347.781,314.727,347.781z M414.427,261.599c-12.947,6.779-28.966,8.623-33.897-0.612 c-4.932-9.243,3.08-23.422,14.791-30.813c11.711-7.4,32.041-15.412,39.441-5.556C442.156,234.489,427.361,254.819,414.427,261.599z "
        />
      </g>
    </g>
  </svg>
);

export const SantaSleigh = (props) => (
  <svg
    height={64}
    width={64}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      style={{
        fill: "#00b494",
      }}
      d="M361.259 28.982c-6.741-6.776-17.672-6.776-24.414 0l-20.858 20.963V35.512c0-9.583-7.729-17.351-17.264-17.351s-17.264 7.768-17.264 17.351v14.434l-20.86-20.964c-6.742-6.777-17.672-6.777-24.414 0-6.743 6.775-6.743 17.761 0 24.536l22.023 22.135h81.028l22.023-22.135c6.744-6.775 6.744-17.76 0-24.536M184.54 385.143a21.52 21.52 0 0 1-16.812-8.098c-23.992-30.006-37.204-67.758-37.204-106.304 0-37.074 11.678-72.303 33.771-101.876 21.35-28.58 51.744-50.068 85.584-60.507a21.5 21.5 0 0 1 6.329-.954h86.619c2.145 0 4.278.322 6.329.954 33.84 10.437 64.235 31.926 85.584 60.507 22.093 29.575 33.77 64.804 33.77 101.876 0 38.545-13.212 76.298-37.204 106.304a21.53 21.53 0 0 1-16.811 8.098z"
    />
    <path
      style={{
        fill: "#fff",
      }}
      d="m445.788 218.407 12.047-7.303a168.8 168.8 0 0 0-15.383-31.024l-25.935-15.722-29.262 17.742-29.269-17.742L328.72 182.1l-29.263-17.743-29.262 17.743-29.259-17.742-29.268 17.743-29.263-17.743-25.752 15.615a168.8 168.8 0 0 0-15.472 31.184l11.96 7.252 29.262-17.742 29.263 17.741 29.265-17.741 29.261 17.742 29.261-17.742 29.263 17.741 29.266-17.742 29.269 17.742 29.264-17.742z"
    />
    <g
      style={{
        opacity: 0.2,
      }}
    >
      <path
        style={{
          fill: "#c7c7c7",
        }}
        d="M200.208 377.044c-23.991-30.006-37.204-67.758-37.204-106.304 0-37.074 11.678-72.303 33.771-101.877 21.35-28.58 51.744-50.068 85.584-60.507a21.5 21.5 0 0 1 6.329-.954h-32.48c-2.145 0-4.279.322-6.329.954-33.84 10.437-64.235 31.926-85.584 60.507-22.094 29.575-33.771 64.804-33.771 101.877 0 38.545 13.213 76.298 37.204 106.304a21.53 21.53 0 0 0 16.812 8.098h32.48a21.52 21.52 0 0 1-16.812-8.098"
      />
    </g>
    <path
      style={{
        fill: "#f1a74f",
      }}
      d="M469.913 457.569H398.94v-54.67c0-10.015-8.079-18.134-18.044-18.134s-18.043 8.119-18.043 18.134v54.67H223.315v-54.67c0-10.015-8.078-18.134-18.044-18.134-9.964 0-18.044 8.119-18.044 18.134v54.67h-33.605c-60.486 0-109.695-49.456-109.695-110.246 0-10.015-8.079-18.134-18.044-18.134s-18.044 8.119-18.044 18.134c0 80.787 65.398 146.513 145.784 146.513h316.292c9.965 0 18.043-8.119 18.043-18.134-.003-10.014-8.08-18.133-18.045-18.133"
    />
    <g
      style={{
        opacity: 0.2,
      }}
    >
      <path
        style={{
          fill: "#c7c7c7",
        }}
        d="M29.747 347.322c0-5.868 2.786-11.071 7.088-14.385a17.83 17.83 0 0 0-10.954-3.749c-9.965 0-18.044 8.119-18.044 18.134 0 80.787 65.398 146.514 145.784 146.514h21.91c-80.386.001-145.784-65.725-145.784-146.514"
      />
    </g>
    <path
      style={{
        fill: "#f2373f",
      }}
      d="M504.163 199.467c-3.093-.18-6.207-.282-9.343-.282-87.046 0-157.723 70.371-158.815 157.592H203.2c-13.606-59.473-49.867-76.69-109.916-76.69-2.172 0-4.327-.124-6.468 0l17.181 78.735c4.621 38.646 32.651 63.688 65.353 63.688h238.262c35.441 0 60.734-26.607 65.354-63.688z"
    />
    <g
      style={{
        opacity: 0.2,
      }}
    >
      <path
        style={{
          fill: "#c7c7c7",
        }}
        d="m136.911 358.823-16.876-77.337c-8.324-.963-17.238-1.398-26.751-1.398-2.172 0-4.327-.124-6.468 0l17.181 78.735c4.621 38.646 32.651 63.688 65.353 63.688h32.914c-32.702-.002-60.733-25.043-65.353-63.688m363.828-157.879.289-1.481c-3.034-.177-6.09-.277-9.169-.277-85.424 0-154.784 79.88-155.855 165.475h32.301c.971-77.62 58.097-152.459 132.434-163.717"
      />
    </g>
    <path
      style={{
        fill: "#f0d355",
      }}
      d="M363.273 91.97c0 10.35-8.348 18.739-18.646 18.739h-90.219c-10.296 0-18.645-8.389-18.645-18.739 0-10.349 8.348-18.738 18.645-18.738h90.219c10.299 0 18.646 8.39 18.646 18.738"
    />
    <path
      style={{
        fill: "#636052",
      }}
      d="M468.467 449.136h-62.942V429.81h.834c38.281 0 67.535-28.146 72.871-70.065L512 192.362l-8.933-.52a169 169 0 0 0-9.77-.295 166.8 166.8 0 0 0-35.139 3.734 176 176 0 0 0-10.459-19.135l-.982-1.559-.052-.031a178 178 0 0 0-7.001-10.101c-18.993-25.427-44.866-45.445-73.975-57.547a26.4 26.4 0 0 0 4.28-14.433c0-10.027-5.582-18.771-13.787-23.269l9.504-9.554c9.735-9.782 9.735-25.701.002-35.483-4.727-4.752-11.016-7.369-17.709-7.369-6.69 0-12.981 2.616-17.707 7.369l-7.793 7.832c-1.993-11.859-12.299-20.92-24.674-20.92s-22.683 9.062-24.675 20.922l-7.792-7.832c-4.728-4.752-11.017-7.37-17.709-7.37-6.69 0-12.981 2.617-17.707 7.369-9.735 9.783-9.735 25.701 0 35.483l10.084 10.137c-7.652 4.645-12.778 13.075-12.778 22.686a26.4 26.4 0 0 0 4.279 14.433c-29.106 12.102-54.979 32.12-73.975 57.547a180 180 0 0 0-6.952 10.008l-.027.017-.949 1.498a178 178 0 0 0-4.577 7.667l-.244.437a176 176 0 0 0-7.954 16.054l-.013.027a174 174 0 0 0-3.51 8.738l-2.135 5.723.099.06c-5.917 17.86-8.958 36.697-8.958 56.013 0 1.063.031 2.123.051 3.185-8.909-1.124-18.656-1.678-29.366-1.678-.673 0-1.345-.014-2.016-.026-1.723-.033-3.462-.045-4.885.04l-9.13.529 19.001 87.071c2.503 20.277 10.938 37.751 24.407 50.549 13.198 12.541 30.408 19.448 48.455 19.448h10.009v19.326h-25.69c-55.993 0-101.546-45.799-101.546-102.095 0-14.276-11.574-25.892-25.801-25.892C11.574 321.151 0 332.766 0 347.042c0 84.848 68.702 153.876 153.148 153.876h315.32c14.226 0 25.8-11.615 25.8-25.892-.001-14.275-11.574-25.89-25.801-25.89M253.627 81.607h7.315v21.737h-7.315c-5.941 0-10.774-4.877-10.774-10.869-.001-5.994 4.833-10.868 10.774-10.868m22.941 0h12.5v21.737h-12.5zm28.125 0h12.5v21.737h-12.5zm28.126 0h10.749c5.943 0 10.777 4.875 10.777 10.868 0 5.992-4.834 10.869-10.777 10.869h-10.749zm-91.822-46.416c1.773-1.783 4.128-2.764 6.631-2.764s4.858.981 6.632 2.765l20.796 20.899a7.811 7.811 0 0 0 13.351-5.51v-14.39c0-5.23 4.216-9.485 9.398-9.485 5.183 0 9.398 4.255 9.398 9.485v14.387a7.813 7.813 0 0 0 13.351 5.51l20.793-20.898c1.774-1.783 4.128-2.765 6.632-2.765s4.858.982 6.632 2.765c3.687 3.705 3.687 9.735 0 13.441l-17.263 17.351H258.26l-17.265-17.351c-3.687-3.705-3.687-9.733.002-13.44m5.359 82.747a26.2 26.2 0 0 0 7.27 1.03h89.941c2.522 0 4.959-.365 7.271-1.03 23.2 8.037 44.511 21.554 61.865 39.101l-26.641 16.153-29.179-17.688-29.175 17.688-29.174-17.689-29.171 17.688-29.168-17.688-29.179 17.689-26.569-16.109c17.366-17.569 38.692-31.101 61.909-39.145m-95.885 90.037a156 156 0 0 1 2.434-5.494l.089-.194a164 164 0 0 1 2.625-5.356l.138-.269a162 162 0 0 1 5.913-10.488l.158-.256 20.018-12.14 29.174 17.689 29.177-17.689 29.17 17.688 29.171-17.688 29.174 17.689 29.175-17.689 29.179 17.688 29.174-17.688 20.186 12.237c.226.368.446.739.67 1.109a150 150 0 0 1 2.865 4.946q.86 1.545 1.681 3.108.456.864.903 1.733c.418.821.822 1.651 1.229 2.478a163 163 0 0 0-9.38 3.317L415.237 191.7l-29.175 17.688-29.178-17.688-29.175 17.688-29.173-17.688-29.171 17.688-29.172-17.688-29.176 17.688-29.173-17.688-29.173 17.688-2.229-1.35zm-5.453 15.044 7.654 4.64 29.173-17.688 29.174 17.687 29.176-17.687 29.171 17.688 29.171-17.688 29.174 17.687 29.175-17.688 29.179 17.688 29.175-17.688.948.575c-14.421 7.606-27.792 17.399-39.69 29.217-29.435 29.238-46.688 67.656-49.066 108.891H208.688c-7.37-27.575-20.267-46.984-39.316-59.222-8.889-5.71-19.201-9.927-31.316-12.766-.073-1.988-.12-3.979-.12-5.973 0-16.391 2.403-32.404 7.082-47.673m23.81 191.167c-29.808 0-53.409-23.277-57.394-56.606l-.045-.372-15.135-69.362c28.955.324 49.565 5.03 64.673 14.735 17.041 10.947 27.854 28.625 34.032 55.63l1.388 6.071h146.34l.096-7.716c.501-40.021 16.385-77.565 44.724-105.715 28.326-28.138 65.849-43.645 105.672-43.677l-29.332 149.833-.086.535c-2.075 16.655-8.582 30.845-18.815 41.038-10.249 10.21-23.591 15.607-38.585 15.607zm61.612 15.625h123.485v19.326H230.44zm238.027 55.482h-315.32c-75.83 0-137.523-62.019-137.523-138.25 0-5.66 4.565-10.266 10.176-10.266s10.175 4.605 10.175 10.266c0 64.911 52.563 117.719 117.172 117.719h41.315v-34.951h20.351v34.951H369.55v-34.951h20.35v34.951h78.567c5.61 0 10.175 4.606 10.175 10.265.001 5.661-4.565 10.266-10.175 10.266"
    />
  </svg>
);

export const SantaSledge = (props) => (
  <svg
    width={256}
    height={256}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="m52 15-15.7 3.489A14.432 14.432 0 0 0 27 39.906L54 40V17Z"
      style={{
        fill: "#348d3a",
      }}
    />
    <path
      d="M26.47 38.913c.165.338.339.671.53.993L54 40V17l-.7-.7c-3.538 13.166-19.654 20.124-26.83 22.613"
      style={{
        fill: "#d13e37",
      }}
    />
    <path
      style={{
        fill: "#348d3a",
      }}
      d="m54 10 5 5-5 2-2-2z"
    />
    <path
      d="M55 53v-7h-2v7h-9v-7h-2v7H32v-7h-2v7h-9v-7h-2v7h-9a6 6 0 0 1-.858-11.939l-.284-1.98A8 8 0 0 0 10 55h52v-2Z"
      style={{
        fill: "#f8f868",
      }}
    />
    <path
      style={{
        fill: "#ffff3d",
      }}
      d="M19 46h2v3h-2zm11 0h2v3h-2zm12 0h2v3h-2zm11 0h2v3h-2z"
    />
    <path
      d="M51 47H21a8 8 0 0 1-8-8V26a5 5 0 0 1 5 5v7a2 2 0 0 0 2 2h6.491a2 2 0 0 0 1.923-1.451l2.757-9.649a4 4 0 0 1 3.846-2.9H61l-1.664 2.5A2 2 0 0 0 59 29.606V39a8 8 0 0 1-8 8"
      style={{
        fill: "#e12323",
      }}
    />
    <path
      d="M55.631 26c-3.643 19.193-33.676 18.316-41.014 17.809A7.98 7.98 0 0 0 21 47h30a8 8 0 0 0 8-8v-9.394a2 2 0 0 1 .336-1.11L61 26Z"
      style={{
        fill: "#fd3b26",
      }}
    />
    <path
      style={{
        fill: "#fd9a30",
      }}
      d="M54 29h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2z"
    />
    <path
      d="M58.2 20.773a4.32 4.32 0 0 1-3.141-1.3l-1.764-1.765 1.414-1.414 1.764 1.764c.344.344 1.393 1.391 4.082.048l.894 1.79a7.3 7.3 0 0 1-3.249.877"
      style={{
        fill: "#7a4321",
      }}
    />
    <path
      d="M50 44v-2a4 4 0 0 0 4-4h2a6.006 6.006 0 0 1-6 6"
      style={{
        fill: "#fd9a30",
      }}
    />
    <path
      d="M59.8 23.98a8.84 8.84 0 0 1-6.7-6.47l-2.1-2.1A1 1 0 0 1 51 14a1 1 0 0 1 1.414 0l2.293 2.293a1 1 0 0 1 .273.511 6.93 6.93 0 0 0 5.22 5.216Z"
      style={{
        fill: "#7a4321",
      }}
    />
  </svg>
);

export const SearchIcon = (props) => (
  <svg
    height={256}
    width={256}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    transform="scale(-1 1)"
    {...props}
  >
    <g strokeWidth={0} />
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#CCC"
      strokeWidth={2.048}
    />
    <circle
      style={{
        fill: "#d6e5f6",
      }}
      cx={193.939}
      cy={193.94}
      r={170.667}
    />
    <path
      style={{
        fill: "#b0e3d6",
      }}
      d="M279.282 217.22h-.002c-12.853 0-23.273-10.422-23.271-23.274.002-16.576-6.454-32.161-18.178-43.885s-27.307-18.179-43.885-18.178c-12.853.002-23.274-10.418-23.274-23.271s10.418-23.273 23.271-23.274c29.012-.002 56.286 11.295 76.802 31.811 20.514 20.516 31.811 47.79 31.809 76.802-.001 12.851-10.421 23.269-23.272 23.269"
    />
    <path
      style={{
        fill: "#f07575",
      }}
      d="M505.183 472.274 346.497 313.585c25.921-32.976 41.398-74.533 41.398-119.637C387.894 87.005 300.89 0 193.946 0h-.003C142.141 0 93.435 20.176 56.804 56.804 20.174 93.439 0 142.142 0 193.947c0 106.944 87.003 193.947 193.946 193.947 45.103 0 86.658-15.476 119.639-41.394L472.27 505.184A23.2 23.2 0 0 0 488.727 512a23.2 23.2 0 0 0 16.455-6.816c9.091-9.087 9.091-23.823.001-32.91M46.545 193.947c0-39.373 15.332-76.389 43.172-104.229s64.855-43.172 104.228-43.172c81.279 0 147.403 66.124 147.403 147.402 0 81.279-66.124 147.402-147.403 147.402-81.277-.001-147.4-66.123-147.4-147.403"
    />
  </svg>
);
