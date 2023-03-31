'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('user_tokens', {
      refresh_token: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_tokens')
  }
};
