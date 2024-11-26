'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    // Sau đó đổi kiểu dữ liệu thành JSON
    await queryInterface.changeColumn('tbl_post', 'media', {
      type: Sequelize.JSON,
      allowNull: false, 
    });
  },

  async down(queryInterface, Sequelize) {
    // Đổi kiểu dữ liệu về STRING
    await queryInterface.changeColumn('tbl_post', 'media', {
      type: Sequelize.STRING,
      allowNull: false, // Khôi phục ràng buộc NOT NULL
    });
  },
};
