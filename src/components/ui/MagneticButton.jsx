import Magnet from "../reactbits/Magnet.jsx";
import { Button } from "./Button.jsx";
import { usePointerFine, usePrefersReducedMotion } from "../../hooks/useMediaQuery.js";

/**
 * A Button that leans towards the cursor.
 *
 * The magnet is disabled — not merely invisible — on touch devices and under
 * reduced motion, so no global mousemove listener is attached on hardware that
 * can never trigger it.
 */
export function MagneticButton({ strength = 3.4, padding = 70, ...props }) {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const disabled = !fine || reduced;

  return (
    <Magnet
      padding={padding}
      magnetStrength={strength}
      disabled={disabled}
      wrapperClassName="inline-block"
    >
      <Button {...props} />
    </Magnet>
  );
}
