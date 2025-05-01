import React, { useRef } from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopupButton = () => {
  const rootElementRef = useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    rootElementRef.current = document.getElementById("root");
  }, []);

  return (
    <PopupButton
      className="border-2 border-white px-6 py-4 font-semibold text-white hover:bg-white hover:text-neutral-900 rounded-full"
      url="https://calendly.com/emiliorivera747/30min"
      /*
       * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
       * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
       */
      rootElement={rootElementRef.current || document.body}
      text="Schedule Consultation"
    />
  );
};

export default CalendlyPopupButton;
