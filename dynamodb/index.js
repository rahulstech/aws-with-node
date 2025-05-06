const { createTable, dropTable } = require('./tables')
const { insert } = require('./insert')
const { readAll, readById } = require('./read')
const { update } = require('./update')
const { deleteById } = require('./delete')

const params = process.argv.slice(2);
const [command, table] = params;

console.log(`command=${command} table=${table}`);
switch(command) {
    case 'create_table': createTable(table);
    break;
    case 'drop_table': dropTable(table);
    break;
    case 'insert': insert(table);
    break;
    case 'read_all': readAll(table);
    break;
    case 'read_by_id': readById(table);
    break;
    case 'update': update(table); 
    break; 
    case 'delete_by_id': deleteById(table) 
    break;
    default: `unknown commnad '${command}'`
}