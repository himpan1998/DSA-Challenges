"use strict";
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  class tbl_category_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  tbl_category_masters.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category_name: {
        type: DataTypes.STRING,
      },
      category_image: {
        type: DataTypes.STRING,
      },
      sap_profit_center: {
        type: DataTypes.STRING,
      },
      sap_storage_location: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:1
      },
      created_by:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      updated_by:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      deleted_by:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "tbl_category_masters",
      paranoid: true,
    }
  );
  return tbl_category_masters;
};