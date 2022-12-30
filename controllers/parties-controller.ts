import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import parties from "../models/parties";
import {
  deletePartyService,
  getAllPartiesService,
  getAllStateService,
  getPartiesByIdService
} from "../services/parties-service";
import State from "../models/state";
export const handlePartyController = async (req: Request, res: Response) => {
  const { name, gstin, mobile, unregisteredcustomer, email, address } =
    req.body;
  if (!name || !gstin || !mobile || !email || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check email validation..
  const partyEmail = await parties.findOne({ email });
  if (partyEmail) {
    return res
      .status(400)
      .json({ message: "Email already exists, Enter a unique Email" });
  }

  //Check number validation..
  const partyNumber = await parties.findOne({ mobile });
  if (partyNumber) {
    return res
      .status(400)
      .json({ message: "Number already exists, Enter a unique Number" });
  }

  //Check GSTIN validation..
  const partyGSTIN = await parties.findOne({ gstin });
  if (partyGSTIN) {
    return res
      .status(400)
      .json({ message: "GSTIN already exists, Enter a unique GSTIN" });
  }
  const stateId = await State.findOne({});
  try {
    const createParties = await parties.create({
      name,
      gstin,
      mobile,
      unregisteredcustomer: Array.isArray(unregisteredcustomer)
        ? unregisteredcustomer
        : undefined,
      state: stateId,
      email,
      address,
    });
    res.clearCookie("access_token");
    res.json({ message: "Party Created Successful", data: createParties });
  } catch (error) {
    res.status(500).send(error);
  }
};

{
  /* get all parties controller */
}
export const handleAllPartyController = async (req: Request, res: Response) => {
  try {
    const response = await getAllPartiesService();
    res.status(200).send({ success: true, response });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

{/* get parties by id controller */}
export const handlePartyByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const response = await getPartiesByIdService(req.params.id);
    res.status(200).send({ response });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

{
  /* delete parties by id controller*/
}
export const handleDeletePartyController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const deleteParty = await deletePartyService(req.params.id);
    res.status(200).send({ deleteParty });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

{
  /* update parties by id controller*/
}
export const handleUpdatePartyController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: "ID is required." });
    }

    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Id provided." });
    }
    const updateParty = await parties.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send({ updateParty });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

{/* get parties state controller*/ }
export const handlePartystateController =async (req:Request, res:Response) => {
  try {
      const response = await getAllStateService();
      res.status(200).send({success:true, message:"State data", data:response});
  } catch (error:any) {
      res.status(500).send({success:false, message:"Something went wrong!!"});
  }
}