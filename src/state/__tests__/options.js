import reducer, {
  toggleHideInvalid,
  togglePowerStatus,
  toggleShoppingList,
  toggleEntityEditor,
  toggleMaterialRequirementBreakdown,
  toggleEfficiencyAsMultiplier,
} from '../options';

describe('state/options', () => {
  test('reducer does no-op on unhandled actions', () => {
    const r = reducer({}, {});
    expect(r).toEqual({});

    const r2 = reducer({}, { type: 'foo' });
    expect(r2).toEqual({});
  });

  describe('actions', () => {
    test('togglePowerStatus', () => {
      const a = togglePowerStatus();
      const r = reducer({}, a);
      const e = { flags: { showPowerStatus: true } };

      expect(r).toEqual(e);
    });

    test('toggleHideInvalid', () => {
      const a = toggleHideInvalid();
      const r = reducer({}, a);
      const e = { flags: { hideInvalid: true } };

      expect(r).toEqual(e);
    });

    test('toggleShoppingList', () => {
      const a = toggleShoppingList();
      const r = reducer({}, a);
      const e = { flags: { showShoppingList: true } };

      expect(r).toEqual(e);
    });

    test('toggleEntityEditor', () => {
      const a = toggleEntityEditor();
      const r = reducer({}, a);
      const e = { flags: { showEditor: true } };

      expect(r).toEqual(e);
    });

    test('toggleMaterialRequirementBreakdown', () => {
      const a = toggleMaterialRequirementBreakdown();
      const r = reducer({}, a);
      const e = { flags: { materialRequirementBreakdown: true } };

      expect(r).toEqual(e);
    });

    test('toggleEfficiencyAsMultiplier', () => {
      const a = toggleEfficiencyAsMultiplier();
      const r = reducer({}, a);
      const e = { flags: { showEfficiencyAsMultiplier: true } };

      expect(r).toEqual(e);
    });
  });
});
