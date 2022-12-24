import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";

const router = Router()

// GET /api/v1/links            all links
// GET /api/v1/links/:id        single Link
// POST /api/v1/links           create link
// PATCH/PUT /api/v1/Links/:id  update link
// DELETE /api/v1/Links/:id     delete link

router.get('/', requireToken, getLinks)
// router.get('/:id', requireToken, paramLinkValidator, getLink)
router.get('/:nanoLink', getLink)
router.delete('/:id', requireToken, paramLinkValidator, removeLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink)

export default router;