require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({ email: "test.user1@tester.com" });
  if (exists) {
    console.log("User already exists");
    process.exit(0);
  }

  const user = await User.create({
    name: "Test User1",
    email: "test.user1@tester.com",
    password: "Password123!",
  });

  console.log("Created user:", user.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});