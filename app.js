require("dotenv").config();
const Customer = require("./models/customer.js");
const mongoose = require("mongoose");
const prompt = require("prompt-sync")();

// const username = prompt("What is your name? ");

// console.log(`Your name is ${username}`);

console.log("Welcome to the CRM application");

let userAnswer = prompt("What would you like to do ?");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const CreateCustomer = {
    name: "Diallo",
    age: 20,
  };

  await Customer.create(CreateCustomer);

  if (userAnswer.toLowerCase().includes("update")) {
    const id = prompt(
      "Copy and paste the id of the customer you would like to update here: "
    );
    const newName = prompt("What is the customer new name?");
    const newAge = prompt("What is the customer new age?");

    await Customer.findByIdAndUpdate(
      id,
      { name: newName, age: newAge },
      { new: true }
    );
  } else if (userAnswer.toLowerCase().includes("view")) {
    const customers = await Customer.find();
    console.log(customers);
  } else if (userAnswer.toUpperCase() === "quit") {
    await mongoose.connection.close();
    console.log("Exiting...");
    process.exit(0);
  }
};

connect();
