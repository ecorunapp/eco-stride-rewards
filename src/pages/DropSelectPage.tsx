
import React from "react";
import { useNavigate } from "react-router-dom";
import DropTypeSelector from "@/components/DropTypeSelector";

const DropSelectPage = () => {
  const navigate = useNavigate();
  
  const handleSelect = (type: "accessdrop" | "ecodrop") => {
    navigate(`/${type}`);
  };
  
  return <DropTypeSelector onSelect={handleSelect} />;
};

export default DropSelectPage;
