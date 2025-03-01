import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export const ProgressBarKpi = ({ currentPercentage, targetPercentage ,maxPercentage,backGround2 ='#a09c9c',backGround1='#3b82f6'}) => {
    //const displayedValue = (currentPercentage / maxPercentage) * 100;
    const displayedValue = parseInt(currentPercentage);
    return (
        <Box position="relative" width="100%" display="flex" alignItems="center">
            {/* Thanh tiến trình */}
            <Box sx={{ width: "100%", position: "relative" }}>
                <LinearProgress
                    variant="determinate"
                    value={displayedValue}
                    sx={{
                        height: 14,
                        borderRadius: 5,
                        backgroundColor: backGround2,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: backGround1,
                        },
                    }}
                />

                {/* Hiển thị phần trăm hiện tại ở giữa thanh */}
                <Typography
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: -2,
                        transform: "translateX(-50%)",
                        fontSize:'12px',
                        fontWeight: "bold",
                        color: '#fff',
                    }}
                >
                    {currentPercentage}%
                </Typography>
            </Box>


        </Box>
    );


};
