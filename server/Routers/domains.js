import express from "express";
const domainsRouter = express.Router();
import { publishers } from "../server.js";

domainsRouter.post("/", (req, res) => {
  const { publisherName, url, desktopAds, mobileAds } = req.body;

  const publisher = publishers.find(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
  );

  if (!publisher) {
    return res.status(400).json({ errorMessage: "This user does not exist" });
  }

  if (checkIfDomainExist(url)) {
    return res
      .status(400)
      .json({ errorMessage: "This domain is already exist" });
  }

  if (parseInt(desktopAds) < 0 || parseInt(mobileAds) < 0) {
    return res.status(400).json({
      errorMessage:
        "This desktopAds and mobileAds should be greater or equal to zero.",
    });
  }

  const newDomain = {
    url,
    desktopAds,
    mobileAds,
  };
  publisher.domains.unshift(newDomain);
  res.status(201).json(newDomain);
});

domainsRouter.put("/", (req, res) => {
  const {
    url,
    desktopAds,
    mobileAds,
    newDomainURL,
    publisherName,
  } = req.body;

  const publisher = publishers.find(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
  );

  if (!publisher) {
    return res.status(400).json({ errorMessage: "This user does not exist" });
  }

  if (parseInt(desktopAds) < 0 || parseInt(mobileAds) < 0) {
    return res.status(400).json({
      errorMessage:
        "This desktopAds and mobileAds should be greater or equal to zero.",
    });
  }
  
  if (checkIfDomainExist(newDomainURL) && url != newDomainURL) {
    return res
      .status(400)
      .json({ errorMessage: "This domain is already exist" });
  }

  const existDomain = publisher.domains.find(
    (site) => site.url.toLowerCase() === url.toLowerCase()
  );

  existDomain.url = newDomainURL;
  existDomain.desktopAds = desktopAds;
  existDomain.mobileAds = mobileAds;

  res.status(201).json(existDomain);
});

domainsRouter.delete("/", (req, res) => {
  const { url, publisherName } = req.query;

  const publisher = publishers.find(
    (existsPublisher) =>
      existsPublisher.publisher.toLowerCase() === publisherName.toLowerCase()
  );

  if (!publisher) {
    return res.status(400).json({ errorMessage: "This user does not exist" });
  }

  publisher.domains = publisher.domains.filter(
    (site) => site.url.toLowerCase() != url.toLowerCase()
  );

  res.status(201).send();
});

const checkIfDomainExist = (domainURL) => {
  for (let publisher of publishers) {
    for (let site of publisher.domains) {
      if (site.url.toLowerCase() === domainURL.toLowerCase()) {
        return true;
      }
    }
  }
  return false;
};

export default domainsRouter;
