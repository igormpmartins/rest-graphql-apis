const db = require('./db')
const fs = require('fs')

const initMigrate = async(conn) => {

    const [res] = await conn.query(`SHOW TABLES LIKE 'migrate_version'`)

    if (res.length === 0) {

        await conn.query(`START TRANSACTION`)

        try {

            await conn.query(`
                CREATE TABLE migrate_version (
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    version INT
                )
            `)

            await conn.query(`INSERT INTO migrate_version (id, version) VALUES (1, 0)`)
            await conn.query(`COMMIT`)
            
        } catch (e) {
            await conn.query(`ROLLBACK`)
            console.log(e)
        }

    }

}

const getCurrentVersion  = async(conn) => {
    const [ver] = await conn.query(`SELECT version FROM migrate_version WHERE id = ?`, [1])
    return ver[0].version
}

const updateMigrate = async(conn, version) => {
    const [ver] = await conn.query(`UPDATE migrate_version SET version = ? WHERE id = ?`, [version, 1])
}

const migrate = async() => {

    const conn = await db
    await initMigrate(conn)

    const currVersion = await getCurrentVersion(conn)
    let targetVersion = 9999

    if (process.argv.length > 2) {
        if ((process.argv[2] === '--target-version') && process.argv[3] ) {
            targetVersion = process.argv[3]
        }
    }

    const upgrade = targetVersion > currVersion
    console.log(upgrade? 'upgrading to': 'downgrading to', 'version', targetVersion)

    const migrateFiles = fs.readdirSync('./migrations')
    const mapFiles = migrateFiles.map(file => {
        return {
            fileName: file,
            version: parseInt(file.split('.')[0])
        }
    }).sort( (a,b) => {

        if ( (a.version > b.version && upgrade) || (a.version < b.version && !upgrade) ) {
            return 1
        } else {
            return -1
        }
    })

    for await (file of mapFiles) {
        const m = require('./migrations/' + file.fileName)
        console.log('migrate:', file.fileName)

        await conn.query(`START TRANSACTION`)
        let executed = false

        if (upgrade) {
            if ((file.version > currVersion) && (file.version <= targetVersion)) {
                await m.up(conn)  
                executed = true
            }
        } else {
            if ((file.version <= currVersion) && (file.version > targetVersion)) {
                await m.down(conn)  
                executed = true
            }
        }

        if (executed) {
            console.log('update to version', file.version)
            let verUpd = file.version

            if (!upgrade)
                verUpd--

            await updateMigrate(conn, verUpd)
        }

        await conn.query(`COMMIT`)

    }

    await conn.end()

}

migrate()


