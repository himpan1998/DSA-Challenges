"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tbl_sub_categories",
      {  id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: {  
          model: 'tbl_category_masters',
          key: 'id'
        }
      },
        category_name: {
          type: Sequelize.STRING,
          unique: true,
        },
        brand_id: {
          type: Sequelize.INTEGER,
        },
        sub_category_name: {
          type: Sequelize.STRING,
        },
        sub_category_image: {
          type: Sequelize.STRING,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
        },
        parent_id:{
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,

          allowNull: true,
        },
      },
      {
        paranoid: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_sub_categories");
  },
};
