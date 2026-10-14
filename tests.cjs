'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const dir=__dirname;const DATA=JSON.parse(fs.readFileSync(path.join(dir,'questions.json'),'utf8'));const C=require('./core.js');
assert.equal(DATA.length,13);assert.equal(DATA.flatMap(a=>a.questions).length,130);
const key=['DCD BAAB CDB'.replaceAll(' ',''),'DBAAC AADDC'.replaceAll(' ',''),'BCCCAA DBAA'.replaceAll(' ',''),'DCDCAD BADC'.replaceAll(' ',''),'DCDD AA DBAD'.replaceAll(' ',''),'DBBAAA DBAD'.replaceAll(' ',''),'CCABDA DDCB'.replaceAll(' ',''),'CDDD AA DDBB'.replaceAll(' ',''),'CDA CAA DDAB'.replaceAll(' ',''),'DBBDD DCDAA'.replaceAll(' ',''),'CDD DAB CDAD'.replaceAll(' ',''),'CDADBC ADAB'.replaceAll(' ',''),'CDDBCD DAAB'.replaceAll(' ','')];
let checked=0;
for(const a of DATA){assert.equal(a.questions.length,10);assert.equal(a.questions.map(q=>q.answer).join(''),key[a.id]);
 for(const q of a.questions){assert(q.text.length>10);assert(q.explanation.length>30);assert.deepEqual(q.options.map(o=>o.id),q.options.length===2?['A','B']:['A','B','C','D']);
  for(const o of q.options){let s={};assert(C.choose(s,a,q.id,o.id));assert.equal(C.stats(a,s).correct,o.id===q.answer?1:0);assert(!C.choose(s,a,q.id,q.answer));assert.equal(s[a.id][q.id],o.id);checked++;}
 }
 let s={};for(const q of a.questions)C.choose(s,a,q.id,q.answer);assert.deepEqual(C.stats(a,s),{answered:10,correct:10,wrong:0,total:10,complete:true});assert.deepEqual(C.cleanState(JSON.parse(JSON.stringify(s)),DATA),s);
}
let s={0:{1:'D'},1:{1:'D'}};C.reset(s,0);assert.deepEqual(s,{1:{1:'D'}});
assert.deepEqual(C.cleanState({999:{1:'A'},0:{1:'X',2:'C',55:'D'},1:null},DATA),{0:{2:'C'}});
function ui(seed={},hash='#overview',blocked=false){
 const nodes=new Map(),listeners={},events={};let saved=JSON.stringify(seed);
 function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',outerHTML:'',textContent:'',hidden:false,classList:{toggle(){}},setAttribute(){},focus(){},scrollIntoView(){},addEventListener(name,cb){events[id+':'+name]=cb;},showModal(){this.open=true;},close(){this.open=false;events[id+':close']?.();}});return nodes.get(id);}
 const doc={querySelector:node,getElementById(id){if(id==='question-data')return{textContent:JSON.stringify(DATA)};return node('#'+id);},addEventListener(n,cb){listeners[n]=cb;},title:''};
 const local={getItem(){if(blocked)throw Error('Blocked');return saved;},setItem(k,v){if(blocked)throw Error('Blocked');saved=v;}};
 const win={scrollTo(){},addEventListener(n,cb){listeners['window:'+n]=cb;}};const ctx=vm.createContext({document:doc,window:win,location:{hash},localStorage:local,PracticeCore:C,setTimeout(){return 1;},clearTimeout(){},console});vm.runInContext(fs.readFileSync(path.join(dir,'app.js'),'utf8'),ctx);
 function click(attrs,dataset={}){const b={dataset,hasAttribute:k=>attrs.includes(k),isConnected:true,focus(){}};listeners.click({target:{closest:()=>b}});}
 return{node,events,ctx,click,getSaved:()=>JSON.parse(saved),route(h){ctx.location.hash=h;listeners['window:hashchange']();},fireStorage(value){listeners['window:storage']({key:C.STORAGE_KEY,newValue:JSON.stringify(value)});}};
}
const app=ui();assert(app.node('#content').innerHTML.includes('130'));assert(app.node('#content').innerHTML.includes('Start practice'));
app.route('#week-1');assert(!app.node('#content').innerHTML.includes('WHY THIS ANSWER?'));
app.click(['data-question'],{question:'1',option:'A'});assert(app.node('#q-1').outerHTML.includes('WHY THIS ANSWER?'));assert(app.node('#q-1').outerHTML.includes('option wrong'));assert(app.node('#q-1').outerHTML.includes('option correct'));assert.equal(app.getSaved()[1][1],'A');
app.click(['data-question'],{question:'2',option:'B'});assert(!app.node('#q-2').outerHTML.includes('WHY THIS ANSWER?'));assert(app.node('#q-2').outerHTML.includes('Correct'));
for(const q of DATA[1].questions.slice(2))app.click(['data-question'],{question:String(q.id),option:q.answer});assert(app.node('#completion-wrap').innerHTML.includes('Assignment complete.'));assert(app.node('#completion-wrap').innerHTML.includes('9<small> / 10'));
const restored=ui(app.getSaved(),'#week-1');assert(restored.node('#content').innerHTML.includes('9<small> / 10'));restored.route('#week-2');restored.click(['data-question'],{question:'1',option:'B'});restored.route('#week-1');restored.click(['data-reset'],{reset:'1'});restored.events['#reset-confirm:click']();assert(!restored.getSaved()[1]);assert.equal(restored.getSaved()[2][1],'B');
restored.route('#week-12');assert(restored.node('#content').innerHTML.includes('Provisional answer key'));assert(restored.node('#content').innerHTML.includes('Key under review'));restored.route('#week-999');assert(restored.node('#content').innerHTML.includes('Your assignments'));
const noStorage=ui({},'#overview',true);assert.equal(noStorage.node('#storage-alert').hidden,false);
restored.fireStorage({3:{1:'D'}});assert(restored.node('#week-list').innerHTML.includes('Week 3, 1 of 10 answered'));
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');assert(!/\/\*(STYLES|DATA|CORE|APP)\*\//.test(html));assert(!/<script[^>]+src=/.test(html));assert(!/<link[^>]+stylesheet/.test(html));
const embedded=JSON.parse(html.match(/<script id="question-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);assert.deepEqual(embedded,DATA);
console.log(`PASS: 13 assignments / 130 questions; ${checked} option-grading checks; key integrity; locking; completion; explanation visibility; persistence; resets; storage failures; cross-tab updates; self-contained build.`);
