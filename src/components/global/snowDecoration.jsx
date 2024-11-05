import { Snowflake } from "lucide-react"

export const SnowDecoration = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <Snowflake
        key={i}
        className="absolute text-gray-300 opacity-50"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 10}px`,
          animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
        }}
      />
    ))}
  </div>
)