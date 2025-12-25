export default function FullScreenLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-3 text-base font-medium text-primary">
        Please wait, loading...
      </p>
    </div>
  );
}
