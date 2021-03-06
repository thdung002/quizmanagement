'use strict';
var dbConn = require('../../config/db.config');
const Pieces = require('../utils/Pieces');

var Type = function(type){
  this.Content     = type.Content;
  this.CreatedBy   = type.CreatedBy;
  this.UpdatedBy   = type.UpdatedBy;
};
//Add new type
Type.add = function (accessID, newType, result) {
  if (!Pieces.VariableBaseTypeChecking(newType.Content, 'string') || newType.Content === null) {
    return result(1, 'Content null', 400, null, null);
  }
  else {
    try {
      let queryObj = {};
      queryObj.Content = newType.Content;
      queryObj.CreatedBy = accessID;
      dbConn.query("INSERT INTO type set ?", queryObj, function (err, res) {
        if (err) {
          result(err, null);
        } else {
          result(null, res.err);
        }
      });
    } catch (error) {
      result(1, 'create_Type_fail', 400, error, null);
    }
  }
};
//Get Type by id
Type.getTypeById = function (id, result) {
  try {
      dbConn.query("Select * from type where id = ?  and IsDeleted = 0", parseInt(id), function (err, res) {
              if (err) {
                  console.log("error: ", err);
                  result(err, null);
              } else if(res.length === 0)
                  result (1, 'No type found', 403, err, null);
              else {
                  result(null, res);
              }
          }
      );
  } catch (error) {
      return result(1, 'Get type fail', 400, error, null);
  }
};
//Get all type with pagination
Type.getType = function (page, perpage, sort, result) {
  if (page === 0 || isNaN(page))
      page = 1;
  if (perpage <= 0 || isNaN(perpage)) {
      perpage = 10;
  }
  if (sort.length === 0) {
      sort = "ASC";
  }
  let type = typeof (sort);
  let offset = perpage * (page - 1);
  try {
      dbConn.query("SELECT COUNT(*) as total from type where IsDeleted = 0", function (err, rows) {
          if (err) {
              return result(err);
          } else {
              dbConn.query(`Select * from type ORDER BY ID ${sort} limit ${perpage} offset ${offset} `, function (errs, res) {
                  if (errs) {
                      console.log("error in query db: ", errs);
                      return result(errs);
                  } else {
                      let pages = Math.ceil(rows[0].total / perpage);
                      let output = {
                          data: res,
                          pages: {
                              current: page,
                              prev: page - 1,
                              hasPrev: false,
                              next: (page + 1) > pages ? 0 : (page + 1),
                              hasNext: false,
                              total: rows[0].total
                          },
                          items: {
                              begin: ((page * perpage) - perpage) + 1,
                              end: page * perpage,
                              total: parseInt(res.length)
                          }
                      };
                      output.pages.hasNext = (output.pages.next !== 0);
                      output.pages.hasPrev = (output.pages.prev !== 0);
                      return result(null, output);
                  }
              });
          }
      })
  } catch (error) {
      return result(1, 'get_all_Type_fail', 400, error, null);
  }
};

//Update Type by id
Type.update = function (accessID, id, Type, result) {
  try {
      let queryObj = {};
      queryObj.Content = Type.Content;
      queryObj.UpdatedBy = accessID;
      queryObj.id = id;
      dbConn.query("UPDATE type SET Content=?,UpdatedBy=? WHERE id = ?", [queryObj.Content, queryObj.UpdatedBy, queryObj.id], function (err, res) {
          if (err) {
              result(null, err);
          } else if(res.changedRows === 0)
              result(1, 'Nothing was updated', 403, err, null);
          else {
              result(null, queryObj.Id);
          }
      });
  } catch (error) {
      return result(1, 'update_type_fail', 400, error, null);
  }
};
//Delete 1 type by id
Type.delete = function (id, result) {
  try {
      dbConn.query("UPDATE type SET IsDeleted =1 WHERE id = ? ", [id], function (err, res) {
          if (err) {
              console.log("error: ", err);
              result(null, err);
          } else if(res.affectedRows===0)
              result(1, 'Type_not_found', 403, err, null);
          else {
              result(null, id);
          }
      });
  } catch (error) {
      return result(1, 'delete_Type_fail', 400, error, null);
  }
};
module.exports= Type;