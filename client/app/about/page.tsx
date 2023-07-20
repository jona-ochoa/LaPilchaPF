import React from "react";
import AboutCard from "../../components/AboutCard";

const About: React.FC = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 border-b-2  py-2 text-center">
        THE PILCHA TEAM
      </h1>
      <div className="grid grid-cols-1 gap-4">
        <AboutCard/>
      </div>
    </div>
  );
};

export default About;