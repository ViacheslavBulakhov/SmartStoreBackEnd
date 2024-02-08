const isAdmin = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Ви не маєте прав для виконання цієї операції.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};

module.exports = isAdmin;
