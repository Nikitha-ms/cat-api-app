import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import cat from "../assets/cat.png";

const Background: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#040404",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundColor: "white",
          marginLeft: "50px",
        }}
      >
        <img
          src={cat}
          alt="cat"
          style={{
            width: "50%",
            height: "50%",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
            flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
            width: "50%",
        }}
      >
        <Typography variant="h1" sx={{ color: "white",marginBottom:"10px" }}>
            The cat world
        </Typography>
        <Button
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            color: "black",
            padding: "10px",
          }}
          onClick={() => navigate("/catinfo")}  
        >
          Click me
        </Button>
      </Box>
    </Box>
  );
};

export default Background;