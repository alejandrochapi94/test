export default function admin(req, res, next) {
    if (req.user.role !== "admin")
        return res.status(401).send("Access denied. Not an admin user.");
    next();
}
