import User from "../Model/userModel.js";
import FormData from "form-data";
import axios from "axios";

const Clip_Drop_Api =
  "c8fd526ee0a8507919d37c6b85baab8078c703704bd20a597740bb5aeca769894e24607145c1b778d15953848f9c22b5";

export const generateImage = async (req, res) => {
  try {
    const { UserID, prompt } = req.body;
    const user = await User.findById(UserID);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.CreditBalance === 0 || User.CreditBalance < 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        CreditBalance: User.CreditBalance,
      });
    }
    const formdata = new FormData();
    formdata.append("prompt", prompt);

    //used api for generate image
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formdata,
      {
        method: "POST",
        headers: {
          "x-api-key": Clip_Drop_Api,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await User.findByIdAndUpdate(user._id, {
      CreditBalance: user.CreditBalance - 1,
    });
    res.json({
      success: true,
      message: "image generated successfully",
      CreditBalance: user.CreditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
