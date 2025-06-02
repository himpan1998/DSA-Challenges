'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_items',
      'oem_sku',
      {
          type: Sequelize.STRING,
          allowNull: false,
      },
  ),
  queryInterface.addColumn(
    'tbl_product_items',
    'legacy_sku',
    {
      type: Sequelize.STRING,
      allowNull: false,
    },
    {
      paranoid: true,
    }
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
