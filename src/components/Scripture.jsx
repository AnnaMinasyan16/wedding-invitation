import { motion } from "framer-motion";
import { invitation } from "../data/invitation";

const ease = [0.22, 1, 0.36, 1];

export default function Scripture() {
  return (
    <section className="scripture" id="scripture">
      <div className="scripture__verses">
        {invitation.scripture.map((verse, index) => (
          <motion.blockquote
            key={verse.reference}
            className="scripture__verse"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: index * 0.12, ease }}
          >
            <span className="scripture__ornament" aria-hidden="true">
              ✦
            </span>
            <p className="scripture__text">{verse.text}</p>
            <cite className="scripture__reference">{verse.reference}</cite>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
