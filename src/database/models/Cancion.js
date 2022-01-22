
module.exports = (sequelize, datatypes) => {
    let alias = "Canciones"
    let cols = {
        id:{
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: datatypes.STRING,
        },
        duracion: {
            type: datatypes.INTEGER,
        },
        created_at: {
            type: datatypes.DATE
        },
        updated_at: {
            type: datatypes.DATE
        },
        genero_id: {
            type: datatypes.INTEGER,
            references: {
                model: 'Genero',
                key: 'id'
              }
        },
        album_id: {
            type: datatypes.INTEGER,
            references: {
                model: 'Album',
                key: 'id'
              }
        },
        artista_id: {
            type: datatypes.INTEGER,
            references: {
                model: 'Artista',
                key: 'id'
              }
        }
        
    };
    let config = {
        sequelize,
        tableName: "canciones",
        timestamps: false,
        indexes: [
            {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [{ name: "id" },]
            },
            {
              name: "canciones_generos_idx",
              using: "BTREE",
              fields: [{ name: "genero_id" },]
            },
            {
              name: "canciones_albumes_idx",
              using: "BTREE",
              fields: [{ name: "album_id" },]
            },
            {
              name: "canciones_artistas_idx",
              using: "BTREE",
              fields: [{ name: "artista_id" },]
            },
          ]
    }
    const Cancion = sequelize.define(alias, cols, config);

    Cancion.associate = function (models) {
        Cancion.belongsTo(models.Generos, { as: "genero", foreignKey: "genero_id" });
        Cancion.belongsTo(models.Albumes, { as: "album", foreignKey: "album_id" });
        Cancion.belongsTo(models.Artistas, { as: "artista", foreignKey: "artista_id" });
      };

    return Cancion
}