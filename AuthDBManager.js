const fs = require('fs');
const validateType = require('./util').validateType;


const createDBFile = (path,structure) => {
    
    let pArr = path.split('/').filter((el) => el.trim() != '.');
    let mPath = '.';
    pArr = pArr.map((p, i) => {
        let type = 'dir';
        if (i === pArr.length - 1 && p.includes('.')) {
            type = 'file';
        }
        mPath = `${mPath}/${p}`;
        return {
            path: mPath,
            name: p,
            type: type
        };
    });
    pArr.forEach((crPath) => {
        const r = fs.existsSync(crPath.path);

        if (!r) {
            if (crPath.type === 'file') {
                fs.writeFileSync(crPath.path, JSON.stringify(structure), { encoding: 'utf8' })
            } else {
                fs.mkdirSync(crPath.path);
            }
        }
    });
};

const AuthDBManager = {

    initiated: false,
    dbConfig: {},
    init: function (dbConfig = {}) {
        if (!this.initiated) {
            const defaultConfig = require('./db.config.json');
            this.dbConfig = { ...defaultConfig, ...dbConfig };
            
            Object.freeze(this.dbConfig);
            createDBFile(this.dbConfig.location,this.dbConfig.structure);
            this.initiated = true;
        } else {
            console.warn('AuthDBManager DB is already configured!')
        }

        return this.dbConfig;
    },
    perform:function(){
        
    },
    getBlankUser: function () {
        const schema = require('./user.schema');
        return schema;
    },
    addUser: function (userObject) {
        const schema = require('./user.schema');
        const vResult = validateType(userObject, schema);
        if (vResult.valid) {
            content = fs.readFileSync(this.dbConfig.location,{encoding:'utf8'});

        } else {
            const e = Error();
            e.name = 'Standard Schema Violation';
            e.message = `Trying to add data with wrong schema.\nFollowing fields are not allowed\n${vResult.nonStandardFields}`;
            throw e;
        }


    }

};


//AuthDBManager.addUser({ id: 9, country: 'india', n: 90, bb: 90 });
AuthDBManager.init();