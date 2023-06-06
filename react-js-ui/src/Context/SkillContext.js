import { createContext, useState } from "react";
import axios from "axios";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  return <SkillContext.Provider value={{}}>{children}</SkillContext.Provider>;
};

export default SkillContext;
