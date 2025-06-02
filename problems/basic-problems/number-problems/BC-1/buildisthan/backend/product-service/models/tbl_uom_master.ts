'use strict';
import { Model, DataTypes} from 'sequelize';
module.exports = (sequelize:any) => {
  class tbl_uom_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
    }
  }
  tbl_uom_master.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name:{
      type:DataTypes.STRING
    },
    symbol:{
      type:DataTypes.STRING
    } ,
    sap_mandt:{
      type:DataTypes.STRING
    },
    sap_spras:{
      type:DataTypes.STRING
    },
    sap_msehi:{
      type:DataTypes.STRING
    },
    sap_mseh3:{
      type:DataTypes.STRING
    },
    sap_mseh6:{
      type:DataTypes.STRING
    },
    sap_mseht:{
      type:DataTypes.STRING
    },
    sap_msehl:{
      type:DataTypes.STRING
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
      allowNull:true,
    }
   
  }, {
    paranoid: true,
    sequelize,
    modelName: 'tbl_uom_master',
    
  });
  return tbl_uom_master;
};