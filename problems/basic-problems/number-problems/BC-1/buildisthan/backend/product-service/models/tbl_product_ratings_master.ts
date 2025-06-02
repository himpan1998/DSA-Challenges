'use strict';
import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize:any, DataTypes:any) => {
  class tbl_product_ratings_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      // define association here
      // this.hasMany(models.tbl_product_items, {
      //   foreignKey: 'product_items_id',
      //   as: 'product_items'
      // })  
    }
  }
  tbl_product_ratings_master.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    is_active:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:1
    },
    created_by:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    updated_by:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    deleted_by:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,

    }
  }, {
    sequelize,
    modelName: 'tbl_product_ratings_master',
    paranoid: true,
  });
  return tbl_product_ratings_master;
};