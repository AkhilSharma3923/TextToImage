import userModel from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.json({success: true, token, user:{name: user.name} });




  } catch (error) {
    console.log(error);
    
    res.status(500).json({
        success: false,
         message: error.message
         });
  }
};



const loginUser = async (req, res) => {
    try{

        const {email, password} = req.body;

        if(!email ||!password){
            return res.status(400).json({message: "Please fill in all fields."});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(401).json({message: "Invalid credentials."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials."});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user:{name: user.name}});

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
             message: error.message
             });
    }
}


const userCredits = async (req, res) => {
    try {
        const { userId } = req;

        const user = await userModel.findById(userId);

        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const { userId } = req; // Assuming your auth middleware sets req.userId

    if (!userId || !planId) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }

    const date = Date.now();

    // Save transaction
    const newTransaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      date
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // in paise
      currency: process.env.CURRENCY || "INR",
      receipt: String(newTransaction._id)
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


const verifyRazorpay = async (req,res) => {

  try{
    const { razorpay_payment_id, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt)

      if(transactionData.payment) {
        return res.json({
          success: false,
          message: "Payment already verified"
        })
      }

      const userData = await userModel.findById(transactionData.userId);

      const creditBalance = userData.creditBalance + transactionData.credits

   await userModel.findByIdAndUpdate(userData._id, { creditBalance });


      await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

      res.json({
        success: true,
        message: "Payment verified successfully"
      })
    } else {
      res.json({
        success: false,
        message: "Payment failed"
      })
    }


  } catch(error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error verifying Razorpay payment"
    })
    
  }
}

export { registerUser, loginUser, userCredits , paymentRazorpay, verifyRazorpay};