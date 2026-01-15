"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WorkTable = styled("section")({
  width: "100%",
  position: "relative",
});

const TableGrid = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "0 16px",
  gap: "16px",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
    margin: "auto",
    maxWidth: "100%",
    padding: "0 20px",
    gap: "16px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "100%",
    maxWidth: "100%",
    padding: "0 32px",
    gap: "20px",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "0 40px",
    gap: 0,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "100%",
    padding: "0 60px",
    gap: 0,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: "100%",
    padding: "0 80px",
    gap: 0,
  },
}));

const TableContent = styled("div")(({ theme }) => ({
  flex: "1 1 auto",
  margin: "0",
  padding: "24px 20px",
  minHeight: 300,
  width: "100%",
  maxWidth: "100%",
  opacity: 1,
  transform: "none",
  visibility: "visible",
  transition: "border-color 0.3s ease",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "20px",
  background: "linear-gradient(180deg, #05000A 0%, #1B1125 100%)",
  color: "#fff",
  border: "2px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  [theme.breakpoints.up("xs")]: {
    padding: "28px 24px",
    minHeight: 320,
  },
  [theme.breakpoints.up("sm")]: {
    padding: "32px 28px",
    minHeight: 340,
  },
  [theme.breakpoints.up("md")]: {
    flex: "1 1 0%",
    minWidth: "200px",
    maxWidth: "none",
    minHeight: "clamp(300px, 35vh, 400px)",
    opacity: 0,
    transform: "translateY(100%)",
    visibility: "hidden",
    borderRadius: 0,
    padding: "clamp(20px, 2vw, 32px) clamp(24px, 2vw, 36px)",
    background: "transparent",
    border: "1px solid #7E22CE",
    borderLeft: "none",
    "&:first-of-type": {
      borderLeft: "1px solid #7E22CE",
    },
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "220px",
    minHeight: "clamp(320px, 35vh, 420px)",
    padding: "clamp(24px, 2.2vw, 36px) clamp(28px, 2.2vw, 40px)",
  },
  [theme.breakpoints.up("xl")]: {
    minWidth: "240px",
    minHeight: "clamp(340px, 35vh, 450px)",
    padding: "clamp(28px, 2.5vw, 40px) clamp(32px, 2.5vw, 44px)",
  },

  "&:hover": {
    borderColor: "#7E22CE !important",
    background: "linear-gradient(180deg, #05000A 0%,#1B1125 50%)",
    zIndex: 1000,
  },

  "& h3": {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    lineHeight: 1.3,
    margin: "0 auto 12px auto",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: "1.5rem",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    [theme.breakpoints.up("xs")]: {
      fontSize: "1.75rem",
      marginBottom: "16px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "clamp(1.2rem, calc(0.8rem + 1vw), 1.7rem)",
      marginBottom: "10px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "clamp(1.4rem, calc(1rem + 1.2vw), 2rem)",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "clamp(1.6rem, calc(1.2rem + 1.5vw), 2.5rem)",
    },
  },

  "& p": {
    fontFamily: "Inter, sans-serif",
    fontWeight: 300,
    color: "#9EA4AA",
    margin: "0",
    lineHeight: 1.5,
    textAlign: "center",
    fontSize: "0.95rem",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    [theme.breakpoints.up("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.05rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "clamp(0.75rem, calc(0.6rem + 0.5vw), 1rem)",
      lineHeight: 1.4,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "clamp(0.85rem, calc(0.7rem + 0.6vw), 1.15rem)",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "clamp(0.95rem, calc(0.8rem + 0.7vw), 1.3rem)",
    },
  },
}));

const HowWeWork = () => {
  const containerRef = useRef(null);
  const contentRefs = useRef([]);
  const theme = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 900;
    if (!isDesktop) return;

    const container = containerRef.current;
    const contents = contentRefs.current;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 0%",
        end: "+=400%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    contents.forEach((content, index) => {
      if (!content) return;
      const tl = gsap.timeline();
      gsap.set(content, {
        opacity: 0,
        y: 400,
        visibility: "hidden",
        borderColor: "#7E22CE",
      });
      tl.to(content, { visibility: "visible", duration: 1 })
        .to(content, { opacity: 1, y: 0, duration: 5, ease: "power2.out" })
        .to(content, { borderColor: "#FFFFFF", duration: 2, ease: "power2.out" })
        .to(content, { duration: 3 });
      mainTl.add(tl, index * 3);
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        color: "#fff",
        minHeight: "90vh",
        fontFamily: '"Inter", sans-serif',
        letterSpacing: "-0.00833em",
        mt: { xs: "10%", sm: "10%", md: "10%" },
        mb: { xs: "2rem", md: "0rem" },
      }}
    >
      <WorkTable>
        <Box
          sx={{
            mb: { xs: "4rem", md: "10%" },
            ml: { xs: "0rem", sm: "2rem", md: "0rem" },
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              lineHeight: 1.167,
              letterSpacing: "-0.01562em",
              fontSize: {
                xs: `clamp(1.75rem, calc(1.15rem + 2vw), 9rem)`,
                md: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
                lg: `clamp(1.75rem, calc(1.37rem + 2.5vw), 8rem)`,
                xl: `clamp(2.25rem, calc(2rem + 2.5vw), 10rem)`,
              },
              textAlign: "center",
              position: "relative",
              top: "20px",
            }}
          >
            How We{" "}
            <Box
              component="span"
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
        <TableGrid>
          {[
            {
              title: "Discover",
              content:
                "We begin by exploring your business deeply to uncover challenges, goals, and opportunities.",
            },
            {
              title: "Define",
              content:
                "Pinpoint gaps, assess needs, and identify the technologies required to address them effectively.",
            },
            {
              title: "Design",
              content:
                "Develop innovative, customized solutions specifically tailored to meet your needs and strategic objectives.",
            },
            {
              title: "Develop",
              content:
                " Implement advanced technologies and seamless processes to effectively turn strategies into reality.",
            },
            {
              title: "Deliver",
              content:
                "Execute flawlessly with measurable results and ongoing improvements for long-term success.",
            },
          ].map((step, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", md: "auto" },
                display: { md: "flex" },
                flex: { md: "1 1 0px" },
                position: "relative",
                perspective: "1000px",
                boxSizing: "border-box",
              }}
            >
              <TableContent
                ref={(el) => (contentRefs.current[index] = el)}
                className="table-content"
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    padding: { xs: "16px", md: 0 },
                  }}
                >
                  <Box sx={{ margin: { xs: "0", md: "0.5rem 0" } }}>
                    <Typography variant="h3">{step.title}</Typography>
                  </Box>
                  <Typography variant="body1">{step.content}</Typography>
                </Box>
              </TableContent>
            </Box>
          ))}
        </TableGrid>
      </WorkTable>
    </Box>
  );
};

export default HowWeWork;
