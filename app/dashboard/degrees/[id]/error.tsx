'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
    console.log(error)
  return (
    <div>
      <h2>Hubo un error en esta pagina!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}