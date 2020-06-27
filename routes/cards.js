const express = require('express');
const router = express.Router();

const Card = require('../models/Card');

// @route    GET api/cards
// @decs     Get cards 
// @access   Public
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find({});

        res.status(200).json({ cards: cards.map(card => ({ id: card._id, title: card.title, description: card.description })) });
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// @route    POST api/cards
// @decs     add card to project
// @access   Public
router.post('/', async (req, res) => {

    const { title, description } = req.body;

    try {
        const newCard = new Card({ title, description });

        const card = await newCard.save();

        res.status(200).json(card);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});


// @route    PUT api/cards/:id
// @decs     Update card
// @access   Public
router.put('/:id', (req, res) => {
    // TODO as bonus. 
    res.send('Update card.');
});

// @route    DELETE api/cards/:id
// @decs     Delete card
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        let card = await Card.findByIdAndRemove({ _id: req.params.id });

        if (!card) return res.status(400).json({ msg: 'Card not found' });

        res.status(200).json({ msg: 'Card deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
