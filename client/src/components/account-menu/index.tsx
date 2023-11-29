import { useNavigate } from "react-router-dom";
import style from "./acc-menu.module.scss";
import { useState } from "react";
import { getCurrentUser, newRequest } from "../../lib/utils";
//import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Add from "@mui/icons-material/Add";
import List from "@mui/icons-material/List";
import Summarize from "@mui/icons-material/Summarize";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Профіль">
        <Button
          onClick={handleOpen}
          size="small"
          sx={{ ml: 2, textTransform: "none" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img
            className={style.img}
            src={currentUser.img || "/img/noavatar.jpg"}
            alt=""
          />
          {currentUser?.username}
          {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {currentUser?.isAdmin && (
          <MenuItem onClick={() => navigate("/add-product")}>
            <ListItemIcon>
              <Add fontSize="small" />
            </ListItemIcon>
            Добавити новий продукт
          </MenuItem>
        )}
        {currentUser?.isAdmin && (
          <MenuItem onClick={() => navigate("/products-admin")}>
            <ListItemIcon>
              <List fontSize="small" />
            </ListItemIcon>
            Всі продукти
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate("/orders")}>
          <ListItemIcon>
            <Summarize fontSize="small" />
          </ListItemIcon>
          Замовлення
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Налаштування
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Вихід
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
