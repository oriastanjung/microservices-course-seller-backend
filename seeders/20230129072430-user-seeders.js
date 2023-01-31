"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Orias",
          profession: "Admin Micro",
          role: "admin",
          email: "oriastan999@gmail.com",
          password: await bcrypt.hash("secretkey027", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Yein",
          profession: "Frontend Developer",
          role: "student",
          email: "yein222@gmail.com",
          password: await bcrypt.hash("secretkey022124", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
