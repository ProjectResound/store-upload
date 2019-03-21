import React, { Component } from "react";
import autoBind from "react-autobind";
import CopyToClipboard from "react-copy-to-clipboard";
import queryString from "query-string";
import { EditableInput } from "react-color/lib/components/common";
import ColorPicker from "../color-picker/ColorPicker";
import IconClose from "./icons/IconClose";
import IconColorPicker from "./icons/IconColorPicker";
import IconCopy from "./icons/IconCopy";

class EmbedConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accentColor: "#29D5EF",
      embedCopied: false,
      playerColor: "#F6F6F6",
      showAccentColorPicker: false,
      showPlayerColorPicker: false,
      showWaveColorPicker: false,
      textColor: "black",
      waveColor: "#CDCDCD"
    };

    autoBind(this);
  }

  changeColor(element, color) {
    const { hex, rgb } = color;
    const { r, g, b } = rgb;
    const state = {};

    if (element === "player") {
      const o = Math.round(
        (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
      );

      // If the background color is bright change the text color to black
      if (o > 125) {
        state.textColor = "black";
      } else {
        // If background color is dark change the text color to white
        state.textColor = "white";
      }
    }

    state[`${element}Color`] = hex;

    this.setState(state);
  }

  toggleColorPicker(element) {
    const showColorPicker = !this.state[`show${element}ColorPicker`];
    const state = {};

    state[`show${element}ColorPicker`] = showColorPicker;
    this.setState(state);
  }

  updateEmbedCode(audio) {
    const embedCode = `<iframe height="210" width="100%" scrolling="no" frameborder="0" src="${this.updateIframeSrc(
      audio
    )}"/>`;

    return embedCode;
  }

  updateIframeSrc(audio) {
    const { imageUrl } = this.state;
    const { contributors, files, title } = audio;
    const audioElements = ["accent", "player", , "text", "wave"];

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
      iframeSrcObj[`${audioElement}Color`] = color;
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

  validateColor(element, hex) {
    // Check if hex code is valid
    const regExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    const validHexCode = regExp.test(hex);

    if (validHexCode) {
      this.changeColor(element, { hex });
    }
  }

  render() {
    const { audio, toggleEmbedConfig } = this.props;
    const {
      accentColor,
      embedCopied,
      playerColor,
      showAccentColorPicker,
      showPlayerColorPicker,
      showWaveColorPicker,
      waveColor
    } = this.state;

    const colorElements = [
      {
        color: playerColor,
        element: "player",
        showColorPicker: showPlayerColorPicker,
        title: "Background Color"
      },
      {
        color: accentColor,
        element: "accent",
        showColorPicker: showAccentColorPicker,
        title: "Accent Color"
      },
      {
        color: waveColor,
        element: "wave",
        showColorPicker: showWaveColorPicker,
        title: "Wave Color"
      }
    ];

    return (
      <div className="expanded-embed">
        <div className="expanded-embed__close-container">
          <div className="expanded-embed__close" onClick={toggleEmbedConfig}>
            <IconClose />
            <span>Close</span>
          </div>
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
              const { color, element, showColorPicker, title } = colorElement;

              return (
                <div key={title}>
                  <span className="expanded-embed__color-type">{title}</span>
                  <div className="expanded-embed__color-picker-container">
                    <div
                      className="expanded-embed__color-box"
                      style={{
                        backgroundColor: color
                      }}
                    />
                    <EditableInput
                      onChange={this.validateColor.bind(this, element)}
                      style={{
                        input: {
                          boxSizing: "border-box",
                          height: "35px",
                          paddingLeft: "11px",
                          width: "80px"
                        }
                      }}
                      value={color}
                    />
                    <IconColorPicker
                      toggleColorPicker={this.toggleColorPicker.bind(
                        this,
                        element.charAt(0).toUpperCase() + element.slice(1)
                      )}
                    />
                    {showColorPicker && (
                      <ColorPicker
                        color={color}
                        onChange={this.changeColor.bind(this, element)}
                      />
                    )}
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
          <div className="expanded-embed__input expanded-embed__embed-code-textarea">
            <span className={embedCopied ? "expanded-embed__copied" : ""}>
              {this.updateEmbedCode(audio)}
            </span>
          </div>
          <CopyToClipboard
            onCopy={(text, result) => {
              this.setState({ embedCopied: false });
              if (result) {
                setTimeout(() => {
                  this.setState({ embedCopied: result });
                }, 50);
              }
            }}
            text={this.updateEmbedCode(audio)}
          >
            <div className="expanded-embed__copy">
              <IconCopy />
            </div>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default EmbedConfig;
