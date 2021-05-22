import * as P from 'prop-types';

export function ShoppingList(props) {
  const { entities } = props;

  return <div>shopping list</div>;
}

ShoppingList.propTypes = {
  entities: P.arrayOf(P.object),
};

ShoppingList.defaultProps = {
  entities: [],
};
