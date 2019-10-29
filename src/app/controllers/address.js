const { Address, User } = require('../models');

class AdressController {
    async store(req, res) {
        const { user_id } = req.params;
        const { street, city, zip_code } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: 'You must provide a user_id' });
        }

        if (!street && !city && !zip_code) {
            return res.status(400).json({ message: 'You must provide street, zip_code and city on body' });
        }

        const user = await User.findByPk(user_id)
            .catch(err => console.log(err));

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const address = await Address.create({
            user_id,
            street,
            zip_code,
            city
        })
            .catch(err => console.log(err));

        return res.json(address);
    }

    async index(req, res) {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: 'You must provide a user_id' });
        }

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        })
            .catch(err => console.log(err));

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        return res.json(user.addresses);
    }
}

module.exports = new AdressController();