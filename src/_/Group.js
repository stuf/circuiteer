import * as P from 'prop-types';

export default function Group(props) {
  const { title, children } = props;

  return (
    <section className="">
      <header className="font-bold mb-2">{title}</header>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

Group.propTypes = {
  children: P.oneOf([P.node, P.element, P.string]),
  title: P.oneOf([P.node, P.string]),
};
