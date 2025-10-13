import React, { useState } from "react";

// --- DATA (Using Image Logos Instead of Icons) ---
const FAQS_DATA = [
  {
    id: 1,
    question: "What is a CRM and why use it?",
    answer:
      "A CRM (Customer Relationship Management) system helps businesses organize customer data, manage interactions, and automate processes like sales and support. It improves efficiency, customer satisfaction, and business growth.",
    logo: "/Black.svg",
    isFixedOpen: true,
  },
  {
    id: 2,
    question: "Can I integrate other tools?",
    answer:
      "Yes, our CRM provides extensive API documentation and built-in connectors to integrate with hundreds of popular business applications like Slack, Zapier, and marketing automation platforms.",
    logo: "/Tools.svg",
    isFixedOpen: false,
  },
  {
    id: 3,
    question: "Is my data safe in this CRM?",
    answer:
      "Absolutely. We use industry-leading encryption, multi-factor authentication, and adhere to strict data privacy regulations (like GDPR) to ensure your data is secure and protected.",
    logo: "/mic.svg",
    isFixedOpen: false,
  },
  {
    id: 4,
    question: "What features should a CRM have?",
    answer:
      "A robust CRM should include contact management, sales pipeline tracking, reporting, automation workflows, and customer support ticketing capabilities.",
    logo: "/Settings.svg",
    isFixedOpen: false,
  },
  {
    id: 5,
    question: "Does it support multiple roles?",
    answer:
      "Our CRM offers role-based access control, allowing you to define custom permissions for sales, marketing, and support teams, ensuring everyone sees only what they need.",
    logo: "/Headphone.svg",
    isFixedOpen: false,
  },
  {
    id: 6,
    question: "How does a CRM help my business?",
    answer:
      "It helps streamline operations, improves sales forecasts, enhances customer retention, and provides actionable insights, leading to higher revenue and better business decisions.",
    logo: "/Bag.svg",
    isFixedOpen: false,
  },
  {
    id: 7,
    question: "Is this CRM industry-specific?",
    answer:
      "No, our CRM is highly flexible and industry-agnostic. It can be customized and configured to suit the needs of any sector, from finance and healthcare to e-commerce and non-profits.",
    logo: "Res.svg",
    isFixedOpen: false,
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onToggle, isFixedOpen, logo }) => {
  const isCurrentlyOpen = isFixedOpen || isOpen;

  return (
    <div
      className={`rounded-2xl transition-all duration-300 overflow-hidden  ${
        isFixedOpen
          ? "bg-gradient-to-tl to-[#7D9852] from-[#506B47] pb-2 shadow-lg"
          : "bg-[#121723] border border-white/10 hover:bg-white/10"
      }`}
    >
      {/* Header (Question Row) */}
      <div
        className={`flex items-center justify-between cursor-pointer p-6 ${
          isFixedOpen ? "pb-2" : ""
        }`}
        onClick={isFixedOpen ? null : onToggle}
      >
        {/* Left: Image + Question */}
        <div className="flex items-center gap-4">
          <div
            className={`p-1 rounded-md flex items-center justify-center ${
              isFixedOpen ? "bg-white" : "bg-[#121723]"
            }`}
          >
            {/* ✅ Display the image here */}
            <img
              src={logo}
              alt="faq icon"
              className={`w-6 h-6 object-contain ${
                isFixedOpen ? "brightness-110" : "opacity-90"
              }`}
            />
          </div>

          <h3
            className={`text-lg font-medium select-none ${
              isFixedOpen ? "text-white" : "text-white"
            }`}
          >
            {question}
          </h3>
        </div>

        {/* Toggle Button */}
        <div className="flex-shrink-0">
          {isFixedOpen ? (
            <div className="w-8 h-8 flex items-center justify-center bg-[#FFB743] text-white rounded-md pb-1 text-3xl">
              -
            </div>
          ) : (
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold transition-all duration-300 ${
                isCurrentlyOpen
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {isCurrentlyOpen ? "−" : "+"}
            </div>
          )}
        </div>
      </div>

      {/* Answer (Content) */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isCurrentlyOpen ? "max-h-31 ease-in" : "max-h-0 ease-out"
        }`}
      >
        <div className={`pb-6 px-6`}>
          <p
            className={`text-base leading-relaxed ${
              isFixedOpen ? "text-gray-100" : "text-gray-300"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [openItemId, setOpenItemId] = useState(null);

  const handleToggle = (id) => {
    setOpenItemId(id === openItemId ? null : id);
  };

  const fixedItem = FAQS_DATA.find((item) => item.isFixedOpen);
  const otherItems = FAQS_DATA.filter((item) => !item.isFixedOpen);
  const leftColumnItems = otherItems.filter(
    (item) => item.id === 4 || item.id === 6
  );
  const rightColumnItems = otherItems.filter(
    (item) => item.id === 2 || item.id === 3 || item.id === 5 || item.id === 7
  );

  return (
    <div className="min-h-screen p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#DE8B2D] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl">
            Still you have any questions? Contact our team via{" "}
            <span className="text-white font-medium">
              Veeivescrm@gmail.com
            </span>
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {fixedItem && (
              <AccordionItem {...fixedItem} isOpen={true} onToggle={() => {}} />
            )}
            {leftColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                {...item}
                isOpen={item.id === openItemId}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {rightColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                {...item}
                isOpen={item.id === openItemId}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
