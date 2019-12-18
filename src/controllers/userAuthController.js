const User = require('../models/User');

async function userAuth(ctx) {
    try {
        const {
            userId
        } = ctx.request.body;

        const user = await User.findById(userId);

        return ctx.json({
            user
        });
    } catch (err) {
        return ctx.status(400).json({
            error: "Can't get user information"
        });
    }
}

module.exports = userAuth;