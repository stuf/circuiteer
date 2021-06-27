import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from 'state/app';
import { useAppState } from 'common/hooks/app';

export function Menu(props) {
  const {
    title = (
      <>
        Circuiteer<sub>&omega;</sub>
      </>
    ),
  } = props;

  const app = useAppState();

  if (!app.flags.menuVisible) return null;

  const config = {
    children: [
      {
        id: 'foo',
        body: () => <a href="#foo">Foo</a>,
      },
      {
        id: 'box1',
        body: ({ id }) => (
          <div className="checkbox">
            <input type="checkbox" id={id} />
            <label htmlFor={id}>Checkbox #1</label>
          </div>
        ),
      },
      {
        id: 'button',
        body: ({ id }) => (
          <button className="button--inverse">Button {id}</button>
        ),
      },
      {
        id: 'button2',
        body: ({ id }) => (
          <button className="button--inverse" disabled>
            Button 2 {id}
          </button>
        ),
      },
    ],
  };

  return (
    <>
      <div className="menu-root">
        <div className="menu">
          <button onClick={app.actions.toggleMenu} className="menu__close">
            &times;
          </button>

          <header className="menu__heading">{title}</header>

          <nav>
            <ul className="space-y">
              {config.children.map((item, i) => (
                <li key={i} className="menu__item">
                  {item.body(item)}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="menu-underlay" />
      </div>
    </>
  );
}
