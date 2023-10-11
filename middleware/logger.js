const log = (req, res, next) => {
    console.log("🔥🔥🔥🔥🔥")
    next();
};

module.exports = log;