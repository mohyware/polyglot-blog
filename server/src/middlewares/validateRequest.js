const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    next();
};

module.exports = validateRequest;