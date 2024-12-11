import { RoughNotation } from "react-rough-notation";
import propTypes from "prop-types";

export const UnderlineTitle = ({ text, color = "green" }) => {
  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <RoughNotation
        type="underline"
        show={true}
        strokeWidth={3}
        iterations={2}
        animationDuration={5000}
        color={color}
        multiline={true}
        className="absolute left-0 right-0 bottom-0"
      >
        <span className="invisible">{text}</span>
      </RoughNotation>
    </div>
  );
};

UnderlineTitle.propTypes = {
  text: propTypes.string.isRequired,
  color: propTypes.string,
};

