import React from "react";

const Shimmer = () => {
  const shimmerCards = Array.from({ length: 8 }, (_, index) => (
    <li className="shimmer-res-card" key={index}>
      <div className="shimmer-img-card"></div>
      <div className="shimmer-res-info-cont">
        <h2 className="shimmer-res-name"></h2>
        <p className="shimmer-time"></p>
        <p className="shimmer-time"></p>
      </div>
    </li>
  ));

  return <>{shimmerCards}</>;
};

export default Shimmer;
