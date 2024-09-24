"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      { name: "Work", createdAt: new Date(), updatedAt: new Date() },
      { name: "Personal", createdAt: new Date(), updatedAt: new Date() },
      { name: "Urgent", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
