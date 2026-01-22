"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import AnimatedCTA from "../AnimatedCTAButton";

const HeroPageSection6 = () => {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const timelineRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const targetLetters = ["e", "a", "d", "y", "o", "n", "s"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const router = useRouter();
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };
  const createAnimation = () => {
    if (
      !textRef1.current ||
      !textRef2.current ||
      !circleRef.current ||
      !containerRef.current ||
      prefersReducedMotion
    )
      return;

    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const splitTextIntoSpans = (textRef) => {
      const text = textRef.textContent;
      textRef.innerHTML = text
        .split("")
        .map((char) => {
          const isTarget = targetLetters.includes(char.toLowerCase());
          return `<span class="${isTarget ? "target-letter" : "letter"
            }" data-letter="${char}">${char}</span>`;
        })
        .join("");
    };

    splitTextIntoSpans(textRef1.current);
    splitTextIntoSpans(textRef2.current);

    // Wait for DOM to update and fonts to render before measuring
    requestAnimationFrame(() => {
      const letters1 = textRef1.current.querySelectorAll(".target-letter");
      const letters2 = textRef2.current.querySelectorAll(".target-letter");
      const allLetters = [...letters1, ...letters2];

      if (allLetters.length === 0) return;

      const offsetY = 8;
      const containerRect = containerRef.current.getBoundingClientRect();

      let letterPositions = allLetters.map((letter) => {
        const rect = letter.getBoundingClientRect();
        return {
          element: letter,
          x:
            rect.left -
            containerRect.left +
            containerRef.current.scrollLeft +
            rect.width / 2,
          y:
            rect.top -
            containerRect.top +
            containerRef.current.scrollTop +
            rect.height / 2 +
            offsetY,
        };
      });

      letterPositions = shuffleArray(letterPositions);

      // Set will-change for performance
      gsap.set(circleRef.current, {
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });
      timelineRef.current = tl;

      letterPositions.forEach((pos, index) => {
        const prevPos = index > 0 ? letterPositions[index - 1] : null;
        tl.to(circleRef.current, {
          x: pos.x,
          y: pos.y,
          duration: 0.8,
          onStart: () => {
            gsap.to(pos.element, { opacity: 0, duration: 0.4 });
            if (prevPos) {
              gsap.to(prevPos.element, {
                opacity: 1,
                duration: 0.3,
                delay: 0.2,
              });
            }
          },
        });
        tl.to(
          circleRef.current,
          {
            scale: 1.3,
            duration: 0.3,
            ease: "power2.out",
          },
          ">"
        );
        tl.to(
          circleRef.current,
          {
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
          },
          ">"
        );
        tl.to({}, { duration: 0.4 });
        if (index === letterPositions.length - 1) {
          tl.add(() => {
            gsap.to(pos.element, {
              opacity: 1,
              duration: 0.3,
              delay: 0.2,
            });
          });
        }
      });

      gsap.set(circleRef.current, {
        x: letterPositions[0].x,
        y: letterPositions[0].y,
      });
    });
  };
  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use useLayoutEffect to run animation after DOM is ready
  useLayoutEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    // If reduced motion, show text normally without animation
    if (prefersReducedMotion) {
      if (textRef1.current && textRef2.current) {
        const splitTextIntoSpans = (textRef) => {
          const text = textRef.textContent;
          textRef.innerHTML = text
            .split("")
            .map((char) => {
              const isTarget = targetLetters.includes(char.toLowerCase());
              return `<span class="${isTarget ? "target-letter" : "letter"
                }" data-letter="${char}">${char}</span>`;
            })
            .join("");
        };
        splitTextIntoSpans(textRef1.current);
        splitTextIntoSpans(textRef2.current);
        // Show all letters with full opacity
        const allLetters = [
          ...textRef1.current.querySelectorAll(".target-letter"),
          ...textRef2.current.querySelectorAll(".target-letter"),
        ];
        gsap.set(allLetters, { opacity: 1 });
      }
      if (circleRef.current) {
        gsap.set(circleRef.current, { opacity: 0, scale: 0 });
      }
      return;
    }

    // Wait for fonts to load and layout to stabilize
    const initAnimation = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          requestAnimationFrame(() => {
            createAnimation();
          });
        });
      } else {
        requestAnimationFrame(() => {
          createAnimation();
        });
      }
    };

    initAnimation();

    // Debounce function to prevent too many rapid updates
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Handle resize with debounce
    const handleResize = debounce(() => {
      createAnimation();
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (circleRef.current) {
        gsap.set(circleRef.current, { willChange: "auto" });
      }
    };
  }, [isMounted, prefersReducedMotion]);
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/contact");
    // window.scrollTo(0, 0);
  };
  // Comprehensive breakpoints matching Section1-5 pattern
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");

  // Helper functions for responsive values
  const getContainerWidth = () => {
    if (isSmallDesktop) return "88%";
    if (isLaptop13) return "88%";
    if (isLaptop14) return "87%";
    if (isLaptop15) return "86%";
    if (isLargeDesktop) return "85%";
    if (isXtraLargeDesktop) return "82%";
    if (isUltraWide) return "75%";
    return "95%"; // Default for mobile/tablet
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
    return "2rem"; // Default for mobile/tablet
  };

  const getMarginTop = () => {
    if (isSmallDesktop) return "-7rem";
    if (isLaptop13) return "-7rem";
    if (isLaptop14) return "-7rem";
    if (isLaptop15) return "-7rem";
    if (isLargeDesktop) return "-7rem";
    if (isXtraLargeDesktop) return "-7rem";
    if (isUltraWide) return "-7rem";
    return "0"; // Default for mobile/tablet
  };

  const getHeadingFontSize = () => {
    if (isSmallDesktop) return `clamp(2rem, calc(1.5rem + 2.5vw), 8rem)`;
    if (isLaptop13) return `clamp(2rem, calc(1.75rem + 2.75vw), 8.5rem)`;
    if (isLaptop14) return `clamp(2rem, calc(2rem + 3vw), 9rem)`;
    if (isLaptop15) return `clamp(2rem, calc(2.25rem + 3.25vw), 9.5rem)`;
    if (isLargeDesktop) return `clamp(2rem, calc(2.5rem + 3.5vw), 10rem)`;
    if (isXtraLargeDesktop) return `clamp(2.5rem, calc(2.5rem + 4vw), 12rem)`;
    if (isUltraWide) return `clamp(3rem, calc(3rem + 5vw), 14rem)`;
    return `clamp(2rem, calc(2rem + 3.5vw), 10rem)`; // Default for mobile/tablet
  };

  const getHeadingLineHeight = () => {
    if (isSmallDesktop) return `clamp(2.5rem, calc(2rem + 3vw), 8.5rem)`;
    if (isLaptop13) return `clamp(2.5rem, calc(2.25rem + 3.25vw), 9rem)`;
    if (isLaptop14) return `clamp(2.5rem, calc(2.5rem + 3.5vw), 9.5rem)`;
    if (isLaptop15) return `clamp(2.5rem, calc(2.75rem + 3.75vw), 10rem)`;
    if (isLargeDesktop) return `clamp(2.5rem, calc(3rem + 4vw), 10.5rem)`;
    if (isXtraLargeDesktop) return `clamp(3rem, calc(3rem + 4.5vw), 12.5rem)`;
    if (isUltraWide) return `clamp(3.5rem, calc(3.5rem + 5.5vw), 14.5rem)`;
    return `clamp(2.5rem, calc(2rem + 3vw), 10rem)`; // Default for mobile/tablet
  };

  const getCircleSize = () => {
    if (isMobile) return "17px";
    if (isTablet) return "25px";
    if (isSmallDesktop) return "30px";
    if (isLaptop13) return "35px";
    if (isLaptop14) return "40px";
    if (isLaptop15) return "45px";
    if (isLargeDesktop) return "50px";
    if (isXtraLargeDesktop) return "60px";
    if (isUltraWide) return "70px";
    return "35px"; // Default for md
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: {
          xs: "40vh",
          sm: "50vh",
          md: "60vh",
          lg: "70vh",
          xl: "80vh",
        },
        padding: {
          xs: "1rem 1rem",
          sm: "1.5rem 1.5rem",
          md: `${getPadding()} ${getPadding()}`,
        },
        color: "#fff",
        width: {
          xs: "95%",
          sm: "92%",
          md: getContainerWidth(),
        },
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: getContainerMaxWidth(),
        },
        margin: "0 auto",
        marginTop: {
          xs: "0",
          sm: "0",
          md: getMarginTop(),
        },
        overflow: "hidden", // Prevent horizontal scroll
        boxSizing: "border-box",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <Box
          ref={circleRef}
          sx={{
            marginTop: "-0.3rem",
            width: getCircleSize(),
            height: getCircleSize(),
            background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            borderRadius: "50%",
            position: "absolute",
            zIndex: 2,
            boxShadow: "0 0 15px rgba(147, 112, 219, 0.5)",
            transform: "translate(-50%, -50%)",
            WebkitTransform: "translate(-50%, -50%)", // Safari
            willChange: prefersReducedMotion ? "auto" : "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            opacity: prefersReducedMotion ? 0 : 1,
          }}
        />
        <Typography
          variant="h1"
          fontWeight="500"
          sx={{
            letterSpacing: "0.001em",
            fontSize: getHeadingFontSize(),
            lineHeight: getHeadingLineHeight(),
            color: "#fff", // Default white color for all text
            "& .letter": {
              display: "inline-block",
              position: "relative",
              transition: prefersReducedMotion ? "none" : "opacity 0.2s",
              color: "#fff", // White for all letters in first line
            },
            "& .target-letter": {
              display: "inline-block",
              position: "relative",
              transition: prefersReducedMotion ? "none" : "opacity 0.2s",
            },
          }}
        >
          <Box
            ref={textRef1}
            className="first-line-text"
            sx={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#fff", // First line: ALL white (no gradient)
              "& .letter, & .target-letter": {
                color: "#fff", // White on all letters in first line
                background: "none", // Remove any gradient
                WebkitBackgroundClip: "unset",
                WebkitTextFillColor: "#fff",
                backgroundClip: "unset",
              },
            }}
          >
            Ready&nbsp;for&nbsp;your
          </Box>
          <Box
            ref={textRef2}
            className="second-line-text"
            sx={{
              color: "#fff", // Second line: ALL white (no gradient)
              "& .letter, & .target-letter": {
                color: "#fff", // White on all letters in second line
                background: "none", // Remove any gradient
                WebkitBackgroundClip: "unset",
                WebkitTextFillColor: "#fff",
                backgroundClip: "unset",
              },
            }}
          >
            digital&nbsp;Transformation?
          </Box>
        </Typography>
      </Box>
      <AnimatedCTA />
    </Box>
  );
};
export default HeroPageSection6;
