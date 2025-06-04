/**
 * Custom hook for detecting mobile viewport
 * Uses media query to track viewport width changes
 */

import * as React from "react"

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set initial value
    onChange();
    
    // Add listener for viewport changes
    mql.addEventListener("change", onChange);
    
    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}