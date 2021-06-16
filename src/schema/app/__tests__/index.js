import ajv from '../index';

test('import', () => {
  const validate = ajv.getSchema('import');

  const r1 = validate({});
  const e1 = [...validate.errors];

  expect(r1).toBeFalse();
  expect(e1).not.toHaveLength(0);

  const r2 = validate({ version: '0.1.0', entities: [] });
  const e2 = [...(validate.errors ?? [])];

  expect(r2).toBeTrue();
  expect(e2).toHaveLength(0);
});
