type ErrorProps = {
  message?: string;
};

export default function Error({
  message = "Something went wrong.",
}: ErrorProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-center text-red-600">{message}</p>
    </div>
  );
}