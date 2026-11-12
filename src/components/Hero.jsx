import { motion } from 'framer-motion'
import { invitation } from '../data/invitation'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { partner1, partner2 } = invitation.couple

  return (
    <section className="hero" id="home">
      <div className="hero__frame">
      <img
        className="hero__photo"
        src="/images/WeddingCouple.jpg"
        alt={`${partner1} and ${partner2}`}
        fetchPriority="high"
      />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content">
        <motion.h1
          className="hero__names"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="hero__name">{partner1}</span>
          <span className="hero__amp" aria-hidden="true">&</span>
          <span className="hero__name">{partner2}</span>
        </motion.h1>
        <motion.p
          className="hero__date"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          12.12.2026
        </motion.p>
      </div>
      </div>

      <motion.p
        className="hero__greeting"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {invitation.greeting}
      </motion.p>
    </section>
  )
}
