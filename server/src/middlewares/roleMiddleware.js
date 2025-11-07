exports.allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
<<<<<<< Updated upstream
        const userRole = req.user?.role
=======
        const userRole = req.user?.userRole 
>>>>>>> Stashed changes

        if(!userRole || !allowedRoles.includes(userRole)){
            return res.status(403).json({ message: 'No Access'})
        }

        next()
    }
}