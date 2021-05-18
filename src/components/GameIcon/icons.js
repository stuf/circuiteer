import _IconTierSmall from 'assets/icons/Icon_Tier_Small.png';
import _IconTierMedium from 'assets/icons/Icon_Tier_Medium.png';
import _IconTierLarge from 'assets/icons/Icon_Tier_Large.png';
import _IconTierExtraLarge from 'assets/icons/Icon_Tier_Extra_Large.png';
import _IconGenerator from 'assets/icons/Icon_Generator.png';
import _IconWindTurbine from 'assets/icons/Icon_Wind_Turbine.png';
import _IconSolarPanel from 'assets/icons/Icon_Solar.png';
import _IconCrane from 'assets/icons/Icon_Crane.png';
import _IconShredder from 'assets/icons/Icon_Shredder.png';
import _IconShelter from 'assets/icons/Icon_Shelter.png';
import _IconSmeltingFurnace from 'assets/icons/Icon_Smelting_Furnace.png';
import _IconSoilCentrifuge from 'assets/icons/Icon_Soil_Centrifuge.png';
import _IconChemistryLab from 'assets/icons/Icon_Chemistry_Lab.png';
import _IconAtmosphericCondenser from 'assets/icons/Icon_Atmospheric_Condenser.png';

// Gateway icons
import _IconGatewaySylva from 'assets/icons/Icon_Gateway_Sylva.png';
import _IconGatewayDesolo from 'assets/icons/Icon_Gateway_Desolo.png';
import _IconGatewayCalidor from 'assets/icons/Icon_Gateway_Calidor.png';
import _IconGatewayAtrox from 'assets/icons/Icon_Gateway_Atrox.png';

//

import { IconObject } from 'schema/data';

//

const mkIcon = (id, src) => new IconObject(id, src);

export const TierSmall = mkIcon('iconTierSmall', _IconTierSmall);
export const TierMedium = mkIcon('iconTierMedium', _IconTierMedium);
export const TierLarge = mkIcon('iconTierMedium', _IconTierLarge);
export const TierExtraLarge = mkIcon('iconTierExtraLarge', _IconTierExtraLarge);

export const Generator = mkIcon('generator', _IconGenerator);
export const WindTurbine = mkIcon('windTurbine', _IconWindTurbine);
export const SolarPanel = mkIcon('solarPanel', _IconSolarPanel);
export const Crane = mkIcon('crane', _IconCrane);
export const Shredder = mkIcon('shredder', _IconShredder);
export const Shelter = mkIcon('shelter', _IconShelter);
export const FieldShelter = mkIcon('fieldShelter', _IconShelter);
export const SoilCentrifuge = mkIcon('soilCentrifuge', _IconSoilCentrifuge);
export const ChemistryLab = mkIcon('chemistryLab', _IconChemistryLab);
export const SmeltingFurnace = mkIcon('smeltingFurnace', _IconSmeltingFurnace);
export const AtmosphericCondenser = mkIcon(
  'atmosphericCondenser',
  _IconAtmosphericCondenser,
);

// Gateway icons
export const GatewaySylva = mkIcon('gwSylva', _IconGatewaySylva);
export const GatewayDesolo = mkIcon('gwDesolo', _IconGatewayDesolo);
export const GatewayCalidor = mkIcon('gwCalidor', _IconGatewayCalidor);
export const GatewayAtrox = mkIcon('gwAtrox', _IconGatewayAtrox);
