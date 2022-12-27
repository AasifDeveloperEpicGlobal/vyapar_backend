import parties from "../models/parties";

{/* get all parties service */ }
export const getAllPartiesService = async () => {
  const response = await parties.find();
  return response;
};

{/* get parties by id service */ }
export const getPartiesByIdService =async (id:string) => {
    const response = await parties.findById(id);
    return response;
}

{/* delete parties by id service*/ }
export const deletePartyService =async (id:string) => {
 const deleteParty = await parties.findByIdAndDelete(id);
 return deleteParty;   
}