"use client";

import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
// Logo from public directory
const Logo = "/logo/excollo3d.png";

const HeroPageSection7 = () => {
  const theme = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Use MUI useMediaQuery for responsive detection (SSR-safe)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Comprehensive breakpoints matching Section1-6 pattern
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");
  // Throttled scroll handler using requestAnimationFrame for smooth performance
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY);
      }
    });
  }, []);

  useEffect(() => {
    // Only enable scroll tracking on desktop and if reduced motion is not preferred
    if (!isMobile && !isTablet && !prefersReducedMotion) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    } else {
      // Reset scroll position when disabled
      setScrollY(0);
    }
  }, [isMobile, isTablet, prefersReducedMotion, handleScroll]);
  const handleMouseMove = useCallback((e) => {
    if (isMobile || isTablet || prefersReducedMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((clientY - rect.top) / rect.height - 0.5) * -30;
    setRotation({ x, y });
  }, [isMobile, isTablet, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || isTablet || prefersReducedMotion) return;
    setRotation({ x: 0, y: 0 });
  }, [isMobile, isTablet, prefersReducedMotion]);
  // Simplified translateY calculation with responsive baseline offsets
  const getTranslateYBaseline = () => {
    if (isUltraWide) return 3000;
    if (isXtraLargeDesktop) return 2500;
    if (isLargeDesktop) return 2000;
    if (isLaptop15) return 1900;
    if (isLaptop14) return 1800;
    if (isLaptop13) return 1800;
    if (isSmallDesktop) return 1800;
    return 100; // Mobile/tablet fallback (not used due to early return)
  };

  const translateYImage = prefersReducedMotion || isMobile || isTablet
    ? 0
    : Math.max(getTranslateYBaseline() - scrollY * 0.5, 0);

  const gradientOpacity =
    prefersReducedMotion || scrollY <= 100
      ? 1
      : Math.min((scrollY - 800) / 300, 1);
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={2}
        sx={{
          height: {
            xs: "400px",
            sm: "50vh",
            md: "60vh",
          },
          width: "100%",
          overflow: "hidden",
          marginTop: {
            xs: "-25%",
            sm: "-15%",
            md: "-5%",
            lg: 0,
          },
          marginBottom: {
            xs: "-25%",
            sm: 0,
            md: 0,
          },
          marginX: "auto",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Excollo logo"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          sx={{
            height: "auto",
            width: {
              xs: "80%",
              sm: "80%",
              md: "80%",
              lg: "80%",
              xl: "80%",
            },
            maxWidth: "100%",
            transform:
              prefersReducedMotion || isMobile || isTablet
                ? "none"
                : `translate3d(0, ${Math.min(translateYImage, 1000)}px, 0) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
            transformStyle: "preserve-3d",
            willChange: prefersReducedMotion ? "auto" : "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transition: prefersReducedMotion ? "none" : "transform 0.2s ease-out",
            // Safari 3D transform fixes
            WebkitTransform: prefersReducedMotion || isMobile || isTablet
              ? "none"
              : `translate3d(0, ${Math.min(translateYImage, 1000)}px, 0) rotateX(${rotation.y}deg) rotateY(${rotation.x}deg)`,
          }}
        />
      </Box>
      {/* Gradient Animation Section */}
      {!isMobile && !isTablet && !prefersReducedMotion && (
        <Box
          position="relative"
          zIndex={0}
          sx={{
            left: 0,
            right: 0,
            width: "100%",
            height: "0px",
            background: `radial-gradient(ellipse at bottom, rgba(196, 188, 213, ${gradientOpacity}) 0%, rgba(0, 0, 0, 0) 60%)`,
            transition: "background 0.3s ease-in-out",
          }}
        />
      )}
      <Divider
        sx={{
          backgroundColor: "#000000",
          height: "2px",
          width: "100%",
          position: "relative",
          display: isMobile || isTablet ? "none" : "block",
        }}
      />
    </Box>
  );
};
export default HeroPageSection7;
