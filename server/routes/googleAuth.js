import express from "express";
import passport from "passport";

const CLIENT_URL = "http://localhost:5173/";

const router = express.Router();

router.post("/login/success", (req, res) => {
  const googleResponse = req.body.googleResponse;

  // Handle the Google response as needed
  console.log("Received Google response:", googleResponse);

  // You can perform additional actions here

  res.status(200).json({
    success: true,
    message: "Successfully received Google response",
    data: googleResponse,
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
  ``;
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

export default router;
