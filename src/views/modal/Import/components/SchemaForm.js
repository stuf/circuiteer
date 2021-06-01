import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as L from 'partial.lenses';
import * as P from 'prop-types';
import Ajv from 'ajv';
import cx from 'classnames';

export function SchemaForm(props) {
  const { schema, data } = props;

  const { t } = useTranslation();

  /**
   * @type {React.MutableRefObject<{ ajv: Ajv }>}
   */
  const ajvRef = useRef({});
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
    const ajvInstance = new Ajv();
    ajvRef.current.ajv = ajvInstance;
    ajvRef.current.validate = ajvInstance.compile(schema);
  }, [schema]);

  const { ajv, validate } = ajvRef.current;

  useEffect(() => {
    if (!ajv || !validate) {
      // What to do when we still don't have an instance
      return;
    }

    try {
      const json = JSON.parse(state.data);
      const valResult = validate(json);
      const valErrors = !valResult ? validate.errors : [];

      // if (valErrors) {
      //   console.log({ valErrors });
      // }

      setState(s => ({ ...s, errors: valErrors, validJsonSyntax: true }));
    } catch (e) {
      if (e instanceof SyntaxError) {
        setState(s => ({ ...s, validJsonSyntax: false }));
      }
    }
  }, [ajv, validate, state.data]);

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
              state.validJsonSyntax && ['ring-offset-green-500'],
              !state.validJsonSyntax && ['rounded-b-md ring-red-500'],
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
          aria-hidden={!state.errors.length}
          aria-label={t('ui:modal.import.validationErrors.label')}
        >
          {state.errors.map((err, ix) => {
            const path = err.instancePath;
            const data = L.get(L.pointer(path), state.data);

            return (
              <li key={`err-${ix}`} aria-label={err.message}>
                {path} {JSON.stringify(data)}
              </li>
            );
          })}
        </ul>

        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </>
  );
}

SchemaForm.propTypes = {
  schema: P.any,
};
