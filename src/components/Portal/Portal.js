import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function Portal(props) {
  const { className, children, el = 'div' } = props;

  /**
   * @type {[HTMLElement, import('react').Dispatch<HTMLElement>]}
   */
  const s = useState(document.createElement(el));
  const container = s[0];

  const classNames = className.split(' ');

  container.classList.add('portal', 'portal--root');
  container.classList.add(...classNames);

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children);
}
