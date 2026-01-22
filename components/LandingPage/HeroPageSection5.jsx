"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroPageSection5.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroPageSection5 = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize(window.innerWidth);
      const handleResize = () => setWindowSize(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const cards = [
    {
      title: "Discover Your Needs",
      description: "In-depth discovery to align with your business goals.",
      icon: SearchRoundedIcon,
    },
    {
      title: "Craft a Tailored Plan",
      description:
        "Strategy, implementation, and optimization designed for measurable outcomes.",
      icon: AssignmentRoundedIcon,
    },
    {
      title: "Deliver and Iterate",
      description:
        "Continuous improvement ensures solutions stay ahead of the curve.",
      icon: AutorenewRoundedIcon,
    },
  ];

  // GSAP Animation Logic
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;

    const initializeAnimations = () => {
      if (isDesktop && cardRefs.current.length > 0) {
        cardRefs.current.forEach((card, index) => {
          if (card) {
            // Set will-change for better performance
            gsap.set(card, { willChange: "transform, opacity" });

            gsap.fromTo(
              card,
              { x: "70%", opacity: 0 },
              {
                x: "0%",
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  end: "top 60%",
                  scrub: true,
                  onComplete: () => {
                    // Unset will-change after animation completes
                    gsap.set(card, { willChange: "auto" });
                  },
                },
              }
            );
          }
        });
      }
    };

    initializeAnimations();

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (cardRefs.current.includes(trigger.vars.trigger)) {
          trigger.kill();
        }
      });
      // Ensure will-change is unset on cleanup
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, { willChange: "auto" });
        }
      });
    };
  }, [isDesktop, prefersReducedMotion]);

  // Helper functions matching other sections
  const getContainerWidth = () => {
    if (isSmallDesktop) return "90%";
    if (isLaptop13) return "90%";
    if (isLaptop14) return "90%";
    if (isLaptop15) return "90%";
    if (isLargeDesktop) return "90%";
    if (isXtraLargeDesktop) return "90%";
    if (isUltraWide) return "90%";
    return "90%"; // Default fallback
  };

  const getContainerMaxWidth = () => {
    if (isXtraLargeDesktop) return "1920px";
    if (isUltraWide) return "2400px";
    return "none";
  };

  const getPadding = () => {
    if (isSmallDesktop) return "3rem";
    if (isLaptop13) return "3.5rem";
    if (isLaptop14) return "3.75rem";
    if (isLaptop15) return "4rem";
    if (isLargeDesktop) return "4rem";
    if (isXtraLargeDesktop) return "4rem";
    if (isUltraWide) return "5rem";
    return "4rem"; // Default
  };

  return (
    <Box
      ref={sectionRef}
      className={styles.sectionRoot}
      sx={{
        minHeight: { md: "80vh", xl: "100vh" },
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        bgcolor: "#000",
        marginTop: { xs: "0", sm: "4rem", md: "0" },
        width: {
          xs: "100%",
          sm: "92%",
          md: getContainerWidth(),
        },
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: getContainerMaxWidth(),
        },
        margin: "0 auto",
        padding: {
          xs: "0",
          sm: "2rem",
          md: getPadding(),
        },
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "relative",
          top: "20%",
          left: "0",
          right: "0%",
          bottom: 0,
          height: "60%",
          background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.6) 0%, rgba(0, 0, 0, 0) 100%)`,
          zIndex: -1,
          pointerEvents: "none",
          transformOrigin: "center center",
        }}
      />
      {/* Title Section */}
      <Box className={styles.sectionInner}>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-10%", md: "-12%" },
            left: "0",
            right: "0%",
            bottom: 0,
            height: "50%",
            background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.28) 0%, rgba(0, 0, 0, 0) 50%)`,
            zIndex: 999,
            pointerEvents: "none",
            transformOrigin: "center center",
          }}
        />
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 2.5vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 2.5vw), 10rem)`,
            },
            position: "relative",
            top: "0px",
            background: "black",
            textAlign: "center",
          }}
        >
          How We{" "}
          <Box
            component="span"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Work?
          </Box>
        </Typography>
      </Box>
      {/* Mobile/Tablet Cards */}
      <Box className={styles.mobileCardsWrapper}>
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: "80%", md: "30%" },
              maxWidth: { xs: "350px", md: "400px" },
              background: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              overflow: "visible",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: { xs: 3, sm: 4 },
                "&:last-child": { pb: { xs: 3, sm: 4 } },
              }}
            >
              {React.createElement(card.icon, {
                sx: {
                  color: "#8E54F7",
                  fontSize: { xs: 40, sm: 48 },
                  mb: 2,
                },
              })}
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Desktop Layout */}
      <Box className={styles.desktopWrapper}>
        <div className={styles.desktopInner}>
          <div className={styles.gradientCardBox}>
            {cards.map((card, index) => (
              <div
                className={`${styles.box} aos-init aos-animate`}
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration={`${500 + index * 100}`}
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
              >
                <div className={styles.content}>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default HeroPageSection5;
