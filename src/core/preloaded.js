export const preloadedState = {
  application: {
    splash: {
      delay: 1000,
      show: true,
    },
  },
  drag: {
    dragging: false,
    pos: [0, 0],
    size: [4, 4],
  },
  editor: {
    dragging: false,
    current: null,
    entities: [
      {
        id: '262ec14e-940b-41b3-8c4a-6958afff5332',
        pos: [2, 2],
        module: 'shelter',
        enabled: false,
      },
      {
        id: '9d2d6e06-7e1f-4021-b4cb-dbbb7b6515d0',
        pos: [9, 1],
        module: 'mediumWindTurbine',
        enabled: true,
      },
      {
        id: '2fb98a1d-0738-4def-bf52-f0c91a0e1e45',
        pos: [1, 9],
        module: 'mediumSolarPanel',
        enabled: false,
      },
      {
        id: 'ff6de281-5345-4ff4-af7c-eb9f2afd8694',
        module: 'mediumShredder',
        pos: [9, 5],
        enabled: true,
      },
      {
        id: '5b4c6fc0-5066-4962-973b-9d62316e4fa7',
        module: 'mediumShredder',
        pos: [5, 9],
        enabled: false,
      },
      {
        pos: [22, 2],
        module: 'qtRtg',
        enabled: true,
        id: '96da73e5-9776-44d6-b526-6ed7f47ac9ee',
      },
      {
        pos: [22, 4],
        module: 'qtRtg',
        enabled: true,
        id: '6fc5d160-d017-4db5-8279-63725936ee23',
      },
      {
        pos: [22, 6],
        module: 'rtg',
        enabled: true,
        id: '45fa3e7e-9e1e-4188-ac17-809a3a5847b8',
      },
      {
        pos: [22, 9],
        module: 'rtg',
        enabled: true,
        id: '4d7f50d9-1fb7-4fe7-bc30-001fb94eed41',
      },
      {
        pos: [12, 2],
        module: 'xlargeWindTurbine',
        enabled: true,
        id: '641f9330-d802-45a5-80f9-0b7a45a59a10',
      },
      {
        pos: [11, 9],
        module: 'mediumGenerator',
        enabled: true,
        id: '258a9d97-ac01-4849-84a1-381a2c915fc1',
      },
      {
        pos: [15, 9],
        module: 'mediumGenerator',
        enabled: true,
        id: 'c03c7c14-416e-4ec8-b6b9-29b656573c98',
      },
      {
        pos: [19, 9],
        module: 'mediumBattery',
        enabled: true,
        id: '58a2e641-e2f8-4fba-a079-ff937e760837',
      },
      {
        pos: [19, 5],
        module: 'mediumSolarPanel',
        enabled: true,
        id: 'db75958a-c48b-4a0b-b91e-2c8b6381c1c4',
      },
      {
        pos: [36, 3],
        module: 'largeSolarPanel',
        enabled: true,
        id: '83fb60a4-c57a-4d79-8f99-0d6faf7d3912',
      },
    ],
  },
  grid: {
    size: [48, 48],
  },
  location: {
    locations: [
      {
        id: 'sylva',
        difficulty: 'easy',
        wind: 1,
        sun: 1,
        cycle: [720, 60],
      },
      {
        id: 'desolo',
        difficulty: 'easy',
        wind: 0.5,
        sun: 1.5,
        cycle: 115,
      },
      {
        id: 'calidor',
        difficulty: 'medium',
        wind: 0.5,
        sun: 1.75,
      },
      {
        id: 'vesania',
        difficulty: 'medium',
        wind: 0.5,
        sun: 1.5,
      },
      {
        id: 'novus',
        difficulty: 'medium',
        wind: 1.5,
        sun: 1.5,
      },
      {
        id: 'glacio',
        difficulty: 'hard',
        wind: 1.75,
        sun: 0.25,
      },
      {
        id: 'atrox',
        difficulty: 'veryHard',
        wind: 0.5,
        sun: 0.5,
      },
    ],
    current: 'calidor',
  },
  module: {
    modules: {
      smallWindTurbine: {
        id: 'smallWindTurbine',
        shortId: 'swt',
        power: 1.5,
        powerType: 'wind',
        tier: 1,
        size: [1, 1],
      },
      smallSolarPanel: {
        id: 'smallSolarPanel',
        shortId: 'ss',
        power: 1,
        powerType: 'sun',
        tier: 1,
        size: [1, 1],
      },
      smallGenerator: {
        id: 'smallGenerator',
        shortId: 'sg',
        power: 2,
        powerType: 'powered',
        tier: 1,
        size: [1, 1],
      },
      qtRtg: {
        id: 'qtRtg',
        shortId: 'qr',
        power: 1,
        powerType: 'always',
        tier: 1,
        size: [1, 1],
      },
      smallBattery: {
        id: 'smallBattery',
        shortId: 'sb',
        power: 1,
        powerType: 'powered',
        capacity: 32,
        tier: 1,
        size: [1, 1],
      },
      portableOxygenator: {
        id: 'portableOxygenator',
        shortId: 'po',
        power: -1,
        tier: 1,
        size: [1, 1],
      },
      fieldShelter: {
        id: 'fieldShelter',
        shortId: 'fs',
        power: 0.5,
        powerType: 'always',
        tier: 2,
        size: [2, 2],
      },
      mediumWindTurbine: {
        id: 'mediumWindTurbine',
        shortId: 'mwt',
        power: 5,
        powerType: 'wind',
        tier: 2,
        size: [2, 2],
      },
      mediumSolarPanel: {
        id: 'mediumSolarPanel',
        shortId: 'msp',
        power: 4,
        powerType: 'sun',
        tier: 2,
        size: [2, 2],
      },
      mediumGenerator: {
        id: 'mediumGenerator',
        shortId: 'mg',
        power: 9,
        powerType: 'powered',
        tier: 2,
        size: [2, 2],
      },
      mediumBattery: {
        id: 'mediumBattery',
        shortId: 'mb',
        power: 5,
        powerType: 'powered',
        capacity: 512,
        tier: 2,
        size: [2, 2],
      },
      rtg: {
        id: 'rtg',
        shortId: 'rtg',
        power: 4,
        powerType: 'always',
        tier: 2,
        size: [2, 2],
      },
      autoArm: {
        id: 'autoArm',
        shortId: 'aa',
        power: -1,
        tier: 2,
        size: [2, 2],
      },
      mediumShredder: {
        id: 'mediumShredder',
        shortId: 'ms',
        power: -5,
        tier: 2,
        size: [2, 2],
      },
      largeWindTurbine: {
        id: 'largeWindTurbine',
        shortId: 'lwt',
        power: 10,
        powerType: 'wind',
        tier: 3,
        size: [4, 4],
      },
      largeSolarPanel: {
        id: 'largeSolarPanel',
        shortId: 'lsp',
        power: 8,
        powerType: 'sun',
        tier: 3,
        size: [4, 4],
      },
      researchChamber: {
        id: 'researchChamber',
        shortId: 'rc',
        power: -2,
        tier: 3,
        size: [4, 4],
      },
      smeltingFurnace: {
        id: 'smeltingFurnace',
        shortId: 'sf',
        power: -5,
        tier: 3,
        size: [4, 4],
      },
      soilCentrifuge: {
        id: 'soilCentrifuge',
        shortId: 'sc',
        power: -6,
        tier: 3,
        size: [4, 4],
      },
      chemistryLab: {
        id: 'chemistryLab',
        shortId: 'cl',
        power: -10,
        tier: 3,
        size: [4, 4],
      },
      atmosphericCondenser: {
        id: 'atmosphericCondenser',
        shortId: 'ac',
        power: -20,
        tier: 3,
        size: [4, 4],
      },
      largeShredder: {
        id: 'largeShredder',
        shortId: 'ls',
        power: -7.5,
        tier: 3,
        size: [4, 4],
      },
      shelter: {
        id: 'shelter',
        shortId: 's',
        power: 1,
        powerType: 'always',
        size: [8, 8],
        tier: 4,
      },
      xlargeWindTurbine: {
        id: 'xlargeWindTurbine',
        shortId: 'xlwt',
        power: 17,
        powerType: 'wind',
        tier: 4,
        size: [8, 8],
      },
      solarArray: {
        id: 'solarArray',
        shortId: 'sa',
        power: 14,
        tier: 4,
        size: [8, 8],
      },
      extraLargeShredder: {
        id: 'extraLargeShredder',
        shortId: 'xls',
        power: -10,
        tier: 4,
        size: [8, 8],
      },
      wreckedSolarArray: {
        id: 'wreckedSolarArray',
        shortId: 'wsa',
        power: 64,
        powerType: 'sun',
        tier: -1,
        size: [16, 16],
      },
    },
  },
  options: {
    flags: {
      hideInvalid: false,
      showEditor: true,
      showEfficiencyAsMultiplier: true,
      showPowerStatus: true,
      showShoppingList: true,
    },
  },
  experiment: {
    ids: [],
    entities: {},
  },
};