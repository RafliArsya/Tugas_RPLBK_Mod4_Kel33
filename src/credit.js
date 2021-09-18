import React from "react";
export default function CardInfo(props) {
const { title, info, tglPost, author } = props;
return (
<div class="flex flex-col bg-gray-100 flex items-center justify-center shadow-md" style={{ height: "400px" }}>
  <div class="containter mx-auto px-20">
    <div class="bg-white p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500">
      <h1 class="text-2xl text-gray-800 font-semibold mb-3">{title}</h1>
      <p class="text-1xl text-indigo-600 font-semibold mb-3">Di Posting pada {tglPost}</p>
      <p class="text-gray-600 leading-6 tracking-normal">{info}</p>
      <p class="text-gray-600 leading-6 tracking-normal">- by : {author}</p>
  <button class="py-2 px-4 mt-8 bg-indigo-600 text-white rounded-md shadow-xl">Learn  More</button>
      <div>
        <span class="absolute py-2 px-8 text-sm text-white top-0 right-0 bg-indigo-600 rounded-md transform translate-x-2 -translate-y-3 shadow-xl">New</span>
      </div>
    </div>
  </div>
</div>
);
}