import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SkillIndex() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      const apiSkills = await axios.get("http://127.0.0.1:8000/api/v1/skills");
      setSkills(apiSkills.data.data);
    };
    getSkills();
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-end m-2 p-2">
        <Link
          to={"/skills/create"}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
        >
          New Skill
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                LastName
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => {
              return (
                <tr
                  key={skill.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{skill.name}</td>
                  <td className="px-6 py-4">{skill.lastname}</td>
                  <td className="px-6 py-4">edit/delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
