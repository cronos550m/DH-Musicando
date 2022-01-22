module.exports = (sequelize, datatypes) => {
    let alias = "Artistas"
    let cols = {
        id:{
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: datatypes.STRING
        },
        apellido: {
            type: datatypes.STRING
        }   
    };
    let config = {
        sequelize,
        tableName: "artistas",
        timestamps: false
    }
    const Artista = sequelize.define(alias, cols, config);

    Artista.associate = function (models) {
        Artista.hasMany(models.Canciones, { as: "canciones", foreignKey: "artista_id" });
      };

    return Artista
}