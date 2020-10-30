const express = require("express");

const db = require("../data/helpers/actionModel");
const dbProj = require("../data/helpers/projectModel");

const router = express.Router();

router.use(express.json());

//ENDPOINTS

router.get("/actions", (req, res, next) => {
  db.get()
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch((error) => next(error));
});

router.get("/actions/:id", (req, res, next) => {
  db.get(req.params.id)
    .then((proj) => {
      res.status(200).json(proj);
    })
    .catch((error) => next(error));
});

router.post("/actions/:id", (req, res, next) => {
  dbProj
    .get(req.params.id)
    .then((item) => {
      if (item !== null) {
        db.insert(req.body)
          .then((proj) => {
            res.status(201).json(proj);
          })
          .catch((error) => next(error));
      } else {
        res.status(404).json({ message: "ID not in file" });
      }
    })
    .catch((error) => next(error));
});

router.delete("/actions/:id", (req, res, next) => {
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

router.put("/actions/:id", (req, res, next) => {
  db.update(req.params.id, req.body)
    .then((count) => {
      db.get(req.params.id).then((post) => {
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
