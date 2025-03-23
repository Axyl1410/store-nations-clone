import { TextShimmer } from "../motion-primitives/text-shimmer";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <TextShimmer className="font-mono text-sm" duration={1}>
      {text}
    </TextShimmer>
  );
}
