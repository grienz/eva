/* eslint-disable import/prefer-default-export */
export function GoogleMaps() {
  return (
    <div className="my-2 mx-2 flex max-w-2xl flex-col justify-center rounded-md border-1 border-teal-600 py-1 px-1">
      <iframe
        title="google maps"
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3xeqYHERyhQR4sKCcIAgoRg&key={process.env.GOOGLE_API_KEY}"
        width="auto"
        height="auto"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        style={{ border: "0" }}
      />
    </div>
  );
}
