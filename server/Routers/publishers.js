import express from "express";
const publishersRouter = express.Router();
import { publishers } from "../server.js";

publishersRouter.get("/", (req, res) => {
  res.status(200).json(publishers);
});

publishersRouter.post("/", (req, res) => {
  const publisherName = req.body.publisher;
  const publisher = publishers.find(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
  );

  if (publisher) {
    return res
      .status(400)
      .json({ errorMessage: "This publisher is already exist" });
  }

  const newPublisher = {
    publisher: publisherName,
    domains: [],
  };

  publishers.unshift(newPublisher);
  res.status(201).json(newPublisher);
});

publishersRouter.delete("/:publisherName", (req, res) => {
  const publisherName = req.params.publisherName;
  const publisherIndex = publishers.findIndex(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName
  );

  if (publisherIndex !== -1) {
    const [deletedPublisher] = publishers.splice(publisherIndex, 1);
    return res.status(201).json(deletedPublisher);
  }
  return res
    .status(400)
    .json({ errorMessage: "This publisher does not exist" });
});

export default publishersRouter;
