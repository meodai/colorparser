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

cosnt rules = {

}

const getCSSColors = postcss.plugin('getCSSColors', (opts = {}) => {
  // Work with options here
  return (root, result) => {
    console.log('root', root) 
    root.walkRules(rule => {
      console.log(rule, rule.selector)

      rule.walkDecls(decl => {
        console.log(decl)
      })
    });
  };
});

postcss(getCSSColors).process(document.querySelector('style').innerHTML).then(result => {
  //const nodes = [...];
  /*console.log(
    result.nodes
  )*/
})

export default parseColors;
