import * as P from 'prop-types';

export default function Details(props) {
  const { children, title, open } = props;

  return (
    <details {...{ open: !!open }}>
      <summary>{title}</summary>

      <div>{children}</div>
    </details>
  );
}

Details.propTypes = {
  open: P.bool,
  title: P.oneOf([P.node, P.string]),
  children: P.oneOf([P.node, P.element, P.string]),
};

Details.defaultProps = {
  open: false,
};
