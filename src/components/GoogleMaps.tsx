/* eslint-disable import/prefer-default-export */
export function GoogleMaps() {
  return (
    <div className="flex flex-col justify-center rounded-md border-1 border-teal-600 py-1 px-1">
      <iframe
        src="https://www.google.com/maps/embed/v1/place?q=eva+smart+shower+üçevler&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        width="auto"
        height="auto"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

/* <div className="mx-auto flex max-w-2xl flex-col justify-center border-gray-200 pb-16 dark:border-gray-700">
<iframe
  title="google maps"
  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3xeqYHERyhQR4sKCcIAgoRg&key={process.env.GOOGLE_API_KEY}"
  width="100%"
  height="100%"
  loading="lazy"
  frameBorder="0"
  style={{ border: "0" }}
  allowFullScreen
/>
</div> */
