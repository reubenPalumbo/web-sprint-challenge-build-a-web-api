const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

//ENDPOINTS

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

router.get("/projects", (req, res, next) => {
  db.get()
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch((error) => next(error));
});

router.get("/projects/:id", (req, res, next) => {
  db.get(req.params.id)
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch((error) => next(error));
});

router.post("/projects", (req, res, next) => {
  db.insert(req.body)
    .then((proj) => {
      res.status(201).json(proj);
    })
    .catch((error) => next(error));
});

router.delete("/projects/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => next(error));
});

router.put("/projects/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then((count) => {
      db.findById(id).then((post) => {
        res.status(200).json(post);
      });
    })
    .catch((error) => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  res.status(500).json(error.message);
}

module.exports = router;
