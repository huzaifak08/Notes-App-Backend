const express = require('express');
const router = new express.Router();
const Notes = require("../Models/notes_model");

router.get("/", (req, res) => {
    res.send('This is Home Page');
});

// Create Data:
router.post("/notes/add", async (req, res) => {
    try {
        // const nt = new Notes(req.body);
        const nt = new Notes({
            id: req.body.id,
            email: req.body.email,
            title: req.body.title,
            content: req.body.content
        });
        const createNt = await nt.save();

        res.status(201).send(createNt);

    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Read Data:
router.get("/notes/list", async (req, res) => {
    try {
        const nt = await Notes.find();
        res.send(nt);

    } catch (err) {
        res.send(err.message);
    }
});

// Read Single Data:
router.get("/notes/list/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const nt = await Notes.find({ email: email });

        // Check if data exists:
        if (!nt) {
            return res.status(404).send();
        } else {
            res.send(nt);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete Note:
router.delete("/notes/list/:email", async (req, res) => {
    try {
        const delNt = await Notes.deleteOne({ email: req.params.email });

        if (!req.params.email) {
            res.status(404).send();
        } else {
            res.send(delNt);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;