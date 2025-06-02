'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_product_block_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
    }
  }
  tbl_product_block_mappings.init({
    seller_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    block_id: DataTypes.INTEGER,
    pincode: DataTypes.INTEGER,
    is_active:{
     type:DataTypes.BOOLEAN,
     allowNull:false,
     defaultValue:1
    } ,
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
    modelName: 'tbl_product_block_mappings',
    paranoid: true
  });
  return tbl_product_block_mappings;
};