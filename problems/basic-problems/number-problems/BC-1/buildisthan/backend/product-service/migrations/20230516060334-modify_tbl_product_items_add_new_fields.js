'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    await queryInterface.renameColumn('tbl_product_items','createdBy','created_by')
    await queryInterface.renameColumn('tbl_product_items','updatedBy','updated_by')
    await queryInterface.renameColumn('tbl_product_items','deletedBy','deleted_by')
    

    await queryInterface.removeColumn('tbl_product_items', 'product_id');
    await queryInterface.removeColumn('tbl_product_items', 'seller_id');  
    await queryInterface.removeColumn('tbl_product_items', 'is_tax_exempted');

    await queryInterface.renameTable('tbl_product_items','tbl_product_masters')
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
