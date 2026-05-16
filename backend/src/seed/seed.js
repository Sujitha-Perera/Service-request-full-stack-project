import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import JobRequest from "../models/JobRequest.js";

dotenv.config();

// connect DB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

// seed users
const seedUsers = async () => {
  await User.deleteMany();

  const users = await User.insertMany([
    {
      name: "John Doe",
      email: "john@example.com",
      password: await bcrypt.hash("1234567", 10),
    },
    {
      name: "Sarah Smith",
      email: "sarah@example.com",
      password: await bcrypt.hash("1234567", 10),
    },
  ]);

  console.log("Users Created");

  return users;
};

// seed jobs
const seedJobs = async (users) => {
  await JobRequest.deleteMany();

  const [user1, user2] = users;

  const jobs = [
    {
      title: "Leaking Tap",
      description: "Kitchen tap leaking",
      category: "Plumbing",
      location: "Colombo",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Open",
      createdBy: user1._id,
    },
    {
      title: "Electric Issue",
      description: "Power fluctuation",
      category: "Electrical",
      location: "Negombo",
      contactName: "Sarah",
      contactEmail: "sarah@test.com",
      status: "Open",
      createdBy: user2._id,
    },
    {
      title: "Paint House",
      description: "Full house painting",
      category: "Painting",
      location: "Kandy",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Open",
      createdBy: user1._id,
    },
    {
      title: "AC Repair",
      description: "AC not cooling",
      category: "Electrical",
      location: "Galle",
      contactName: "Sarah",
      contactEmail: "sarah@test.com",
      status: "In Progress",
      createdBy: user2._id,
    },
    {
      title: "Roof Fix",
      description: "Leak in roof",
      category: "Construction",
      location: "Matara",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Open",
      createdBy: user1._id,
    },
    {
      title: "Pipe Block",
      description: "Bathroom blocked",
      category: "Plumbing",
      location: "Colombo",
      contactName: "Sarah",
      contactEmail: "sarah@test.com",
      status: "Open",
      createdBy: user2._id,
    },
    {
      title: "Window Fix",
      description: "Broken glass",
      category: "Carpentry",
      location: "Negombo",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Closed",
      createdBy: user1._id,
    },
    {
      title: "Garden Clean",
      description: "Clean garden",
      category: "Cleaning",
      location: "Kandy",
      contactName: "Sarah",
      contactEmail: "sarah@test.com",
      status: "Open",
      createdBy: user2._id,
    },
    {
      title: "Door Repair",
      description: "Main door broken",
      category: "Carpentry",
      location: "Galle",
      contactName: "John",
      contactEmail: "john@test.com",
      status: "Open",
      createdBy: user1._id,
    },
    {
      title: "Water Pump Install",
      description: "Install new pump",
      category: "Plumbing",
      location: "Colombo",
      contactName: "Sarah",
      contactEmail: "sarah@test.com",
      status: "Open",
      createdBy: user2._id,
    },
  ];

  await JobRequest.insertMany(jobs);

  console.log("Jobs Created");
};

// main seed function
const seedAll = async () => {
  try {
    await connectDB();

    const users = await seedUsers();
    await seedJobs(users);

    console.log("Seeding Completed Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAll();