import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as P from 'prop-types';
import cx from 'classnames';

import ajv from 'schema/app';

export function SchemaForm(props) {
  const { schemaName, data, onChange } = props;

  const { t } = useTranslation();

  const validate = ajv.getSchema(schemaName);

  const [state, setState] = useState({
    validJsonSyntax: true,
    errors: [],
    data:
      JSON.stringify(data) ??
      JSON.stringify({
        version: '0.2.0',
        entities: [],
      }),
  });

  useEffect(() => {
    if (!validate) {
      // What to do when we still don't have an instance
      return;
    }

    try {
      const json = JSON.parse(state.data);
      const valResult = validate(json);
      const valErrors = !valResult ? validate.errors : [];

      setState(s => ({ ...s, errors: valErrors, validJsonSyntax: true }));

      // console.log('before onChange', onChange);

      if (onChange) {
        console.count('onChange');
        onChange({ data: json, errors: valErrors });
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        setState(s => ({ ...s, validJsonSyntax: false }));
      }
    }
  }, [onChange, validate, state.data]);

  const sharedCns = [
    // 'absolute inset-0',
    'font-mono',
    'text-sm',
    'w-full',
    'px-4',
    'py-2',
    'overflow-auto',
    'whitespace-nowrap',
  ];

  const isValid = !state.validJsonSyntax || !state.errors.length;

  return (
    <>
      <div className="relative">
        <div className="m-0">
          <textarea
            aria-label={t('common:import')}
            rows={10}
            defaultValue={state.data}
            className={cx(
              sharedCns,
              'border-2',
              'rounded-md',

              'focus:outline-none',
              'ring-2 ring-transparent',
              'ring-offset-2 ring-offset-yellow-500',
              isValid && ['ring-offset-green-500'],
              !isValid && ['rounded-b-md ring-red-500'],
            )}
            onChange={e => {
              setState(s => ({ ...s, data: e.target.value }));
            }}
          />
        </div>

        {!state.validJsonSyntax && (
          <div
            aria-label={t('ui:modal.import.invalidJsonSyntax.label')}
            aria-live="polite"
            role="region"
            className="text-red-700 px-4 py-2"
          >
            {t('ui:modal.import.invalidJsonSyntax.label')}
          </div>
        )}

        <ul
          className="my-2"
          aria-hidden={!state.errors.length}
          aria-label={t('ui:modal.import.validationErrors.label')}
        >
          {state.errors.slice(0, 1).map((err, ix) => {
            return (
              <li key={`err-${ix}`} aria-label={err.message}>
                <pre className="font-mono">{JSON.stringify(err, null, 2)}</pre>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

SchemaForm.propTypes = {
  schemaName: P.string.isRequired,
  data: P.any,
  onChange: P.func,
};
