import express from "express"
import QueryMaterialCtrl from "../controllers/query.materials.controller.js"

const router = express.Router()

// router.route("/").get(QueryMaterialCtrl.queryMaterialsGet)
router.route("/").post(QueryMaterialCtrl.queryMaterials)

export default router