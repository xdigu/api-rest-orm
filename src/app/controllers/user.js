const { User } = require('../models');

class UserController {
    async storage(req, res) {
        const { email, name } = req.body;

        const user = await User.create({ name, email })
            .catch(err => console.log(err));

        return res.json(user);
    }

    async index(req, res) {
        const users = await User.findAll()
            .catch(err => console.log(err));

        return res.json(users);
    }

    async getUser(req, res) {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: 'You need provide a user_id' });
        }

        const user = await User.findByPk(user_id)
            .catch(err => console.log(err));

        return res.json(user);
    }
}

module.exports = new UserController(); 