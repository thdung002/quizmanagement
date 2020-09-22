module.exports = function (app) {
    require('./routes/topic.route')(app);
    require('./routes/user.route')(app);
    // require('./route/Service')(app);
};
