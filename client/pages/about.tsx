import React from "react";
import AboutCard from "../src/components/AboutCard/AboutCard";

const About: React.FC = () => {
  const aboutCards = Array.from({ length: 8 }, (_, index) => (
    <AboutCard key={index} />
  ));

  return (
    <div>
      <h1>EL EQUIPO DE LA PILCHA</h1>
      <div className="grid grid-cols-2 gap-4">{aboutCards}</div>
    </div>
  );
};

export default About;