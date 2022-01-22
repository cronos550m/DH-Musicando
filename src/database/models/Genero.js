module.exports = (sequelize, datatypes) => {
    let alias = "Generos"
    let cols = {
        id:{
            type: datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: datatypes.STRING
        }   
    };
    let config = {
        sequelize,
        tableName: "generos",
        timestamps: false
    }
    const Genero = sequelize.define(alias, cols, config);

    return Genero
}