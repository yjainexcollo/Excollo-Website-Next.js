"use client";

import React from "react";
import { Box } from "@mui/material";
import { CursorProvider } from "./CursorEffect/context/CursorContext";
import CustomCursor from "./CursorEffect/CursorEffetct";
import ChatBotWidget from "./ChatBotWidget";

export default function ClientProviders({ children }) {
  return (
    <CursorProvider>
      <Box sx={{ backgroundColor: "#000", color: "#fff" }}>
        <CustomCursor />
        {children}
      </Box>
      <ChatBotWidget />
    </CursorProvider>
  );
}

