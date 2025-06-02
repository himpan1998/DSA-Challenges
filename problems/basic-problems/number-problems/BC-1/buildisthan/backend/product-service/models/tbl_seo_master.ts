'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize:any, DataTypes:any) => {
  class tbl_seo_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  tbl_seo_master.init({
    page_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    page_name: DataTypes.STRING,
    seo_description: DataTypes.STRING,
    seo_keywords: DataTypes.STRING,
    seo_title: DataTypes.STRING,
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
    modelName: 'tbl_seo_master',
    paranoid: true
  });
  return tbl_seo_master;
};