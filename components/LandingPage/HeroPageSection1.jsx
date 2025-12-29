"use client";

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const HeroPageSection1 = ({ animationComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  // Small desktop breakpoint (covers the gap)
  const isSmallDesktop = useMediaQuery("(min-width: 900px) and (max-width: 1023px)");
  // Laptop-specific breakpoints
  const isLaptop13 = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
  const isLaptop14 = useMediaQuery("(min-width: 1280px) and (max-width: 1439px)");
  const isLaptop15 = useMediaQuery("(min-width: 1440px) and (max-width: 1535px)");
  // Large desktop breakpoints
  const isLargeDesktop = useMediaQuery("(min-width: 1536px) and (max-width: 1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width: 1920px)");
  const isTabletOrMobile = isMobile || isTablet;

  // Helper function to get laptop-specific margin left
  const getMarginLeft = () => {
    if (isSmallDesktop) return "6%"; // Fill the gap
    if (isLaptop13) return "6%";
    if (isLaptop14) return "6.5%";
    if (isLaptop15) return "7%";
    if (isLargeDesktop) return "7.5%";
    if (isXtraLargeDesktop) return "8%";
    return "7.5%"; // Default fallback
  };

  // Helper function to get laptop-specific max width
  const getMaxWidth = () => {
    if (isSmallDesktop) return "88%"; // Fill the gap
    if (isLaptop13) return "88%";
    if (isLaptop14) return "87%";
    if (isLaptop15) return "86%";
    if (isLargeDesktop) return "85%";
    if (isXtraLargeDesktop) return "82%";
    return "85%"; // Default
  };

  // Helper function to get laptop-specific margin top
  const getMarginTop = () => {
    if (isSmallDesktop) return "calc(42vh - 5.5%)"; // Fill the gap
    if (isLaptop13) return "calc(43vh - 6%)";
    if (isLaptop14) return "calc(44vh - 7%)";
    if (isLaptop15) return "calc(45vh - 7.5%)";
    if (isLargeDesktop) return "calc(47.5vh - 8%)";
    if (isXtraLargeDesktop) return "calc(50vh - 10%)";
    return "calc(45vh - 7%)"; // Default
  };

  // Helper function to get laptop-specific heading font size
  const getHeadingFontSize = () => {
    if (isSmallDesktop) return `clamp(1.75rem, calc(1.28rem + 2.1vw), 7.25rem)`; // Fill the gap
    if (isLaptop13) return `clamp(1.75rem, calc(1.3rem + 2.2vw), 7.5rem)`;
    if (isLaptop14) return `clamp(1.75rem, calc(1.32rem + 2.4vw), 8rem)`;
    if (isLaptop15) return `clamp(1.75rem, calc(1.35rem + 2.6vw), 8.5rem)`;
    if (isLargeDesktop) return `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`;
    if (isXtraLargeDesktop) return `clamp(2.25rem, calc(2rem + 3vw), 10rem)`;
    return `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`; // Default
  };

  // Helper function to get laptop-specific description font size
  const getDescriptionFontSize = () => {
    if (isSmallDesktop) return `clamp(0.875rem, calc(0.725rem + 0.475vw), 1.35rem)`; // Fill the gap
    if (isLaptop13) return `clamp(0.875rem, calc(0.75rem + 0.5vw), 1.4rem)`;
    if (isLaptop14) return `clamp(0.875rem, calc(0.8rem + 0.55vw), 1.5rem)`;
    if (isLaptop15) return `clamp(0.875rem, calc(0.8rem + 0.6vw), 1.5rem)`;
    if (isLargeDesktop) return `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`;
    if (isXtraLargeDesktop) return `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`;
    return `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`; // Default
  };

  // Helper function to get laptop-specific button font size
  const getButtonFontSize = () => {
    if (isSmallDesktop) return `clamp(0.75rem, calc(0.5rem + 0.65vw), 1.05rem)`; // Fill the gap
    if (isLaptop13) return `clamp(0.75rem, calc(0.5rem + 0.7vw), 1.1rem)`;
    if (isLaptop14) return `clamp(0.75rem, calc(0.5rem + 0.75vw), 1.15rem)`;
    if (isLaptop15) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.2rem)`;
    if (isLargeDesktop) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.25rem)`;
    if (isXtraLargeDesktop) return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.3rem)`;
    return `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.25rem)`; // Default
  };

  // Helper function to get laptop-specific button padding
  const getButtonPadding = () => {
    if (isSmallDesktop) return "0.85vw 2.25vw"; // Fill the gap
    if (isLaptop13) return "0.9vw 2.5vw";
    if (isLaptop14) return "0.95vw 2.75vw";
    if (isLaptop15) return "1vw 3vw";
    if (isLargeDesktop) return "1vw 3vw";
    if (isXtraLargeDesktop) return "1vw 3vw";
    return "1vw 3vw"; // Default
  };

  // Helper function to get gradient text margin-bottom
  const getGradientTextMarginBottom = () => {
    if (isSmallDesktop || isLaptop13) return 2.5;
    if (isLaptop14 || isLaptop15) return 2.75;
    return 3; // Large desktop and above
  };

  // Helper function to get description margin-bottom
  const getDescriptionMarginBottom = () => {
    if (isSmallDesktop || isLaptop13) return 4;
    if (isLaptop14) return 4.25;
    if (isLaptop15 || isLargeDesktop || isXtraLargeDesktop) return 4.5;
    return 4.5;
  };

  return (
    <Box
      sx={{
        color: "#fff",
        display: "flex",
        textAlign: isTabletOrMobile ? "center" : "left",
        justifyContent: isTabletOrMobile ? "center" : "left",
        width: {
          xs: "100%",
          sm: "95%",
          md: "100%",
        },
        px: {
          xs: 2,
          sm: 4,
          md: 0,
        },
        marginLeft: {
          xs: "2.5%",
          md: getMarginLeft(),
        },
        marginRight: {
          xs: "2.5%",
          md: "0%",
        },
        position: "relative",
        minHeight: {
          xs: "60vh",
          md: "60vh",
        },
        zIndex: 2,
        marginTop: {
          md: getMarginTop(),
        },
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: getMaxWidth(),
          },
          padding: {
            xs: 2,
            sm: 0,
            md: 0,
          },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 400,
            fontSize: {
              xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              md: getHeadingFontSize(),
            },
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            mt: {
              xs: 2, // Fixed: Reduced from 20 to 2 for mobile
              sm: 3, // Fixed: Reduced from 22 to 3
              md: 0,
            },
          }}
        >
          Shaping the Future With
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              md: getHeadingFontSize(),
            },
          }}
        >
          <Box
            component="span"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              wordBreak: "break-word",
              mb: {
                xs: 2,
                sm: 2.5,
                md: getGradientTextMarginBottom(),
              },
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              Outcome Driven{" "}
            </span>
            &nbsp;
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              {" "}
              Innovation{" "}
            </span>
          </Box>
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: {
              xs: `clamp(0.875rem, 4vw, 1.125rem)`,
              sm: `clamp(0.9rem, 3vw, 1.2rem)`,
              md: getDescriptionFontSize(),
            },
            fontWeight: 200,
            lineHeight: 1.7,
            marginLeft: isTabletOrMobile ? 0 : "1%",
            mb: {
              xs: 4,
              sm: 5,
              md: getDescriptionMarginBottom(),
            },
            textAlign: isTabletOrMobile ? "center" : "left",
          }}
        >
          Unlock the potential of AI to transform your business and redefine
          success.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: isTabletOrMobile ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <Typography
            component="a"
            href="/contact"
            sx={{
              display: "inline-block",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 100,
              fontSize: {
                xs: `clamp(0.75rem, calc(0.5rem + 0.8vw), 1.2rem)`,
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
              width: { xs: "auto", sm: "auto" },
              minHeight: "44px",
              textAlign: "center",
              "&:hover": {
                background:
                  "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                color: "#ffffff",
                transform: "scale(1.05)",
              },
            }}
          >
            Schedule a Call
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection1;