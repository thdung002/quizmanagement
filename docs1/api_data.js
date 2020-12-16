define({ "api": [
  {
    "type": "POST",
    "url": "/v1/answer/add",
    "title": "Create One answer",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "Answer",
    "permission": [
      {
        "name": "just administrator or super administrator"
      }
    ],
    "description": "<p>Create answer by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Question",
            "description": "<p>question id of question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>answer content</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "IsCorrect",
            "description": "<p>1 is correct, 0 is false. Not using when it is match question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CorrectAnswer",
            "description": "<p>Using for only fill type question - if not using put null</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/answer/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of created answer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"answer added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "DELETE",
    "url": "/v1/Answer/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "Answer",
    "permission": [
      {
        "name": "just admin Answer"
      }
    ],
    "description": "<p>delete Answer</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of Answer</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/Answer/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted Answer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Answer delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "GET",
    "url": "/v1/answer/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Answer",
    "permission": [
      {
        "name": "All user"
      }
    ],
    "description": "<p>Get all answers</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>content for sort</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "IsCorrect",
            "description": "<p>correct answer</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/answer/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n  \"items\": {\"begin\": 1, \"end\": 3, \"total\": 2},\n  \"pages\": {\"current\": 1, \"prev\": 0, \"hasPrev\": false, \"next\": 2, \"hasNext\": true, \"total\": 4},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "Answer",
    "permission": [
      {
        "name": "every type of user"
      }
    ],
    "description": "<p>Get one answer</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of question, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/answers/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Question",
            "description": "<p>Id of question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>answer content</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CorrectAnswer",
            "description": "<p>Answer for filling question</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "IsCorrect",
            "description": "<p>correct answer for multiple choice, 1 is correct, 0 is fail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"answer get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Question\": 3,\n         \"Content\": \"This is answer B\",\n         \"CorrectAnswer\": \"This is column 2\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "GET",
    "url": "/v1/answer/getactive",
    "title": "Get active List",
    "version": "1.0.0",
    "name": "getactive",
    "group": "Answer",
    "permission": [
      {
        "name": "All user"
      }
    ],
    "description": "<p>Get all answers active</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/answer/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "PUT",
    "url": "/v1/answer/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Answer",
    "permission": [
      {
        "name": "every type of user"
      }
    ],
    "description": "<p>Update Answer information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of Answer where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CorrectAnwser",
            "description": "<p>Correct Answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "IsCorrect",
            "description": "<p>Correct value 1 or 0</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/Answer/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of updated Answer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Answer update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/answer.js",
    "groupTitle": "Answer"
  },
  {
    "type": "POST",
    "url": "/v1/config/add",
    "title": "Create One config",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "Config",
    "description": "<p>Create config by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "NumberQuestionLevel1-10",
            "description": "<p>Total question of each level(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Totalquestion",
            "description": "<p>Total question at all(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/config/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"config added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "DELETE",
    "url": "/v1/config/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "Config",
    "description": "<p>delete Config</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of Config</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/config/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted Config</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Config delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "GET",
    "url": "/v1/config/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Config",
    "description": "<p>Get all configs</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/config/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"Config get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"NumberQuestionLevel1\": 1,\n               \"NumberQuestionLevel2\": null,\n               \"NumberQuestionLevel3\": null,\n               \"NumberQuestionLevel4\": null,\n               \"NumberQuestionLevel5\": null,\n               \"NumberQuestionLevel6\": null,\n               \"NumberQuestionLevel7\": null,\n               \"NumberQuestionLevel8\": null,\n               \"NumberQuestionLevel9\": null,\n               \"NumberQuestionLevel10\": null,\n               \"TotalQuestion\": 1,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:04:57.000Z\",\n               \"UpdatedBy\": 1,\n               \"UpdatedAt\": null\n          }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 2\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "GET",
    "url": "/v1/config/getactiveconfig",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Config",
    "permission": [
      {
        "name": "All user"
      }
    ],
    "description": "<p>Get all active config</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/config/getactiveconfig",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "Config",
    "description": "<p>Get one config</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Config</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/config/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"config get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Examination\": 3,\n         \"Config\": \"1\",\n         \"Template\": \"1\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "PUT",
    "url": "/v1/config/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Config",
    "description": "<p>Update Config information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "NumberQuestionLevel1-10",
            "description": "<p>Total question of each level(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Totalquestion",
            "description": "<p>Total question at all(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/config/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Config update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/config.js",
    "groupTitle": "Config"
  },
  {
    "type": "POST",
    "url": "/v1/exam/add",
    "title": "Create One account",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "Exam",
    "permission": [
      {
        "name": "All user"
      }
    ],
    "description": "<p>Create Exam by all user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Duration",
            "description": "<p>time of the exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Semester",
            "description": "<p>Semester time of the exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Notes",
            "description": "<p>notes of lecturer for the exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Department",
            "description": "<p>Department name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Course",
            "description": "<p>course name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "CourseCode",
            "description": "<p>course code of course</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AcademicYear",
            "description": "<p>year of the exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Lecturer",
            "description": "<p>lecturer name</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/exam/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of created Exam</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"Exam added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "DELETE",
    "url": "/v1/exam/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "Exam",
    "permission": [
      {
        "name": "just admin Exam"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>json web token to access to data</p>"
          }
        ]
      }
    },
    "description": "<p>delete Exam</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of Exam</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/exam/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted Exam</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Exam delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "GET",
    "url": "/v1/exam/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Exam",
    "permission": [
      {
        "name": "only Super administrator"
      }
    ],
    "description": "<p>Get all Exams</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lecturer",
            "description": "<p>get exam by lecturer</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/exam/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n  \"items\": {\"begin\": 1, \"end\": 3, \"total\": 2},\n  \"pages\": {\"current\": 1, \"prev\": 0, \"hasPrev\": false, \"next\": 2, \"hasNext\": true, \"total\": 4},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "GET",
    "url": "/v1/exam/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "Exam",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>json web token to access to data</p>"
          }
        ]
      }
    },
    "description": "<p>Get one Exam</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of question, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/exams/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"Exam get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Question\": 3,\n         \"Content\": \"This is Exam B\",\n         \"CorrectExam\": \"This is column 2\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "GET",
    "url": "/v1/exam/getactive",
    "title": "",
    "version": "1.0.0",
    "name": "getOne",
    "group": "Exam",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": "<p>json web token to access to data</p>"
          }
        ]
      }
    },
    "description": "<p>Get one Exam</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/exams/getactive",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"Exam get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Question\": 3,\n         \"Content\": \"This is Exam B\",\n         \"CorrectExam\": \"This is column 2\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "PUT",
    "url": "/v1/exam/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Exam",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Update Exam information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of Exam, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Duration",
            "description": "<p>Time of Exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Semester",
            "description": "<p>Semester of Exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Notes",
            "description": "<p>Note of lecturer for exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Department",
            "description": "<p>Department of exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Course",
            "description": "<p>Course name of exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Coursecode",
            "description": "<p>Code of course</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AcademicYear",
            "description": "<p>Year of exam</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Lecturer",
            "description": "<p>Name of lecturer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/exam/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of updated Exam</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Exam update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/examination.js",
    "groupTitle": "Exam"
  },
  {
    "type": "POST",
    "url": "/v1/quiz/add",
    "title": "Create One quiz",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "Quiz",
    "description": "<p>Create quiz by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Examination",
            "description": "<p>Examination of the quiz (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Config",
            "description": "<p>Config of the quiz (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Template",
            "description": "<p>Template of the quiz(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>Code of the quiz(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quiz/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"quiz added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quiz.js",
    "groupTitle": "Quiz"
  },
  {
    "type": "DELETE",
    "url": "/v1/quiz/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "Quiz",
    "description": "<p>delete Quiz</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of Quiz</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/cuiz/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted Quiz</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Quiz delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quiz.js",
    "groupTitle": "Quiz"
  },
  {
    "type": "GET",
    "url": "/v1/quiz/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Quiz",
    "description": "<p>Get all quizs</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quiz/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"Quiz get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"Examination\": 1,\n               \"Config\": 1,\n               \"Template\": 1,\n               \"Code\": 1,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n               \"UpdatedBy\": null,\n               \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n           }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 2\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quiz.js",
    "groupTitle": "Quiz"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "Quiz",
    "description": "<p>Get one quiz</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Examination</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/quiz/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"quiz get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Examination\": 3,\n         \"Config\": \"1\",\n         \"Template\": \"1\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quiz.js",
    "groupTitle": "Quiz"
  },
  {
    "type": "PUT",
    "url": "/v1/quiz/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Quiz",
    "description": "<p>Update Quiz information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of Quiz where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Examination",
            "description": "<p>Id Examination of Quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Config",
            "description": "<p>Id config of Quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Template",
            "description": "<p>Id of Quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Code",
            "description": "<p>Id Code of Quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quiz/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Quiz update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quiz.js",
    "groupTitle": "Quiz"
  },
  {
    "type": "POST",
    "url": "/v1/template/add",
    "title": "Create One Template",
    "version": "1.0.0",
    "name": "create_template",
    "group": "Template",
    "permission": [
      {
        "name": "just administrator or super administrator"
      }
    ],
    "description": "<p>Create Template by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TemplateName",
            "description": "<p>name of the template</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>description about template</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "HeaderContent",
            "description": "<p>a long html content for head - get in examination</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Quiz",
            "description": "<p>Quiz content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "QuestionContent",
            "description": "<p>a long html content for question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AnswerContent",
            "description": "<p>a long html content for answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FooterContent",
            "description": "<p>a long html for footer content</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/template/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of created Template</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"Template added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/template.js",
    "groupTitle": "Template"
  },
  {
    "type": "DELETE",
    "url": "/v1/template/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "Template",
    "permission": [
      {
        "name": "just admin Template"
      }
    ],
    "description": "<p>delete Template</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of Template, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/template/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted Template</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Template delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/template.js",
    "groupTitle": "Template"
  },
  {
    "type": "GET",
    "url": "/v1/template/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "get_all_template",
    "group": "Template",
    "permission": [
      {
        "name": "only Super administrator"
      }
    ],
    "description": "<p>Get all Templates</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/template/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n  \"items\": {\"begin\": 1, \"end\": 3, \"total\": 2},\n  \"pages\": {\"current\": 1, \"prev\": 0, \"hasPrev\": false, \"next\": 2, \"hasNext\": true, \"total\": 4},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/template.js",
    "groupTitle": "Template"
  },
  {
    "type": "GET",
    "url": "/v1/template/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "get_one_template_by_id",
    "group": "Template",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Get one Template</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of question, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/templates/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Template</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Question",
            "description": "<p>Id of question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Template content</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CorrectTemplate",
            "description": "<p>Template for filling question</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "IsCorrect",
            "description": "<p>correct Template for multiple choice, 1 is correct, 0 is fail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"Template get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Question\": 3,\n         \"Content\": \"This is Template B\",\n         \"CorrectTemplate\": \"This is column 2\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/template.js",
    "groupTitle": "Template"
  },
  {
    "type": "PUT",
    "url": "/v1/template/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Template",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Update Template information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of Template where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TemplateName",
            "description": "<p>name of the template</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Description",
            "description": "<p>description about template</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "HeaderContent",
            "description": "<p>a long html content for head - get in examination</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Quiz",
            "description": "<p>Quiz content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "QuestionContent",
            "description": "<p>a long html content for question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "AnswerContent",
            "description": "<p>a long html content for answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "FooterContent",
            "description": "<p>a long html for footer content</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/template/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of updated Template</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Template update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/template.js",
    "groupTitle": "Template"
  },
  {
    "type": "GET",
    "url": "/v1/topic/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Topic",
    "description": "<p>Get all topics</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/topic/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"Topic get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"Content\": \"hehe\",\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-10T02:46:21.000Z\",\n               \"UpdatedBy\": 1,\n               \"UpdatedAt\": \"2020-09-11T03:01:53.000Z\"\n           }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 5\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "GET",
    "url": "/v1/topic/getactivetopic",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "Topic",
    "permission": [
      {
        "name": "All user"
      }
    ],
    "description": "<p>Get all active topic</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/answer/getactivetopic",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "Topic"
  },
  {
    "type": "POST",
    "url": "/v1/users/add",
    "title": "Create One account",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "User",
    "permission": [
      {
        "name": "just administrator or super administrator"
      }
    ],
    "description": "<p>Create user by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Username",
            "description": "<p>a unique string with 6 &lt;= length &lt;= 64</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a string with 6 &lt;= length &lt;= 64</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>unique email</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessUserRole",
            "description": "<p>a role number of creator</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>an id of creator</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Fullname",
            "description": "<p>a name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Role",
            "description": "<p>a role of user(from 1 to 3) 1 is super admin, 2 is admin, 3 is teacher/normal user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/users/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of created user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"User added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "DELETE",
    "url": "/v1/user/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "User",
    "permission": [
      {
        "name": "just admin user"
      }
    ],
    "description": "<p>delete user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/user/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"User delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/v1/user/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "User",
    "permission": [
      {
        "name": "only Super administrator"
      }
    ],
    "description": "<p>Get all users</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/user/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n  \"items\": {\"begin\": 1, \"end\": 3, \"total\": 2},\n  \"pages\": {\"current\": 1, \"prev\": 0, \"hasPrev\": false, \"next\": 2, \"hasNext\": true, \"total\": 4},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/v1/user/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "User",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Get one user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of user, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/users/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Username",
            "description": "<p>login name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Fullname",
            "description": "<p>display name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Role",
            "description": "<p>role of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\":{\n         \"Id\": 2,\n         \"Username\": \"dung\",\n         \"Fullname\": \"THD\",\n         \"Email\": \"thdung002@gmail.com\",\n         \"Role\": \"1\",\n     },\n     \"result\": \"ok\",\n     \"message\" \"User get successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/v1/user/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "login",
    "group": "User",
    "permission": [
      {
        "name": "Every one"
      }
    ],
    "description": "<p>login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "loginName",
            "description": "<p>a string with length &lt;= 64</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a string with 4 &lt; length &lt; 64</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:500/v1/user/login",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>the user data</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":{\n     \"Id\":2,\n     \"Role\": \"1\",\n     \"Username\": \"dung\",\n     \"Fullname\": \"THD\"\n     \"Email\": \"thdung002@gmail.com\",\n     \"Password\": \"$2a$10$i/xSopS23baiJRcGRJgcteqJKhkYpV2VQSIaWemtCaRcRp8tR.3EW\",\n  },\n  \"result\": \"ok\",\n  \"message\":\"User login successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/v1/user/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "User",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Update user information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of user where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginName",
            "description": "<p>login name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/user/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of updated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"User update successfully!\"\n     \"data\":{\n         \"id\": \"2\"\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/v1/question/add",
    "title": "Create One question",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "question",
    "description": "<p>Create question by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of the question (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Level",
            "description": "<p>Level of the question (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Type",
            "description": "<p>Template of the question(N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/question/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"question added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "DELETE",
    "url": "/v1/question/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "question",
    "description": "<p>delete question</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of question</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/cuiz/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted question</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Question delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "GET",
    "url": "/v1/question/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "question",
    "description": "<p>Get all questions</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content of question to get</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/question/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"question get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"Content\": 1,\n               \"Level\": 1,\n               \"Type\": 1,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n               \"UpdatedBy\": null,\n               \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n           }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 2\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "GET",
    "url": "/v1/question/getactive",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "question",
    "description": "<p>Get all active questions</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/question/getactive",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"question get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"Content\": 1,\n               \"Level\": 1,\n               \"Type\": 1,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n               \"UpdatedBy\": null,\n               \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n           }\n       ],\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "question",
    "description": "<p>Get one question</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Examination</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/question/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"question get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"Content\": 3,\n         \"Level\": \"1\",\n         \"Type\": \"1\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/random",
    "title": "Get random",
    "version": "1.0.0",
    "name": "get_random",
    "group": "question",
    "description": "<p>Get one question</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>The number of questions need to random</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>The type of question need to random</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/question/get/random",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"question get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "POST",
    "url": "/v1/questiontopic/add",
    "title": "Create One questiontopic",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "questiontopic",
    "description": "<p>Create questiontopic by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Question",
            "description": "<p>Id question of the questiontopic (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Topic",
            "description": "<p>Id topic of the questiontopic (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/questiontopic/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"questiontopic added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/questiontopic.js",
    "groupTitle": "questiontopic"
  },
  {
    "type": "DELETE",
    "url": "/v1/questiontopic/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "questiontopic",
    "description": "<p>delete questiontopic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of questiontopic</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/cuiz/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted questiontopic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"questiontopic delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/questiontopic.js",
    "groupTitle": "questiontopic"
  },
  {
    "type": "GET",
    "url": "/v1/questiontopic/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "questiontopic",
    "description": "<p>Get all questiontopics</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/questiontopic/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"questiontopic get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 1,\n               \"Question\": 1,\n               \"Topic\": 1,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n               \"UpdatedBy\": 1,\n               \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n           }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 2\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/questiontopic.js",
    "groupTitle": "questiontopic"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "questiontopic",
    "description": "<p>Get one questiontopic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Examination</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/questiontopic/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"questiontopic get successfully!\"\n     \"data\":{\n           \"ID\": 1,\n           \"Question\": 1,\n           \"Topic\": 1,\n           \"CreatedBy\": 1,\n           \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n           \"UpdatedBy\": 1,\n           \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/questiontopic.js",
    "groupTitle": "questiontopic"
  },
  {
    "type": "PUT",
    "url": "/v1/questiontopic/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "questiontopic",
    "description": "<p>Update questiontopic information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of questiontopic where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Question",
            "description": "<p>Id question of the questiontopic (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Topic",
            "description": "<p>Id topic of the questiontopic (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/questiontopic/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"questiontopic update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/questiontopic.js",
    "groupTitle": "questiontopic"
  },
  {
    "type": "PUT",
    "url": "/v1/question/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "question",
    "description": "<p>Update question information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of question where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of the question</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Level",
            "description": "<p>Level of the question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Type",
            "description": "<p>Template of the question</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/question/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Question update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/question.js",
    "groupTitle": "question"
  },
  {
    "type": "POST",
    "url": "/v1/quizcontent/add",
    "title": "Create One Quiz content",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "quizcontent",
    "permission": [
      {
        "name": "all user"
      }
    ],
    "description": "<p>Create quizcontent by all user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Quiz",
            "description": "<p>Id of quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>id of question</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quizcontent/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of created quizcontent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"quizcontent added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quizcontent.js",
    "groupTitle": "quizcontent"
  },
  {
    "type": "DELETE",
    "url": "/v1/quizcontent/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "quizcontent",
    "permission": [
      {
        "name": "just admin quizcontent"
      }
    ],
    "description": "<p>delete quizcontent</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of quizcontent</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quizcontent/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted quizcontent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"quizcontent delete successfully!\",\n     \"id\": \"2\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quizcontent.js",
    "groupTitle": "quizcontent"
  },
  {
    "type": "GET",
    "url": "/v1/quizcontent/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "quizcontent",
    "permission": [
      {
        "name": "all user"
      }
    ],
    "description": "<p>Get all quiz</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quizcontent/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>ok or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>something from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"\"\n  \"data\": [...],\n  \"items\": {\"begin\": 1, \"end\": 3, \"total\": 2},\n  \"pages\": {\"current\": 1, \"prev\": 0, \"hasPrev\": false, \"next\": 2, \"hasNext\": true, \"total\": 4},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quizcontent.js",
    "groupTitle": "quizcontent"
  },
  {
    "type": "GET",
    "url": "/v1/quizcontent/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "quizcontent",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Get one quizcontent</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of quiz, on params</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/quiz/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of quizcontent</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>Id of question</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Quiz",
            "description": "<p>id of quiz</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"quizcontent get successfully!\"\n     \"data\":{\n         \"ID\": 1,\n         \"QuestionID\": 3,\n         \"Quiz\": 1,\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quizcontent.js",
    "groupTitle": "quizcontent"
  },
  {
    "type": "PUT",
    "url": "/v1/quizcontent/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "quizcontent",
    "permission": [
      {
        "name": "Every type of user"
      }
    ],
    "description": "<p>Update quizcontent information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of quizcontent where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Quiz",
            "description": "<p>id of quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "QuestionID",
            "description": "<p>Id of question</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/quizcontent/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the ID of updated quizcontent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"quizcontent update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "invalid",
            "description": "<p>input data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/quizcontent.js",
    "groupTitle": "quizcontent"
  },
  {
    "type": "POST",
    "url": "/v1/topic/add",
    "title": "Create One topic",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "topic",
    "description": "<p>Create topic by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of the topic (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/topic/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"Topic added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "topic"
  },
  {
    "type": "DELETE",
    "url": "/v1/topic/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "topic",
    "description": "<p>delete topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of topic</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/topic/delete/6",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted topic</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Topic delete successfully!\",\n     \"id\": \"6\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "topic"
  },
  {
    "type": "GET",
    "url": "/v1/topic/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "topic",
    "description": "<p>Get one topic</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Examination</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/topic/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"Topic get successfully!\"\n     \"data\":{\n         \"ID\": 2,\n         \"Content\": \"testgfhgf\",\n         \"CreatedBy\": 1,\n         \"CreatedAt\": \"2020-09-10T02:49:34.000Z\",\n         \"UpdatedBy\": 1,\n         \"UpdatedAt\": \"2020-09-10T02:49:34.000Z\"\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "topic"
  },
  {
    "type": "PUT",
    "url": "/v1/topic/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "topic",
    "description": "<p>Update topic information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of Topic where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/topic/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"Topic update successfully!\"\n     \"id\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/topic.js",
    "groupTitle": "topic"
  },
  {
    "type": "POST",
    "url": "/v1/type/add",
    "title": "Create One Type",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "type",
    "description": "<p>Create type by admin or moderator</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of the type (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user(N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/type/add",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": \"ok\",\n  \"message\": \"type added successfully!\",\n  \"id\": 9\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"Invalid input\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/type.js",
    "groupTitle": "type"
  },
  {
    "type": "DELETE",
    "url": "/v1/type/delete/:id",
    "title": "Delete One",
    "version": "1.0.0",
    "name": "delete",
    "group": "type",
    "description": "<p>delete type</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/cuiz/delete/7",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of deleted type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\": \"Type delete successfully!\",\n     \"id\": \"4\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/type.js",
    "groupTitle": "type"
  },
  {
    "type": "GET",
    "url": "/v1/type/getall",
    "title": "Get All List",
    "version": "1.0.0",
    "name": "getAll",
    "group": "type",
    "description": "<p>Get all types</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page which we want to get (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>Item per page (N/A)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Sort the list by a field (N/A)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/type/getall",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "pages",
            "description": "<p>{current, prev, hasPrev, next, hasNext, total}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "items",
            "description": "<p>{begin, end, total}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"result\": \"ok\",\n   \"message\": \"type get successfully!\",\n   \"data\": {\n       \"data\": [\n           {\n               \"ID\": 4,\n               \"Content\": trung,\n               \"CreatedBy\": 1,\n               \"CreatedAt\": \"2020-09-22T06:12:51.000Z\",\n               \"UpdatedBy\": null,\n               \"UpdatedAt\": \"2020-10-06T02:00:18.000Z\"\n           }\n       ],\n       \"pages\": {\n           \"current\": 1,\n           \"prev\": 0,\n           \"hasPrev\": false,\n           \"next\": 2,\n           \"hasNext\": true,\n           \"total\": 2\n       },\n       \"items\": {\n           \"begin\": 1,\n           \"end\": 1,\n           \"total\": 1\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/type.js",
    "groupTitle": "type"
  },
  {
    "type": "GET",
    "url": "/v1/answer/get/:id",
    "title": "Get One",
    "version": "1.0.0",
    "name": "getOne",
    "group": "type",
    "description": "<p>Get one type</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>the ID of Examination</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3000/v1/type/get/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>the list of data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\": \"ok\",\n     \"message\" \"type get successfully!\"\n     \"data\":{\n         \"ID\": 4,\n         \"Content\": \"trung\",\n         ...\n     },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": \"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/type.js",
    "groupTitle": "type"
  },
  {
    "type": "PUT",
    "url": "/v1/type/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "type",
    "description": "<p>Update type information</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>Id of type where to update, on params</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Content",
            "description": "<p>Content of the type</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "accessID",
            "description": "<p>ID of current user</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:5000/v1/type/update/2",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "id",
            "description": "<p>of item updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"result\":\"ok\",\n     \"message\":\"type update successfully!\"\n     \"id\": \"4\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "result",
            "description": "<p>sucess or fail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>from server</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\":\"fail\",\n  \"message\": \"invalid input\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/type.js",
    "groupTitle": "type"
  }
] });
