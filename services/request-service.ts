import requestDemo from "../models/request";

{/* create request demo service */ }
export const createRequestService = async (mobile: string) => {
    const newRequest = new requestDemo({ mobile });
    await newRequest.save();
    return newRequest;
}

{/* delete request demo service */ }
export const deleteRequestService = async (id: string) => {
    const deleteRequest = await requestDemo.findByIdAndDelete(id);
    return deleteRequest;
}

{/* get request demo service */ }
export const getRequestService = async (id: string) => {
    const getRequest = await requestDemo.findById(id);
    return getRequest;
}

{/* get all request demo service */ }
export const getAllRequestDemoService = async () => {
    const getAllRequest = await requestDemo.find();
    return getAllRequest;
}