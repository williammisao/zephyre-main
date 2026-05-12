import { motion } from 'motion/react';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.3 + i * 0.02,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <svg
        className="w-full h-full text-brand-accent"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.03 + path.id * 0.008}
            initial={{ pathLength: 0.3, opacity: 0.2 }}
            animate={{
              pathLength: 1,
              opacity: [0.1, 0.3, 0.1],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function AnimatedBackgroundLight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}
