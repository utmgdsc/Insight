const { mongo, default: mongoose } = require('mongoose');
const AssetPosting = require('../models/assetPostingModel');

// get all asset postings
const getAssetPostings = async (req, res) => {
    const assetPostings = await AssetPosting.find({});
    res.status(200).json(assetPostings);
}

// get an asset posting by ID
const getAssetPostingById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Asset posting not found')
    }

    const assetPosting = await AssetPosting.findById(id);

    if (!assetPosting) {
        return res.status(404).send('Asset posting not found')
    }

    res.status(200).json(assetPosting);
}

// create a new asset posting
const createAssetPosting = async (req, res) => {
    const { owner, title, assetType, location, availability, condition, details, price, benefits } = req.body;

    if (!owner || !title || !assetType || !location || !availability || !condition || !details || !price) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    try {
        const newAssetPosting = new AssetPosting({
            owner,
            title,
            assetType,
            location,
            availability,
            condition,
            details,
            price,
            benefits
        });

        await newAssetPosting.save();
        res.status(201).json(newAssetPosting);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// delete an asset posting by ID
const deleteAssetPosting = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Asset posting not found')
    }

    const assetPosting = await AssetPosting.findOneAndDelete({ _id: id });

    if (!assetPosting) {
        return res.status(404).send('Asset posting not found')
    }

    res.status(200).json({ message: 'Asset posting deleted successfully' });
}

// update an asset posting by ID
const updateAssetPosting = async (req, res) => {
    const { id } = req.params;
    const { owner, title, assetType, location, availability, condition, details, benefits, applicants, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('Please input a valid id!');
    }

    try {
        const updatedAssetPosting = await AssetPosting.findByIdAndUpdate(id, {
            company,
            assetType,
            location,
            availability,
            details,
            value,
            benefits,
            applicants // Include applicants in the update
        }, { new: true });

        if (!updatedAssetPosting) {
            return res.status(404).send('Asset posting not found');
        }

        res.status(200).json(updatedAssetPosting);
    } catch (error) {
        res.status(500).json({ message: 'Error updating asset posting', error: error.message });
    }
}


module.exports = {
    getAssetPostings,
    getAssetPostingById,
    createAssetPosting,
    deleteAssetPosting,
    updateAssetPosting
}