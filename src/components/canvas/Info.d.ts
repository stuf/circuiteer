import { FunctionComponent } from 'react';

export interface Props {
  className?: string;
  location: Hooks.Locations.UseGameLocationsHook;
  power: Hooks.Derived.UsePowerEfficiencyHook;
  flags: Record<string, boolean>;
}

export const Info: FunctionComponent<Props>;
