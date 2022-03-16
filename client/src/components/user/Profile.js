import {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";
import { Link } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Avatar,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";

import { CustomizedDialogs } from "../";
import { getUserProfile } from "../../services/userAction";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import UpdateProfileImage from "./UpdateProfileImage";

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElData, setAnchorElData] = useState(null);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [editProfileOpener, setEditProfileOpener] = useState(false);
    const [image, setImage] = useState([]);
    const [openImage, setOpenImage] = useState(false);
    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.user);

    const imageBaseUrl = "http://localhost:3001/user/profileimage/";

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    // click event change password menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // close button event change password menu
    const handleCloseBtn = () => {
        setAnchorEl(null);
    };
    // click event change password menu
    const handleClickData = (event) => {
        setAnchorElData(event.currentTarget);
    };
    // close button event change password menu
    const handleCloseBtnData = () => {
        setAnchorElData(null);
    };

    const getUserGender = (gender) => {
        if (Number(gender) === 1) return "Male";
        else if (Number(gender) === 2) return "Female";
        else return "Other";
    };

    const updatePasswordHandler = () => {
        setUpdatePassword(true);
    };
    const editProfileHandler = () => {
        setEditProfileOpener(true);
    };

    return (
        <>
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "1rem" }}>
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Typography color="text.primary">My Profile</Typography>
                </Breadcrumbs>
                <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                    My Profile
                </Typography>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} sm={5}>
                        <Card>
                            <CardContent sx={{ margin: "3px 5px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        paddingBottom: "1.5rem"
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            margin: "auto",
                                            "&:hover,&:active": {
                                                transform:
                                                    "scale3d(1.05, 1.05, 1)"
                                            }
                                        }}
                                        alt={currentUser?.firstName}
                                        src={
                                            `${imageBaseUrl}${currentUser?.profileImage}` ??
                                            currentUser?.firstName
                                        }
                                        variant="circular"
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "flex-start"
                                        }}
                                    >
                                        <Button
                                            aria-controls="simple-menu"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            sx={{ marginRight: "-15px" }}
                                        >
                                            <MoreVertIcon />
                                        </Button>
                                    </div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleCloseBtn}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                updatePasswordHandler();
                                                setAnchorEl(null);
                                            }}
                                        >
                                            Change Password
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setOpenImage(true);
                                                setAnchorEl(null);
                                            }}
                                        >
                                            Change Profile Picture
                                        </MenuItem>
                                    </Menu>
                                </div>
                                <Grid container flexDirection="column">
                                    <Typography
                                        sx={{
                                            flexGrow: 1,
                                            textAlign: "center"
                                        }}
                                    >
                                        {currentUser.firstName +
                                            " " +
                                            currentUser.lastName}
                                    </Typography>
                                    <CustomizedDialogs />
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Card>
                            <CardContent sx={{ margin: "3px 5px" }}>
                                <div>
                                    <Grid
                                        container
                                        flexDirection="column"
                                        spacing={3}
                                    >
                                        <Grid item>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between"
                                                }}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    Profile Information
                                                </Typography>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end",
                                                        alignItems: "flex-start"
                                                    }}
                                                >
                                                    <Button
                                                        aria-controls="simple-profile-menu"
                                                        aria-haspopup="true"
                                                        onClick={
                                                            handleClickData
                                                        }
                                                        sx={{
                                                            marginRight: "-25px"
                                                        }}
                                                    >
                                                        <MoreVertIcon />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorElData}
                                                keepMounted
                                                open={Boolean(anchorElData)}
                                                onClose={handleCloseBtnData}
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        editProfileHandler();
                                                        setAnchorElData(null);
                                                    }}
                                                >
                                                    Edit Profile
                                                </MenuItem>
                                            </Menu>
                                        </Grid>
                                        <Grid item>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th width="50%">
                                                            First Name
                                                        </th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {
                                                                currentUser.firstName
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th width="50%">
                                                            LastName{" "}
                                                        </th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {
                                                                currentUser.lastName
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th width="50%">
                                                            Email{" "}
                                                        </th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {currentUser.email}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th width="50%">
                                                            Gender
                                                        </th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {getUserGender(
                                                                currentUser.gender
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th width="50%">DOB</th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {
                                                                currentUser.dateOfBirth
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th width="50%">
                                                            Role
                                                        </th>
                                                        <td width="5%">:</td>
                                                        <td>
                                                            {currentUser?.roles?.map(
                                                                (
                                                                    role,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {(index
                                                                            ? ", "
                                                                            : "") +
                                                                            role[0].toUpperCase() +
                                                                            role.substring(
                                                                                1
                                                                            )}
                                                                    </span>
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <CustomizedDialogs
                        open={updatePassword}
                        setOpen={setUpdatePassword}
                    >
                        <UpdatePassword />
                    </CustomizedDialogs>
                    <CustomizedDialogs
                        open={editProfileOpener}
                        setOpen={setEditProfileOpener}
                    >
                        <EditProfile />
                    </CustomizedDialogs>
                    <CustomizedDialogs open={openImage} setOpen={setOpenImage}>
                        <UpdateProfileImage files={image} setFiles={setImage} setOpen={setOpenImage} />
                    </CustomizedDialogs>
                </Grid>
            </Container>
        </>
    );
};

export default Profile;
