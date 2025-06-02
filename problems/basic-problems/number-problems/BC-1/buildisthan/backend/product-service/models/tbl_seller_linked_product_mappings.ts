'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_seller_linked_product_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
      this.belongsTo(models.tbl_product_master, {
        foreignKey:'id',
        as: 'product'
      })
    }
  }
  tbl_seller_linked_product_mappings.init({
    seller_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    shipping_cost: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    is_approved: DataTypes.INTEGER,
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
    modelName: 'tbl_seller_linked_product_mappings',
    paranoid: true
  });
  return tbl_seller_linked_product_mappings;
};