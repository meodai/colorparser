import postcss from 'postcss';
import getCssColors from 'get-css-colors';

function parseColors($element) {
  const pseudoElements = [null, 'after', 'before', 'hover', 'active', 'focus'];

  const colorProps = [
    'color',
    'background-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'tap-highlight-color',
    'fill',
    'stroke',
    'caret-color',
    'box-shadow',
    'text-shadow',
    'background-image',
    'border-image',
  ];

  const compProps = pseudoElements.map(pseudoElement => {
    const compStyle = window.getComputedStyle($element, pseudoElement);

    return colorProps
      .map(property => {
        const propertyValue = compStyle.getPropertyValue(property);
        return {
          $element,
          pseudoElement,
          property,
          colors: getCssColors(propertyValue),
          propertyValue,
        };
      })
      .filter(({ colors }) => colors);
  });

  return compProps;
}

/*[...document.body.querySelectorAll('*')].forEach($el => {
  console.log(parseColors($el));
});*/

const getCSSColors = postcss.plugin('getCSSColors', (opts = {}) => {
  const colorRules = new Map();

  // Work with options here
  return (root, result) => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        const colorList = getCssColors(decl.value);
        if (colorList && !colorRules.get(rule.selector)) {
          colorRules.set(rule.selector, []);
        }
        if (colorList && colorRules.get(rule.selector)) {
          colorRules.get(rule.selector).push({
            colorList,
            value: decl.value,
            property: decl.prop,
          });
        }
      });
    });
    console.log(colorRules);
  };
});

postcss(getCSSColors)
  .process(document.querySelector('style').innerHTML)
  .then(result => {
    //const nodes = [...];
    /*console.log(
    result.nodes
  )*/
  });

export default parseColors;
