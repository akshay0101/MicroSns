const productController = require("../controllers/productController.js");
const usercontroller = require("../controllers/userController.js");
const tweetController = require("../controllers/tweetController.js");
const verifyToken = require("../middleware/verifyToken.js");
const RefreshToken = require("../controllers/refreshToken.js");

const router = require("express").Router();

router.post("/addUser", usercontroller.addUser);
router.post("/login", usercontroller.login);

router.get("/all", verifyToken, usercontroller.getUsers);
router.get("/token", RefreshToken);

// router.post( '/like', verifyToken, usercontroller.likeit)
router.post("/post", verifyToken, tweetController.addTweet);
// router.post( '/comment', verifyToken, usercontroller.likeit)
router.get("/getPosts", verifyToken, tweetController.getTweet);

router.get("/logout", usercontroller.logout);

router.post("/addProduct", productController.addProduct);
router.get("/allProducts", productController.getAllProducts);
router.get("/published", productController.getPublishedProduct);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

/** 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJuYW1lIjoidGVzdDEiLCJ1c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpLmNvbSIsInJlZnJlc2hUb2tlbiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0wOS0xNVQwNzo0NTozMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wOS0xNVQxMDoxOTowNS4wMDBaIn0sImlhdCI6MTY2MzI5OTIwMSwiZXhwIjoxNjYzMzA3ODQxfQ.BTgZnO11qhsZoKSLhbu0YEq1SyOts9atSV7OAITkn3Y


*/
