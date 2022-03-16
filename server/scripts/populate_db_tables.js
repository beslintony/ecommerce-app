const Product = require("../db/model/Product");
const User = require("../db/model/User");

const db = require("../db/db");

require("../db/associations");

async function run() {
    // Recreate tables
    await db.sync({ force: true });

    /* Create rows */

    await User.build({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        //password: "password",
        password: "$2a$10$719/w8AIt0JtJZVQK5L0B.6skH2DRkUGfy.o3RQIeHMtl0Hz64AQi",
        dateOfBirth: new Date("05.08.1985"),
        gender: User.GENDER.MALE,
        isBuyer: true,
        isSeller: true,
        isAdmin: true,
        status: 0,
    }).save();

    await User.build({
        firstName: "Kyler",
        lastName: "Stark",
        email: "kylerstark@example.com",
        //password: "password",
        password: "$2a$10$719/w8AIt0JtJZVQK5L0B.6skH2DRkUGfy.o3RQIeHMtl0Hz64AQi",
        dateOfBirth: new Date("02.18.1990"),
        gender: User.GENDER.FEMALE,
        isBuyer: false,
        isSeller: true,
        isAdmin: false,
        status: 0,
    }).save();

    await User.build({
        firstName: "Johnny",
        lastName: "Doh",
        email: "johnnyd@example.com",
        //password: "password",
        password: "$2a$10$719/w8AIt0JtJZVQK5L0B.6skH2DRkUGfy.o3RQIeHMtl0Hz64AQi",
        dateOfBirth: new Date("08.05.1995"),
        gender: User.GENDER.DIVERSE,
        isBuyer: true,
        isSeller: false,
        isAdmin: false,
        status: 0,
    }).save();

    await Product.build({
        seller_id: 2,
        title: "iPhone XIII",
        coursePricePerHour: 1059.99,
    }).save();

    /* Example of soft-delete:
    let user = await User.findOne({where: {firstName: 'John'}});
    await user.destroy(); */
}

run().then(() => console.log("Database tables were recreated"));