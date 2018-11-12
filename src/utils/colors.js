const Color = (r, g, b) => (a) => {
  if (a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};

// all colors are ordered from darkest to lightest
const colors = {
  // text and content colors
  base1: Color(27, 34, 40),
  base2: Color(51, 64, 75),
  base3: Color(91, 112, 133),
  base4: Color(117, 138, 160),

  // background and border colors
  shade1: Color(218, 228, 237),

  // accent and emphasis colors
  accent1: Color(106, 29, 27),
  accent2: Color(167, 46, 43),
  accent3: Color(242, 205, 204),
};

export default colors;
