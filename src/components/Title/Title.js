import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const Title = ({ text }) => {
  const newText = text.split("/");
  console.log(newText);
  return (
    <h2 className="title">
      <span>
        <AiOutlineHome
          style={{ marginTop: "-0.2rem", marginRight: "0.5rem" }}
        />{" "}
        Home <MdKeyboardArrowRight />
      </span>
      Pages <MdKeyboardArrowRight /> {newText[0]}
      {newText[1] && (
        <>
          <MdKeyboardArrowRight /> {newText[1]} <MdKeyboardArrowRight />
          {newText[2]}
        </>
      )}
    </h2>
  );
};

export default Title;
