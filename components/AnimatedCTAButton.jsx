"use client";

import React, { useEffect, useRef } from "react";
import { Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const CTAContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  top: -10,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2.5),

  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up(2000)]: {
    padding: theme.spacing(4),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
  color: "white",
  transition: "background 0.3s ease, transform 0.3s ease",
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  boxSizing: "border-box",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  willChange: "transform",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",

  "&:hover": {
    transform: "scale(1.05)",
    WebkitTransform: "scale(1.05)", // Safari prefix
    background:
      "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
  },
  "&:active": {
    transform: "scale(0.98)",
    WebkitTransform: "scale(0.98)", // Safari prefix
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
    padding: "10px 20px",
    minWidth: "120px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
    padding: "12px 24px",
    minWidth: "150px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: `clamp(1rem, calc(0.3rem + 1vw), 1.5rem)`,
    padding: "14px 28px",
    minWidth: "180px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.125rem",
    padding: "16px 32px",
    minWidth: "200px",
  },
  [theme.breakpoints.up(2550)]: {
    fontSize: `clamp(0.2rem, calc(0.5rem + 0.8vw), 40rem)`,
    padding: "24px 48px",
    minWidth: "280px",
  },
}));

const AnimatedCTA = () => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;

    if (!container || !button) return;

    // Calculate responsive button dimensions using clamp
    const getButtonWidth = () => {
      return "clamp(180px, 14vw, 320px)";
    };

    const getButtonHeight = () => {
      return "clamp(52px, 7vh, 84px)";
    };

    const getButtonPadding = () => {
      if (typeof window === "undefined") return "16px 32px";
      const viewportWidth = window.innerWidth;
      if (viewportWidth < 600) return "10px 20px";
      if (viewportWidth < 960) return "12px 24px";
      if (viewportWidth < 1440) return "14px 28px";
      if (viewportWidth < 1920) return "16px 32px";
      return "18px 36px";
    };

    const getButtonFontSize = () => {
      return "clamp(1rem, 0.6rem + 0.6vw, 1.75rem)";
    };

    // If reduced motion, set final state immediately
    if (prefersReducedMotion) {
      gsap.set(container, {
        opacity: 1,
        scale: 1,
      });
      gsap.set(button, {
        opacity: 1,
        scale: 1,
        width: getButtonWidth(),
        height: getButtonHeight(),
        borderRadius: "980px",
        fontSize: getButtonFontSize(),
        minWidth: "200px",
        padding: getButtonPadding(),
      });
      return;
    }

    // Set will-change for performance
    gsap.set([container, button], {
      willChange: "transform, opacity",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
    });

    // Initial state
    gsap.set(container, {
      opacity: 0,
      scale: 0,
    });
    gsap.set(button, {
      width: "80px",
      height: "80px",
      padding: "0",
      borderRadius: "50%",
      fontSize: "0",
      minWidth: "50px",
      opacity: 0,
      scale: 0,
    });

    // Create the animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
        scrub: false,
      },
    });

    // Bounce animation sequence
    tl.to(container, {
      opacity: 1,
      scale: 1,
      duration: 0.24,
    })
      .to(container, {
        duration: 0.48,
      })
      .to(container, {
        duration: 0.24,
      })
      .to(container, {
        duration: 0.24,
      });

    // Morph button animation
    const buttonTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
        scrub: false,
      },
    });

    const finalPadding = getButtonPadding();

    buttonTl
      .to(button, {
        opacity: 1,
        scale: 1,
        duration: 0.1,
      })
      .to(button, {
        width: "60px",
        height: "60px",
        padding: "0",
        borderRadius: "50%",
        fontSize: "0",
        minWidth: "50px",
        duration: 0.6,
      })
      .to(button, {
        width: getButtonWidth(),
        height: getButtonHeight(),
        padding: finalPadding,
        borderRadius: "980px",
        fontSize: getButtonFontSize(),
        fontWeight: "500",
        minWidth: "200px",
        duration: 0.36,
      })
      .to(button, {
        y: "10%",
        duration: 0.24,
        ease: "power2.out",
      });

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      if (buttonTl.scrollTrigger) {
        buttonTl.scrollTrigger.kill();
      }
      tl.kill();
      buttonTl.kill();
      // Reset will-change
      gsap.set([container, button], { willChange: "auto" });
    };
  }, [prefersReducedMotion]);

  // Handle button click to navigate to ContactUs page
  const handleButtonClick = () => {
    router.push("/contact");
    // window.scrollTo(0, 0); // Next.js handles this
  };

  return (
    <CTAContainer ref={containerRef}>
      <StyledButton
        ref={buttonRef}
        variant="contained"
        disableElevation
        onClick={handleButtonClick}
      >
        Get In Touch
      </StyledButton>
    </CTAContainer>
  );
};

export default AnimatedCTA;
