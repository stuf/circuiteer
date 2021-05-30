import reducer, { showModal, hideModal, toggleModal } from '../modal';

let initialState;

beforeEach(() => {
  initialState = { modals: {} };
});

describe('state/modal', () => {
  test('reducer does no-op on unhandled actions', () => {
    expect(reducer({}, {})).toEqual({});
  });

  describe('actions', () => {
    test('showModal', () => {
      expect(reducer(initialState, showModal('foo'))).toEqual({
        modals: { foo: true },
      });
    });

    test('hideModal', () => {
      expect(reducer(initialState, hideModal('foo'))).toEqual({
        modals: { foo: false },
      });
    });

    test('toggleModal', () => {
      expect(reducer({ modals: { foo: true } }, toggleModal('foo'))).toEqual({
        modals: { foo: false },
      });
    });
  });
});
