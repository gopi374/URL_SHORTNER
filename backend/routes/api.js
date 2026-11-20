import express from "express";
import { url } from "../models/url.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/short", async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL is required!",
      });
    }

    // Validate standard URL format
    let parsedUrl;
    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format. Please provide a valid URL starting with http:// or https://",
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: "Only HTTP and HTTPS URLs are allowed",
      });
    }

    let shortcode = customAlias ? customAlias.trim() : nanoid(7);

    // If custom alias provided, verify uniqueness
    if (customAlias) {
      const existing = await url.findOne({ shortcode });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Custom alias is already taken. Please choose another one.",
        });
      }
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const newUrl = await url.create({
      originalUrl,
      shortcode,
    });

    res.status(201).json({
      success: true,
      originalUrl: newUrl.originalUrl,
      shortUrl: `${baseUrl}/${newUrl.shortcode}`,
      shortcode: newUrl.shortcode,
      clicks: newUrl.clicks,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while shortening URL",
    });
  }
});

router.get("/links", async (req, res) => {
  try {
    const links = await url.find().sort({ createdAt: -1 }).limit(50);
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const mapped = links.map((link) => ({
      _id: link._id,
      originalUrl: link.originalUrl,
      shortUrl: `${baseUrl}/${link.shortcode}`,
      shortcode: link.shortcode,
      clicks: link.clicks,
      createdAt: link.createdAt,
    }));
    res.json({ success: true, links: mapped });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching links" });
  }
});

router.get("/:shortcode", async (req, res) => {
  try {
    const urlDoc = await url.findOne({
      shortcode: req.params.shortcode,
    });

    if (!urlDoc) {
      return res.status(404).send("URL not Found");
    }

    urlDoc.clicks++;
    await urlDoc.save();

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
