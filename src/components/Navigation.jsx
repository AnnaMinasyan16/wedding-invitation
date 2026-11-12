import { motion } from 'framer-motion'
import { invitation } from '../data/invitation'

export function Footer() {
  const { partner1, partner2 } = invitation.couple

  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="footer__names">{partner1} & {partner2}</p>
      </motion.div>
    </footer>
  )
}
