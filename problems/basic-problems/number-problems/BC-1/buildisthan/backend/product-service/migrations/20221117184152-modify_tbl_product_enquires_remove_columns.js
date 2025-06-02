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
    queryInterface.removeColumn(
      'tbl_product_enquires',
      'state'
    ),
      queryInterface.removeColumn(
        'tbl_product_enquires',
        'city'
      ),
      queryInterface.removeColumn(
        'tbl_product_enquires',
        'address'
      ),
      queryInterface.removeColumn(
        'tbl_product_enquires',
        'pincode'
      ),
      queryInterface.addColumn(
        'tbl_product_enquires',
        'address_id',
        {
          type:Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'tbl_product_enquires',
        'address_text',
        {
          type:Sequelize.STRING
        }
      );
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
