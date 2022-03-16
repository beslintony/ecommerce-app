// const express = require("express");
// const app = (module.exports = express());
const bcryptjs = require("bcryptjs");
const User = require("../db/model/User");
const search = require("../utils/search");
// const auth = require("../auth/check-auth");
const { Sequelize } = require("sequelize");
const jwtDecode = require("jwt-decode");
const ProductImage = require("../db/model/ProductImage");
const Product = require("../db/model/Product");
const Op = Sequelize.Op;

// app.use(express.json());

//************* Get List of All Users & get one by "?search=" ***************

const getallusers = async (req, res, next) => {
    const users = await User.findAll({
        where: {
            [Op.or]: [
                search(req.query.search, "firstName"),
                search(req.query.search, "lastName"),
                search(req.query.search, "email")
            ]
        }
    });

    res.json({
        success: true,
        message: "List of all users",
        records: users.length,
        data: users
    });
};

exports.getallusers = getallusers;

const getUserDetails = async (req, res, next) => {
    const user = await User.findOne({
        where: { id: req.params.id }
    });

    if (user) {
        res.json({
            success: true,
            message: "User Data Success",
            //data: user,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                isBuyer: user.isBuyer,
                isSeller: user.isSeller,
                isAdmin: user.isAdmin,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                deletedAt: user.deletedAt
            },
            records: user.length
        });
    } else {
        res.json({
            success: false,
            message: "Provided user doesn't exist or is already deleted"
        });
    }
};

exports.getUserDetails = getUserDetails;

const getUserProfileDetails = async (req, res, next) => {
    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    const userId = decoded.id;

    const user = await User.findOne({
        where: { id: userId },
        include: [Product]
    });

    const userRoles = [];
    const getUserRoles = (role, roleName) => {
        role && userRoles.push(roleName);
    };
    getUserRoles(user.isAdmin, "admin");
    getUserRoles(user.isBuyer, "buyer");
    getUserRoles(user.isSeller, "seller");

    if (user) {
        return res.json({
            success: true,
            message: "User Data Success!",
            //data: user,
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                gender: Number(user.gender),
                roles: userRoles,
                status: user.status,
                profileImage: user.profile_image,
                products: user.Products
            },
            records: user.length
        });
    } else {
        return res.json({
            success: false,
            message: "Provided user doesn't exist or is already deleted"
        });
    }
};

exports.getUserProfileDetails = getUserProfileDetails;

/*
 app.get("/api/user/:email", async (req, res) => {
     const user = await User.findOne({ where: { email: req.params.email } });
     if (user == null) {
         res.status(401).json("User do not exists!");
     } else {
         res.status(200).json(user);
     }
 });
*/
//************* Create New User ***************

const createuser = async (req, res, next) => {
    let existing_user = await User.findOne({
        where: { email: req.body.email }
    });

    if (existing_user) {
        res.json({
            success: true,
            message: "User Already Exists",
            records: existing_user.length,
            data: existing_user
        });
        return;
    }

    let data = [
        req.body.firstName ?? "Undefined",
        req.body.lastName ?? "Undefined",
        req.body.email ?? "Undefined",
        req.body.password ?? "Undefined",
        req.body.dateOfBirth ?? "Undefined",
        req.body.gender ?? "Undefined",
        req.body.isBuyer ?? "Undefined",
        req.body.isSeller ?? "Undefined",
        req.body.isAdmin ?? "Undefined"
    ];

    if (data.indexOf("Undefined") != -1) {
        res.json({
            success: false,
            message: "Some or all field values are missing ",
            records: 0
        });
    } else {
        let epassword;

        epassword = await bcryptjs.hash(req.body.password, 10);

        let user = User.build({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: epassword,
            dateOfBirth: new Date(req.body.dateOfBirth),
            gender: req.body.gender,
            isBuyer: req.body.isBuyer,
            isSeller: req.body.isSeller,
            isAdmin: req.body.isAdmin,
            status: 0
        });

        await user.save().catch((e) => {
            console.log(e);
        });

        res.json({
            success: true,
            message: "User Successfully Created",
            records: user.length,
            data: user
        });
    }
};

exports.createuser = createuser;

//************* Update Existing User ***************
//***This API will check if user being updated and user in the token are same or user in the token is admin then allow to update**

const updateuser = async (req, res, next) => {
    const user = await User.findOne({
        where: { email: req.params.email }
    });

    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
    // console.log(decoded);

    if (decoded.email == req.params.email || decoded.isAdmin == true) {
        if (user) {
            let epassword =
                (req.body.password &&
                    (await bcryptjs.hash(req.body.password, 10))) ??
                user.password;
            // epassword = await bcryptjs.hash(req.body.password, 10);
            try {
                await user.update({
                    firstName: req.body.firstName ?? user.firstName,
                    lastName: req.body.lastName ?? user.lastName,
                    email: user.email, //Email cannot be updated by update API
                    password: epassword,
                    // dateOfBirth: new Date("05.08.1985"),
                    // dateOfBirth: new Date(req.body.dateOfBirth) ??new Date(user.dateOfBirth),  This has issues
                    gender: req.body.gender ?? user.gender,
                    isBuyer: req.body.isBuyer ?? user.isBuyer,
                    isSeller: req.body.isSeller ?? user.isSeller,
                    isAdmin: req.body.isAdmin ?? user.isAdmin,
                    status: req.body.status ?? user.status
                });
                res.json({
                    success: true,
                    message: "User '" + user.email + "' successfully updated",
                    records: user.length
                });
            } catch (e) {
                res.json({
                    success: false,
                    message: "User " + user.email + " updation failed" + e,
                    records: user.length
                });
            }
        } else {
            res.json({
                success: false,
                message: "Provided user doesn't exist or is already deleted"
            });
        }
    } else {
        res.json({
            success: false,
            message:
                "User " +
                decoded.email +
                " not allowed to user update " +
                req.params.email,
            records: 0
        });
    }
};

exports.updateuser = updateuser;

const updateCurrentUser = async (req, res, next) => {
    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);

    const user = await User.findOne({
        where: { id: decoded.id }
    });
/*
    res.json({
        success: true,
        message: "Data Mate",
        data: req.body,
        records: user.length,
    });
*/
    if (user) {
        let epassword =
            (req.body.password &&
                (await bcryptjs.hash(req.body.password, 10))) ??
            user.password;
        // epassword = await bcryptjs.hash(req.body.password, 10);
        try {
            await user.update({
                firstName: req.body.firstName ?? user.firstName,
                lastName: req.body.lastName ?? user.lastName,
                //email: user.email, //Email cannot be updated by update API
                password: epassword,
                dateOfBirth: req.body.dateOfBirth ?? user.dateOfBirth,
                // dateOfBirth: new Date("05.08.1985"),
                //dateOfBirth: new Date(req.body.dateOfBirth) ??new Date(user.dateOfBirth),  //This has issues
                gender: req.body.gender ?? user.gender
                //isBuyer: req.body.isBuyer ?? user.isBuyer,
                //isSeller: req.body.isSeller ?? user.isSeller,
                //isAdmin: req.body.isAdmin ?? user.isAdmin,
                //status: req.body.status ?? user.status,
            });
            res.json({
                success: true,
                message: "User '" + user.email + "' successfully updated",
                records: user.length
            });
        } catch (e) {
            res.json({
                success: false,
                message: "User " + user.email + " updation failed" + e,
                records: user.length
            });
        }
    } else {
        res.json({
            success: false,
            message:
                "Provided user " +
                decoded.email +
                " doesn't exist or access is denied to update profile",
            records: 0
        });
    }
};

exports.updateCurrentUser = updateCurrentUser;
//************* Delete Existing Course ***************
//***This API will check if user being updated and user in the token are same or user in the token is admin then allow to update**

const deleteuser = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.params.email } });

    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);

    if (decoded.email == req.params.email || decoded.isAdmin == true) {
        if (user) {
            try {
                await user.destroy();
                res.json({
                    success: true,
                    message: "User '" + user.email + "' successfully deleted",
                    records: user.length
                });
            } catch (e) {
                res.json({
                    success: false,
                    message: "User " + user.email + " deletion failed",
                    records: user.length
                });
            }
        } else {
            res.json({
                success: false,
                message: "Provided user doesn't exist or is already deleted"
            });
        }
    } else {
        res.json({
            success: false,
            message:
                "User " +
                decoded.email +
                " not allowed to user update " +
                req.params.email,
            records: 0
        });
    }
};

exports.deleteuser = deleteuser;

const postProfileImage = async (req, res, next) => {
    var token = req.headers["authorization"];
    var decoded = jwtDecode(token);
/*
    console.log('decoded user id: : ' + decoded.id);
    console.log('req.file.path : ' + req.file.path);
    console.log('req.file.filename : ' + req.file.filename );
*/
    const user = await User.findOne({
        where: { id: decoded.id }
    });

    if (user) {
        try {
            await user.update({
                //profile_image: req.file.path,
                profile_image: req.file.filename,
            });
            return  res.json({
                    success: true,
                    message: "User's profile image successfully updated",
                    records: user.length
                });
        } catch (e) {
            return res.json({
                    success: false,
                    message: "User's profile image updation failed" + e,
                    records: user.length
                });
        }
    } else {
        res.json({
            success: false,
            message:
                "Provided user " +
                decoded.email +
                " doesn't exist or access is denied to update profile image",
            records: 0
        });
    }
};

exports.postProfileImage = postProfileImage;