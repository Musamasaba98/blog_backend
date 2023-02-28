const errorHandler = (error, req, res, next) => {
    return res.status(400).json({ status: "Failed", message: error.message })
}

export default errorHandler