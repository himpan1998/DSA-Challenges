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
    queryInterface.addColumn(
      'tbl_product_enquires',
      'admin_price',
      {
        type: Sequelize.FLOAT,
        allowNull: true,
      }),
      queryInterface.addColumn(
        'tbl_product_enquires',
        'seller_price',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
