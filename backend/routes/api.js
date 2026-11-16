import { Router } from "express";
import e from "express";
import url from "../models/url";
import { nanoid } from "nanoid";
const router = e.Router();

router.post("/short", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      res.status(404).json({
        success: false,
        msg: "url not found !",
      });
      return;
    }

    const parsed = new url(originalUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({
        message: "Only HTTP and HTTPS URLs are allowed",
      });
    }

    const shortcode = nanoid(7);
    const newurl = await url.create({
      originalUrl,
      shortcode,
    });

    res.status(201).json({
      originalUrl: newurl.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${shortcode}`,
      shortcode: newurl.shortcode,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid URL",
    });
  }
});

router.get("/:shortcode",async (req,res)=>{
    try{
        const Url = await url.findOne({
            shortcode:req.params.shortcode
        })

        if(!Url){
            return res.status(404).send("URL not Found");
        }

        Url.clicks++;
        await Url.save();

        res.redirect(Url.originalUrl);

    }catch (error) {
        res.status(500).json({
        message: "Internal server error"
        });
    }
})

export default router;
