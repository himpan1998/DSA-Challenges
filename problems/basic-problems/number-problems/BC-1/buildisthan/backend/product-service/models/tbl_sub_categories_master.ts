'use strict';
import { Model, DataTypes } from 'sequelize';
module.exports = (sequelize: any) => {
  class tbl_sub_categories_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.tbl_category_masters, {
        foreignKey: 'category_id',
        as: 'category'
      })

      this.belongsTo(models.tbl_sub_categories_master, {
        foreignKey: 'parent_id',
        as: 'subSubCategory'
      })
    }
  }
  tbl_sub_categories_master.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER      
    },
    unique_code: {
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    unique_serial_code: {
      type:DataTypes.STRING,
      allowNull: true,
      unique:false,
    },
    level:{
      type: DataTypes.NUMBER,
      allowNull: true,
      unique: false,
       },
    category_name: {
      type: DataTypes.STRING,
      unique: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
    parent_id:{
      type: DataTypes.INTEGER
    },
    sub_category_name: {
      type: DataTypes.STRING,
    },
    sub_category_image: {
      type: DataTypes.STRING
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
    }

  }, {
    sequelize,
    modelName: 'tbl_sub_categories_master',
    paranoid: true,
  });
  return tbl_sub_categories_master;
};