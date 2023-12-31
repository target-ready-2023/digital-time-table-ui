import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const SideNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  let userStatus = localStorage.getItem('role');

  const { user, logout } = React.useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHome = () => {
    navigate("/");
    handleClose();
  };
  const handleStudent = () => {
    navigate("/student");
    handleClose();
  };
  const handleCourse = () => {
      navigate("/course");
      handleClose();
    };

  const handleCalendar = () => {
    navigate("/calendar");
    handleClose();
  };

  const handleClass = () => {
    navigate("/class");
    handleClose();
  };

  const handleInstructor = () => {
    navigate("/instructor");
    handleClose();
  };

  const handleLogout = () => {
   localStorage.setItem('role',null);
    navigate("/");
    handleClose();
    logout();
  };
  return (
    <>
      <Button
        id="side-navigation"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleHome}>Home</MenuItem>
        {/* <MenuItem onClick={handleStudent}>Student</MenuItem> */}

        {(userStatus === "admin" ||(user && user.role === "admin")) && (
          <div>
            <MenuItem onClick={handleClass}>Class</MenuItem>
            <MenuItem onClick={handleInstructor}>Instructor</MenuItem>
            <MenuItem onClick={handleStudent}>Student</MenuItem>
            <MenuItem onClick={handleCourse}>Course</MenuItem>
          </div>
         )}

         {(userStatus === "admin" ||user) && (
          <div>
            <MenuItem onClick={handleCalendar}>Calendar</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
         )}
      </Menu>
    </>
  );
};
export default SideNavigation;
