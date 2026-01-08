interface TimelineDatesProps {
  endLabel: string;
  startLabel: string;
  durationHeight: number;
  segmentTop: number;
  startLabelTop: number;
  dotOffset: number;
  dotSize: number;
  laneOffset: number;
}

export default function TimelineDates({
  endLabel,
  startLabel,
  durationHeight,
  segmentTop,
  startLabelTop,
  dotOffset,
  dotSize,
  laneOffset
}: TimelineDatesProps) {
  const laneLeft = `calc(50% + ${laneOffset}px)`;
  const startDotTop = startLabelTop - dotSize - 2;
  return (
    <div className="relative h-full w-full">
      <span
        className="absolute -translate-x-1/2 text-xs leading-tight text-[var(--color-text-muted)]"
        style={{ top: 0, left: laneLeft }}
      >
        {endLabel}
      </span>
      <div
        className="absolute -translate-x-1/2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35)]"
        style={{ top: `${dotOffset}px`, height: `${dotSize}px`, width: `${dotSize}px`, left: laneLeft }}
      />
      <div
        className="absolute -translate-x-1/2 w-[2px] rounded-full bg-white/70"
        style={{ top: `${segmentTop}px`, height: `${durationHeight}px`, left: laneLeft }}
      />
      <div
        className="absolute -translate-x-1/2 rounded-full border border-white/70 bg-transparent"
        style={{
          top: `${startDotTop}px`,
          height: `${dotSize}px`,
          width: `${dotSize}px`,
          left: laneLeft
        }}
      />
      <span
        className="absolute -translate-x-1/2 text-xs leading-tight text-[var(--color-text-muted)]"
        style={{ top: `${startLabelTop}px`, left: laneLeft }}
      >
        {startLabel}
      </span>
    </div>
  );
}
