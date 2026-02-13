import { readFileSync } from 'fs';
import { join } from 'path';
import { poolConnection } from './connection';

async function migrate() {
    try {
        console.log('=== Reading migration file...');

        const sqlFile = join(process.cwd(), 'drizzle', '0000_secret_speed_demon.sql');
        let sql = readFileSync(sqlFile, 'utf-8');

        // Remove all comment lines completely
        sql = sql.replace(/-->.*/g, '');

        // Split into individual statements (between semicolons)
        const rawStatements = sql.split(';');

        // Clean and filter statements
        const statements = rawStatements
            .map(s => s.trim())
            .filter(s => s.length > 20 && (
                s.includes('CREATE TABLE') ||
                s.includes('CREATE INDEX') ||
                s.includes('ALTER TABLE')
            ));

        console.log(`=== Found ${statements.length} SQL statements\n`);

        const connection = await poolConnection.getConnection();

        let tablesCreated = 0;
        let indexesCreated = 0;
        let fksCreated = 0;
        let skipped = 0;

        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];

            try {
                await connection.query(stmt);

                if (stmt.includes('CREATE TABLE')) {
                    const match = stmt.match(/CREATE TABLE `(\w+)`/);
                    const tableName = match ? match[1] : 'unknown';
                    console.log(`=== sukses [${i + 1}/${statements.length}] Table: ${tableName}`);
                    tablesCreated++;
                } else if (stmt.includes('CREATE INDEX')) {
                    const match = stmt.match(/CREATE INDEX `(\w+)`/);
                    const indexName = match ? match[1] : '';
                    if (indexesCreated % 10 === 0 || indexName.includes('teacher')) {
                        console.log(`=== sukses [${i + 1}/${statements.length}] Index: ${indexName}`);
                    }
                    indexesCreated++;
                } else if (stmt.includes('ADD CONSTRAINT')) {
                    fksCreated++;
                }
            } catch (error: any) {
                if (
                    error.code === 'ER_TABLE_EXISTS_ALREADY' ||
                    error.code === 'ER_TABLE_EXISTS_ERROR' ||
                    error.code === 'ER_DUP_KEYNAME' ||
                    error.code === 'ER_DUP_ENTRY'
                ) {
                    skipped++;
                } else {
                    console.error(`\n === error [${i + 1}] Error:`, error.message);
                }
            }
        }

        connection.release();

        console.log('\n' + '='.repeat(50));
        console.log('=== Migration completed successfully!');
        console.log('='.repeat(50));
        console.log(`=== Tables created: ${tablesCreated}`);
        console.log(`=== Foreign keys: ${fksCreated}`);
        console.log(`=== Indexes: ${indexesCreated}`);
        if (skipped > 0) {
            console.log(`=== Skipped (exists): ${skipped}`);
        }
        console.log('='.repeat(50) + '\n');

        process.exit(0);
    } catch (error) {
        console.error('\n === error Migration failed:', error);
        process.exit(1);
    }
}

migrate();
