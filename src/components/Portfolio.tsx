import React, { useEffect } from "react";

import gsap from "gsap";

function Portfolio({ projects }: { projects: Project[] }) {
  useEffect(() => {
    gsap.fromTo(
      ".project",
      {
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        stagger: 0.2,
      },
    );
  }, []);

  return (
    <div className="max-w-screen h-full flex-1 py-3">
      <div className="scrollbar-hide flex h-full gap-3 overflow-x-scroll">
        {projects.map((project: Project, index: number) => (
          <div
            key={index}
            className="project flex aspect-[2/3] h-full shrink-0 bg-black"
          >
            <h2>{project.title.fr}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
