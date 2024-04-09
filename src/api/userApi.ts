import axiosNew from "@/api/axios.ts";


interface ApiResponse {
  massage: string;
  success: string;
  token: string;
}

export const check = async (phoneNumber: string): Promise<ApiResponse> => {
  const { data } = await axiosNew.post("/auth/checkPhoneNumber", { phoneNumber: phoneNumber });
  return data;
}
export const login = async (phoneNumber: string, smsCode: string): Promise<ApiResponse> => {
  const { data } = await axiosNew.post("/auth/login", { phoneNumber: phoneNumber, smsCode: smsCode });
  return data;
}
export const deleteUserAccount = async (): Promise<ApiResponse> => {
  const { data } = await axiosNew.delete(
    "/user/deleteAccount",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  return data
}