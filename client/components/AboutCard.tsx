import React from "react";

interface Member {
  name: string;
  rol: string;
  github: string;
  linkedin: string;
}

const members: Member[] = [
    {
        name: "Gonzalo Sebastián Lagioia",
        rol: "PF-Mentor",
        github: "https://github.com/glagioia",
        linkedin: "https://www.linkedin.com/in/gonzalo-sebastian-lagioia/"
    },
    {
        name: "Jonatan Cristian Ochoa",
        rol:"Back-End & Front-End",
        github: "https://github.com/jona-ochoa",
        linkedin: "https://linkedIn.com/in/jonaochoa",
    },
    {
        name: "Alejo Ivan Holmann",
        rol: "Back-End & Front-End",
        github: "https://github.com/AIHolmann",
        linkedin: "https://www.linkedin.com/in/alejo-holmann-a51262221/",
    },
    {
        name: "Tomas Balmaceda",
        rol: "Back-End",
        github: "https://github.com/tomasbalmaceda",
        linkedin: "https://www.linkedin.com/in/tom%C3%A1s-balmaceda-357328234/",
    },
    {
        name: "Ariel Nicolas Bloise",
        rol: "Front-End & Back-End",
        github: "https://github.com/arielbloise",
        linkedin: "https://www.linkedin.com/in/ariel-bloise/",
    },
    {
        name: "Malena Araceli Valdez",
        rol: "Front-End",
        github: "https://github.com/malevaldezok",
        linkedin: "https://www.linkedin.com/mwlite/in/malena-valdez-488a52281 ",
    },
    {
        name: "Alejandro Saturno",
        rol: "Front-End",
        github: "https://github.com/AleSaturno",
        linkedin: "https://www.linkedin.com/in/alejandro-saturno-1b5967206/",
    },
    {
        name: "Julian Maria Hary Beccar Varela",
        rol:"Front-End",
        github: "Https://gitHub.com/JMHaryBeccarVarela",
        linkedin: "Https://linkedin.com/in/julian-hary-beccar-varela",
    },
];

const AboutCard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => {
        const githubUsername = member.github.split("/").pop() || "";

        return (
          <div
            key={member.name}
            className="w-90 px-8 py-6 text-center bg-gray-800 rounded-lg"
          >
            <img
              className="mx-auto rounded-full h-36 w-36"
              src={`https://github.com/${githubUsername}.png`}
              alt={member.name}
            />
            <div className="space-y-2">
              <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                <h3 className="text-white">{member.name}</h3>
                <h3 className="text-white">{member.rol}</h3>
                <div className="flex justify-center mt-5 space-x-5">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-400"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-gray-400 hover:text-gray-100"
                    >
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.602-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.089 2.91.833.092-.646.349-1.089.636-1.34-2.22-.25-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.251-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.33c.852.004 1.706.114 2.504.334 1.909-1.294 2.747-1.025 2.747-1.025.546 1.375.202 2.394.1 2.645.64.698 1.027 1.59 1.027 2.682 0 3.841-2.337 4.688-4.565 4.937.36.31.68.92.68 1.852 0 1.336-.013 2.415-.013 2.744 0 .267.18.578.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                      />
                    </svg>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-gray-400"
                  >
                    <span className="sr-only">Linkedin</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      className="w-6 h-6 text-gray-400 hover:text-gray-100" height="1em" width="1em"
                    >
                      <path
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutCard;