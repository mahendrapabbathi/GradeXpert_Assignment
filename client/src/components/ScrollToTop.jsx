import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white  rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all z-50 cursor-pointer"
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTop;
