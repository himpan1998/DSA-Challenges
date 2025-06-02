'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_product_specification_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
      this.belongsTo(models.tbl_product_master,{
        foreignKey:'id',
        as:'productItem'

      })

      this.belongsTo(models.tbl_specification_masters,{
        foreignKey:'specification_id',
        as:'specification'

      })
    }
  }
  tbl_product_specification_mappings.init({
    product_id: DataTypes.INTEGER,
    specification_id: DataTypes.INTEGER,
    value: DataTypes.STRING,
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
    modelName: 'tbl_product_specification_mappings',
    paranoid: true
  });
  return tbl_product_specification_mappings;
};