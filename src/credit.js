import React from "react";
export default function CardInfo(props) {
const { title, info, tglPost, author } = props;
return (
<div class="flex flex-col bg-gray-100 flex items-center justify-center shadow-md" style={{ height: "400px" }}>
  <div class="containter mx-auto px-20">
    <div class="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
      <h3 class="text-2xl text-gray-800 font-semibold mb-3">{title}</h3>
      <h7 class="text-1xl text-indigo-600 font-semibold mb-3">Di Posting pada: {tglPost}</h7>
      <div><h7 class="text-gray-600 leading-6 tracking-normal">{info}</h7>
      </div>
      <div><h7 class="text-gray-600 leading-6 tracking-normal">- by : {author}</h7></div>
      <div>
      <button class="button">Learn  More</button>
      </div> 
    </div>
  </div>
</div>
);
}

