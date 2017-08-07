import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';


export default class CopyDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const audio = this.props.audio;

    const files = audio.files;
    const fileRows = Object.keys(audio.files).map(
      type =>
        <div className="row" key={type.toString()}>
          <div className="col s2 filetype__cell">
            {type}
          </div>
          <div className="col s8 url__cell">
            <CopyToClipboard
              text={files[type]}
              onCopy={() => this.setState({ copied: type })}
            >
              <div onMouseOver={() => this.setState({ hover: type })} className="url__hoverzone">
                {files[type]}
                { this.state.copied && (this.state.copied === type) &&
                  <span className="copied">copied!</span>
                }
                { this.state.hover && (this.state.hover === type) && (this.state.copied !== type) &&
                <span className="hover">copy</span>
                }
              </div>
            </CopyToClipboard>
          </div>
          <div className="col s2 download__col">
            <a href={files[type]}><img src="/assets/images/icon-download.png" alt="download icon" className="download__icon" /></a>
          </div>
        </div>);

    return (
      <div className="copydownload__container">
        <div className="row">
          <div className="col s2 copydownload__header">
            File Type
          </div>
          <div className="col s8 copydownload__header">
            Copy a link
          </div>
          <div className="col s2 copydownload__header download__col">
            Download
          </div>
        </div>
        { fileRows }
      </div>
    );
  }
}

