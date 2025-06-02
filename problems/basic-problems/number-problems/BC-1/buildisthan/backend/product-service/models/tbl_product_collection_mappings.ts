"use strict";
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  class tbl_product_collection_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      this.belongsTo(models.tbl_product_master,{
        as:'productItem',
        foreignKey:'id'
      })
      this.belongsTo(models.tbl_collection_masters,{
        as:'collection',
        foreignKey:'collection_id'
      })

    }
  }
  tbl_product_collection_mappings.init({
    product_id: DataTypes.INTEGER,
    collection_id: DataTypes.INTEGER,
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
    modelName: 'tbl_product_collection_mappings',
    paranoid: true
  });
  return tbl_product_collection_mappings;
};