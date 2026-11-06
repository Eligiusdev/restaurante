import * as D from './store.js';
import * as V from './services.js';
import * as U from './ui.js';
D.load();V.tick();U.init();
setInterval(()=>{V.tick();U.tickDom()},1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){V.tick();U.render()}});
window.addEventListener('storage',()=>{D.load();V.tick();U.render()});
