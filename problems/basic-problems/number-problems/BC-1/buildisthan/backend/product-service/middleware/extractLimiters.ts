const extractLimiters = (req : any, res : any, next : any) => {
    const limit = parseInt(req?.query?.take) || 5
    const offset = parseInt(req?.query?.skip) || 0
    req.limit = limit
    req.offset = offset

    next();
}

export default extractLimiters