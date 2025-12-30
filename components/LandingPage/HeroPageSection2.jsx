"use client";
import React, { useRef } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroPageSection2 = ({ onAnimationComplete }) => {
  const sectionRef = useRef(null);
  const gradientRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  // Comprehensive breakpoints matching HeroPageSection1 pattern
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");
  
  const isTabletOrMobile = isMobile || isTablet;

  useGSAP(() => {
    // Skip animations only if reduced motion is enabled
    if (prefersReducedMotion) {
      onAnimationComplete?.();
      return;
    }

    const section = sectionRef.current;
    const gradient = gradientRef.current;
    const content = contentRef.current;

    if (!section || !gradient || !content) return;

    // Set will-change on animated elements
    gsap.set([gradient, content], { willChange: "transform, opacity" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 10%",
        end: "center 50%",
        scrub: true,
        onComplete: () => {
          // Unset will-change after animation completes
          gsap.set([gradient, content], { willChange: "auto" });
          setTimeout(() => {
            onAnimationComplete?.();
          }, 100);
        },
      },
    });

    tl.fromTo(
      gradient,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    tl.fromTo(
      content,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
      // Cleanup: unset will-change if component unmounts
      gsap.set([gradient, content], { willChange: "auto" });
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/services");
  };

  // Helper function to get container width
  const getContainerWidth = () => {
    if (isSmallDesktop) return "88%";
    if (isLaptop13) return "88%";
    if (isLaptop14) return "87%";
    if (isLaptop15) return "86%";
    if (isLargeDesktop) return "85%"; // Baseline: 1440-1919px (unchanged)
    if (isXtraLargeDesktop) return "82%";
    if (isUltraWide) return "75%";
    return "85%"; // Default fallback
  };

  // Helper function to get container max-width for ultra-wide
  const getContainerMaxWidth = () => {
    if (isXtraLargeDesktop) return "1920px"; // Constrain 1920-2559px
    if (isUltraWide) return "2400px"; // Constrain 2560px+
    return "none"; // No constraint for baseline desktop
  };

  // Helper function to get padding
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

  // Helper function to get min-height
  const getMinHeight = () => {
    if (isSmallDesktop) return "95vh";
    if (isLaptop13) return "98vh";
    if (isLaptop14) return "99vh";
    if (isLaptop15) return "100vh";
    if (isLargeDesktop) return "100vh"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "100vh";
    if (isUltraWide) return "100vh";
    return "100vh"; // Default
  };

  // Helper function to get typography font size
  const getTypographyFontSize = () => {
    if (isSmallDesktop) return `clamp(0.875rem, calc(0.8rem + 0.5vw), 1.4rem)`;
    if (isLaptop13) return `clamp(0.875rem, calc(0.8rem + 0.55vw), 1.45rem)`;
    if (isLaptop14) return `clamp(0.875rem, calc(0.8rem + 0.6vw), 1.5rem)`;
    if (isLaptop15) return `clamp(0.875rem, calc(0.8rem + 0.6vw), 1.5rem)`;
    if (isLargeDesktop) return `clamp(0.875rem, calc(0.8rem + 0.6vw), 1.5rem)`; // Baseline: unchanged
    if (isXtraLargeDesktop) return `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`;
    if (isUltraWide) return `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`;
    return `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`; // Default
  };

  // Helper function to get typography max-width
  const getTypographyMaxWidth = () => {
    if (isSmallDesktop) return "100%";
    if (isLaptop13) return "58%";
    if (isLaptop14) return "56%";
    if (isLaptop15) return "55%";
    if (isLargeDesktop) return "55%"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "50%";
    if (isUltraWide) return "45%";
    return "55%"; // Default
  };

  // Helper function to get button font size
  const getButtonFontSize = () => {
    if (isSmallDesktop) return `clamp(0.75rem, calc(0.5rem + 0.65vw), 1.05rem)`;
    if (isLaptop13) return `clamp(0.75rem, calc(0.5rem + 0.7vw), 1.1rem)`;
    if (isLaptop14) return `clamp(0.75rem, calc(0.5rem + 0.75vw), 1.15rem)`;
    if (isLaptop15) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.2rem)`;
    if (isLargeDesktop) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.25rem)`;
    if (isXtraLargeDesktop) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.3rem)`;
    if (isUltraWide) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.35rem)`;
    return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.25rem)`; // Default
  };

  // Helper function to get button padding
  const getButtonPadding = () => {
    if (isSmallDesktop) return "1vw 2vw";
    if (isLaptop13) return "1vw 2vw";
    if (isLaptop14) return "1vw 2vw";
    if (isLaptop15) return "1vw 2vw";
    if (isLargeDesktop) return "1vw 2vw";
    if (isXtraLargeDesktop) return "1vw 2vw";
    if (isUltraWide) return "1vw 2vw";
    return "1vw 2vw"; // Default
  };

  // Helper function to get content margin-left to prevent overlap with ThreeDE
  // ThreeDE is on the left (0-50% of viewport), so content should start from ~50-55%
  const getContentMarginLeft = () => {
    if (isSmallDesktop) return "100%"; // Smaller screen, less margin needed
    if (isLaptop13) return "100%"; // Slightly larger than Small Desktop
    if (isLaptop14) return "100%"; // Getting closer to Laptop 15" baseline
    if (isLaptop15) return "120%"; // Confirmed working baseline
    if (isLargeDesktop) return "120%"; // Same as Laptop 15" (baseline unchanged)
    if (isXtraLargeDesktop) return "120%"; // Maintain same positioning
    if (isUltraWide) return "120%"; // Maintain same positioning
    return "120%"; // Default fallback
  };

  // Helper function to get wrapper margin-left (for the outer wrapper)
  const getWrapperMarginLeft = () => {
    if (isSmallDesktop) return "0";
    if (isLaptop13) return "0";
    if (isLaptop14) return "0";
    if (isLaptop15) return "0";
    if (isLargeDesktop) return "0"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "0";
    if (isUltraWide) return "0";
    return "0"; // Default
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        color: "#fff",
        overflow: "hidden",
        minHeight: {
          xs: "60vh",
          sm: "70vh",
          md: getMinHeight(),
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        padding: {
          xs: "1.5rem",
          sm: "2rem",
          md: getPadding(),
        },
        fontFamily: '"Inter", sans-serif',
        position: "relative",
        zIndex: 2,
        marginTop: {
          xs: "-10vh",
          sm: "-5vh",
          md: "0rem",
        },
      }}
    >
      <Box
        ref={gradientRef}
        sx={{
          position: "absolute",
          top: {
            xs: "15%",
            sm: "10%",
            md: "-10%",
            lg: "-20%",
          },
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(closest-corner, rgba(115, 80, 190, 0.6) 0%, rgba(0, 0, 0, 0) 40%)`,
          zIndex: 1,
          pointerEvents: "none",
          transformOrigin: "center center",
          ...(isMobile || isTablet
            ? {
                opacity: 1,
                transform: "scale(1)",
              }
            : {}),
        }}
      />

      <Box
        ref={contentRef}
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: {
            xs: "center",
            sm: "center",
            md: "flex-start", // Left align on desktop
          },
          width: "100%",
          marginLeft: {
            xs: 0,
            sm: 0,
            md: getContentMarginLeft(), // Push content to right to avoid ThreeDE
          },
          ...(isMobile || isTablet
            ? {
                opacity: 1,
                transform: "translateX(0)",
              }
            : {}),
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start", // Left align on desktop
            },
            marginBottom: {
              xs: "0",
              sm: "1.5rem",
              md: "0rem",
            },
            position: "relative",
            zIndex: 2,
            marginLeft: {
              xs: 0,
              sm: 0,
              md: getWrapperMarginLeft(),
            },
            marginTop: {
              xs: "8%",
              sm: "8%",
              md: "10%",
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "90%",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "auto",
              },
              display: "flex",
              flexDirection: "column",
              mt: {
                xs: 6,
                sm: 4,
                md: 0,
                lg: -20,
              },
              alignItems: {
                xs: "center",
                sm: "center",
                md: "flex-start",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "left",
              },
            }}
          >
            <Typography
              variant="h5"
              component="h5"
              sx={{
                fontSize: {
                  xs: `clamp(0.875rem, calc(0.7rem + 1vw), 1.2rem)`,
                  sm: `clamp(0.875rem, calc(0.75rem + 0.8vw), 1.35rem)`,
                  md: getTypographyFontSize(),
                },
                fontWeight: 400,
                lineHeight: 1.7,
                marginLeft: {
                  xs: 0,
                  sm: 0,
                  md: "0.5%",
                },
                mb: {
                  xs: 4,
                  sm: 5,
                  md: 6,
                },
                maxWidth: {
                  xs: "95%",
                  sm: "90%",
                  md: getTypographyMaxWidth(),
                },
                margin: {
                  xs: "0 auto 2rem auto",
                  sm: "0 auto 2rem auto",
                  md: "0 0 2rem 0.5%",
                },
                marginBottom: {
                  md: 6,
                  lg: 6,
                  xl: 6,
                },
              }}
            >
              Excollo delivers outcomes, leveraging AI to make businesses
              future-ready, boosting productivity and efficiency at every step.
            </Typography>

            <Typography
              component={Link}
              href="/services"
              onClick={handleClick}
              sx={{
                display: "inline-block",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 400,
                fontSize: {
                  xs: `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.2rem)`,
                  sm: `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.25rem)`,
                  md: getButtonFontSize(),
                },
                border: "1px solid transparent",
                padding: {
                  xs: "1.5vw 4vw",
                  sm: "1vw 2vw",
                  md: getButtonPadding(),
                },
                borderRadius: { xs: "80px", md: "80px", xl: "80px" },
                background:
                  "linear-gradient(to right, #000, #000) padding-box, linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%) border-box",
                zIndex: 3,
                position: "relative",
                transition: "all 0.3s ease",
                textAlign: "center",
                minHeight: "44px",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                  color: "#ffffff",
                  transform: "scale(1.05)",
                },
              }}
            >
              Explore Our Services
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection2;