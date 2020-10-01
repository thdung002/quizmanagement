module.exports = function (app) {
    require('./routes/questiontopic')(app);
    require('./routes/question')(app);
    require('./routes/config')(app);
    require('./routes/quiz')(app);
    require('./routes/topic')(app);
    require('./routes/user')(app);
    require('./routes/answer')(app);
    require('./routes/examination')(app);
    require('./routes/quizcontent')(app);

};
