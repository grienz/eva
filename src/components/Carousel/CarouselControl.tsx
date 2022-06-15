/* eslint-disable no-nested-ternary */
export const CarouselControl = ({
  index,
  selected
}: {
  index: number;
  selected: number;
}) => {
  return (
    <div
      className={`flex absolute w-full h-full ${
        selected === index
          ? 'left-0'
          : selected > index
          ? '-left-full'
          : 'left-full'
      }`}
      style={{ transition: 'left .25s' }}
    ></div>
  );
};
