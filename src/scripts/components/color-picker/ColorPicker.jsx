import React from "react";
import { Hue, Saturation } from "react-color/lib/components/common";
import { CustomPicker } from "react-color";

const ColorPicker = props => (
  <div className="color-picker">
    <div className="color-picker__saturation">
      <Saturation {...props} />
    </div>
    <div className="color-picker__hue">
      <Hue
        {...props}
        pointer={() => {
          return <div className="color-picker__pointer" />;
        }}
      />
    </div>
  </div>
);

export default CustomPicker(ColorPicker);
