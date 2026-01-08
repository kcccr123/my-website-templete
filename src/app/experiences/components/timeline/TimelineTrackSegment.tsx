interface TimelineTrackSegmentProps {
  endLabel: string;
  startLabel: string;
  durationMonths: number;
  monthHeight: number;
}

export default function TimelineTrackSegment({
  endLabel,
  startLabel,
  durationMonths,
  monthHeight
}: TimelineTrackSegmentProps) {
  const showStartMarker = durationMonths > 1;
  const topBlockStyle = { height: `${monthHeight}px` };
  const bottomBlockStyle = { height: showStartMarker ? `${monthHeight}px` : "0px" };
  return (
    <div className="flex h-full flex-col items-center text-[11px] leading-none text-[var(--color-text-muted)]">
      <div className="flex w-full flex-col items-center justify-start" style={topBlockStyle}>
        <span className="whitespace-nowrap">{endLabel}</span>
        <div className="mt-1 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35)]" />
      </div>
      <div className="w-px flex-1 rounded-full bg-white/70" />
      <div className="flex w-full flex-col items-center justify-start" style={bottomBlockStyle}>
        {showStartMarker && (
          <>
            <div className="h-2 w-2 rounded-full border border-white/70 bg-transparent" />
            <span className="mt-1 whitespace-nowrap">{startLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}
