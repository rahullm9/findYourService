import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import workersHero from "../../assets/service_workers_hero.png";

const Heropage = () => {
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut", delay } },
  });

  return (
    <section className="bg-white pt-16 overflow-hidden">
      {/* -- Headline Block -- */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">

        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate="visible"
          style={{ color: "#e85d04", fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}
        >
          Connecting Communities
        </motion.p>

        <motion.h1
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#111827", lineHeight: 1.15, marginBottom: "20px" }}
        >
          {"We're making a difference"}
          <br />
          {"to people's lives"}
        </motion.h1>

        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          style={{ color: "#6b7280", fontSize: "1rem", maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.7 }}
        >
          Creating a way to connect people ready to work, with people who need work done
        </motion.p>

        <motion.div variants={fadeUp(0.3)} initial="hidden" animate="visible">
          <Link to="/contactus">
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "12px 28px", borderRadius: "8px", border: "1.5px solid #d1d5db",
                background: "white", color: "#374151", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#f9fafb"}
              onMouseOut={e => e.currentTarget.style.background = "white"}
            >
              Contact us <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>

        {/* Dots indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "28px" }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{
              height: "8px", borderRadius: "99px",
              width: i === 0 ? "22px" : "8px",
              background: i === 0 ? "#e85d04" : "#e5e7eb",
              transition: "all 0.2s",
            }} />
          ))}
        </div>
      </div>

      {/* -- Hero Image -- */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}
      >
        <div style={{ borderRadius: "20px", overflow: "hidden", background: "#f3f4f6", position: "relative" }}>
          <img
            src={workersHero}
            alt="Service professionals"
            style={{ width: "100%", display: "block", maxHeight: "480px", objectFit: "cover", objectPosition: "center top" }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
            background: "linear-gradient(to top, white, transparent)",
          }} />
        </div>
      </motion.div>

      {/* -- Mission Section -- */}
      <div style={{ background: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "start" }}>
          <motion.h2
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", lineHeight: 1.2 }}
          >
            Our mission
          </motion.h2>
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ color: "#6b7280", fontSize: "1rem", lineHeight: 1.8 }}
          >
            <p style={{ marginBottom: "16px" }}>
              At FindYourService, we&apos;re forging connections between skilled professionals and people who need them. We believe every task deserves an expert — from plumbing and carpentry to tutoring and design.
            </p>
            <p>
              We are a team of passionate individuals working to build a community where finding trustworthy help is as easy as a single search, with the shared goal of making quality service accessible to everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Heropage;
