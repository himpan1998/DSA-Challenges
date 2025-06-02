'use strict';
import { Model, DataTypes } from 'sequelize';
module.exports = (sequelize:any) => {
  class tbl_temp_orders_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  tbl_temp_orders_master.init({
    request_id: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    is_confirmed: DataTypes.BOOLEAN,
    is_dispatch: DataTypes.BOOLEAN,
    is_docket: DataTypes.BOOLEAN,
    is_Active:{
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
    modelName: 'tbl_temp_orders_master',
    paranoid: true
  });
  return tbl_temp_orders_master;
};