import React from "react";

const Card = (props: any) => {
  return (
    <div className="m-5 p-5 border-1 border rounded border-black text-center bg-indigo-600 text-white hover:bg-indigo-900">
      {props.children}
    </div>
  );
};

export default Card;
