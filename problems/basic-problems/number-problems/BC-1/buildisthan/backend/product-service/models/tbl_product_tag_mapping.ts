'use strict';
import { Model,DataTypes} from 'sequelize';
module.exports = (sequelize:any) => {
  class tbl_product_tag_mapping extends Model {
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
      this.belongsTo(models.tbl_tag_masters,{
        as:'tag',
        foreignKey:'tag_id'
      })
    }
  }
  tbl_product_tag_mapping.init({
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
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
    modelName: 'tbl_product_tag_mapping',
    paranoid: true
  });
  return tbl_product_tag_mapping;
};