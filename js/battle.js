document.querySelector('h1').addEventListener('click', makeReq);
document.querySelector('#move1').addEventListener('click', attack1);
document.querySelector('#move2').addEventListener('click', attack2);
document.querySelector('#move3').addEventListener('click', attack3);
document.querySelector('#move4').addEventListener('click', attack4);
document.querySelector('input').addEventListener('click', reset);

async function makeReq() {
  const res = await fetch(`/api`);
  const data = await res.json();
  console.log(data);

    
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  redoListeners(data);


  document.querySelector('#ourPokemon').classList.remove('hidden')
  document.querySelector('#enemyPokemon').classList.remove('hidden')
  document.querySelectorAll('.attack').forEach(item => item.classList.remove('hidden'))

  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('h1').removeEventListener('click', makeReq);
}

async function attack1() {
  const res = await fetch('api/move1');
  const data = await res.json();
  console.log(data);
  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  document.querySelector('#log').textContent += `\r\n${data[0]._name} used ${data[0]._move1[0]}! It did ${data[0]._move1[2]} damage`;
  document.querySelector('#log').textContent += `\r\n${data[1]._name} used ${data[2][0]}! It did ${data[2][2]} damage`;
  isEnded(data); 

}

async function attack2() {
  const res = await fetch('api/move2');
  const data = await res.json();
  console.log(data);
  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  document.querySelector('#log').textContent += `\r\n${data[0]._name} used ${data[0]._move2[0]}! It did ${data[0]._move2[2]} damage`;
  document.querySelector('#log').textContent += `\r\n${data[1]._name} used ${data[2][0]}! It did ${data[2][2]} damage`;
  isEnded(data); 
}

async function attack3() {
  const res = await fetch('api/move3');
  const data = await res.json();
  console.log(data);
  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  document.querySelector('#log').textContent += `\r\n${data[0]._name} used ${data[0]._move3[0]}! It did ${data[0]._move3[2]} damage`;
  document.querySelector('#log').textContent += `\r\n${data[1]._name} used ${data[2][0]}! It did ${data[2][2]} damage`;
  isEnded(data);
}

async function attack4() {
  const res = await fetch('api/move4');
  const data = await res.json();
  console.log(data);
  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  document.querySelector('#log').textContent += `\r\n${data[0]._name} used ${data[0]._move4[0]}! It did ${data[0]._move4[2]} damage`;
  document.querySelector('#log').textContent += `\r\n${data[1]._name} used ${data[2][0]}! It did ${data[2][2]} damage`;
  isEnded(data);
}

async function reset() {
  const res = await fetch('api/reset');
  const data = await res.json();
  console.log(data)
  document.querySelector('#enemyHP').textContent = `${data[1]._name} HP: ${data[1]._health}`;
  document.querySelector('#ourHP').textContent = `${data[0]._name} HP: ${data[0]._health}`;
  document.querySelector('#log').textContent = ''
  document.querySelectorAll('.attack').forEach(item => item.removeEventListener('click', nurseJoy))
  redoListeners(data);
}

function isEnded(data) {
  if (data[0]._health === 0 || data[1]._health === 0) {
    document.querySelector('#move1').removeEventListener('click', attack1);
    document.querySelector('#move2').removeEventListener('click', attack2);
    document.querySelector('#move3').removeEventListener('click', attack3);
    document.querySelector('#move4').removeEventListener('click', attack4);
    document.querySelector('#end').textContent = 'Game over';
    if(data[0]._health === 0){
      document.querySelectorAll('.attack').forEach(item => item.textContent = 'GET TO NURSE JOY!!')
      document.querySelectorAll('.attack').forEach(item => item.addEventListener('click', nurseJoy))
      document.querySelector('#log').textContent += `\r\nHoly Cow Pikachu was really fucked up by that!`
    }
    
    return true;
  }
}

function redoListeners(data) {
  document.querySelector('#move1').addEventListener('click', attack1);
  document.querySelector('#move2').addEventListener('click', attack2);
  document.querySelector('#move3').addEventListener('click', attack3);
  document.querySelector('#move4').addEventListener('click', attack4);
  document.querySelector('#end').textContent = '';
  document.querySelector('#move1').textContent = data[0]._move1[0];
  document.querySelector('#move2').textContent = data[0]._move2[0];
  document.querySelector('#move3').textContent = data[0]._move3[0];
  document.querySelector('#move4').textContent = data[0]._move4[0];
  
  document.querySelector('#ourPokemon').src = '/images/pikachu.png';
  document.querySelector('#enemyPokemon').src = '/images/bidoof.png';
}

function nurseJoy() {
  document.querySelector('#ourPokemon').src = '/images/badPikachu.png';
  document.querySelector('#enemyPokemon').src = '/images/selfDestruct.jpg';
  document.querySelector('#ourHP').textContent = `Nurse Joy did her best, \r\nbut unfortunately medicine isn't \r\nmagic.`;
}