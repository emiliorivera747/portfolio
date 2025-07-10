import { OverlayProps } from "@/types/overlays";

/**
 *
 * Background overlay covers the whole screen with a semi-transparent black layer and
 * allows for a customizable opacity.
 *
 * @param opacity - The opacity of the overlay, default is 0.3
 * @returns
 */
const BackgroundOverlay = ({ opacity = 0.4 }: OverlayProps) => {
  return (
    <div className="">
      <div
        style={{ opacity }}
        className="absolute top-0 left-0 w-full h-full bg-black"
      ></div>
    </div>
  );
};

export default BackgroundOverlay;
