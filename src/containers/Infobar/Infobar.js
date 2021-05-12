import * as L from 'partial.lenses';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { LightningBoltIcon } from '@heroicons/react/solid';

import Button from '_/Button';

export function Infobar() {
  const location = useSelector(
    L.get([
      'location',
      L.choose(o =>
        o.current ? ['locations', L.find(R.whereEq({ name: o.current }))] : [],
      ),
    ]),
  );

  return (
    <div className="flex justify-between w-full border-b-2 px-4 py-1 items-center">
      <div className="space-x-1">
        <Button icon={LightningBoltIcon}>Power</Button>
        <Button>Poop</Button>
      </div>

      <div className="flex space-x-4">
        <span className="font-bold">Efficiency</span>

        {/* <span className={location.wind < 1 ? 'text-red-500' : 'text-green-500'}>
          Wind {location.wind.toFixed(2)}
        </span>
        <span className={location.sun < 1 ? 'text-red-500' : 'text-green-500'}>
          Sun {location.sun.toFixed(2)}
        </span> */}
      </div>
    </div>
  );
}
