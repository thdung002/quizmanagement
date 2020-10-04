define({ "api": [
  {
    "type": "POST",
    "url": "/v1/answer/add",
    "title": "Create One account",
    "version": "1.0.0",
    "name": "createByAdmin",
    "group": "Answer",
    "permission": [
      {
        "name": "just administrator or super administrator"
      }
    ],
    "description": "<p>Create answer by admin or moderator</p>",
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
        "name": "only Super administrator"
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
        "name": "Every type of answer"
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
    "description": "<p>Get one answer</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>ID of answer, on params</p>"
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
            "field": "id",
            "description": "<p>the ID of answer</p>"
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
    "type": "PUT",
    "url": "/v1/answer/update/:id",
    "title": "Update One",
    "version": "1.0.0",
    "name": "update",
    "group": "Answer",
    "permission": [
      {
        "name": "Every type of Answer"
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
            "description": "<p>Id of Answer, on params</p>"
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
            "description": "<p>ID of user, on params</p>"
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
  }
] });
