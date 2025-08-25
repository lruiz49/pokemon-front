export function PokeballIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      {/* outer circle */}
      <circle cx="12" cy="12" r="10" fill="white" />

      {/* dividing line */}
      <rect x="2" y="11" width="20" height="2" fill="#DC0A2D" />

      {/* center red circle (band) */}
      <circle cx="12" cy="12" r="4" fill="#DC0A2D" />

      {/* inner small white dot */}
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  )
}