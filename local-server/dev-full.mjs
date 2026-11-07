import {spawn} from 'node:child_process';
const children=[];
function start(cmd,args){const p=spawn(cmd,args,{stdio:'inherit',shell:process.platform==='win32'});children.push(p);p.on('exit',(code)=>{if(code!==0){console.error('Child exited:',code);stop();}});return p;}
function stop(){children.forEach(p=>{if(!p.killed)p.kill();});}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
start('node',['local-server/server.mjs']);
start('npm',['run','dev']);
