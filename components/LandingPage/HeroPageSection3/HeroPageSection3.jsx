"use client";
import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import { ScrollProvider } from "./ScrollProvider";

// Dynamically import carousels with SSR disabled to prevent hydration errors
const TitleCarousel = dynamic(
  () => import("./Carousel").then((mod) => ({ default: mod.TitleCarousel })),
  {
    ssr: false,
    loading: () => <Box sx={{ minHeight: '50vh' }} /> // Placeholder to prevent DOM errors
  }
);

const DescriptionCarousel = dynamic(
  () => import("./Carousel").then((mod) => ({ default: mod.DescriptionCarousel })),
  {
    ssr: false,
    loading: () => <Box sx={{ minHeight: '50vh' }} /> // Placeholder to prevent DOM errors
  }
);

const HeroPageSection3 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  // Comprehensive breakpoints matching HeroPageSection1 & Section2 pattern
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");
  
  const isTabletOrMobile = isMobile || isTablet;

  // Helper function to get container width (matching Section1 & Section2)
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

  // Helper function to get padding (matching Section2)
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

  // Helper function to get heading font size (matching Section1 pattern)
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
    if (isSmallDesktop) return "-10rem";
    if (isLaptop13) return "-10rem";
    if (isLaptop14) return "-10rem";
    if (isLaptop15) return "-10rem";
    if (isLargeDesktop) return "-10rem"; // Baseline: unchanged
    if (isXtraLargeDesktop) return "-10rem";
    if (isUltraWide) return "-10rem";
    return "-10rem"; // Default
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

  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        minHeight: {
          xs: "60vh",
          sm: "70vh",
          md: getMinHeight(),
        },
        marginTop: {
          xs: "2rem",
          sm: "2rem",
          md: getMarginTop(), // Aligned with Section1 & Section2 vertical rhythm
        },
        display: "flex",
        flexDirection: "column",
        width: {
          xs: "95%",
          sm: "92%",
          md: getContainerWidth(), // Matching Section2 container system
        },
        maxWidth: {
          xs: "100%",
          sm: "100%",
          md: getContainerMaxWidth(), // Ultra-wide constraints
        },
        margin: "0 auto",
        padding: {
          xs: "1.5rem",
          sm: "2rem",
          md: getPadding(), // Matching Section2 padding system
        },
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Heading - matching Section1 typography pattern */}
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 600,
          lineHeight: 1.167,
          letterSpacing: "-0.01562em",
          fontSize: {
            xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
            md: getHeadingFontSize(), // Using Section1 pattern
          },
          position: "relative",
          zIndex: 2,
          marginTop: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          marginBottom: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
        }}
      >
        Our{" "}
        <Box
          component="span"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Services
        </Box>
      </Typography>

      {/* Carousel Container */}
      <ScrollProvider>
        <Box
          sx={{
            position: "relative",
            marginTop: {
              xs: "1rem",
              sm: "1.5rem",
              md: "4rem", // Consistent spacing
            },
            zIndex: 1,
            width: "100%",
            minHeight: {
              xs: "50vh",
              sm: "60vh",
              md: "70vh",
            },
          }}
        >
          {/* Gradient Background - positioned directly behind the carousel card */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "76%", // 95% of 80% card width
                sm: "66%", // 95% of 70% card width
                md: "570px", // 95% of 600px card
                lg: "760px", // 95% of 800px card
                xl: "950px", // 95% of 1000px card
              },
              height: {
                xs: "38%", // 95% of card height
                sm: "42.75%", // 95% of card height
                md: "calc(57vh + 4.75vw)", // 95% of card height (60vh + 5vw)
              },
              maxWidth: {
                xs: "100%",
                md: "950px", // 95% of max card width
              },
              background: `radial-gradient(ellipse at center, rgba(115, 80, 190, 0.85) 0%, rgba(115, 80, 190, 0.6) 18%, rgba(115, 80, 190, 0.35) 35%, rgba(115, 80, 190, 0.15) 55%, rgba(0, 0, 0, 0) 70%)`,
              zIndex: 0,
              pointerEvents: "none",
              borderRadius: {
                xs: "12px",
                md: "20px",
              },
              overflow: "hidden", // Ensure gradient doesn't extend beyond bounds
            }}
          />
          <Box
            className="carousel-container"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              zIndex: 2,
            }}
          >
            <TitleCarousel />
          </Box>
          <Box
            className="carousel-container"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <DescriptionCarousel />
          </Box>
        </Box>
      </ScrollProvider>
    </Box>
  );
};

export default HeroPageSection3;