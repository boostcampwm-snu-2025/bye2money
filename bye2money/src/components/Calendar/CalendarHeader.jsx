import { Box, Typography } from "@mui/material";

export function CalendarHeader() {
    const dayBoxStyle = {
        flex: 1,
        border: "0.5px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "846px",
                height: "48px",
                border: "0.5px solid black"}}>
            <Box sx={dayBoxStyle}>
                <Typography>일</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>월</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>화</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>수</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>목</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>금</Typography>
            </Box>
            <Box sx={dayBoxStyle}>
                <Typography>토</Typography>
            </Box>
        </Box>
    )
}