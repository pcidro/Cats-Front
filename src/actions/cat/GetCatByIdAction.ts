import { CatType } from "@/types/catType";
import { apiClient } from "@/utils/api-client";

export default async function GetCatByIdAction(id: string): Promise<CatType> {
  try {
    const cat = await apiClient<CatType>(`/api/cat/${id}`);
    return cat;
  } catch (error) {
    console.log(error);
    return {} as CatType;
  }
}
