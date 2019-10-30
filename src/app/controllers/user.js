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

    async updateUser(req, res) {
        const { user_id } = req.params;
        const { name, email } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: 'You need provide a user_id' });
        }

        const user = await User.findByPk(user_id)
            .catch(err => console.log(err));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({
            name: name ? name : user.name,
            email: email ? email : user.email
        });

        res.json(user);
    }

    async deleteUser(req, res) {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: 'You need provide a user_id' });
        }

        const user = await User.findByPk(user_id)
            .catch(err => console.log(err));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User was deleted' });
    }
}

module.exports = new UserController(); 