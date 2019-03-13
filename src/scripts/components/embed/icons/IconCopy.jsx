import React from "react";

const IconCopy = ({ copyEmbedToClipboard, embedCodeTextArea }) => (
  <svg
    className="expanded-embed__copy"
    height="34px"
    onClick={copyEmbedToClipboard.bind(this, embedCodeTextArea)}
    width="34px"
    viewBox="0 0 34 34"
    version="1.1"
    width="34px"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <path
        d="M15.52941,0.82353 C15.78918,0.82353 16,1.03435 16,1.29412 L16,20.117647 C16,20.377412 15.78918,20.588235 15.52941,20.588235 L0.470588,20.588235 C0.210824,20.588235 0,20.377412 0,20.117647 L0,1.29412 C0,1.03435 0.210824,0.82353 0.470588,0.82353 L2.82353,0.82353 L2.82353,16.823529 L13.17647,16.823529 L13.17647,0.82353 L15.52941,0.82353 Z"
        id="path-1"
      />
      <path
        d="M7.29412,0.47059 C7.55388,0.47059 7.76471,0.68141 7.76471,0.94118 C7.76471,1.20094 7.55388,1.41176 7.29412,1.41176 L0.70588,1.41176 C0.44612,1.41176 0.23529,1.20094 0.23529,0.94118 C0.23529,0.68141 0.44612,0.47059 0.70588,0.47059 L7.29412,0.47059 Z"
        id="path-3"
      />
      <path
        d="M7.29412,0.35294 C7.55388,0.35294 7.76471,0.56376 7.76471,0.82353 C7.76471,1.08329 7.55388,1.29412 7.29412,1.29412 L0.70588,1.29412 C0.44612,1.29412 0.23529,1.08329 0.23529,0.82353 C0.23529,0.56376 0.44612,0.35294 0.70588,0.35294 L7.29412,0.35294 Z"
        id="path-5"
      />
      <path
        d="M7.29412,0.23529 C7.55388,0.23529 7.76471,0.44612 7.76471,0.70588 C7.76471,0.96565 7.55388,1.17647 7.29412,1.17647 L0.70588,1.17647 C0.44612,1.17647 0.23529,0.96565 0.23529,0.70588 C0.23529,0.44612 0.44612,0.23529 0.70588,0.23529 L7.29412,0.23529 Z"
        id="path-7"
      />
      <path
        d="M0.70588,0.11765 L7.29412,0.11765 C7.55388,0.11765 7.76471,0.32847 7.76471,0.58824 C7.76471,0.848 7.55388,1.05882 7.29412,1.05882 L0.70588,1.05882 C0.44612,1.05882 0.23529,0.848 0.23529,0.58824 C0.23529,0.32847 0.44612,0.11765 0.70588,0.11765 Z"
        id="path-9"
      />
      <path
        d="M1.23529,6.58824 C0.97553,6.58824 0.76471,6.37741 0.76471,6.11765 L0.76471,2.35294 C0.76471,2.09318 0.97553,1.88235 1.23529,1.88235 L2.69412,1.88235 C2.91153,0.81224 3.88659,0 5,0 C6.10965,0 7.08753,0.80941 7.30588,1.88235 L8.76471,1.88235 C9.02447,1.88235 9.23529,2.09318 9.23529,2.35294 L9.23529,6.11765 C9.23529,6.37741 9.02447,6.58824 8.76471,6.58824 L1.23529,6.58824 Z"
        id="path-11"
      />
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="copyButton" transform="translate(1.000000, 1.000000)">
        <polygon
          id="Stroke-1"
          stroke="#0FB3CC"
          strokeWidth="2"
          points="0 0 32 0 32 32 0 32"
        />
        <g id="Group-5" transform="translate(8.000000, 7.000000)">
          <mask id="mask-2" fill="white">
            <use xlinkHref="#path-1" />
          </mask>
          <g id="Clip-4" />
          <polygon
            id="Fill-3"
            fill="#0FB3CC"
            mask="url(#mask-2)"
            points="-5 -4.17647 21 -4.17647 21 25.5882353 -5 25.5882353"
          />
        </g>
        <g id="Group-8" transform="translate(12.000000, 13.000000)">
          <mask id="mask-4" fill="white">
            <use xlinkHref="#path-3" />
          </mask>
          <g id="Clip-7" />
          <polygon
            id="Fill-6"
            fill="#0FB3CC"
            mask="url(#mask-4)"
            points="-4.764706 -4.52941 12.76471 -4.52941 12.76471 6.41176 -4.764706 6.41176"
          />
        </g>
        <g id="Group-11" transform="translate(12.000000, 15.000000)">
          <mask id="mask-6" fill="white">
            <use xlinkHref="#path-5" />
          </mask>
          <g id="Clip-10" />
          <polygon
            id="Fill-9"
            fill="#0FB3CC"
            mask="url(#mask-6)"
            points="-4.764706 -4.64706 12.76471 -4.64706 12.76471 6.29412 -4.764706 6.29412"
          />
        </g>
        <g id="Group-14" transform="translate(12.000000, 17.000000)">
          <mask id="mask-8" fill="white">
            <use xlinkHref="#path-7" />
          </mask>
          <g id="Clip-13" />
          <polygon
            id="Fill-12"
            fill="#0FB3CC"
            mask="url(#mask-8)"
            points="-4.764706 -4.76471 12.76471 -4.76471 12.76471 6.176471 -4.764706 6.176471"
          />
        </g>
        <g id="Group-17" transform="translate(12.000000, 19.000000)">
          <mask id="mask-10" fill="white">
            <use xlinkHref="#path-9" />
          </mask>
          <g id="Clip-16" />
          <polygon
            id="Fill-15"
            fill="#0FB3CC"
            mask="url(#mask-10)"
            points="-4.764706 -4.88235 12.76471 -4.88235 12.76471 6.058824 -4.764706 6.058824"
          />
        </g>
        <g id="Group-20" transform="translate(11.000000, 5.000000)">
          <mask id="mask-12" fill="white">
            <use xlinkHref="#path-11" />
          </mask>
          <g id="Clip-19" />
          <polygon
            id="Fill-18"
            fill="#0FB3CC"
            mask="url(#mask-12)"
            points="-4.235294 -5 14.23529 -5 14.23529 11.58824 -4.235294 11.58824"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default IconCopy;
