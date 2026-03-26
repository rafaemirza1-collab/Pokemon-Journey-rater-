// Legendary/Mythical Pokemon IDs
const LEGENDARY_IDS=new Set([144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,638,639,640,641,642,643,644,645,646,647,648,649,716,717,718,719,720,721,772,773,785,786,787,788,789,790,791,792,800,801,802,803,804,805,888,889,890,891,892,893,894,895,896,897,898,905,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010]);

// Pseudo-legendary and starter final evolutions (epic tier)
const EPIC_IDS=new Set([
  // Pseudo-legendaries (600 BST)
  149,248,373,376,445,635,681,700,784,887,998,
  // Starter final evolutions Gen 1-9
  3,6,9,157,160,154,260,257,254,395,392,389,503,500,497,658,655,652,730,727,724,815,812,818,906,909,912,
  // Single-stage powerhouses
  131,143,242,350,373,376,445,462,461,464,473,
  // Eevee final evolutions (all 525 BST)
  134,135,136,196,197,470,471,700
]);

// Strong fully-evolved non-pseudo Pokemon (rare tier)
const RARE_IDS=new Set([
  // Gen 1 strong evolved
  59,62,65,68,73,76,94,103,105,110,112,115,121,122,124,125,126,127,128,130,139,141,
  // Eevee base + Eevee middle evos
  133,
  // Gen 2 strong evolved
  181,182,184,186,195,199,202,205,208,212,214,217,219,221,224,226,227,230,232,237,241,
  // Gen 3 strong evolved
  282,286,289,295,306,310,319,330,342,346,348,357,362,365,369,371,376,380,381,
  // Gen 4 strong evolved
  407,430,437,442,448,452,460,461,462,463,464,465,466,467,468,469,472,473,474,475,476,477,478,
  // Gen 5 strong evolved
  526,530,534,537,542,545,549,553,556,561,569,571,576,579,584,586,589,591,596,598,609,612,617,621,628,631,
  // Gen 6 strong evolved
  660,663,673,675,678,681,683,685,687,689,691,693,695,697,700,701,706,709,711,715,
  // Gen 7 strong evolved
  724,727,730,733,738,740,743,748,750,752,754,756,758,760,763,768,770,778,780,
  // Gen 8/9 strong evolved
  812,815,818,823,826,830,832,834,836,839,842,845,847,849,851,855,858,861,863,866,869,873,876,879,882,884,
  901,904,907,910,913,916,919,922,924,927,930,932,934,936,938,940,942,944,946,948,950,952,954,956,959,962,964,966,968,970,972,974,976,978,980,982,984,986,988,990,992,994,996,999,1000
]);

// Common early-route weak Pokemon (common tier) - everything else not in above sets
// We define what's NOT common: legendary, epic, rare
function getRewardPokemon(tier,excludeId){
  let pool;
  if(tier==='legendary'){
    pool=[...LEGENDARY_IDS];
  } else if(tier==='epic'){
    pool=[...EPIC_IDS];
  } else if(tier==='rare'){
    pool=[...RARE_IDS];
  } else if(tier==='uncommon'){
    // Mid-tier: evolved forms not in rare/epic, Gen 2-5 moderate Pokemon
    // IDs 152-251 (Gen2 non-legend), 252-386 (Gen3 non-legend/epic), plus specific mid-tier
    const allIds=[];
    for(let i=1;i<=1025;i++){
      if(!LEGENDARY_IDS.has(i)&&!EPIC_IDS.has(i)&&!RARE_IDS.has(i))allIds.push(i);
    }
    // Uncommon = non-common evolved forms: BST roughly 350-450 range
    // Use Gen2-6 non-legend/epic/rare as proxy for "middle ground"
    pool=allIds.filter(i=>i>=152&&i<=650&&!LEGENDARY_IDS.has(i)&&!EPIC_IDS.has(i)&&!RARE_IDS.has(i));
  } else {
    // common: weak early-route Pokemon, Gen1 base/mid forms and equivalent
    const allIds=[];
    for(let i=1;i<=1025;i++){
      if(!LEGENDARY_IDS.has(i)&&!EPIC_IDS.has(i)&&!RARE_IDS.has(i))allIds.push(i);
    }
    pool=allIds.filter(i=>i<=151||i>=651);
  }
  if(!pool||pool.length===0)pool=[1];
  if(excludeId)pool=pool.filter(id=>id!==excludeId);
  return pool[Math.floor(Math.random()*pool.length)]||1;
}
const ACHIEVEMENTS=[
{id:'rate_1',name:'First Rating',desc:'Rate your first Pokemon',secret:false,tier:'rookie',check:(_,d)=>d.ratingCount>=1},
{id:'rate_10',name:'Getting Opinions',desc:'Rate 10 Pokemon',secret:false,tier:'rookie',check:(_,d)=>d.ratingCount>=10},
{id:'rate_50',name:'Pokemon Critic',desc:'Rate 50 Pokemon',secret:false,tier:'skilled',check:(_,d)=>d.ratingCount>=50},
{id:'rate_151',name:'Kanto Complete',desc:'Rate 151 Pokemon',secret:false,tier:'elite',check:(_,d)=>d.ratingCount>=151},
{id:'rate_500',name:'Obsessed',desc:'Rate 500 Pokemon',secret:false,tier:'legend',check:(_,d)=>d.ratingCount>=500},
{id:'review_1',name:'First Review',desc:'Write your first review',secret:false,tier:'rookie',check:(_,d)=>d.reviewCount>=1},
{id:'review_10',name:'Prolific Reviewer',desc:'Write 10 reviews',secret:false,tier:'skilled',check:(_,d)=>d.reviewCount>=10},
{id:'review_50',name:'Top Critic',desc:'Write 50 reviews',secret:false,tier:'elite',check:(_,d)=>d.reviewCount>=50},
{id:'review_100',name:'Legend of Reviews',desc:'Write 100 reviews',secret:false,tier:'legend',check:(_,d)=>d.reviewCount>=100},
{id:'like_given_1',name:'Appreciator',desc:'Like your first comment',secret:false,tier:'rookie',check:(_,d)=>d.likesGiven>=1},
{id:'like_given_25',name:'Generous',desc:'Like 25 comments',secret:false,tier:'skilled',check:(_,d)=>d.likesGiven>=25},
{id:'like_recv_1',name:'Liked!',desc:'Get your first like',secret:false,tier:'rookie',check:(_,d)=>d.likesReceived>=1},
{id:'like_recv_10',name:'Fan Favorite',desc:'Get 10 likes',secret:false,tier:'skilled',check:(_,d)=>d.likesReceived>=10},
{id:'like_recv_50',name:'Community Star',desc:'Get 50 likes',secret:false,tier:'elite',check:(_,d)=>d.likesReceived>=50},
{id:'wtp_play',name:'Silhouette Spotter',desc:"Play Who's That Pokemon",secret:false,tier:'rookie',check:(_,d)=>d.minigameScores.length>=1},
{id:'wtp_score_10',name:'Guesser',desc:'Score 10 in WTP',secret:false,tier:'skilled',check:(_,d)=>d.minigameScores.some(s=>s.score>=10)},
{id:'wtp_score_25',name:'Sharp Eye',desc:'Score 25 in WTP',secret:false,tier:'elite',check:(_,d)=>d.minigameScores.some(s=>s.score>=25)},
{id:'wtp_score_50',name:'Pokemon Master',desc:'Score 50 in one game',secret:false,tier:'legend',check:(_,d)=>d.minigameScores.some(s=>s.score>=50)},
{id:'wtp_hard',name:'No Hints Needed',desc:'Play Hard difficulty WTP',secret:false,tier:'skilled',check:(_,d)=>d.minigameScores.some(s=>s.difficulty==='hard')},
{id:'hot_take_1',name:'Spicy Opinion',desc:'Post your first Hot Take',secret:false,tier:'rookie',check:(_,d)=>d.hotTakesCount>=1},
{id:'hot_take_5',name:'Controversial',desc:'Post 5 Hot Takes',secret:false,tier:'skilled',check:(_,d)=>d.hotTakesCount>=5},
{id:'hot_vote',name:'Judge',desc:'Vote on a Hot Take',secret:false,tier:'rookie',check:(_,d)=>d.hotTakeVotes>=1},
{id:'drip_vote',name:'Battle Judge',desc:'Vote in your first Drip Battle',secret:false,tier:'rookie',check:(_,d)=>d.dripVotes>=1},
{id:'drip_vote_10',name:'Battle Enthusiast',desc:'Vote in 10 Drip Battles',secret:false,tier:'skilled',check:(_,d)=>d.dripVotes>=10},
{id:'drip_vote_50',name:'Arena Regular',desc:'Vote in 50 Drip Battles',secret:false,tier:'elite',check:(_,d)=>d.dripVotes>=50},
{id:'trainer_vote',name:'Trainer Scout',desc:'Rate a trainer',secret:false,tier:'rookie',check:(_,d)=>d.trainerVotes>=1},
{id:'trainer_vote_10',name:'Talent Spotter',desc:'Rate 10 trainers',secret:false,tier:'skilled',check:(_,d)=>d.trainerVotes>=10},
{id:'team_1',name:'Team Builder',desc:'Create your first team',secret:false,tier:'rookie',check:(_,d)=>d.teamsCount>=1},
{id:'team_5',name:'Strategist',desc:'Create 5 teams',secret:false,tier:'skilled',check:(_,d)=>d.teamsCount>=5},
{id:'squad_full',name:'Full Squad',desc:'Fill your 6-member squad',secret:false,tier:'skilled',check:(_,d)=>d.squadFull===true},
{id:'collection_5',name:'Collector',desc:'Earn 5 Pokemon in collection',secret:false,tier:'skilled',check:(_,d)=>d.collectionCount>=5},
{id:'collection_20',name:'Hoarder',desc:'Earn 20 Pokemon in collection',secret:false,tier:'elite',check:(_,d)=>d.collectionCount>=20},
{id:'collection_50',name:'Living Pokedex',desc:'Earn 50 Pokemon in collection',secret:false,tier:'legend',check:(_,d)=>d.collectionCount>=50},
{id:'follow_1',name:'Social Trainer',desc:'Follow your first trainer',secret:false,tier:'rookie',check:(_,d)=>d.followingCount>=1},
{id:'follower_10',name:'Rising Star',desc:'Get 10 followers',secret:false,tier:'elite',check:(_,d)=>d.followerCount>=10},
{id:'starter_chosen',name:'Your Journey Begins',desc:'Choose your starter',secret:true,tier:'rookie',check:(_,d)=>d.hasStarter===true},
{id:'rate_perfect_5',name:'Perfect Score',desc:'Give 5 stars to a Pokemon',secret:true,tier:'rookie',check:(_,d)=>d.hasGivenPerfect5===true},
{id:'rate_worst_1',name:'Savage Critic',desc:'Give 1 star to a Pokemon',secret:true,tier:'rookie',check:(_,d)=>d.hasGiven1Star===true}
];
async function loadEarnedAchievements(uid){if(!dbReady)return new Set();try{const{data}=await sb.from('user_achievements').select('achievement_id').eq('user_id',uid);return new Set(data?data.map(r=>r.achievement_id):[]);}catch(e){return new Set();}}
async function grantAchievement(achId){const uid=getUID();if(!uid||!dbReady)return;const ach=ACHIEVEMENTS.find(a=>a.id===achId);if(!ach)return;try{const{data:ex}=await sb.from('user_achievements').select('id').eq('user_id',uid).eq('achievement_id',achId).maybeSingle();if(ex)return;await sb.from('user_achievements').insert({user_id:uid,achievement_id:achId});const tr={rookie:'common',skilled:'uncommon',elite:'rare',legend:Math.random()<0.3?'legendary':'epic'};const rewardId=getRewardPokemon(tr[ach.tier],getMyStarter());await sb.from('user_collection').insert({user_id:uid,pokemon_id:rewardId,achievement_id:achId});showAchievementToast(ach,rewardId);}catch(e){console.warn('grantAchievement error:',e);}}
function showAchievementToast(ach,rewardId){const old=document.getElementById('achievement-toast');if(old)old.remove();const tc={rookie:'#89aaff',skilled:'#FFCB05',elite:'#c77dff',legend:'#FF6B35'};const tl={rookie:'Rookie',skilled:'Skilled',elite:'Elite',legend:'Legend'};const t=document.createElement('div');t.id='achievement-toast';t.style.cssText='position:fixed;bottom:80px;right:20px;background:var(--surface);border:1px solid '+tc[ach.tier]+';border-radius:16px;padding:16px;max-width:280px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.6);animation:slideInRight 0.4s ease;';const p=allPokemon?allPokemon.find(x=>x.id===rewardId):null;const pname=p?p.name.replace(/-/g,' '):'#'+rewardId;t.innerHTML='<div style="font-size:0.62rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:'+tc[ach.tier]+';margin-bottom:6px">Achievement Unlocked - '+tl[ach.tier]+'</div><div style="font-size:0.95rem;font-weight:800;margin-bottom:2px">'+ach.name+'</div><div style="font-size:0.78rem;color:var(--muted);margin-bottom:10px">'+ach.desc+'</div><div style="display:flex;align-items:center;gap:10px;padding-top:10px;border-top:1px solid var(--border)"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+rewardId+'.png" style="width:44px;height:44px;object-fit:contain;image-rendering:pixelated"/><div><div style="font-size:0.62rem;color:var(--muted)">Reward Pokemon</div><div style="font-size:0.82rem;font-weight:700;text-transform:capitalize">'+pname+'</div></div></div>';document.body.appendChild(t);setTimeout(function(){if(t.parentNode){t.style.animation='slideOutRight 0.4s ease';setTimeout(function(){t.remove();},400);}},6000);}
async function fetchAchievementData(uid){if(!dbReady)return null;try{const[ratings,comments,commentIds,likesGiven,minigameScores,hotTakes,teams,squadRow,followingData,followerData,collection,profile]=await Promise.all([sb.from('ratings').select('stars').eq('user_id',uid),sb.from('comments').select('id').eq('user_id',uid).is('parent_id',null),sb.from('comments').select('id').eq('user_id',uid),sb.from('comment_likes').select('id').eq('user_id',uid),sb.from('minigame_scores').select('score,difficulty').eq('user_id',uid),sb.from('hot_takes').select('id').eq('user_id',uid),sb.from('teams').select('id').eq('user_id',uid),sb.from('user_squads').select('slots').eq('user_id',uid).maybeSingle(),sb.from('follows').select('id').eq('follower_id',uid),sb.from('follows').select('id').eq('following_id',uid),sb.from('user_collection').select('id').eq('user_id',uid),sb.from('user_profiles').select('starter_pokemon_id').eq('user_id',uid).maybeSingle()]);const myIds=commentIds.data?commentIds.data.map(c=>c.id):[];let likesReceived=0;if(myIds.length){try{const{count}=await sb.from('comment_likes').select('*',{count:'exact',head:true}).in('comment_id',myIds);likesReceived=count||0;}catch(e){}}let htVotes=0,dripVotes=0,trainerVotes=0;try{const r=await sb.from('ht_votes').select('id').eq('user_id',uid);htVotes=r.data?r.data.length:0;}catch(e){}try{const r=await sb.from('drip_votes').select('id').eq('user_id',uid);dripVotes=r.data?r.data.length:0;}catch(e){}try{const r=await sb.from('trainer_comments').select('id').eq('user_id',uid);trainerVotes=r.data?r.data.length:0;}catch(e){}const rl=ratings.data||[];const sq=squadRow.data&&squadRow.data.slots?squadRow.data.slots:[];return{ratingCount:rl.length,reviewCount:comments.data?comments.data.length:0,likesReceived,likesGiven:likesGiven.data?likesGiven.data.length:0,minigameScores:minigameScores.data||[],hotTakesCount:hotTakes.data?hotTakes.data.length:0,hotTakeVotes:htVotes,dripVotes,trainerVotes,teamsCount:teams.data?teams.data.length:0,squadFull:Array.isArray(sq)&&sq.filter(Boolean).length>=6,followingCount:followingData.data?followingData.data.length:0,followerCount:followerData.data?followerData.data.length:0,collectionCount:collection.data?collection.data.length:0,hasStarter:!!(profile.data&&profile.data.starter_pokemon_id),hasGivenPerfect5:rl.some(r=>r.stars===5),hasGiven1Star:rl.some(r=>r.stars===1)};}catch(e){console.warn('fetchAchievementData error:',e);return null;}}
async function checkAndGrantAchievements(uid){if(!uid||!dbReady){console.log('[ACH] skipped uid:',uid,'dbReady:',dbReady);return;}console.log('[ACH] starting for:',uid);try{const[data,earned]=await Promise.all([fetchAchievementData(uid),loadEarnedAchievements(uid)]);console.log('[ACH] data:',data,'earned:',earned);if(!data){console.log('[ACH] no data');return;}for(const ach of ACHIEVEMENTS){if(earned.has(ach.id))continue;let ok=false;try{ok=ach.check(uid,data);}catch(e){}if(ok){console.log('[ACH] granting:',ach.id);await grantAchievement(ach.id);earned.add(ach.id);await new Promise(r=>setTimeout(r,2500));}}console.log('[ACH] done');}catch(e){console.warn('[ACH] failed:',e);}}