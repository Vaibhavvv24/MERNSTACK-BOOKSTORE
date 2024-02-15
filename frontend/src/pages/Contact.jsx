import React from "react";

const Contact = () => {
  return (
    <div className="bg-blue-400 h-screen">
      <h1 className="text-4xl pt-10 text-white text-center">Contact Us</h1>
      <div className=" flex justify-center items-center">
        <form className="flex flex-col gap-4 mt-10">
          <input
            type="text"
            className="p-2 border-solid rounded-md w-full"
            placeholder="Name"
          />
          <input
            type="text"
            className="p-2 border-solid rounded-md w-full"
            placeholder="Email"
          />
          <input
            type="text"
            className="p-2 border-solid rounded-md w-full"
            placeholder="Subject"
          />

          <textarea
            cols={40}
            rows={3}
            className="p-2 border-solid rounded-md w-full"
            placeholder="Message"
          ></textarea>
          <button className="bg-green-100 p-3 rounded-md">Send mail</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
