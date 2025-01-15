'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('tbl_hashtag', 'status', {
      type:Sequelize.INTEGER, 
      allowNull: true,                     
      defaultValue: 0                
    });

    await queryInterface.addColumn('tbl_hashtag', 'created_date_unix_timestamp', {
      type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },              
    });
    await queryInterface.addColumn('tbl_hashtag', 'updated_at_unix_timestamp', {
      type: Sequelize.BIGINT,
        validate: {
          min: 0,
        },                 
    });
    await queryInterface.addColumn('tbl_hashtag', 'deleted_date', {
       type: Sequelize.DATE           
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('tbl_hashtag', 'status'); 
    await queryInterface.removeColumn('tbl_hashtag', 'created_date_unix_timestamp'); 
    await queryInterface.removeColumn('tbl_hashtag', 'updated_at_unix_timestamp'); 
    await queryInterface.removeColumn('tbl_hashtag', 'deleted_date'); 
  }
};
