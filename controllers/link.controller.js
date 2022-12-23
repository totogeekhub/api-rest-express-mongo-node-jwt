import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });

    return res.status(200).json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    console.log(link);

    if (!link) return res.status(404).json({ error: "No existe el link" });

    if (!link.uid.equals(req.uid))
      return res.status(401).json({ error: "No le pertenece ese link🤡" });

    return res.json({ link });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res
        .status(403)
        .json({ error: "Formato de id incorrecto💔, por favor revise" });
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    console.log(link);

    if (!link) return res.status(404).json({ error: "No existe el link" });

    if (!link.uid.equals(req.uid))
      return res.status(401).json({ error: "No le pertenece ese link🤡" });

    await link.remove();
    return res.status(201).json({ link, status: 'removido' });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res
        .status(403)
        .json({ error: "Formato de id incorrecto💔, por favor revise" });
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body;
    if (!longLink.startsWith("https://")) {
      longLink = "https://" + longLink;
    }
    console.log(longLink);
    const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
    const newLink = await link.save();

    return res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de servidor" });
  }
};
