const Sequelize =  require('sequelize');

const connectDB = () => {
    let sequelize = null;
    return () => {
        if(!sequelize)
            sequelize = new Sequelize(process.env.PG_CONNECTION_STRING);
        return sequelize;
    }
}

module.exports = connectDB();