# Importing data

```json
{
  "$id": "https://github.com/stuf/circuiteer/blob/master/src/schema/app/import.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Import",
  "oneOf": [
    {
      "type": "object",
      "required": ["version", "entities"],
      "properties": {
        "version": {
          "const": "0.1.0"
        },
        "entities": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "pos": {
                "type": "array",
                "minItems": 2,
                "maxItems": 2,
                "items": [
                  {
                    "type": "integer"
                  },
                  {
                    "type": "integer"
                  }
                ]
              },
              "module": {
                "type": "string"
              },
              "enabled": {
                "type": "boolean"
              }
            },
            "required": ["id", "pos", "module", "enabled"]
          }
        }
      }
    }
  ]
}
```