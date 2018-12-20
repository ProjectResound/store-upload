import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import ErrorActions from "../../components/errors/errors-actions";
import CONSTANTS from "../../../config/constants";

export default class CopyDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (!this.props.audio.files) {
      ErrorActions.error("Could not find audio files.");
    }
  }

  postUrlToOpener(url) {
    if (!window.opener || !CONSTANTS.cmsUrl) return;
    window.opener.postMessage({ type: "url", value: url }, CONSTANTS.cmsUrl);
    this.setState({ sentToCms: true });
  }

  render() {
    const audio = this.props.audio;
    const editing = this.props.editing;
    const files = audio.files;
    const filetypeColSize = window.opener ? "s1" : "s2";
    const cmsClassname = type => {
      if (window.opener && type.match(/mp3/)) {
        return "cms__icon";
      }
      return "hidden";
    };
    const truncateBeginning = str => {
      if (str.length > 64) {
        return `...${str.slice(20)}`;
      }
      return str;
    };
    const fileRows = Object.keys(audio.files).map(type => (
      <div className="row" key={type.toString()}>
        <div className={`col ${filetypeColSize} filetype__cell`}>{type}</div>
        {window.opener && (
          <div className="col s1">
            <img
              src="/assets/images/icon-launch.png"
              className={cmsClassname(type)}
              onClick={this.postUrlToOpener.bind(this, files[type])}
              alt="send to CMS"
            />
            <span
              className={
                this.state.sentToCms && type.match(/mp3/)
                  ? "cms_sent__msg cms_sent__msg__visible"
                  : "hidden"
              }
            >
              ✓
            </span>
          </div>
        )}
        <div className="col s8 url__cell">
          {editing && files[type]}
          {!editing && (
            <CopyToClipboard
              text={files[type]}
              onCopy={() => this.setState({ copied: type })}
            >
              <div
                onMouseOver={() => this.setState({ hover: type })}
                className="url__hoverzone"
              >
                {truncateBeginning(files[type])}
                {this.state.copied &&
                  this.state.copied === type && (
                    <span className="copied">copied!</span>
                  )}
                {this.state.hover &&
                  this.state.hover === type &&
                  this.state.copied !== type && (
                    <span className="hover">copy</span>
                  )}
              </div>
            </CopyToClipboard>
          )}
        </div>
        <div className="col s2 download__col">
          {editing && (
            <img
              src="/assets/images/icon-download.png"
              alt="download icon"
              className="download__icon"
            />
          )}
          {!editing && (
            <a href={files[type]}>
              <img
                src="/assets/images/icon-download.png"
                alt="download icon"
                className="download__icon"
              />
            </a>
          )}
        </div>
      </div>
    ));

    return (
      <div
        className={
          editing
            ? "copydownload__container copydownload__container--disabled"
            : "copydownload__container"
        }
      >
        <div className="row">
          <div className={`col ${filetypeColSize} copydownload__header`}>
            File Type
          </div>
          {window.opener && (
            <div className="col s1 copydownload__header">CMS</div>
          )}
          <div className="col s8 copydownload__header">Copy a link</div>
          <div className="col s2 copydownload__header download__col">
            Download
          </div>
        </div>
        {fileRows}
      </div>
    );
  }
}
