import React from "react";

const ShimmerAccordian = () => {
  return (
    <>
      <div className="shimmer-accordian-main-cont shimmer-color"></div>
      <ul className="about-menu-cont">
        {Array(8)
          .fill()
          .map((_, i) => (
            <div className="shimmer-accordian-cont" key={i}>
              <div className="accordian-main-cont shimmer-color" key={i}>
                <div className="accordian-header-cont">
                  <h3 className="menu-title"></h3>
                </div>
              </div>
            </div>
          ))}
      </ul>
    </>
  );
};

export default ShimmerAccordian;
