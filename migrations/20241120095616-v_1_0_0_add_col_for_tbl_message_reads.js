'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_message_reads', {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      message_id: {
        type: Sequelize.CHAR(36),
        references: {
          model: {
            tableName: 'tbl_message',
          },
          key: 'id',
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tbl_user',
          },
          key: 'id',
        },
        allowNull: false,
      },
      read_at: {
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },
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
    await queryInterface.dropTable('tbl_message_reads');
  },
};