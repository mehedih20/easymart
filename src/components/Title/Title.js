import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const Title = ({ text }) => {
  return (
    <h2 className="title">
      <span>
        <AiOutlineHome
          style={{ marginTop: "-0.2rem", marginRight: "0.5rem" }}
        />{" "}
        Home <MdKeyboardArrowRight />
      </span>
      Pages <MdKeyboardArrowRight /> {text}
    </h2>
  );
};

export default Title;
