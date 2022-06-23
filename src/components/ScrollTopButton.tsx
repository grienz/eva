import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollTopButton = (): JSX.Element => {
  const { scrollY } = useViewportScroll();
  const animation = useAnimation();

  const checkScrollTop = () => {
    if (scrollY?.get() > 250) {
      animation.start({
        opacity: 1,
        transition: {
          duration: 0.45,
          ease: "easeIn"
        }
      });
    } else {
      animation.start({ opacity: 0 });
    }
  };

  useEffect(() => {
    return scrollY.onChange(() => checkScrollTop());
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div animate={animation}>
      <FaArrowCircleUp
        onClick={scrollTop}
        className="fixed bottom-4 right-2 h-6 w-6 text-gray-800 hover:cursor-pointer hover:text-sky-600 dark:text-gray-50 dark:hover:text-sky-400 md:right-10 md:bottom-10"
      />
    </motion.div>
  );
};

export default ScrollTopButton;
