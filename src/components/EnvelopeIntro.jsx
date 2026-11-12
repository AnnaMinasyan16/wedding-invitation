import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EnvelopeIntro({ onOpen, onClosed, onLetterOpen }) {
  const [opening, setOpening] = useState(false);
  const [flapBack, setFlapBack] = useState(false);
  const [flapGone, setFlapGone] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const envelopeRef = useRef(null);
  const [letterY, setLetterY] = useState({ closed: 12, open: -158 });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const envelope = envelopeRef.current;
    if (!envelope) return;

    const updateLetterMotion = () => {
      const scale = envelope.offsetWidth / 300;
      setLetterY({ closed: 12 * scale, open: -158 * scale });
    };

    updateLetterMotion();
    const observer = new ResizeObserver(updateLetterMotion);
    observer.observe(envelope);

    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onLetterOpen?.();
    const phone = window.matchMedia("(max-width: 768px)").matches;
    window.setTimeout(() => setFlapBack(true), phone ? 420 : 980);
    window.setTimeout(() => setFlapGone(true), phone ? 520 : 1200);
    window.setTimeout(() => {
      setLeaving(true);
      onOpen?.();
    }, 2300);
    window.setTimeout(() => {
      setDone(true);
      onClosed?.();
    }, 2700);
  };

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="envelope-scene"
          animate={opening ? { y: -6 } : { y: 0 }}
          transition={{
            duration: 1.8,
            delay: opening ? 0.85 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className={`envelope-caption ${opening ? "is-hidden" : ""}`}>
            Հարսանեկան հրավիրատոմս
          </p>

          <div
            ref={envelopeRef}
            className={`envelope ${opening ? "envelope--open" : ""} ${flapGone ? "envelope--clear" : ""}`}
          >
            <div className="envelope__shadow" />
            <div className="envelope__body" />

            <motion.div
              className="envelope__letter"
              animate={opening ? { y: letterY.open } : { y: letterY.closed }}
              transition={{
                duration: 1.55,
                delay: opening ? 1.05 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="envelope__monogram">Ա · Ա</span>
              <span className="envelope__rule" />
              <span className="envelope__hint">Դուք հրավիրված եք</span>
            </motion.div>

            <div className="envelope__pocket" />

            {!flapGone && <div className={`envelope__flap-wrap ${flapBack ? "is-back" : ""}`}>
              <motion.div
                className="envelope__flap"
                animate={
                  isPhone
                    ? { opacity: opening ? 0 : 1, rotateX: 0 }
                    : { rotateX: opening ? 180 : 0 }
                }
                transition={
                  isPhone
                    ? { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                    : {
                        duration: 1.2,
                        delay: opening ? 0.08 : 0,
                        ease: [0.45, 0.05, 0.2, 1],
                      }
                }
              >
                <div className="envelope__flap-face envelope__flap-face--out" />
                {!isPhone && (
                  <div className="envelope__flap-face envelope__flap-face--in" />
                )}
                <motion.button
                  type="button"
                  className="seal-button"
                  onClick={handleOpen}
                  style={{ x: "-50%", y: "50%" }}
                  whileHover={
                    opening ? undefined : { scale: 1.035, x: "-50%", y: "50%" }
                  }
                  whileTap={
                    opening ? undefined : { scale: 0.985, x: "-50%", y: "50%" }
                  }
                  animate={
                    opening
                      ? { opacity: 0, x: "-50%", y: "50%" }
                      : { opacity: 1, x: "-50%", y: "50%" }
                  }
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  aria-label="Բացել"
                >
                  <svg
                    className="seal-button__wax"
                    viewBox="0 0 120 120"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="letter-wax" cx="38%" cy="32%" r="70%">
                        <stop offset="0%" stopColor="#c24a54" />
                        <stop offset="48%" stopColor="#8e1f2b" />
                        <stop offset="100%" stopColor="#5c121a" />
                      </radialGradient>
                    </defs>
                    <path
                      fill="#4a1016"
                      d="M60 104C60 104 16 74 16 46 16 28 30 16 44 16c9 0 15 6 16 13 1-7 7-13 16-13 14 0 28 12 28 30 0 28-44 58-44 58z"
                    />
                    <path
                      fill="url(#letter-wax)"
                      d="M60 100C60 100 18 72 18 46 18 30 31 18 45 18c8 0 14 5 15 12 1-7 7-12 15-12 14 0 27 12 27 28 0 26-42 54-42 54z"
                    />
                    <ellipse
                      cx="44"
                      cy="36"
                      rx="10"
                      ry="6"
                      fill="#fff6f4"
                      opacity="0.2"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </div>}
          </div>

          <button
            type="button"
            className="envelope-open"
            onClick={handleOpen}
            disabled={opening}
          >
            Բացել
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
