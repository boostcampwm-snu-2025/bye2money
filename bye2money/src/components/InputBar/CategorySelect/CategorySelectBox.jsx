import { React } from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useInputBarContext } from "@/contexts/InputBarContext";

export function CategorySelectBox({ categories, setIsDropdownActive }) {
    const { setCategory } = useInputBarContext();

    const categoriesList = categories.map((category) => {
        return (
            <React.Fragment key={category}>
                <ListItem
                    sx={{justifyContent: "start"}}> 
                    <Button
                        onClick={() => {
                            setCategory(category);
                            setIsDropdownActive(false);
                            }}>
                        {category}
                    </Button>
                </ListItem>  
                <Divider />
            </React.Fragment> 
        )
    })
    
    return (
        <Paper
            sx={{
                position: "absolute",
                top: "115%",
                left: "-10%",
                width: "120%",
                zIndex: 20,
                mt: 0.5,
                bgcolor: "background.paper",
                boxShadow: 3,}}>
            <List dense>
                {categoriesList}
            </List>  
        </Paper>
    )
}
