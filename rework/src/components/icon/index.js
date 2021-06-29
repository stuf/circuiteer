import { createElement } from 'react';

const viewboxFor = (width, height) => [0, 0, width, height].join(' ');

const bindSvg = (Component, size = 24) => {
  const p = { viewbox: viewboxFor(size, size), width: size, height: size };

  return props => (
    <svg {...p}>
      <Component {...props} />
    </svg>
  );
};

const svg = {
  delete: props => (
    <>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
    </>
  ),

  sun: props => (
    <>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
    </>
  ),

  flashlight: props => (
    <>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13 9h8L11 24v-9H4l9-15v9zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11z" />
    </>
  ),
};

export const Delete = bindSvg(svg.delete);
export const Sun = bindSvg(svg.sun);
export const Flashlight = bindSvg(svg.flashlight);
