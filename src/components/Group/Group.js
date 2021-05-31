import * as P from 'prop-types';

export function Group(props) {
  const { title, children, className } = props;

  return (
    <section className={className}>
      <header className="font-bold mb-2" aria-label={title}>
        {title}
      </header>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

Group.propTypes = {
  children: P.any,
  title: P.string,
};
