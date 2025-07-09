import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgresql://adminpucpr:SenhaForte123!@bdmatricula27749.postgres.database.azure.com/postgres?sslmode=require'
});

client.connect()
  .then(() => console.log("✅ Conectado ao PostgreSQL"))
  .catch(err => console.error("Erro ao conectar ao banco:", err));

export default client;
