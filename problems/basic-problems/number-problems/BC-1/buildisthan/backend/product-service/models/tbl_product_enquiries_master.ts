"use strict";
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  class tbl_product_enquiries_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here

      this.belongsTo(models.tbl_category_masters, {
        foreignKey: "category_id",
        as: "category",
      })

      this.belongsTo(models.tbl_product_master, {
        foreignKey: "id",
        as: "product",
      })

      this.hasMany(models.tbl_rfq_seller_mappings, {
        foreignKey: "rfq_id",
        as: "taggedSellers",
      })
      this.hasMany(models.tbl_product_enquiries_master, {
        foreignKey: "request_id",
        sourceKey: "request_id",
        as: "enq",
      })

      this.belongsTo(models.tbl_business_gst_master, {
        foreignKey: "business_gst_id",
        as: "businessGst",
      });
      
      this.belongsTo(models.tbl_uom_master, {
        foreignKey: "uom_id",
        as: "uom",
      })
      
    }
  }
  tbl_product_enquiries_master.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      request_id: {
        type: DataTypes.STRING,
      },
      sku_id: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tbl_product_master",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "tbl_category_masters",
          key: "id",
        },
      },
      uom_id: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      user_name: {
        type: DataTypes.STRING,
      },
      business_gst_id: {
        type: DataTypes.INTEGER,
      },
      address_id: {
        type: DataTypes.INTEGER,
      },
      address_text: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      comment: {
        type: DataTypes.STRING,
      },
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
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "tbl_product_enquiries_master",
      paranoid: true,
    }
  );
  return tbl_product_enquiries_master;
};
