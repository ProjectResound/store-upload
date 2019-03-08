import React from "react";
import IconClose from "./icons/IconClose";

const EmbedConfig = ({
  audio,
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
  );
};

export default EmbedConfig;
