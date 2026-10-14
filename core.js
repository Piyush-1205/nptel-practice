(function(global){
'use strict';
const STORAGE_KEY='learning-lab.psychology.v1';
function cleanState(raw,data){
 const result={};
 if(!raw||typeof raw!=='object')return result;
 for(const a of data){
  const saved=raw[a.id]; if(!saved||typeof saved!=='object')continue;
  const valid={};for(const q of a.questions){const value=saved[q.id];if(q.options.some(o=>o.id===value))valid[q.id]=value;}
  if(Object.keys(valid).length)result[a.id]=valid;
 }
 return result;
}
function stats(assignment,state){
 const saved=state[assignment.id]||{};
 const answered=assignment.questions.filter(q=>saved[q.id]!==undefined).length;
 const correct=assignment.questions.filter(q=>saved[q.id]===q.answer).length;
 return {answered,correct,wrong:answered-correct,total:assignment.questions.length,complete:answered===assignment.questions.length};
}
function choose(state,assignment,questionId,option){
 const q=assignment.questions.find(q=>q.id===questionId);
 if(!q||!q.options.some(o=>o.id===option))return false;
 if(state[assignment.id]?.[questionId]!==undefined)return false;
 (state[assignment.id]??={})[questionId]=option;return true;
}
function reset(state,assignmentId){delete state[assignmentId];}
const api={STORAGE_KEY,cleanState,stats,choose,reset};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else global.PracticeCore=api;
})(typeof window==='undefined'?globalThis:window);
