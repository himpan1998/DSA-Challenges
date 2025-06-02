'use strict';
import { Model, DataTypes } from 'sequelize';
module.exports = (sequelize: any) => {
  class tbl_product_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.hasMany(models.tbl_product_images, {
        foreignKey: 'product_id',
        as: 'images'
      })

      this.belongsTo(models.tbl_sub_categories_master, {
        foreignKey: 'sub_categories_id',
        as: 'subcategory'
      })

      this.belongsTo(models.tbl_category_masters, {
        foreignKey: 'categories_id',
        as: 'category'
      })

      this.belongsTo(models.tbl_uom_master, {
        foreignKey: 'uom_id',
        as: 'uom'
      })

      this.belongsTo(models.tbl_brand_masters, {
        foreignKey: 'brand_id',
        as: 'brand'
      })
      

      this.hasMany(models.tbl_product_collection_mappings,{
        as:'productCollection',
        foreignKey:'product_id'
      })

      this.hasMany(models.tbl_product_tag_mapping,{
        as:'productTag',
        foreignKey:'product_id'
      })

      this.hasOne(models.tbl_product_shipping_master,{
        as:'shipping',
        foreignKey:'product_id'
      })

      this.hasMany(models.tbl_seller_linked_product_mappings, {
        foreignKey:'product_id',
        as : 'sellerProducts'
      })

      this.hasMany(models.tbl_product_specification_mappings,{
        foreignKey:'product_id',
        as:'productSpecification'

      })

      this.hasMany(models.tbl_seo_master,{
        foreignKey:'product_id',
        as:'seo_master'

      })
      
      this.hasMany(models.tbl_product_enquiries_master,{
        foreignKey:'product_id',
        as:'productEnquires'

      })
      

      


      // define association here
    }
  }
  tbl_product_master.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categories_id: {
      type: DataTypes.INTEGER
    },
    sub_categories_id: {
      type: DataTypes.INTEGER
    },
    uom_id: {
      type: DataTypes.INTEGER
    },
    sap_uom:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    brand_id: {
      type: DataTypes.INTEGER
    },
    product_name: {
      type: DataTypes.STRING
    },
    short_description: {
      type: DataTypes.STRING
    },
    full_description: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING
    },
    stock_quantity: {
      type: DataTypes.INTEGER
    },
    original_price: {
      type: DataTypes.INTEGER
    },
    offered_price: {
      type: DataTypes.INTEGER
    },
    available_start_date: {
      type: DataTypes.DATE
    },
    available_end_date: {
      type: DataTypes.STRING
    },
    product_type: {
      type: DataTypes.INTEGER
    },
    is_shown_in_home_page: {
      type: DataTypes.INTEGER
    },
    tax_category_id: {
      type: DataTypes.INTEGER
    },
    hsn_code: {
      type: DataTypes.STRING
    },
    bar_code: {
      type: DataTypes.STRING
    },
    disable_buy_button: {
      type: DataTypes.INTEGER
    },
    business_category:{type: DataTypes.INTEGER},
    sap_code:{type: DataTypes.INTEGER},
    front_image:{type: DataTypes.STRING,allowNull:true},
    back_image:{type: DataTypes.STRING,allowNull:true},
    side_image_1:{type: DataTypes.STRING,allowNull:true},
    side_image_2:{type: DataTypes.STRING,allowNull:true},
    add_img_1:{type: DataTypes.STRING,allowNull:true},
    add_img_2:{type: DataTypes.STRING,allowNull:true},
    is_active:
    {
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
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'tbl_product_master',
    paranoid: true,
  });
  return tbl_product_master;
};