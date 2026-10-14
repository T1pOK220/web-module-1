import { API_VERSION } from "../../config/constants.js";
export const healthController = (req,res)=>{
  res.status(200).json({
    status: "ok",
    version: API_VERSION,
  });
}