import { useSelector } from 'react-redux';
import * as L from 'partial.lenses';
import cx from 'classnames';

import css from './PowerStatus.module.css';

const editorEntities = ['editor', 'entities'];
const modulePower = ['module', 'power'];

const KeyValue = ({ label, value }) => (
  <div
    className={cx(css.kvp, {
      [css.negative]: value < 0,
      [css.positive]: value > 0,
    })}
  >
    <dt className={css.label}>{label}</dt>
    <dd className={css.value}>{value}</dd>
  </div>
);

function PowerStatus(props) {
  const { className } = props;

  const power = useSelector(L.collect([editorEntities, L.elems, modulePower]));
  const usage = L.sum([L.elems, L.when(x => x < 0)], power);
  const production = L.sum([L.elems, L.when(x => x > 0)], power);
  const sum = usage + production;

  return (
    <div className={className}>
      <dl className={css.root}>
        <KeyValue label="Production" value={production} />
        <KeyValue label="Usage" value={usage} />
        <KeyValue label="Sum" value={sum} />
      </dl>
    </div>
  );
}

export default PowerStatus;
