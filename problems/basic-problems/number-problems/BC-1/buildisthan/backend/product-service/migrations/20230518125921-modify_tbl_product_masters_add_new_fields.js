'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   queryInterface.changeColumn(
    'tbl_product_masters',
    'is_active',
    {
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:1,
      after:'add_img_2'
    }
   )
   queryInterface.changeColumn(
    'tbl_product_masters',
     'created_by',
     {
      type:Sequelize.INTEGER,
      allowNull:false,
      after:'is_active'
     },

  )
  queryInterface.changeColumn(
    'tbl_product_masters',
     'updated_by',
     {
      type:Sequelize.INTEGER,
      allowNull:true,
      after:'created_by'
     },
  )
  queryInterface.changeColumn(
    'tbl_product_masters',
     'deleted_by',
     {
      type:Sequelize.INTEGER,
      allowNull:true,
      after:'updated_by'
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
