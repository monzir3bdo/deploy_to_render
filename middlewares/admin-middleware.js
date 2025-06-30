const adminMiddleware = (request, response, next) => {
  if (request.user.role !== "Admin") {
    return response.status(401).json({
      success: false,
      message: "You should be an admin level or more to access this",
    });
  }
  console.log(request.user);
  next();
};
module.exports = adminMiddleware;
