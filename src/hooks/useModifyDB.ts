import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Apartments } from "../stores/useSearchTermStore";

interface ApartmentRegisterRequest {
  name: string;
  region: string;
  location: string;
  totalUnit: number | null;
  parkingCapacity?: number;
  buildingRange?: string;
  kaptCode: string;
}

interface RegisterResponse {
  code: number;
  data: {
    id: number;
  };
}

export const useModifyDB = () => {
  const registerApartment = useMutation<RegisterResponse, Error, Apartments>({
    mutationFn: async (apartment: Apartments) => {
      const requestDto: ApartmentRegisterRequest = {
        name: apartment.name,
        region: apartment.region,
        location: apartment.location,
        totalUnit: apartment.totalUnit,
        kaptCode: apartment.kaptCode,
      };

      const formData = new FormData();
      formData.append(
        "requestDto",
        new Blob([JSON.stringify(requestDto)], { type: "application/json" })
      );

      const response = await axios.post("/api/apartment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    },
  });

  const modifyDB = (apartment: Apartments) => {
    if (apartment.id === null && apartment.kaptCode) {
      registerApartment.mutate(apartment);
    }
  };

  return {
    modifyDB,
    registerApartment,
    isRegistering: registerApartment.isPending,
  };
};
