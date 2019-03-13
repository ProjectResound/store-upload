import React, { Component } from "react";
import autoBind from "react-autobind";
import queryString from "query-string";
import IconClose from "./icons/IconClose";
import IconColorPicker from "./icons/IconColorPicker";
import IconCopy from "./icons/IconCopy";

class EmbedConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: { r: 41, g: 213, b: 239, a: 1 },
      playerColor: { r: 246, g: 246, b: 246, a: 1 },
      progressColor: { r: 41, g: 213, b: 239, a: 1 },
      waveColor: { r: 0, g: 0, b: 0, a: 0.1 }
    };

    autoBind(this);
  }

  changeColor(element, color) {
    const { r, g, b, a } = color.rgb;
    const state = {};

    state[`${element}Color`] = { r, g, b, a };

    this.setState(state);
  }

  copyEmbedToClipboard() {
    this.embedCodeTextarea.select();
    document.execCommand("copy");
  }

  updateEmbedCode(audio) {
    const embedCode = `<iframe height="210" width="100%" scrolling="no" frameborder="0" src="${this.updateIframeSrc(
      audio
    )}"/>`;

    return embedCode;
  }

  updateIframeSrc(audio) {
    const { addFallbackAudioElement, imageUrl } = this.state;
    const { contributors, files, title } = audio;
    const audioElements = ["button", "player", "progress", "wave"];

    const iframeSrcObj = {
      contributors,
      title,
      url: files["mp3_128"]
    };

    if (imageUrl) {
      iframeSrcObj.image = imageUrl;
    }

    audioElements.forEach(audioElement => {
      const color = this.state[`${audioElement}Color`];
      const { r, g, b, a } = color;

      if (color) {
        if (addFallbackAudioElement) {
          iframeSrcObj[`${audioElement}Color`] = `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
          if (audioElement === "wave" || audioElement === "progress") {
            iframeSrcObj[`${audioElement}Color`] = `rgb(${r}, ${g}, ${b})`;
            iframeSrcObj[`${audioElement}Opacity`] = a;
          } else {
            iframeSrcObj[
              `${audioElement}Color`
            ] = `rgba(${r}, ${g}, ${b}, ${a})`;
          }
        }
      }
    });

    const iframeSrc = `http://localhost:8000/embed?${queryString.stringify(
      iframeSrcObj
    )}`;

    return iframeSrc;
  }

  updateImage(e) {
    const imageUrl = e.target.value;
    this.setState({ imageUrl });
  }

  render() {
    const { audio } = this.props;
    const { buttonColor, playerColor, waveColor } = this.state;

    const colorElements = [
      { color: playerColor, title: "Background Color" },
      { color: buttonColor, title: "Accent Color" },
      { color: waveColor, title: "Wave Color" }
    ];

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
          src={this.updateIframeSrc(audio)}
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
                      style={{
                        backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`
                      }}
                    />
                    <input
                      className="expanded-embed__color-code"
                      onChange={() => {}}
                      type="text"
                      value={`rgba(${r}, ${g}, ${b}, ${a})`}
                    />
                    <IconColorPicker />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="expanded-embed__album-art">
          <span className="expanded-embed__config-titles">Album Art</span>
          <input
            className="expanded-embed__input"
            onChange={this.updateImage}
            placeholder="Insert Image URL here"
            type="text"
          />
        </div>
        <div className="expanded-embed__embed-code">
          <span className="expanded-embed__config-titles">Embed Code</span>
          <textarea
            className="expanded-embed__input"
            readOnly
            ref={embedCodeTextarea =>
              (this.embedCodeTextarea = embedCodeTextarea)
            }
            type="text"
            value={this.updateEmbedCode(audio)}
          />
          <IconCopy copyEmbedToClipboard={this.copyEmbedToClipboard} />
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
  }
}

export default EmbedConfig;
