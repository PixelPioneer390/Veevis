import React from "react";
import { X, Plus } from "lucide-react";

const ProjectDrawer = ({ isOpen, onClose }) => {
  const labelClass = "block text-white text-sm font-medium mb-1";
  const inputClass =
    "w-full px-3 py-2 rounded-md bg-[#272F41] text-white border border-gray-600 focus:outline-none focus:border-blue-400";

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Outer flex container for vertical centering */}
      <div className="h-full w-full flex items-center justify-between pr-4"> 
        {/* Inner box */}
        <div
          style={{ height: "90vh" }}
          className="bg-[#1B212E] w-[75%] sm:w-[380px] xl:w-[430px] flex flex-col gap-6 rounded-r-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex p-6 rounded-tr-3xl bg-[#272F41] items-center justify-between">
            <div className="flex gap-2 items-center text-white">
              <div
                className="w-6 h-6 border border-white flex justify-center items-center"
                style={{ borderRadius: "50px" }}
              >
                <Plus className="w-4 h-4" />
              </div>
              <h1 className="text-base font-medium">Create Project</h1>
            </div>
            <X
              className="text-white cursor-pointer hover:text-gray-300 transition"
              onClick={onClose}
            />
          </div>

          {/* Form Section */}
          <div
            className="p-6 overflow-y-auto custom-scrollbar flex-grow"
            style={{ maxHeight: "calc(85vh - 80px)" }}
          >
            {/* Projects */}
            <div className="mb-4">
              <label className={labelClass}>Projects</label>
              <select className={inputClass}>
                <option>Select Project</option>
                <option>Project Alpha</option>
                <option>Project Beta</option>
              </select>
            </div>

            {/* Assigned To */}
            <div className="mb-4">
              <label className={labelClass}>Assigned To</label>
              <select className={inputClass}>
                <option>Select User</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>

            {/* Due Added */}
            <div className="mb-4">
              <label className={labelClass}>Due Added</label>
              <div className="flex space-x-2">
                <input type="text" placeholder="Start" className={inputClass} />
                <input type="text" placeholder="End" className={inputClass} />
              </div>
            </div>

            {/* Due Date */}
            <div className="mb-4">
              <label className={labelClass}>Due Date</label>
              <div className="flex space-x-2">
                <input type="text" placeholder="Start" className={inputClass} />
                <input type="text" placeholder="End" className={inputClass} />
              </div>
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label className={labelClass}>Priority</label>
              <select className={inputClass}>
                <option>Select Priority</option>
                <option>High</option>
                <option>Normal</option>
                <option>Low</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className={labelClass}>Status</label>
              <select className={inputClass}>
                <option>Select Status</option>
                <option>Open</option>
                <option>Closed</option>
                <option>Answered</option>
                <option>On Hold</option>
              </select>
            </div>

            {/* Show */}
            <div className="mb-4">
              <label className={labelClass}>Show</label>
              <input type="text" placeholder="Enter value" className={inputClass} />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="bg-[#272F41] p-5 flex justify-end space-x-3 flex-shrink-0 rounded-b-[10px]">
            <button className="px-6 py-2 text-sm font-semibold rounded-lg bg-orange-700 text-white hover:bg-orange-600 transition duration-150 shadow-md">
              Reset
            </button>
            <button className="px-6 py-2 text-sm font-semibold rounded-lg bg-green-700 text-white hover:bg-green-600 transition duration-150 shadow-md">
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDrawer;
