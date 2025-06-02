'use strict';
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize:any, DataTypes:any) => {
  class tbl_product_cart_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.belongsTo(models.tbl_product_master, {
        foreignKey: 'id',
        // sourceKey: 'product_id',
        as: 'product_items'
      })

    }
  }
  tbl_product_cart_master.init({
    sku_id:DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    quantity: DataTypes.FLOAT,    
    ask_price: DataTypes.FLOAT,
    is_saved_for_later: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    is_active:{
      type:DataTypes.BOOLEAN,
      defaultValue:1,
      allowNull:false
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
    modelName: 'tbl_product_cart_master',
    paranoid: true
  });
  return tbl_product_cart_master;
};