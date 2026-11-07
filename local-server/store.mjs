import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {makeSeed} from './seed.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR=process.env.PROPER_DATA_DIR || path.join(here,'../data');
const file=path.join(DATA_DIR,'local-data.json');
fs.mkdirSync(DATA_DIR,{recursive:true});
let state;
try { state=JSON.parse(fs.readFileSync(file,'utf8')); if(state.version!==3) throw Error('Old version'); }
catch { state=makeSeed(); save(); }
function save(){const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(state,null,2),{mode:0o600});fs.renameSync(temp,file);}
export function getDB(){return state;}
export function updateDB(fn){const result=fn(state);save();return result;}
export function audit(actor,action,entity,description){state.activity.unshift({id:'ACT-'+Date.now()+'-'+Math.random().toString(36).slice(2,5),who:actor,action,entity,description,time:new Date().toISOString()});if(state.activity.length>1500)state.activity.length=1500;save();}
export function resetDB(){state=makeSeed();save();}
