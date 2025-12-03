const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conecta ao arquivo do banco
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar:', err.message);
        return;
    }
});

// Pega a query que você digitou no terminal
const query = process.argv[2];

if (!query) {
    console.log("⚠️  Por favor, forneça uma query SQL entre aspas.");
    console.log("Exemplo: node run-sql.js \"SELECT * FROM Users\"");
    process.exit(1);
}

console.log(`🔍 Executando: "${query}"...\n`);

// Executa a query
db.all(query, [], (err, rows) => {
    if (err) {
        console.error("❌ Erro no SQL:", err.message);
    } else {
        if (rows.length === 0) {
            console.log("📭 Nenhum resultado encontrado.");
        } else {
            // console.table formata os dados em uma tabela bonita no terminal
            console.table(rows);
        }
    }
    db.close();
});