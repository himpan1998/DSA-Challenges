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
      'tbl_rfq_seller_mappings',
      'seller_quantity',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'admin_approved',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: '0 - Pending 1 - Approved 2 - Rejected'
        }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'seller_approved',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: '0 - Pending 1 - Approved 2 - Rejected'
        }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'buyer_approved',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0,
          comment: '0 - Pending 1 - Approved 2 - Rejected'
        }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'buyer_confirmation_date',
        {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'seller_confirmation_date',
        {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      queryInterface.addColumn(
        'tbl_rfq_seller_mappings',
        'buyer_confirmation_date',
        {
          type: Sequelize.DATE,
          allowNull: true,
        })
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
