import PropTypes from 'prop-types';
import styles from '../../styles/common/Loading.module.css';

export default function Loading({ width, height }) {
  return (
    <div className={styles.LoadingWrapper} style={{ width, height }}>
      <svg
        width="204"
        height="179"
        viewBox="0 0 204 179"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="animated-path"
          opacity="1"
          d="M18.1085 159.952C18.1085 159.952 9.13259 118.958 21.6859 81.5401C42.1441 20.5816 77.3192 14.5582 95.2281 15.6011C125.733 17.389 147.241 47.1658 147.241 106.507C147.241 138.582 134.838 168.018 107.781 163.549C86.2522 159.994 79.8898 132.303 88.0517 104.74C97.0275 74.4311 138.287 40.5677 188.5 40.5677"
          stroke="url(#paint0_linear_480_3612)"
          strokeWidth="30"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_480_3612"
            x1="147.866"
            y1="40.8929"
            x2="15.3689"
            y2="154.146"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1B78FF" />
            <stop offset="1" stopColor="#1B78FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <style>
          {`
            #animated-path {
              stroke-dasharray: 578;
              stroke-dashoffset: 578;
              animation: draw 2s ease forwards infinite;
            }
  
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}
        </style>
      </svg>
      <div className={styles.LabelWrapper}>
        <label>조금만 기다려주세요</label>
        <label>홍보 전략을 분석하는 중이에요</label>
      </div>
    </div>
  );
}

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
