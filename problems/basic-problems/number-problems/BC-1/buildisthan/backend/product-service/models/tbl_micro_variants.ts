"use strict";
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  class tbl_micro_variants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  tbl_micro_variants.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_items_id: {
        type: DataTypes.INTEGER
      },
      sub_categories_id: {
        type: DataTypes.INTEGER,
      },
      item_name: {
        type: DataTypes.STRING,
      },
      items_type: {
        type: DataTypes.STRING
      },
      is_active: {
        type: DataTypes.BOOLEAN
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "tbl_micro_variants",
      paranoid: true,
    }
  );
  return tbl_micro_variants;
};
