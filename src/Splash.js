import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logo = ({ className }) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <defs>
        <path id="a" d="M199 0l198.3 114.5v229L199 458 .7 343.5v-229z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(52 22)">
          <use fill="#D8126F" stroke="#D8126F" strokeWidth="16" href="#a" />
          <use stroke="#FFF" strokeWidth="6" href="#a" />
        </g>
        <path
          fill="#D8126F"
          stroke="#FFF"
          strokeWidth="6"
          d="M251 79.5l149 86v172l-149 86-149-86v-172l149-86z"
        />
        <path
          fill="#FFF"
          d="M169.5 182c24.4 0 48.3.4 72.2 1.4.2-12.4 1-22 2-28.9 2.4-.3 5.7-.5 9.4-.5 3 0 6.2.5 9.2 1.5 0 9-.5 18.7-1.2 28.7 24.9 1 49.5 2.7 73.9 4.7v7.2c0 4-.5 6.8-1 8.3-69.2 0-124.2-2-165-6-.8-1.3-1-4-1-8.2 0-2.8.5-5.5 1.5-8.3zm46.3 25.1c4.5 1.5 9 4.8 13.7 10-7 10.5-15.5 21.2-25.4 32 8 7.6 16.2 15.6 24.9 23.6 17.4-15 34.3-29 51-42.1 4.5 3.2 8.5 7 12.2 11-25.9 25.9-55 50.5-87.4 74.5a35 35 0 01-11.4-12c7.5-7 15.2-13.7 22.6-20.2a124.9 124.9 0 01-35.8-33.4c10.4-15 22.4-29.4 35.6-43.4zm94.3 55.6a36 36 0 0111 12.2c-29.9 26-60.8 50.7-92.9 74.1-5-3.7-8.7-8-11.4-12.7 29.3-27 60.5-51.6 93.3-73.6zm-8 46.7c10.3 8.4 19.7 17 28.2 25.6-3 4.3-7.5 7.8-13.5 10.3-11-8-20.4-16.7-28.8-25.7 4.4-4 9.2-7.3 14.1-10.2z"
        />
      </g>
    </svg>

    <div className="text-center mt-4 font-mono font-bold">etm12</div>
  </div>
);

export default function Splash() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.replace('/editor');
    }, 2000);
  });

  return (
    <div className="w-full h-full relative">
      <Logo className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72" />
    </div>
  );
}