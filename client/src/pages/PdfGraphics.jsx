import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

const PdfGraphics = () => {
  const [color, setColor] = useState({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });

  const [color2, setColor2] = useState({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayColorPicker2, setDisplayColorPicker2] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  const handleClick2 = () => {
    setDisplayColorPicker2(!displayColorPicker2);
  };

  const handleClose2 = () => {
    setDisplayColorPicker2(false);
  };

  const handleChange2 = (color) => {
    setColor2(color.rgb);
  };

  return (
    <div>
      <div style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>
        <SketchPicker
          color={color}
          onChange={handleChange}
          onClick={handleClick}
          onClose={handleClose}
        />
      </div>

      <div style={{ backgroundColor: `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${color2.a})` }}>
        <SketchPicker
          color={color2}
          onChange={handleChange2}
          onClick={handleClick2}
          onClose={handleClose2}
        />
      </div>
    </div>
  );
};

export default PdfGraphics;