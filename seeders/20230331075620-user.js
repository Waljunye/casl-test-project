'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.underscored = true;
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
