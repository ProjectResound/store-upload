import React from "react";
import IconClose from "./icons/IconClose";
import IconColorPicker from "./icons/IconColorPicker";

const EmbedConfig = ({
  audio,
  colorElements,
  updateEmbedCode,
  updateIframeSrc,
  updateImage
}) => {
  return (
    <div className="expanded-embed">
      <div className="expanded-embed__close">
        <IconClose />
        <span>Close</span>
      </div>
      <div className="expanded-embed__header">
        <span className="expanded-embed__title">Embeddable Player</span>
        <span className="expanded-embed__directions">
          Configure the player using the options below.
        </span>
      </div>
      <iframe
        id="embeddable-audio-player"
        scrolling="no"
        src={updateIframeSrc(audio)}
      />
      <div className="expanded-embed__color">
        <span className="expanded-embed__color-title expanded-embed__config-titles">
          Color
        </span>
        <div className="expanded-embed__color-pickers">
          {colorElements.map(colorElement => {
            const { r, g, b, a } = colorElement.color;

            return (
              <div key={colorElement.title}>
                <span className="expanded-embed__color-type">
                  {colorElement.title}
                </span>
                <div className="expanded-embed__color-picker-container">
                  <div
                    className="expanded-embed__color-box"
                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
                  />
                  <input
                    className="expanded-embed__color-code"
                    type="text"
                    value={`rgba(${r}, ${g}, ${b}, ${a})`}
                  />
                  <IconColorPicker />
                </div>
              </div>
            );
          })}
        </div>
        <div id="image-embed-container" className="row">
          <input
            id="image-url"
            onChange={updateImage}
            placeholder="Insert Image URL here"
            type="text"
          />
          <input
            id="embed-code"
            readOnly
            type="text"
            value={updateEmbedCode(audio)}
          />
        </div>
        {/* <div id="color-pickers-container">
          {colorElements.map(colorElement => {
            const { color, element } = colorElement;
            const { r, g, b, a } = color;

            return (
              <ColorPicker
                changeColor={this.changeColor.bind(this, element)}
                color={`rgba(${r}, ${g}, ${b}, ${a})`}
                element={element}
                key={element}
              />
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default EmbedConfig;
