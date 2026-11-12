import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { invitation } from "../data/invitation";

function getTimeLeft(target) {
  const diff = new Date(target) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = [
  { key: "days", label: "Օր" },
  { key: "hours", label: "Ժամ" },
  { key: "minutes", label: "Րոպե" },
  { key: "seconds", label: "Վայրկյան" },
];

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeLeft(invitation.wedding.date));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft(invitation.wedding.date));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown" id="countdown">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-header__mark">✦</span>
        <h2 className="countdown__title">Մեր հարսանիքին մնաց</h2>
      </motion.div>

      <div className="countdown__grid">
        {units.map(({ key, label }, i) => (
          <motion.div
            key={key}
            className="countdown__unit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              key={time[key]}
              className="countdown__number"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {String(time[key]).padStart(2, "0")}
            </motion.span>
            <span className="countdown__label">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
