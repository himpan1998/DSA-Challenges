'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'tbl_status_masters',
            'deletedAt',
            {
                type: Sequelize.DATE,
                allowNull: true,
            },
            {
                paranoid: true,
              }
        )
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
