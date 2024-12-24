import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import URLModel from './models.js';

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const isUrlReachable = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const shortenURL = async (req: Request, res: Response): Promise<any> => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const isReachable = await isUrlReachable(url);
  if (!isReachable) {
    return res.status(400).json({ error: "URL is not reachable" });
  }

  try {
    let slug: string = "";
    let isUnique: boolean = false;

    while (!isUnique) {
      slug = nanoid(6);
      const existing = await URLModel.findOne({ slug });
      if (!existing) {
        isUnique = true;
      }
    }

    await URLModel.create({ original_url: url, slug });
    const shortenedUrl = `${req.protocol}://${req.get("host")}/${slug}`;
    return res.json({ shortened_url: shortenedUrl });
  } catch (error: any) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const redirectURL = async (req: Request, res: Response): Promise<any> => {
  const { slug } = req.params;

  try {
    const record = await URLModel.findOne({ slug });

    if (!record) {
      return res.status(404).json({ error: "URL Not Found" });
    }

    record.visits += 1;
    record.visitTimestamps.push(new Date());
    await record.save();

    return res.redirect(record.original_url);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getURLAnalytics = async (req: Request, res: Response): Promise<any> => {
  const { slug } = req.params;

  try {
    const record = await URLModel.findOne({ slug });

    if (!record) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      original_url: record.original_url,
      shortened_url: `${req.protocol}://${req.get("host")}/${slug}`,
      visits: record.visits,
      visitTimestamps: record.visitTimestamps,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
