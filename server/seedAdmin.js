require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const users = [
    {
      name: "Test Admin1",
      email: "test.admin1@tester.com",
      password: "Password123!",
      role: "user",
    },
    {
      name: "Admin User",
      email: "test.admin1@tester.com",
      password: "Password123!",
      role: "admin",
    },
  ];

  for (const userData of users) {
    const exists = await User.findOne({ email: userData.email });

    if (!exists) {
      await User.create(userData);
      console.log(`Created user: ${userData.email}`);
    } else {
      console.log(`User already exists: ${userData.email}`);
    }
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});