import * as P from 'prop-types';

export default function Details(props) {
  const { children, title, open } = props;

  return (
    <details {...{ open }}>
      <summary className="mb-2">{title}</summary>

      <div>{children}</div>
    </details>
  );
}

Details.propTypes = {
  open: P.bool,
  title: P.string,
  children: P.any,
};

Details.defaultProps = {
  open: false,
};
