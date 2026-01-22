"use client";

import React, { useState, useEffect } from "react";
import { Button, Fade } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io5";

const WhatsAppWidget = () => {
    const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowWhatsAppButton(true);
            } else {
                setShowWhatsAppButton(false);
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleWhatsapp = () => {
        window.open(
            "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let's%20talk%21",
            "_blank"
        );
    };

    return (
        <Fade in={showWhatsAppButton}>
            <Button
                onClick={handleWhatsapp}
                variant="contained"
                color="primary"
                sx={{
                    position: "fixed",
                    width: { xs: 56, md: 60 },
                    height: { xs: 56, md: 60 },
                    minWidth: "44px",
                    minHeight: "44px",
                    bottom: { xs: 100, md: 100 },
                    right: { xs: 24, md: 24 },
                    zIndex: 10001,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                        background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                    },
                }}
                aria-label="Contact on WhatsApp"
            >
                <IoLogoWhatsapp size={30} />
            </Button>
        </Fade>
    );
};

export default WhatsAppWidget;
