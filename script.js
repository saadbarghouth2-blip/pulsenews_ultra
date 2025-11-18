
const API_KEY="pub_b2929075bbbc4c5aa5ea4bce177c4ea4";
const articlesEl=document.getElementById("articles");
const pageInfo=document.getElementById("pageInfo");
let all=[],page=1,pageSize=6;

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("year").textContent=new Date().getFullYear();
  fetchNews();
  setup();
});

async function fetchNews(){
  const res=await fetch(`https://newsdata.io/api/1/latest? 
  apikey=pub_b2929075bbbc4c5aa5ea4bce177c4ea4`);
  const data=await res.json();
  all=data.data||[];
  render();
}

function render(){
  const start=(page-1)*pageSize;
  const items=all.slice(start,start+pageSize);
  articlesEl.innerHTML=items.map(a=>`
    <div class="news-card">
      <img src="${a.image||''}" onerror="this.style.display='none'">
      <h3>${a.title||""}</h3>
      <p>${a.description||""}</p>
      <a href="${a.url}" target="_blank">Read more →</a>
    </div>
  `).join("");
  pageInfo.textContent=`${page} / ${Math.ceil(all.length/pageSize)}`;
}

function setup(){
  document.getElementById("nextPage").onclick=()=>{if(page*pageSize<all.length){page++;render();}};
  document.getElementById("prevPage").onclick=()=>{if(page>1){page--;render();}};
  document.getElementById("themeCheckbox").onchange=e=>document.body.classList.toggle("light",e.target.checked);
  window.addEventListener("scroll",()=>{document.getElementById("backTop").style.display=window.scrollY>300?'block':'none'});
  document.getElementById("backTop").onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
}
