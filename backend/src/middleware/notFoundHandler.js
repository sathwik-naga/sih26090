/**
 * 404 Route Not Found middleware
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found on Smart Artisan server.`,
  });
};

export default notFoundHandler;
