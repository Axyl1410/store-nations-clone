import { TextShimmer } from "../motion-primitives/text-shimmer";

export default function Loading() {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      Loading Product...
    </TextShimmer>
  );
}
