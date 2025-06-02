import { Model } from 'sequelize';
module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_product_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {
      // define association here
      this.hasMany(models.tbl_product_master, {
        foreignKey: "id",
        sourceKey:'id',
        as: "product_images"
      })
    
    }
  }
  tbl_product_images.init({
    product_id: DataTypes.INTEGER,
    image_type: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'tbl_product_images',
    paranoid: true
  });
  return tbl_product_images;
};