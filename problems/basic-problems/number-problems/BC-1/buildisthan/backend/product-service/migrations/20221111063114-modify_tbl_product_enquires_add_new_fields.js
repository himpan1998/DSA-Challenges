'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_enquires', 
      'user_id', 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    ),
    queryInterface.addColumn(
      'tbl_product_enquires', 
      'user_name', 
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    )


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
