'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_post_hashtag', {
      post_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: {
            tableName: 'tbl_post',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      hashtag_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: {
            tableName: 'tbl_hashtag',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_post_hashtag');
  },
};