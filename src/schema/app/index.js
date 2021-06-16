import Ajv from 'ajv';

import importSchema from './import.json';

const ajv = new Ajv();

ajv.addSchema(importSchema, 'import');

export default ajv;
