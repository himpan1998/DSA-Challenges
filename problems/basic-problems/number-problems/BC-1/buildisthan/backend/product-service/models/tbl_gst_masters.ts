'use strict';
import { Model, DataTypes } from 'sequelize';
module.exports = (sequelize: any) => {
  class tbl_gst_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  tbl_gst_masters.init({
    gst_value: DataTypes.INTEGER,
    type: DataTypes.STRING,
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
  }, 
  {
    sequelize,
    modelName: 'tbl_gst_masters',
    paranoid: true
  });
  return tbl_gst_masters;
};