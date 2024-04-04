import { Router} from "express";
import * as apiController from "../controllers/apiController"

export const router = Router()

router.get('/ping', apiController.ping)