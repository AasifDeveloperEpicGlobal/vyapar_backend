import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import parties from "../models/parties";
import {
  deletePartyService,
  getAllPartiesService,
  getAllStateService,
  getPartiesByIdService,
} from "../services/parties-service";

export const handlePartyController = async (req: Request, res: Response) => {
  const {
    name,
    gst,
    number,
    unregisteredcustomer,
    email,
    address,
    state,
    pan,
  } = req.body;
  if (!name || !gst || !number || !email || !address || !state || !pan) {
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
  const partyGst = await parties.findOne({ gst });
  if (partyGst) {
    return res
      .status(400)
      .json({ message: "gst already exists, Enter a unique GST*" });
  }

  //Check GSTIN validation..
  const partyNumber = await parties.findOne({ number });
  if (partyNumber) {
    return res
      .status(400)
      .json({ message: "Number already exists, Enter a unique Number*" });
  }

  //Check pan card validations..
  const panNumber = await parties.findOne({ pan });
  if (panNumber) {
    return res
      .status(400)
      .json({ message: "Pan card already exists, Enter a unique PAN*" });
  }
  try {
    const createParties = await parties.create({
      name,
      gst,
      number,
      unregisteredcustomer: Array.isArray(unregisteredcustomer)
        ? unregisteredcustomer
        : undefined,
      state,
      email,
      address,
      pan,
    });
    res.clearCookie("access_token");
    res.json({ message: "Party Created Successful", data: createParties });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all parties controller
export const handleAllPartyController = async (req: Request, res: Response) => {
  // const { _id } = req.user;
  // console.log(req.user);
  try {
    const response = await getAllPartiesService();
    res.status(200).send({ success: true, response });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

/* get parties by id controller */
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

/* delete parties by id controller*/
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

/* update parties by id controller*/
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

    res.status(200).send({
      success: true,
      message: "Party Updated Successful.",
      updateParty,
    });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

/* get parties state controller*/
export const handlePartystateController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getAllStateService();
    res
      .status(200)
      .send({ success: true, message: "State data", data: response });
  } catch (error: any) {
    res.status(500).send({ success: false, message: "Something went wrong!!" });
  }
};
