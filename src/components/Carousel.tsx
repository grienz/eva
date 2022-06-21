import { useEffect, useRef, useState } from "react";

import type { ProductBase } from "@/typings/schema-types";

export function Carousel({ products }: { products: ProductBase[] }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        <div className="top left absolute flex h-full w-full justify-between">
          <button
            onClick={movePrev}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-blue-900/75 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth rounded-lg"
        >
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="carousel-item relative min-w-full snap-start text-center"
              >
                <a
                  href={`/product/${product.productSlug}`}
                  className="z-0 block aspect-square w-full bg-cover bg-left-top bg-no-repeat bg-origin-padding"
                  style={{
                    backgroundImage: `url(${product.productImageUrl || ""})`
                  }}
                >
                  {/* eslint-disable-next-line */}
                  <img
                    src={product.productImageUrl || ""}
                    alt={product.productTitle}
                    className="hidden aspect-square w-full"
                  />
                </a>
                <a
                  href={`/product/${product.productSlug}`}
                  className="absolute top-0 left-0 z-10 block aspect-square h-full w-full bg-blue-800/75 opacity-0 transition-opacity duration-300 hover:opacity-100"
                >
                  <h3 className="mx-auto py-6 px-3 text-xl text-white">
                    {product.productTitle}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Carousel;
