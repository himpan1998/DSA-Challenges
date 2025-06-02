'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class tbl_product_wish_lists_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.hasMany(models.tbl_product_images, {
        foreignKey: "product_id",
        sourceKey:'id',
        as: "product_images"
      })
    }
  }
  tbl_product_wish_lists_master.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    sku_id: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    ask_price: DataTypes.INTEGER,
    image_url:DataTypes.STRING,
    uom_symbol:DataTypes.STRING,
    isStatus: DataTypes.BOOLEAN,
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
    modelName: 'tbl_product_wish_lists_master',
    paranoid: true
  });
  return tbl_product_wish_lists_master;
};