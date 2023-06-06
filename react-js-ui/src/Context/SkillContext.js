import { createContext, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);

  // Create New Skill
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // End of Creat New Skill

  const getSkills = async () => {
    const apiSkills = await axios.get("skills");
    setSkills(apiSkills.data.data);
  };

  const getSkill = async (id) => {
    const response = await axios.get("skills/ + id");
    setSkill(response.data.data);
  };

  return (
    <SkillContext.Provider
      value={{ skill, skills, getSkill, getSkills, onChange, formValues }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContext;
