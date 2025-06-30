const asyncHelper = (fn) => (request, response, next) => {
  try {
  } catch (e) {
    response.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
