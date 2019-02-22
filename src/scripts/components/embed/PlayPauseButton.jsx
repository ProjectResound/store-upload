import React from "react";

const PlayPauseButton = ({
  color = "#29D5EF",
  playing = false,
  handleTogglePlay = () => {}
}) => {
  if (!playing) {
    return (
      <svg
        class="embed__play-pause"
        onClick={handleTogglePlay}
        width="65px"
        height="65px"
        viewBox="0 0 65 65"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M32.5,65 C14.57896,65 0,50.42104 0,32.5 C0,14.58167 14.57896,0 32.5,0 C50.42104,0 65,14.58167 65,32.5 C65,50.42104 50.42104,65 32.5,65 Z"
            id="path-1"
          />
          <path
            d="M23.93928,15.28002 L2.9117,26.04951 C1.92857,26.55302 0.72341,26.16422 0.21989,25.1811 C0.07537,24.89892 0,24.58643 0,24.26939 L0,2.73043 C0,1.62586 0.89543,0.73043 2,0.73043 C2.31703,0.73043 2.62952,0.80579 2.9117,0.95031 L23.93928,11.7198 C24.9224,12.22332 25.31121,13.42848 24.80769,14.41161 C24.61645,14.78499 24.31266,15.08879 23.93928,15.28002 Z"
            id="path-3"
          />
        </defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="button-play_embed">
            <g id="Group-3">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-2" />
              <polygon
                id="Fill-1"
                fill={color}
                mask="url(#mask-2)"
                points="-5 -5 70 -5 70 70 -5 70"
              />
            </g>
            <g id="Group-6" transform="translate(24.000000, 19.000000)">
              <mask id="mask-4" fill="white">
                <use xlinkHref="#path-3" />
              </mask>
              <g id="Clip-5" />
              <polygon
                id="Fill-4"
                fill="#FFFFFF"
                mask="url(#mask-4)"
                points="-5 -4.26957 30.028 -4.26957 30.028 31.26982 -5 31.26982"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  } else {
    return (
      <svg
        className="embed__play-pause"
        onClick={handleTogglePlay}
        width="65px"
        height="65px"
        viewBox="0 0 65 65"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M32.5,65 C14.57896,65 0,50.42104 0,32.5 C0,14.58167 14.57896,0 32.5,0 C50.42104,0 65,14.58167 65,32.5 C65,50.42104 50.42104,65 32.5,65 Z"
            id="path-1"
          />
          <polygon
            id="path-3"
            points="0.62679 26.15703 0.62679 1.52592 0.62679 0.16175 10.80536 0.17027 10.80536 1.52592 10.80536 26.15703 10.80536 27.55418 0.62679 27.62325"
          />
          <polygon
            id="path-5"
            points="0.89464 26.15703 0.89464 1.52592 0.89464 0.16175 11.07321 0.17027 11.07321 1.52592 11.07321 26.15703 11.07321 27.55418 0.89464 27.62325"
          />
        </defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="button">
            <g id="Group-3">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-2" />
              <polygon
                id="Fill-1"
                fill={color}
                mask="url(#mask-2)"
                points="-5 -5 70 -5 70 70 -5 70"
              />
            </g>
            <g id="Group-6" transform="translate(19.000000, 19.000000)">
              <mask id="mask-4" fill="white">
                <use xlinkHref="#path-3" />
              </mask>
              <g id="Clip-5" />
              <polygon
                id="Fill-4"
                fill="#FFFFFF"
                mask="url(#mask-4)"
                points="-4.37321 -4.83825 15.80536 -4.83825 15.80536 32.62325 -4.37321 32.62325"
              />
            </g>
            <g id="Group-9" transform="translate(34.000000, 19.000000)">
              <mask id="mask-6" fill="white">
                <use xlinkHref="#path-5" />
              </mask>
              <g id="Clip-8" />
              <polygon
                id="Fill-7"
                fill="#FFFFFF"
                mask="url(#mask-6)"
                points="-4.10536 -4.83825 16.07321 -4.83825 16.07321 32.62325 -4.10536 32.62325"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
};

export default PlayPauseButton;
