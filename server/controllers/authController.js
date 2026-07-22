const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const User = require("../models/User");
const Otp = require("../models/Otp");

const sendOtpEmail = require("../utils/sendEmail");


/* ===========================================================
   Generate JWT Token
=========================================================== */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};


/* ===========================================================
   SEND OTP
=========================================================== */

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();


    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }


    const existingOtp = await Otp.findOne({
      email: normalizedEmail,
    });


    if (existingOtp) {

      const timeDifference =
        Date.now() - existingOtp.createdAt.getTime();


      if (timeDifference < 60000) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another OTP.",
        });
      }

      await Otp.deleteMany({
        email: normalizedEmail,
      });
    }


    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });


    await Otp.create({
      email: normalizedEmail,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });


    await sendOtpEmail(
      normalizedEmail,
      otp
    );


    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });


  } catch (error) {

    console.error("Send OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



/* ===========================================================
   VERIFY OTP
=========================================================== */

exports.verifyOtp = async (req, res) => {
  try {

    const { email, otp } = req.body;


    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }


    const normalizedEmail =
      email.toLowerCase().trim();


    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
    });


    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired.",
      });
    }


    if (otpRecord.isUsed) {
      return res.status(400).json({
        success: false,
        message: "OTP already used.",
      });
    }


    if (otpRecord.expiresAt < Date.now()) {

      await Otp.deleteOne({
        email: normalizedEmail,
      });

      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }


    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }


    otpRecord.isVerified = true;

    await otpRecord.save();


    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });


  } catch (error) {

    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



/* ===========================================================
   REGISTER USER
=========================================================== */

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;


    if (!name || !email || !password) {

      return res.status(400).json({
        success:false,
        message:"Please provide all required fields.",
      });

    }


    if(password.length < 6){

      return res.status(400).json({
        success:false,
        message:"Password must be at least 6 characters.",
      });

    }


    const normalizedEmail =
      email.toLowerCase().trim();



    const otpRecord = await Otp.findOne({
      email: normalizedEmail,
    });


    if(
      !otpRecord ||
      !otpRecord.isVerified ||
      otpRecord.isUsed ||
      otpRecord.expiresAt < Date.now()
    ){

      return res.status(400).json({
        success:false,
        message:"Please verify your email first.",
      });

    }



    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });



    if(existingUser){

      return res.status(409).json({
        success:false,
        message:"Email already registered.",
      });

    }



    const hashedPassword =
      await bcrypt.hash(password,10);



    const allowedRoles = [
      "Admin",
      "Manager",
      "Employee"
    ];


    const userRole =
      role && allowedRoles.includes(role)
      ? role
      : "Employee";



    const user =
      await User.create({

        name:name.trim(),

        email:normalizedEmail,

        password:hashedPassword,

        role:userRole,

      });



    otpRecord.isUsed = true;

    await otpRecord.save();



    const userData =
      user.toObject();

    delete userData.password;



    return res.status(201).json({

      success:true,

      message:"Registration successful. Please login.",

      user:userData,

    });



  } catch(error){

    console.error("Register Error:",error);


    return res.status(500).json({

      success:false,

      message:"Internal server error.",

      error:error.message,

    });

  }

};




/* ===========================================================
   LOGIN USER
=========================================================== */

exports.login = async (req,res)=>{

try{

const {
email,
password
}=req.body;


if(!email || !password){

return res.status(400).json({
success:false,
message:"Email and password are required.",
});

}


const user =
await User.findOne({
email:email.toLowerCase().trim(),
});


if(!user){

return res.status(401).json({
success:false,
message:"Invalid email or password.",
});

}


if(!user.isActive){

return res.status(403).json({
success:false,
message:"Your account has been disabled.",
});

}


const isMatch =
await bcrypt.compare(
password,
user.password
);


if(!isMatch){

return res.status(401).json({
success:false,
message:"Invalid email or password.",
});

}



const token =
generateToken(user._id);



const userData =
user.toObject();

delete userData.password;



return res.status(200).json({

success:true,

message:"Login successful.",

token,

user:userData,

});


}
catch(error){

console.error("Login Error:",error);


return res.status(500).json({

success:false,

message:"Internal server error.",

error:error.message,

});

}

};