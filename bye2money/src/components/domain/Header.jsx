import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";


export function Header({ year, setYear, month, setMonth, view, setView }) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", 
                      "August", "September", "October", "November", "December"];
  
  const monthChangeHandler = (newMonth) => {
    if (newMonth > 12) {
      setYear(year + 1);
      setMonth(newMonth - 12);
    } else if (newMonth <= 0) {
      setYear(year - 1);
      setMonth(newMonth + 12);
    } else {
      setMonth(newMonth);
    }
  };

  const viewChangeHandler = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
      <Box 
          sx={{ 
              position: "absolute",
              width: "846px", 
              height: "112px",
              mt: "40px"}}>
          <Toolbar 
              sx={{ 
                  justifyContent: "space-between", 
                  height: "100%"}}>
              <Logo />
              <YearMonth 
                  year={year} 
                  month={month} 
                  monthName={monthNames[month - 1]} 
                  onMonthChange={monthChangeHandler}/>
              <ViewTabs 
                  view={view} 
                  onViewChange={viewChangeHandler}/>
          </Toolbar>
      </Box>
  );
}


function Logo() {
  return (
    <Typography 
        variant="h6" 
        sx={{ fontWeight: "bold" }}>
      Wise Wallet
    </Typography>
  );
}

function YearMonth({ year, month, monthName, onMonthChange }) {
  return (
    <Box 
        sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center"}}>
        <Typography 
            variant="subtitle1" 
            sx={{ color: "grey.600" }}>
            {year}
        </Typography>
        <Box 
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 10 }}>
            <IconButton 
                onClick={() => onMonthChange(month - 1)} 
                aria-label="previous month">
                <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography 
                variant="h4" 
                sx={{ 
                    minWidth: "80px", 
                    textAlign: "center", 
                    fontWeight: 1000 }}>
                {month}
            </Typography>
            <IconButton 
                onClick={() => onMonthChange(month + 1)} 
                aria-label="next month">
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
        </Box>
        <Typography 
            variant="body2" 
            sx={{ color: "grey.700" }}>
            {monthName}
        </Typography>
    </Box>
  );
}

function ViewTabs({ view, onViewChange }) {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={onViewChange}
      aria-label="view toggle"
    >
      <ToggleButton 
        value="list" 
        aria-label="list view">
        <ListAltIcon />
      </ToggleButton>
      <ToggleButton 
        value="calendar" 
        aria-label="calendar view">
        <CalendarMonthIcon />
      </ToggleButton>
      <ToggleButton 
        value="stats" 
        aria-label="stats view">
        <BarChartIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
