'use strict';
import { Model, DataTypes } from 'sequelize';
module.exports = (sequelize: any) => {
  class tbl_product_filters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  tbl_product_filters.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    sub_categories_id: {
      type: DataTypes.INTEGER
    },
    items_alias: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.BOOLEAN
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,

    }

  }, {
    sequelize,
    modelName: 'tbl_product_filters',
    paranoid: true,
  });
  return tbl_product_filters;
};