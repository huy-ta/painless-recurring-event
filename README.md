# Painless Recurring Event

A Painless-code generator written in NodeJS to handle recurring events in Elasticsearch. It's still just an idea to test out.

## How to test this

- First, you need to build the Painless script:

```cmd
node script-generator.js
```

- Second, copy paste the content of `build/final-script.min.painless` into the query script. An example of the Elasticsearch query may look like this:

```json
{
  "stored_fields": [
    "_source"
  ],
  "query": {
    "function_score": {
      "query": {
        "bool": {
          "must": [
            {
              "multi_match": {
                "query": "event",
                "type": "cross_fields",
                "fields": [
                  "summary",
                  "location",
                  "description",
                  "organizer.cn",
                  "organizer.email",
                  "attendees.email",
                  "attendees.cn"
                ],
                "operator": "and",
                "tie_breaker": 0.5
              }
            }
          ]
        }
      },
      "min_score": 0,
      "boost_mode": "replace",
      "functions": [
        {
          "script_score": {
            "script": {
              "lang": "painless",
              "source": "// paste the Painless script here;",
              "params": {
                "start": 1564717569669,
                "end": 1564717669669
              }
            }
          }
        }
      ]
    }
  }
}
```

## Notes

- This only works for simple rules that the OpenPaaS's frontend app (1.6.x) currently supports. For the rules that are not supported by this Painless script, we should have a way to detect them and fall back to the naive approach using `start` and `lastOccurrence` fields.
- There's currently no way to write tests for Painless script. We can, however, set up an Elasticsearch instance, do some event provisioning and insert the Painless script into it to see if it works correctly.
