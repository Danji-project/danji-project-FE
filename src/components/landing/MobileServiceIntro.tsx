import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { Box } from "@mui/system";

const MobileServiceIntro = () => {
  const [topState, setTopState] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/chat");
    setTopState(false);
  };

  const toggleDrawer =
    (_: any, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setTopState(open);
    };

  const list = (anchor: "top") => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer("top", false)}
      onKeyDown={toggleDrawer("top", false)}
    >
      <List>
        {["채팅", "공지사항", "시설 정보", "문의하기"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={text === "채팅" ? handleChatClick : undefined}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="mobile__service__intro">
      <Button onClick={toggleDrawer("top", true)}>
        아파트를 위한 애플리케이션
      </Button>
      <SwipeableDrawer
        anchor={"top"}
        open={topState}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
      >
        {list("top")}
      </SwipeableDrawer>
    </div>
  );
};

export default MobileServiceIntro;
