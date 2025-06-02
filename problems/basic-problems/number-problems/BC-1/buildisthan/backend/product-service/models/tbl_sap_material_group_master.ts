"use strict";
import { Model, DataTypes } from "sequelize";
module.exports = (sequelize: any) => {
  class tbl_sap_material_group_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  tbl_sap_material_group_master.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
      },
      is_sap_created: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue:1,
      },
      created_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
      sequelize,
      modelName: "tbl_sap_material_group_master",
      timestamps:true,
      paranoid:true
    }
  );
  return tbl_sap_material_group_master;
};
