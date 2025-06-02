'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize : any, DataTypes : any) => {
  class tbl_rfq_seller_mappings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models : any) {

      this.belongsTo(models.tbl_product_enquiries_master, {
        foreignKey: 'rfq_id',
        as: 'enquiry'
      })

      // this.belongsTo(models.tbl_pmt_user_masters, {
      //   foreignKey: 'seller_id',
      //   as: 'user'
      // })
      // define association here
    }
  }
  tbl_rfq_seller_mappings.init({
    rfq_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    admin_price: DataTypes.FLOAT,
    pre_order_id:DataTypes.STRING,
    request_id: DataTypes.STRING,
    seller_price: DataTypes.FLOAT,
    admin_approved: DataTypes.INTEGER,
    seller_approved: DataTypes.INTEGER,
    buyer_approved: DataTypes.INTEGER,
    seller_quantity: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    seller_confirmation_date: DataTypes.DATE,
    buyer_confirmation_date: DataTypes.DATE,
    is_confirmed_by_buyer: DataTypes.INTEGER,
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
      allowNull:true,
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
    modelName: 'tbl_rfq_seller_mappings',
    paranoid: true
  });
  return tbl_rfq_seller_mappings;
};