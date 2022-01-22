module.exports = (sequelize, datatypes) => {
    let alias = "Albumes"
    let cols = {
        id:{
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: datatypes.STRING
        },
        duracion: {
            type: datatypes.INTEGER
        }  
    };
    let config = {
        sequelize,
        tableName: "albumes",
        timestamps: false
    }
    const Album = sequelize.define(alias, cols, config);

    // Album.associate = function (models) {
    //     Album.belongsTo(models.Cancion, { as: "canciones", foreignKey: "id" });
    //   };

    return Album
}