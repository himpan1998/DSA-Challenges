import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes :any) => {
  class tbl_brand_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
    }
  }
  tbl_brand_masters.init({
    brand_name: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.STRING,
    is_active:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:1
    },
    created_by:{
     type: DataTypes.INTEGER,
     allowNull:false
    },
    updated_by:{
      type: DataTypes.INTEGER,
      allowNull:true
     },
    deleted_by:{
      type: DataTypes.INTEGER,
      allowNull:true
     }
  }, {
    sequelize,
    modelName: 'tbl_brand_masters',
    paranoid: true
  });
  return tbl_brand_masters;
};