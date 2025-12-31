"use client";

import React from "react";
import {
  Box,
  Typography,
  Link,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NextLink from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Logo from public directory
const ExcolloWebsiteLogo = "/ExcolloWebsiteLogo.png";

/**
 * Responsive footer with equal spacing between columns and edges.
 * All units are relative (percentages, vw/vh) for fluid scaling across
 * devices. Font sizes shrink appropriately on larger screens to prevent
 * overflowing content. A CSS grid provides consistent alignment and
 * spacing while adapting from one column on mobile to four columns on
 * desktop. The left/right padding equals the gap between columns to
 * ensure symmetric gutters.
 */
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:899px)");
  const isSmallLaptop = useMediaQuery("(min-width:900px) and (max-width:1199px)");
  const isLaptop = useMediaQuery("(min-width:1200px) and (max-width:1535px)");
  const isDesktop = useMediaQuery("(min-width:1536px) and (max-width:1919px)");
  const isXtraLargeDesktop = useMediaQuery("(min-width:1920px) and (max-width:2559px)");
  const isUltraWide = useMediaQuery("(min-width:2560px)");

  // Responsive logo width using vw units
  const getLogoWidth = () => {
    if (isMobile) return "40vw";
    if (isTablet) return "30vw";
    if (isSmallLaptop) return "10vw";
    if (isLaptop) return "10vw";
    if (isDesktop) return "10vw";
    if (isXtraLargeDesktop) return "10vw";
    if (isUltraWide) return "10vw";
    return "10vw";
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <Box
      component="footer"
      position="relative"
      zIndex={1}
      sx={{
        width: "100%",
        pt: "20vh",
        pb: "5vh",
        px: "4vw",
        boxSizing: "border-box",
        color: "#ffffff",
        fontFamily: '"Inter", sans-serif',
        overflow: "hidden",
        lineHeight: 1.5,
      }}
    >
      {/* Gradient glow across the top, hidden on small screens */}
      <Box
        sx={{
          position: "absolute",
          top: "-1vh",
          left: 0,
          right: 0,
          height: "12vh",
          background: `radial-gradient(ellipse at bottom, rgba(196, 188, 213, 0.38) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: -1,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Grid container with Column 1 on left, 3 columns grouped on right */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "auto 1fr",  // Column 1 auto width, right side takes remaining space
          },
          gap: "15vw",  // Gap between Column 1 and the grouped columns
          px: "3vw",
        }}
      >
        {/* Column 1: Logo and description */}
        <Box
          sx={{
            display: "flex",
              flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
              }}
            >
                  <Box
                    component="img"
                    src={ExcolloWebsiteLogo}
            alt="Excollo"
                    loading="lazy"
                    sx={{
              width: getLogoWidth(),
              maxWidth: "100%",
              height: "auto",
              mb: "2vh",
                    }}
                  />
            <Typography
              variant="body2"
              color="grey.400"
              sx={{
                fontSize: {
                xs: "2.5vw",
                sm: "2vw",
                md: "1.2vw",
                lg: "1vw",
              },
              mb: "1vh",
              textAlign: { xs: "center", md: "left" },
              }}
            >
              AI Driven. Outcome Focused.
            </Typography>
            <Link
              component={NextLink}
              href="/about"
              sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5vw",
                color: "grey.400",
                textDecoration: "none",
              fontSize: {
                xs: "2.5vw",
                sm: "2vw",
                md: "1.2vw",
                lg: "1vw",
              },
              '&:hover': { color: "#a693c1" },
              mt: "1vh",
                justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            Learn More
            <LaunchIcon
              sx={{
                fontSize: {
                  xs: "2.5vw",
                  sm: "2vw",
                  md: "1.2vw",
                  lg: "1vw",
                  },
                }}
              />
            </Link>
        </Box>

        {/* Right side: Group of 3 columns with equal spacing */}
        <Box
            sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",  // 3 equal columns
            },
            columnGap: "1.5vw",  // Smaller gap between columns for tighter spacing
            rowGap: 0,  // No vertical gap needed
          }}
        >
          {/* Column 2: Quick Links */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: "1vh",
                fontSize: {
                  xs: "3vw",
                  sm: "2.5vw",
                  md: "1.4vw",
                  lg: "1.2vw",
                },
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: "3vh",
              }}
            >
              {navigationLinks.map((item) => (
                <Link
                  key={item.name}
                  component={NextLink}
                  href={item.path}
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    fontSize: {
                      xs: "2.5vw",
                      sm: "2vw",
                      md: "1.2vw",
                      lg: "1vw",
                    },
                    fontWeight: 400,
                    '&:hover': { color: "#a693c1" },
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Column 3: Contact Us */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: "1vh",
                fontSize: {
                  xs: "3vw",
                  sm: "2.5vw",
                  md: "1.4vw",
                  lg: "1.2vw",
                },
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: "1vh",
              }}
            >
              {/* Email */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <EmailIcon
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.4vw",
                      md: "1.4vw",
                    },
                    color: "grey.400",
                  }}
                />
                <Link
                  href="mailto:info@excollo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    fontSize: {
                      xs: "2.5vw",
                      sm: "2vw",
                      md: "1.2vw",
                      lg: "1vw",
                    },
                    '&:hover': { color: "#a693c1" },
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  info@excollo.com
                </Link>
              </Box>
              {/* Phone */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <PhoneIcon
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.4vw",
                      md: "1.4vw",
                    },
                    color: "grey.400",
                  }}
                />
                <Link
                  href="tel:+918890204938"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "grey.400",
                    textDecoration: "none",
                    fontSize: {
                      xs: "2.5vw",
                      sm: "2vw",
                      md: "1.2vw",
                      lg: "1vw",
                    },
                    '&:hover': { color: "#a693c1" },
                  }}
                >
                  +91&nbsp;8890204938
                </Link>
              </Box>
              {/* Address */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "center", md: "flex-start" },
                  gap: "0.5vw",
                  justifyContent: { xs: "center", md: "flex-start" },
                  maxWidth: { xs: "90%", md: "70%", lg: "60%" },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.4vw",
                      md: "1.4vw",
                    },
                    color: "grey.400",
                  }}
                />
                <Link
                  href="https://www.google.co.in/maps/place/230,+Bharat+Marg,+Singh+Bhoomi,+Khatipura,+Jaipur,+Rajasthan+302012/@26.9221888,75.7497856,14z/data=!4m5!3m4!1s0x396db368ef4a6f2f:0x8183d4a0e877ec15!8m2!3d26.9268325!4d75.7413077?entry=ttu&g_ep=EgoyMDI1MDExMC4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    component="div"
                    variant="body2"
                    color="grey.400"
                    sx={{
                      fontSize: {
                        xs: "2.5vw",
                        sm: "2vw",
                        md: "1.2vw",
                        lg: "1vw",
                      },
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    C-230 Bharat Marg, Hanuman Nagar, Vaishali, Jaipur, Rajasthan&nbsp;-&nbsp;302021
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Column 4: Stay Connected */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: "1vh",
                fontSize: {
                  xs: "3vw",
                  sm: "2.5vw",
                  md: "1.4vw",
                  lg: "1.2vw",
                },
              }}
            >
              Stay Connected
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
                gap: "2vh",
              }}
            >
              <Link
                href="https://www.linkedin.com/company/excollo/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "grey.400",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  textDecoration: "none",
                  fontSize: {
                    xs: "2.5vw",
                    sm: "2vw",
                    md: "1.2vw",
                    lg: "1vw",
                  },
                  '&:hover': { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <LinkedInIcon
                  sx={{
                    fontSize: {
                      xs: "3vw",
                      sm: "2.4vw",
                      md: "1.4vw",
                    },
                  }}
                />
                LinkedIn
              </Link>
              <Link
                component={NextLink}
                href="/contact"
                sx={{
                  color: "grey.400",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  textDecoration: "none",
                  fontSize: {
                    xs: "2.5vw",
                    sm: "2vw",
                    md: "1.2vw",
                    lg: "1vw",
                  },
                  '&:hover': { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                Schedule a Call
                <LaunchIcon
                  sx={{
                    fontSize: {
                      xs: "2.5vw",
                      sm: "2vw",
                      md: "1.2vw",
                      lg: "1vw",
                    },
                  }}
                />
              </Link>
              <Link
                component={NextLink}
                href="/services"
                sx={{
                  color: "grey.400",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5vw",
                  textDecoration: "none",
                  fontSize: {
                    xs: "2.5vw",
                    sm: "2vw",
                    md: "1.2vw",
                    lg: "1vw",
                  },
                  '&:hover': { color: "#a693c1" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                Explore our Services
                <LaunchIcon
                  sx={{
                    fontSize: {
                      xs: "2.5vw",
                      sm: "2vw",
                      md: "1.2vw",
                    },
                  }}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          backgroundColor: "grey.800",
          my: "3vh",
          width: "100%",
          mx: "auto",
        }}
      />

      {/* Bottom row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          px: "3vw",
          gap: { xs: "2vh", sm: 0 },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontSize: {
              xs: "2.5vw",
              sm: "2vw",
              md: "1.2vw",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          © {new Date().getFullYear()} Excollo Inc. All Rights Reserved.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "2vw",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
            mt: { xs: "2vh", sm: 0 },
          }}
        >
          <Link
            component={NextLink}
            href="/privacy&policy"
            sx={{
              color: "grey.400",
              textDecoration: "none",
              fontSize: {
                xs: "2.5vw",
                sm: "2vw",
                md: "1.2vw",
              },
              '&:hover': { color: "#a693c1" },
            }}
          >
            Privacy Policy
          </Link>
          <Link
            component={NextLink}
            href="/termsofservice"
            sx={{
              color: "grey.400",
              textDecoration: "none",
              fontSize: {
                xs: "2.5vw",
                sm: "2vw",
                md: "1.2vw",
              },
              '&:hover': { color: "#a693c1" },
            }}
          >
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
