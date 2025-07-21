import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../api/endpoints";
import axios from "axios";

import InputFiled from "../../components/input-filed/InputField";

const MainPageHeader = () => {
  return (
    <div style={{height:'56px', justifyContent:'center'}}>
      <h1 style={{fontWeight:'600', fontSize:'20px'}}>DANJITALK</h1>
    </div>
  );
};

export const MainPage = () => {
  return (
    <>
      <div>
        <MainPageHeader/>
      </div>
    </>
  );
};
