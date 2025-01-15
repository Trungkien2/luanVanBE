'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn(
      'tbl_post_hashtag',
      'created_date_unix_timestamp',
      {
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },
      },
    );
    await queryInterface.addColumn(
      'tbl_post_hashtag',
      'updated_at_unix_timestamp',
      {
        type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },
      },
    );
    await queryInterface.addColumn('tbl_post_hashtag', 'deleted_date', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('tbl_post_hashtag', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('tbl_post_hashtag', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(
      'tbl_post_hashtag',
      'created_date_unix_timestamp',
    );
    await queryInterface.removeColumn(
      'tbl_post_hashtag',
      'updated_at_unix_timestamp',
    );
    await queryInterface.removeColumn('tbl_post_hashtag', 'deleted_date');
  },
};
