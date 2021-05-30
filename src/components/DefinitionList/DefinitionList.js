import { Fragment } from 'react';
import * as P from 'prop-types';
import cx from 'classnames';

import './DefinitionList.css';

export function DefinitionList(props) {
  const { className, items, name } = props;

  const cns = {
    root: ['definition-list', className],
    key: ['definition-list__key'],
    value: ['definition-list__value'],
  };

  return (
    <dl className={cx(cns.root)}>
      {items.map(({ id, key, value }, ix) => {
        const kvName = [name, id].join('-');

        return (
          <Fragment key={ix}>
            <dt className={cx(cns.key)} id={kvName}>
              {key}
            </dt>
            <dd className={cx(cns.value)} aria-labelledby={kvName}>
              {value}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  );
}

DefinitionList.propTypes = {
  className: P.string,
  items: P.arrayOf(
    P.shape({
      id: P.string,
      key: P.string,
      value: P.oneOfType([P.node, P.elementType, P.string]),
    }),
  ).isRequired,
  name: P.string.isRequired,
};

DefinitionList.defaultProps = {
  items: [],
};
