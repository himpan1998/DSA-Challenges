'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_mandt", {

            type: Sequelize.STRING,
            after: "symbol"

        })

        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_spras", {

            type: Sequelize.STRING,
            after: "sap_mandt"

        })

        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_msehi", {

            type: Sequelize.STRING,
            after: "sap_spras"

        })

        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_mseh6", {

            type: Sequelize.STRING,
            after: "sap_msehi"

        })

        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_mseht", {

            type: Sequelize.STRING,
            after: "sap_mseh6"

        })

        await queryInterface.addColumn("tbl_unit_of_measurements", "sap_msehl", {

            type: Sequelize.STRING,
            after: "sap_mseht"

        })
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    }
};
