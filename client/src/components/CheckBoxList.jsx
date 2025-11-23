import React from "react";

const CheckBoxList = ({ label, techs, selected, setSelected }) => {
  
  const toggleTech = (tech) => {
    if (selected.includes(tech)) {
      setSelected(selected.filter((t) => t !== tech));
    } else {
      setSelected([...selected, tech]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-scroll p-3 mt-4  rounded-lg bg-white">
      {techs.map((tech, index) => (
        <label key={index} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-orange-500"
            checked={selected.includes(tech)}
            onChange={() => toggleTech(tech)}
          />
          <span className="text-sm text-gray-700">{tech}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxList;