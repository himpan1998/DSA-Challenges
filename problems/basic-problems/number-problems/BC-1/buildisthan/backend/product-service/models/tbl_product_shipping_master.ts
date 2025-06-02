'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_product_shipping_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
    }
  }
  tbl_product_shipping_master.init({
    product_id: DataTypes.INTEGER,
    is_shipping: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    length: DataTypes.STRING,
    width: DataTypes.STRING,
    height: DataTypes.STRING,
    is_free_shipping: DataTypes.INTEGER,
    additional_shipping_charges: DataTypes.INTEGER,
    averge_delivery_time: DataTypes.STRING,
    is_active:{
      type:DataTypes.BOOLEAN,
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
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'tbl_product_shipping_master',
    paranoid: true
  });
  return tbl_product_shipping_master;
};