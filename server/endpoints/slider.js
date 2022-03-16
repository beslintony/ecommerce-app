const { QueryTypes } = require("sequelize");
const db = require("../db/db");

module.exports = {
    slider: async (req, res) => {
        let result = [];
        try {
            result = await db.query(`SELECT * FROM featured_products `, {
                type: QueryTypes.SELECT,
                raw: true
            });
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                const image = (
                    await db.query(
                        `SELECT image from product_images WHERE id=${element.product_image_id}`
                    )
                )[0];
                const [currentImage] = image.map((el) => el.image);
                element.featured_image = currentImage;
                const productTitleQuery = (
                    await db.query(
                        `SELECT title from products WHERE id=${element.product_id}`
                    )
                )[0];
                const [currentProductTitle] = productTitleQuery.map(
                    (el) => el.title
                );
                element.featured_title = currentProductTitle;
            }
        } catch (error) {
            res.send({ success: false, message: "Something went wrong" });
            throw error;
        }
        res.send({ success: true, message: "Successful!", data: result });
    }
};
