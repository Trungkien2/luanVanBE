'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_friend_ship', {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      user_id_1: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tbl_user',
          },
          key: 'id',
        },
        allowNull: false,
      },
      user_id_2: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tbl_user',
          },
          key: 'id',
        },
        allowNull: false,
      },

      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      deleted_date: { type: Sequelize.DATE },
      created_date_unix_timestamp: {
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },
      },
      updated_at_unix_timestamp: {
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_friend_ship');
  },
};
