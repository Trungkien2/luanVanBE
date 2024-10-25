'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_user_setting', {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
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
      privacy_level: {
        type: Sequelize.STRING,
      },
      notification_push: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_account_private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      show_activity_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('tbl_user_setting');
  },
};
