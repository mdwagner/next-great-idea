import React from "react";

import "./ExploreContainer/ExploreContainer.css";

export const ExploreContainer: React.FC = () => {
  return (
    <div className="container">
      <strong>Ready to create an app?</strong>
      <p>
        Start with Ionic&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};
