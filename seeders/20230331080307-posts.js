'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const table = queryInterface.createTable('posts', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      user_id: {
        type: Sequelize.STRING,
        references:{
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        unique: false
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: true,
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
    await queryInterface.dropTable('posts')
  }
};
