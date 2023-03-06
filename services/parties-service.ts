import parties from "../models/parties";
import state from "../models/state";

interface updatePartyPayload {
  name: string;
  gstin: string;
  mobile: string;
  unregisteredcustomer: string[];
  state: string[];
  email: string;
  address: string;
}

{
  /* get all parties service */
}
export const getAllPartiesService = async (userId: any) => {
  const response = await parties.find({ createdBy: userId });
  return response;
};

{
  /* get parties by id service */
}
export const getPartiesByIdService = async (id: string) => {
  const response = await parties.findById(id);
  return response;
};

{
  /* delete parties by id service*/
}
export const deletePartyService = async (id: string) => {
  const deleteParty = await parties.findByIdAndDelete(id);
  return deleteParty;
};

{
  /* get parties state service */
}
export const getAllStateService = async () => {
  const response = await state.find();
  return response;
};
