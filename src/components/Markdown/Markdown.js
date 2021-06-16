import { useMemo } from 'react';
import * as P from 'prop-types';
import unified from 'unified';
import parse from 'remark-parse';
import remarkReact from 'remark-react';
import cx from 'classnames';

import './Markdown.css';

export function Markdown(props) {
  const { as = 'article', text } = props;

  const Content = as;

  const cns = {
    root: ['markdown', 'markdown--root'],
  };

  const content = useMemo(
    () => unified().use(parse).use(remarkReact).processSync(text),
    [text],
  );

  return (
    <>
      <Content className={cx(cns.root)}>{content.result}</Content>
    </>
  );
}

Markdown.propTypes = {
  as: P.oneOfType([P.node, P.elementType, P.string]),
  text: P.string,
};
