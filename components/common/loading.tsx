import { TextShimmer } from "../motion-primitives/text-shimmer";

export default function Loading({ text = "Loading..." }: { text?: string }) {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      {text}
    </TextShimmer>
  );
}
