import { motion } from "framer-motion";
import { invitation } from "../data/invitation";

const ease = [0.22, 1, 0.36, 1];
const icons = [ChurchIcon, WeddingHallIcon];

function ChurchIcon() {
  return (
    <svg viewBox="0 0 32 32" className="program__icon" aria-hidden="true">
      <path
        d="M16 3.5v2.2M14.8 4.6h2.4"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M16 5.7L8.5 10.8v2.2h15V10.8L16 5.7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 13v12.5h11V13"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 25.5v-7.2a2.8 2.8 0 0 1 5.6 0v7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 16.8h7.6M12.2 19.8h7.6"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="16" cy="11.2" r="1" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function WeddingHallIcon() {
  return (
    <svg viewBox="0 0 32 32" className="program__icon" aria-hidden="true">
      <path
        d="M5.5 26.5h21"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M8 26.5V15.2l8-4.7 8 4.7V26.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 26.5v-9a4.5 4.5 0 0 1 9 0v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 15.2h11M16 10.5V7.8"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M13.8 7.8h4.4l-.6 1.8h-3.2l-.6-1.8z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M14.8 20.2h2.4M13.5 22.8h5"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Program() {
  return (
    <section className="program" id="program">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <span className="section-header__mark">✦</span>
        <h2 className="program__title">Օրվա ծրագիրը</h2>
      </motion.div>

      <ol className="program__list">
        {invitation.program.map((event, index) => {
          const Icon = icons[index] ?? icons[0];

          return (
            <motion.li
              key={event.title}
              className="program__entry"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: index * 0.12, ease }}
            >
              <div className="program__marker" aria-hidden="true">
                <span className="program__icon-ring">
                  <Icon />
                </span>
              </div>

              <div className="program__content">
                <time className="program__time" dateTime={event.time}>
                  {event.time}
                </time>

                <div className="program__body">
                  <div className="program__event">
                    <h3>{event.title}</h3>
                    <p className="program__subtitle">{event.subtitle}</p>
                  </div>

                  <address className="program__venue">
                    <span className="program__venue-name">
                      {event.venue.name}
                    </span>
                    <span className="program__venue-address">
                      {event.venue.address}, {event.venue.city}
                    </span>
                  </address>

                  {event.venue.mapUrl && (
                    <a
                      href={event.venue.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="program__link"
                    >
                      Տեսնել քարտեզին
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
