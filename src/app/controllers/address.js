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
            include: { association: 'addresses', required: false }
        })
            .catch(err => console.log(err));

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        return res.json(user.addresses);
    }

    async updateAdress(req, res) {
        const { user_id, address_id } = req.params;
        const { street, zip_code, city } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: 'You must provide a user_id' });
        }

        if (!address_id) {
            return res.status(400).json({ message: 'You must provide a address_id' });
        }

        const user = await User.findByPk(user_id, {
            include: {
                association: 'addresses',
                where: { id: address_id },
            }
        })
            .catch(err => console.log(err));

        if (!user) {
            return res.status(400).json({ message: 'User or address not found' });
        }

        const address = await Address.findByPk(address_id);

        await address.update({
            street: street ? street : address.street,
            zip_code: zip_code ? zip_code : address.zip_code,
            city: city ? city : address.city,
        });

        return res.json(address);
    }

    async deleteAdress(req, res) {
        const { user_id, address_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: 'You must provide a user_id' });
        }

        if (!address_id) {
            return res.status(400).json({ message: 'You must provide a address_id' });
        }

        const user = await User.findByPk(user_id, {
            include: {
                association: 'addresses',
                where: { id: address_id },
            }
        })
            .catch(err => console.log(err));

        if (!user) {
            return res.status(400).json({ message: 'User or address not found' });
        }

        const address = await Address.findByPk(address_id);

        await address.destroy();

        return res.json({ message: 'Address was removed' });
    }
}

module.exports = new AdressController();