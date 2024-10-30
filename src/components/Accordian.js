import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import AccordianItemCard from "./AccordianItemCard";

const Accordian = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { resInfoList, resDetails } = props;

  const onClickAccordian = (index) => {
    setActiveIndex((prev) => {
      if (prev === index) {
        return null;
      }
      return index;
    });
  };

  return (
    <div className="accordian-cont">
      {resInfoList.map((each, index) => (
        <div className="accordian-main-cont" key={each.cardTitle}>
          <div
            className="accordian-header-cont"
            onClick={() => onClickAccordian(index)}
          >
            <h3 className="menu-title">
              {each.cardTitle} {`(${each.itemCards.length})`}
            </h3>
            <button type="button" className="accordian-btn">
              {activeIndex === index ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
          {activeIndex === index && (
            <ul className="about-menu-cont">
              {each.itemCards.map((item) => (
                <AccordianItemCard
                  itemCard={item}
                  key={item.card.info.id}
                  resDetails={resDetails}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordian;
