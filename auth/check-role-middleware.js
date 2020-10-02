//----------------------------------------------------------------------------//
// This is a middleware "factory" - a "higher order function" that returns a
// customized function, based on its parameters.
//
// When a user successfully logs in or registers, a token is created and saved
// on the request object. If the request comes in AFTER login/registration, it
// should include the token, which, upon initial verification, should be saved
// to the req object as req.decodedToken. 
//
// This middleware method checks the decodedJToken for a "rolename" property.
//
// This technique uses a "higher order function" to manufacture and return a
// middleware function. We aren't exporting a middleware function. We are
// exporting a middleware function "factory" (creator). By passing in a value to
// the creator, you get back a middleware function that checks for the value in
// the role property on the token. In this way, you can call this exported
// method multiple times with different "role" values, and each time, you will
// get a middleware function that checks for the passed-in role value in the
// req.decodedToken.rolename property. 
//----------------------------------------------------------------------------//
module.exports = function (role) {
    return function (req, res, next) {
        if (req.decodedToken && req.decodedToken.rolename && req.decodedToken.rolename === role) {
            next();
        } else {
            res.status(403).json({ message: "not authorized for that request" });
        }
    };
}