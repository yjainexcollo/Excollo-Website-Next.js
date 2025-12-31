"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({
  title,
  description,
  showDescription,
  isFinalState,
  isMainCard,
  isMobile,
  isTablet,
}) => {
  const cardStyles = {
    background: "linear-gradient(180deg, #05000A 0%, #1B1125 100%)",
    borderRadius: "12px",
    textAlign: "center",
    padding: {
      xs: "1rem",
      sm: "1.25rem",
      md: "1rem",
    },
    height: isMobile ? "150px" : isTablet ? "200px" : "100%",
    minHeight: {
      xs: "150px",
      sm: "200px",
      md: "auto",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: {
      xs: "1rem",
      sm: "1.5rem",
      md: "1rem",
    },
    // Reduced blur for better Safari performance
    boxShadow: {
      xs: "rgba(133, 86, 245, 0.4) 0px 0px 20px 0px",
      md: "rgba(133, 86, 245, 0.4) 0px 0px 60px 0px", // Reduced from 100px
    },
    border: "1px solid #7e22ce",
    transition: "all 0.3s ease",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    "&:hover": {
      backgroundColor: "#000000",
      transform: "translateY(-5px)",
      boxShadow: {
        xs: "rgba(133, 86, 245, 0.4) 0px 0px 40px 0px", // Reduced blur
        md: "rgba(133, 86, 245, 0.4) 0px 0px 60px 0px", // Reduced from 100px
      },
    },
  };

  const titleStyles = {
    background: isMobile
      ? "linear-gradient(90deg, #2579e3, #8e54f7)"
      : "linear-gradient(90deg, #2579e3, #8e54f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
    marginBottom: isMobile ? "0.5rem" : "1rem",
    marginTop: isFinalState ? "0" : isMobile ? "0" : isTablet ? "0" : "2rem",
    transition: "margin-top 0.5s ease",
    fontSize: isMainCard
      ? isTablet
        ? `clamp(1.35rem, calc(0.5rem + 1.5vw), 9rem)`
        : isMobile
        ? `clamp(1.35rem, calc(0.5rem + 1vw), 9rem)`
        : "4rem" // Will be overridden by GSAP animation, but provides fallback
      : isMobile
      ? `clamp(1.35rem, calc(0.5rem + 1vw), 9rem)`
      : isTablet
      ? `clamp(1.35rem, calc(1rem + 1vw), 9rem)`
      : {
          md: `clamp(0.25rem,calc(1rem + 0.5vw),2.2rem)`,
          lg: `clamp(0.25rem,calc(1rem + 0.8vw),2.2rem)`,
          xl: `clamp(0.25rem,calc(1rem + 1vw),3rem)`,
        },
    fontWeight: isMainCard ? 400 : 400,
  };

  return (
    <Paper elevation={6} sx={cardStyles}>
      <Typography gutterBottom className="feature-title" sx={titleStyles}>
        {title}
      </Typography>
      {((!isMobile && !isTablet) ||
        (isMobile && description) ||
        (isTablet && description)) && (
        <Typography
          fontWeight={100}
          color="white"
          className="feature-description"
          sx={{
            fontSize: {
              xs: `clamp(0.8rem, calc(0.5rem + 1vw), 9rem)`,
              md: `clamp(0.5rem, calc(0.6rem + 0.4vw), 1.5rem)`,
              lg: `clamp(0.5rem, calc(0.6rem + 0.6vw), 1.8rem)`,
              xl: `clamp(0.25rem, calc(0.5rem + 0.8vw), 3rem)`,
            },
            fontWeight: 200,
            lineHeight: "1.7",
            fontFamily: '"Inter", sans-serif',
            maxWidth: "80%",
            opacity: isMobile || isTablet ? 1 : showDescription ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {description}
        </Typography>
      )}
    </Paper>
  );
};

const PaginationDot = ({ active, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: active ? "#8e54f7" : "rgba(142, 84, 247, 0.3)",
      margin: "0 4px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      transform: active ? "scale(1.2)" : "scale(1)",
    }}
  />
);

const HeroPageSection4 = ({ onComplete }) => {
  const [isCardShrunk, setIsCardShrunk] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [key, setKey] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const sectionRef = useRef(null);
  const titlePinTriggerRef = useRef(null);
  const mainCardTriggerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  // Comprehensive breakpoints matching Section1/2/3 pattern
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const cards = [
    {
      title: "Outcome as a Service",
      description: "We deliver tangible results not just digital products.",
    },
    {
      title: "Iterative Excellence",
      description:
        "Our solutions evolve with your business, ensuring long-term success.",
    },
    {
      title: "Future-Forward Strategies",
      description:
        "Cutting-edge AI and automation drive scalable, innovative solutions.",
    },
  ];

  const MobileCards = [
    {
      title: "Iterative Excellence",
      description:
        "Our solutions evolve with your business, ensuring long-term success.",
    },
    {
      title: "Outcome as a Service",
      description: "We deliver tangible results not just digital products.",
    },
    {
      title: "Future-Forward Strategies",
      description:
        "Cutting-edge AI and automation drive scalable, innovative solutions.",
    },
  ];

  const handleDragStart = (event) => {
    setIsDragging(true);
    setDragStart(event.touches[0].clientX);
  };

  const handleDragMove = (event) => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = (event) => {
    if (!isDragging) return;

    setIsDragging(false);
    const dragEnd = event.changedTouches[0].clientX;
    const dragThreshold = 50; // Minimum distance to trigger swipe
    const diff = dragEnd - dragStart;

    if (Math.abs(diff) >= dragThreshold) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe right
        setCurrentIndex((prev) => prev - 1);
      } else if (diff < 0 && currentIndex < MobileCards.length - 1) {
        // Swipe left
        setCurrentIndex((prev) => prev + 1);
      }
    }

    setDragOffset(0);
  };

  // Track viewport width to avoid hydration issues
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setViewportWidth(window.innerWidth);
    
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Helper function to get container width (matching Section1/2/3)
  const getContainerWidth = () => {
    if (isSmallDesktop) return "90%";
    if (isLaptop13) return "90%";
    if (isLaptop14) return "90%";
    if (isLaptop15) return "90%";
    if (isLargeDesktop) return "90%"; // Baseline: 1440-1919px (unchanged)
    if (isXtraLargeDesktop) return "90%";
    if (isUltraWide) return "90%";
    return "90%"; // Default fallback
  };

  // Helper function to get container max-width for ultra-wide
  const getContainerMaxWidth = () => {
    if (isXtraLargeDesktop) return "1920px"; // Constrain 1920-2559px
    if (isUltraWide) return "2400px"; // Constrain 2560px+
    return "none"; // No constraint for baseline desktop
  };

  // Helper function to get padding (matching Section2/3)
  const getPadding = () => {
    if (isSmallDesktop) return "3rem";
    if (isLaptop13) return "3.5rem";
    if (isLaptop14) return "3.75rem";
    if (isLaptop15) return "4rem";
    if (isLargeDesktop) return "4rem"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "4rem";
    if (isUltraWide) return "5rem";
    return "4rem"; // Default
  };

  // Helper function to get heading font size (matching Section1/3 pattern)
  const getHeadingFontSize = () => {
    if (isSmallDesktop) return `clamp(1.75rem, calc(1.28rem + 2.1vw), 7.25rem)`;
    if (isLaptop13) return `clamp(1.75rem, calc(1.3rem + 2.2vw), 7.5rem)`;
    if (isLaptop14) return `clamp(1.75rem, calc(1.32rem + 2.4vw), 8rem)`;
    if (isLaptop15) return `clamp(1.75rem, calc(1.35rem + 2.6vw), 8.5rem)`;
    if (isLargeDesktop) return `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`; // Baseline: unchanged
    if (isXtraLargeDesktop) return `clamp(2.25rem, calc(2rem + 3vw), 10rem)`;
    if (isUltraWide) return `clamp(2.25rem, calc(2rem + 3vw), 10rem)`;
    return `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`; // Default
  };

  // Helper function to get margin-top for vertical rhythm
  const getMarginTop = () => {
    if (isSmallDesktop) return "-7rem";
    if (isLaptop13) return "-7rem";
    if (isLaptop14) return "-7rem";
    if (isLaptop15) return "-7rem";
    if (isLargeDesktop) return "-7rem"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "-7rem";
    if (isUltraWide) return "-7rem";
    return "-7rem"; // Default
  };

  // Helper function to get main card width (matching GSAP animation start: 90%)
  const getMainCardWidth = () => {
    if (isSmallDesktop) return "90%";  // Change from "100%"
    if (isLaptop13) return "90%";      // Change from "100%"
    if (isLaptop14) return "90%";      // Change from "100%"
    if (isLaptop15) return "90%";      // Change from "100%"
    if (isLargeDesktop) return "90%";  // Change from "100%" - matches GSAP start
    if (isXtraLargeDesktop) return "90%";
    if (isUltraWide) return "90%";
    return "90%"; // Default
  };

  // Helper function to get main card height
  const getMainCardHeight = () => {
    if (isSmallDesktop) return "50%";
    if (isLaptop13) return "52%";
    if (isLaptop14) return "54%";
    if (isLaptop15) return "55%";
    if (isLargeDesktop) return "55%"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "60%";
    if (isUltraWide) return "65%";
    return "55%"; // Default
  };

  // Helper function to get side card max-width
  const getSideCardMaxWidth = () => {
    if (isSmallDesktop) return "25%";
    if (isLaptop13) return "25%";
    if (isLaptop14) return "25%";
    if (isLaptop15) return "25%";
    if (isLargeDesktop) return "30%"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "30%";
    if (isUltraWide) return "30%";
    return "22%"; // Default
  };

  // Helper function to get main card animation starting width
  const getMainCardStartWidth = () => {
    if (isSmallDesktop) return 90;
    if (isLaptop13) return 90;
    if (isLaptop14) return 90;
    if (isLaptop15) return 90;
    if (isLargeDesktop) return 90; // Your current value
    if (isXtraLargeDesktop) return 90;
    if (isUltraWide) return 90;
    return 90; // Default
  };

  // Helper function to get main card shrink amount (how much it shrinks)
  const getMainCardShrinkAmount = () => {
    if (isSmallDesktop) return 65;
    if (isLaptop13) return 65;
    if (isLaptop14) return 65;
    if (isLaptop15) return 65;
    if (isLargeDesktop) return 65; // Adjusted: 85 - 55 = 30% (matches side card 30%)
    if (isXtraLargeDesktop) return 65;
    if (isUltraWide) return 65;
    return 65; // Default
  };

  // Helper function to get side card height
  const getSideCardHeight = () => {
    if (isSmallDesktop) return "50%";
    if (isLaptop13) return "52%";
    if (isLaptop14) return "54%";
    if (isLaptop15) return "55%";
    if (isLargeDesktop) return "55%"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "60%";
    if (isUltraWide) return "65%";
    return "55%"; // Default
  };

  // Helper function to get main card title font size (responsive)
  const getMainCardTitleFontSize = () => {
    if (isSmallDesktop) return "3.25rem";
    if (isLaptop13) return "3.5rem";
    if (isLaptop14) return "3.75rem";
    if (isLaptop15) return "4rem";
    if (isLargeDesktop) return "4rem"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "4.5rem";
    if (isUltraWide) return "5rem";
    return "4rem"; // Default
  };

  const initializeGSAPAnimations = () => {
    if (typeof window === 'undefined' || isMobile || isTablet || prefersReducedMotion) return;

    // Cleanup any existing triggers first
    if (titlePinTriggerRef.current) {
      titlePinTriggerRef.current.kill();
      titlePinTriggerRef.current = null;
    }
    if (mainCardTriggerRef.current) {
      mainCardTriggerRef.current.kill();
      mainCardTriggerRef.current = null;
    }

    // Set will-change for better performance
    gsap.set(".side-cards-container, .main-card", {
      willChange: "transform, opacity",
    });

    gsap.set(".side-cards-container", {
      opacity: 0,
      display: "block",
      x: (index) => (index === 0 ? -100 : 100),
    });

    // NOTE:
    // We intentionally avoid pinning the title separately here.
    // Pinning ".title-section" caused Safari to position the heading
    // relative to the viewport's left edge instead of the centered container,
    // making the entire section appear shifted to the left in Safari.
    // The main ScrollTrigger below (pin: true) already pins the whole section,
    // including the title, so we only need this single trigger.

    mainCardTriggerRef.current = ScrollTrigger.create({
      trigger: ".hero-page-section-4",
      start: "center 55%",
      end: "center 55%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      snap: {
        snapTo: (value) => Math.round(value * 10) / 10,
        duration: { min: 0.2, max: 0.5 },
        ease: "power1.inOut",
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = Math.pow(progress, 1.5);

        // Card shrinking animation - dynamic based on breakpoint
        const startWidth = getMainCardStartWidth();
        const shrinkAmount = getMainCardShrinkAmount();

        gsap.to(".main-card", {
          width: `${startWidth - scale * shrinkAmount}%`,
          duration: 1,
          ease: "power2.out",
        });

        // Side cards animation
        gsap.to(".side-cards-container", {
          opacity: scale,
          x: 0,
          duration: 1,
          ease: "power2.out",
        });

        // Cards container animation
        gsap.to(".cards-container", {
          gap: "10%",
          duration: 0.3,
          ease: "power2.out",
        });

        const dynamicInitialFontSize = () => {
          // Use state-based viewportWidth instead of window.innerWidth
          if (viewportWidth < 900) {
            return "3rem"; // Smaller font size for mobile
          } else if (viewportWidth < 1200) {
            return "3.5rem"; // Medium font size for tablets
          } else if (viewportWidth < 1536) {
            return "4rem"; // Larger font size for desktops
          } else if (viewportWidth < 2000) {
            return "5rem";
          } else if (viewportWidth < 2600) {
            return "5rem";
          }
          return "5rem"; // Default for ultra-wide
        };

        const initialFontSize = dynamicInitialFontSize(); // Get dynamic initial font size

        const finalFontSize = {
          md: `clamp(0.25rem,calc(1rem + 0.5vw),2.2rem)`,
          lg: `clamp(0.25rem,calc(1rem + 0.8vw),2.2rem)`,
          xl: `clamp(0.25rem,calc(1rem + 1vw),3rem)`,
        };

        // Get the current breakpoint (md, lg, xl) using state-based viewportWidth
        const breakpoint =
          viewportWidth < 900
            ? "md"
            : viewportWidth < 1200
            ? "lg"
            : "xl";

        // Apply the final font size based on the breakpoint
        gsap.to(".main-card .feature-title", {
          fontSize: scale > 0.1 ? finalFontSize[breakpoint] : initialFontSize,
          duration: 1,
          ease: "power2.out",
        });

        // Description opacity animation
        gsap.to(".main-card .feature-description", {
          opacity: scale > 0.9 ? 1 : 0,
          duration: 0.5,
          ease: "power2.out",
        });

        // Update state for card shrinking
        setIsCardShrunk(scale > 0.1);
      },
      onLeave: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });
  };

  useEffect(() => {
    if (sectionRef.current) {
      initializeGSAPAnimations();
    }
    return () => {
      // Cleanup ScrollTriggers in reverse order: kill triggers first, then restore DOM
      // This prevents React from trying to remove nodes that GSAP has moved
      if (mainCardTriggerRef.current) {
        mainCardTriggerRef.current.kill();
        mainCardTriggerRef.current = null;
      }
      if (titlePinTriggerRef.current) {
        titlePinTriggerRef.current.kill();
        titlePinTriggerRef.current = null;
      }
      
      // Small delay to ensure DOM is restored before React unmounts
      setTimeout(() => {
        gsap.set(".side-cards-container, .main-card", { willChange: "auto" });
      }, 0);
    };
  }, [onComplete, isMobile, isTablet, prefersReducedMotion, viewportWidth, key, isSmallDesktop, isLaptop13, isLaptop14, isLaptop15, isLargeDesktop, isXtraLargeDesktop, isUltraWide]);

  if (isMobile || isTablet) {
    return (
      <Box
        sx={{
          minHeight: { xs: "50vh", sm: "60vh" },
          color: "#fff",
          fontFamily: '"Inter", sans-serif',
          position: "relative",
          width: {
            xs: "95%",
            sm: "92%",
          },
          maxWidth: "100%",
          margin: "0 auto",
          padding: {
            xs: "1.5rem",
            sm: "2rem",
          },
          paddingTop: { xs: "2rem", sm: "3rem" },
          zIndex: 2,
          marginTop: {
            xs: "2rem",
            sm: "2rem",
          },
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            mb: { xs: "20%", sm: "10%" },
            fontSize: { xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)` },
            position: "relative",
            zIndex: 2,
          }}
        >
          Why Choose{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Excollo?
          </Box>
        </Typography>

        <motion.div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            columnGap: isMobile ? "10%" : "12%", // Responsive gap
            width: "100%",
            padding: isMobile ? "0 15%" : "0 20%", // Responsive padding
            overflow: "visible",
            touchAction: "pan-y pinch-zoom",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          animate={{
            x: `calc(-${currentIndex * 60}% + ${
              currentIndex * 8
            }% + ${dragOffset}px)`,
          }}
          transition={{
            type: prefersReducedMotion ? "tween" : "spring",
            duration: prefersReducedMotion ? 0 : undefined,
            stiffness: prefersReducedMotion ? undefined : 200,
            damping: prefersReducedMotion ? undefined : 20,
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {MobileCards.map((card, index) => (
            // const style = getCardStyle(index);
            <Box
              key={index}
              sx={{
                width: isMobile ? "70%" : "60%", // Responsive card width
                flexShrink: 0,
                opacity: index === currentIndex ? 1 : 0.5,
                transform: index === currentIndex ? "scale(1.05)" : "scale(0.95)",
                transition: prefersReducedMotion ? "none" : "all 0.3s ease",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <FeatureCard
                title={card.title}
                description={card.description}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </Box>
          ))}
        </motion.div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            gap: 1,
          }}
        >
          {MobileCards.map((_, index) => (
            <PaginationDot
              key={index}
              active={currentIndex === index}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      key={key}
      ref={sectionRef}
      className="hero-page-section-4"
      sx={{
        minHeight: {
          xs: "60vh",
          sm: "70vh",
          md: "100vh",
        },
        height: {
          md: "100vh",
        },
        color: "#fff",
        position: "relative",
        fontFamily: '"Inter", sans-serif',
        marginTop: {
          xs: "2rem",
          sm: "2rem",
          md: getMarginTop(), // Aligned with Section1/2/3 vertical rhythm
        },
        width: {
          xs: "95%",
          sm: "92%",
          md: getContainerWidth(), // Matching Section2/3 container system
        },
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: getContainerMaxWidth(), // Ultra-wide constraints
        },
        margin: "0 auto",
        marginLeft: "auto", // Explicit Safari centering fix
        marginRight: "auto", // Explicit Safari centering fix
        display: "block", // Required for margin: 0 auto to work in Safari
        padding: {
          xs: "1.5rem",
          sm: "2rem",
          md: getPadding(), // Matching Section2/3 padding system
        },
        overflow: "hidden", // Prevent horizontal scroll
        boxSizing: "border-box",
      }}
    >
      <Box
        className="title-section"
        sx={{
          position: "relative",
          top: {
            xs: "5%",
            sm: "3%",
            md: "2%",
          },
          textAlign: "center",
          width: "100%", // Explicit width for Safari text centering
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
              sm: `clamp(1.75rem, calc(1.2rem + 2vw), 9rem)`,
              md: getHeadingFontSize(), // Using Section1/3 pattern
            },
            position: "relative",
            top: {
              xs: "10px",
              sm: "15px",
              md: "20px",
            },
          }}
        >
          Why Choose{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Excollo?
          </Box>
        </Typography>
      </Box>

      <Box
        className="cards-container"
        sx={{
          height: {
            xs: "auto",
            sm: "auto",
            md: "calc(100vh - 10%)",
          },
          minHeight: {
            xs: "50vh",
            sm: "60vh",
            md: "calc(100vh - 10%)",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          width: "100%", // Explicit width for Safari flex centering
          boxSizing: "border-box",
          WebkitBoxSizing: "border-box", // Safari prefix
          transition: prefersReducedMotion ? "none" : "gap 0.3s ease",
          gap: {
            xs: "1rem",
            sm: "1.5rem",
            md: "0",
          },
          padding: {
            xs: "2rem 0",
            sm: "3rem 0",
            md: "0",
          },
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <Box
          className="side-cards-container"
          sx={{
            height: {
              xs: "auto",
              sm: "auto",
              md: getSideCardHeight(), // Responsive height
            },
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: getSideCardMaxWidth(), // Responsive max-width
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "auto",
            },
            opacity: {
              xs: 1,
              sm: 1,
              md: 0,
            },
            display: {
              xs: "none", // Hide side cards on mobile/tablet
              md: "block",
            },
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <FeatureCard
            title="Iterative Excellence"
            description="Our solutions evolve with your business, ensuring long-term success."
            showDescription={isCardShrunk}
            isFinalState={isCardShrunk}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Box>

        <Box
          className="main-card"
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: getMainCardWidth(), // Responsive width matching GSAP animation start
            },
            height: {
              xs: "auto",
              sm: "auto",
              md: getMainCardHeight(), // Responsive height
            },
            minHeight: {
              xs: "200px",
              sm: "250px",
              md: "auto",
            },
            flexShrink: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: prefersReducedMotion ? "auto" : "transform",
          }}
        >
          <FeatureCard
            title="Outcome as a Service"
            description="We deliver tangible results not just digital products."
            showDescription={isCardShrunk}
            isFinalState={isCardShrunk}
            isMainCard={true}
            isMobile={isMobile}
            isTablet={isTablet}
            getMainCardTitleFontSize={getMainCardTitleFontSize}
          />
        </Box>

        <Box
          className="side-cards-container"
          sx={{
            height: {
              xs: "auto",
              sm: "auto",
              md: getSideCardHeight(), // Responsive height
            },
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: getSideCardMaxWidth(), // Responsive max-width
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "auto",
            },
            opacity: {
              xs: 1,
              sm: 1,
              md: 0,
            },
            display: {
              xs: "none", // Hide side cards on mobile/tablet
              md: "block",
            },
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <FeatureCard
            title="Future-Forward Strategies"
            description="Cutting-edge AI and automation drive scalable, innovative solutions."
            showDescription={isCardShrunk}
            isFinalState={isCardShrunk}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection4;
