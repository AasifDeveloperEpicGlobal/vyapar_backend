import state from "../models/state";

{/* get parties state service */ }
export const getAllStateService =async () => {
    const response = await state.find();
    return response;
}