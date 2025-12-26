import React from "react";
import { Box } from "@mui/material";
import OurServices from "@/components/OurServices/OurServices";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/OurServices/Footer";

export default function ServicesPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                position: "relative",
                overflowX: "hidden",
                overflowY: "auto",
                background: "#000000",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "88%",
                    height: { xs: "5%", md: "2%" },
                    background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
                    zIndex: 1,
                    opacity: 1,
                }}
            />
            <Box
                sx={{
                    top: 0,
                    zIndex: 2,
                    opacity: 1,
                    position: "relative",
                }}
            >
                <NavBar />
            </Box>
            <Box>
                <OurServices />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    );
}
