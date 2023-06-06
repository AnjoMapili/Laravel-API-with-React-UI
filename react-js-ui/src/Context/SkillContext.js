import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState([]);
  const [errors, setErros] = useState({});
  const navigate = useNavigate();

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

  // display the data on the page
  const getSkills = async () => {
    const apiSkills = await axios.get("skills");
    setSkills(apiSkills.data.data);
  };
  // end of display

  // get input by id
  const getSkill = async (id) => {
    const response = await axios.get("skills/" + id);
    const apiSkill = response.data.data;
    setSkill(apiSkill);
    setFormValues({
      name: apiSkill.name,
      lastname: apiSkill.lastname,
    });
  };
  // get input by id

  const storeSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.post("skills", formValues);
      getSkills();
      navigate("/skills");
    } catch (e) {
      if (e.response.status === 422) {
        setErros(e.response.data.errors);
      }
    }
  };

  const updateSkill = async (e) => {
    e.preventDefault();
    try {
      await axios.put("skills/" + skill.id, formValues);
      getSkills();
      navigate("/skills");
    } catch (e) {
      if (e.response.status === 422) {
        setErros(e.response.data.errors);
      }
    }
  };
  return (
    <SkillContext.Provider
      value={{
        skill,
        skills,
        getSkill,
        getSkills,
        onChange,
        formValues,
        storeSkill,
        errors,
        updateSkill,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContext;
