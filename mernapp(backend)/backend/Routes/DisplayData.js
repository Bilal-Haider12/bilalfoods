const express = require('express')
const router = express.Router()

router.post("/foodData", (req, res) => {
    try {
        if (!global.food_items || !global.foodCategory) {
            console.log('Data not yet loaded');
            return res.status(500).json({ message: "Data not available yet. Try again later." });
        }
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;