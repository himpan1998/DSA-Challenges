'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_product_logs_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
      this.belongsTo(models.tbl_product_master, {
        foreignKey:'id',
        as:'product'
      })
    }
  }
  tbl_product_logs_mappings.init({
    product_id: DataTypes.INTEGER,
    field: DataTypes.STRING,
    from_value: DataTypes.STRING,
    to_value: DataTypes.STRING,
    created_by: {
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
    deletedAt:{
      type:DataTypes.DATE,
      allowNull:true
    }

  }, {
    sequelize,
    modelName: 'tbl_product_logs_mappings',
    paranoid:true
  });
  return tbl_product_logs_mappings;
};