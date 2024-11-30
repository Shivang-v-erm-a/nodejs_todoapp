import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode) => {
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send response with cookie
    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            // below steps are important before applying cors
            sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
            secure: process.env.NODE_ENV === "Development" ? false:true,
        })
        .json({
            success: true,
            message,
        });
}