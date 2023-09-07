import { Progress } from "@nextui-org/progress";

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="absolute left-5 bottom-5 bg-green-500/50 rounded-md">
      <p className="text-white p-4">{message}</p>
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        color="success"
      />
    </div>
  )
}
