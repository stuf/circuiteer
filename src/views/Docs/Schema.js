import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import * as L from 'partial.lenses';
import cx from 'classnames';
import { Icon } from 'components';

import importSchema from 'schema/app/import';

export function Schema() {
  const currentVer = '0.1.0';
  const schemas = importSchema.oneOf;

  const schemaDict = schemas.reduce(
    (o, x) => L.set(x.properties.version.const, x, o),
    {},
  );

  const [state, setState] = useState(currentVer);

  return (
    <article className="container mx-auto">
      <h1>Importing data</h1>

      <div className="flex">
        <RadioGroup value={state} onChange={setState} className="w-64 pr-2">
          <RadioGroup.Label className="sr-only">Schemas</RadioGroup.Label>

          <div className="space-y-2">
            {Object.keys(schemaDict).map((v, i) => (
              <div className="rounded-md border-2 border-pink-500" key={v}>
                <RadioGroup.Option
                  value={v}
                  className={({ checked }) =>
                    cx(
                      checked && ['bg-pink-500 text-white'],
                      'relative',
                      'p-4',
                      'flex',
                    )
                  }
                >
                  {({ active, checked }) => (
                    <div className="text-sm">
                      {(checked || active) && (
                        <span
                          className={cx('absolute inset-y-0 flex items-center')}
                        >
                          <span
                            className={cx(
                              'w-6 h-6 rounded-full flex items-center justify-center',
                              checked && 'bg-white text-pink-700',
                              active && 'ring-2 ring-pink-500',
                            )}
                          >
                            {checked && <Icon name="checked" size={20} />}
                          </span>
                        </span>
                      )}
                      <div className="pl-10">
                        <RadioGroup.Label className="font-bold">
                          {v}
                        </RadioGroup.Label>

                        <RadioGroup.Description>
                          Highlights of this version
                        </RadioGroup.Description>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className="flex-grow border-2 rounded-md border-pink-500">
          <pre className="font-mono p-4">
            {JSON.stringify(schemaDict[state], null, 2)}
          </pre>
        </div>
      </div>
    </article>
  );
}
