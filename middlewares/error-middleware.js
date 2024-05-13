const errorMiddleWare = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Backend error"
    const extraDetails = err.extraDetails || "Error from backend"

    return res.status(status).join({message, extraDetails});
};

module.exports = errorMiddleWare;