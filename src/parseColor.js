import postCSS from "postcss";
import getCssColors from "get-css-colors";

function parseColors($element, pseudoElement = null) {
  const pseudoElements = [":after", ":before", ":hover", ":active", ":focus"];

  const colorProps = [
    "color",
    "background-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "outline-color",
    "tap-highlight-color",
    "fill",
    "stroke",
    "caret-color",
    "box-shadow",
    "text-shadow",
    "background-image",
    "border-image"
  ];

  const compStyle = window.getComputedStyle($element, pseudoElement);

  // compStyle.getPropertyValue('color');
}

export default parseColors;