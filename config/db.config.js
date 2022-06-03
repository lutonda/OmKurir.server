module.exports = {
    HOST: "nova-vps.com",
    USER: "novavpsc_omkurir_dev", //"hiperbit_omkurir_dev",
    PASSWORD: "4OvLMP8QvQipGFEC",
    DATABASE: "novavpsc_omkurir_dev",//"hiperbit_omkurir_dev",
    dialect: 'mysql',
    pool: {
      
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    }
  };