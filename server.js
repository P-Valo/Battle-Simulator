const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page === '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page === '/battle') {
      fs.readFile('battle.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
  } else if(page === '/api') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = [pikachu, bidoof];
      res.end(JSON.stringify(objToJson));
  } else if(page === '/api/move1') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      pikachu.attack(bidoof, pikachu.move1);
      const move = bidoof.bidoofMoveChooser(pikachu);
      const objToJson = [pikachu, bidoof, move];
      res.end(JSON.stringify(objToJson));
  } else if(page === '/api/move2') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      pikachu.attack(bidoof, pikachu.move2);
      let move = bidoof.bidoofMoveChooser(pikachu);
      const objToJson = [pikachu, bidoof, move];
      res.end(JSON.stringify(objToJson));
  } else if(page === '/api/move3') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      pikachu.attack(bidoof, pikachu.move3);
      let move = bidoof.bidoofMoveChooser(pikachu);
      const objToJson = [pikachu, bidoof, move];
      res.end(JSON.stringify(objToJson));
  } else if(page === '/api/move4') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      pikachu.attack(bidoof, pikachu.move4);
      let move = bidoof.bidoofMoveChooser(pikachu);
      const objToJson = [pikachu, bidoof, move];
      res.end(JSON.stringify(objToJson));
  } else if (page == '/css/style.css') {
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
    });
  } else if (page === `/js/main.js`) {
      fs.readFile(`js/main.js`, function(err, data) {
      res.writeHead(200,{'Content-Type' : 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if (page === `/js/battle.js`) {
      fs.readFile(`js/battle.js`, function(err, data) {
      res.writeHead(200,{'Content-Type' : 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if (page === `/images/pokemon-logo.png`) {
      fs.readFile('images/pokemon-logo.png', function(err, data) {
        res.write(data);
        res.end();
    });
  } else if (page === `/images/pikachu.png`) {
      fs.readFile('images/pikachu.png', function(err, data) {
        res.write(data);
        res.end();
    });
  } else if (page === `/images/badPikachu.png`) {
    fs.readFile('images/badPikachu.png', function(err, data) {
      res.write(data);
      res.end();
  });
  } else if (page === `/images/bidoof.png`) {
      fs.readFile('images/bidoof.png', function(err, data) {
        res.write(data);
        res.end();
    });
  } else if (page === `/images/selfDestruct.jpg`) {
    fs.readFile('images/selfDestruct.jpg', function(err, data) {
      res.write(data);
      res.end();
  });
  } else if (page === `/images/favicon/favicon.ico`) {
    fs.readFile('images/favicon/favicon.ico', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page === `/api/reset`) {
      pikachu = new Pokemon(
        'Pikachu',
        'electric',
        15,
        47,
        ['Quick Attack', 'normal', 15],
        ['Surf', 'water', 25],
        ['Thunderbolt', 'electric', 40],
        ['Iron Tail', 'steel', 20]
      );
      bidoof = new Pokemon(
        'Bidoof',
        'normal',
        15,
        90,
        ['Bite', 'dark', 3],
        ['Headbutt', 'normal', 4],
        ['Splash', 'normal', 0],
        ['Self-destruct','normal', 9000]
      );
      game = new GameState(game.pokemonChoice, game.botChoice);
      const objToJson = [pikachu, bidoof];
      res.end(JSON.stringify(objToJson));
  } else {
      figlet('404 Page Not Found', function(err, data) {
        console.log(`Page doesn't exist you bingos`);
          if (err){
              console.dir(err);
              return;
          }
        res.write(data);
        res.end();
      });
    }
});

class Pokemon {
  constructor(name, type, level, health, move1, move2, move3, move4) {
    this._name = name;
    this._type = type;
    this._level = level;
    this._health = health;
    this._move1 = move1;
    this._move2 = move2;
    this._move3 = move3;
    this._move4 = move4;
  };
  
  get name() {
    return this._name;
  };
  get type() {
    return this._type;
  };
  get level() {
    return this._level;
  };
  get health() {
    return this._health;
  };

  set health(currentHP) {
    this._health = currentHP
  }
  get move1() {
    return this._move1;
  };
  get move2() {
    return this._move2;
  };
  get move3() {
    return this._move3;
  };
  get move4() {
    return this._move4;
  };
  
  attack(target, move) {
    let damage = 0
    if (this.health > 0) {
      damage = move[2];
    }
    target.health -= damage;
    if (target.health >= 0) {
      console.log(target.health);
    } else {
      target.health = 0;
      game.end = true;
    }
  }
  
  bidoofMoveChooser(target) {
    let move = Math.random();
    if (move > 0.95) {
      this.attack(target, this.move4)
      return this._move4;
    } else if (move > 0.64){
      this.attack(target, this.move3)
      return this._move3;
    } else if (move > 0.32){
      this.attack(target, this.move2)
      return this._move2;
    } else {
      this.attack(target, this.move1)
      return this._move1;
    }
 
  }
}

class GameState {
  constructor(pokemonChoice, pokemonBot) {
    this._turn = 1;
    this._end = false;
    this._pokemonChoice = pokemonChoice;
    this._pokemonBot = pokemonBot;
  }
  get turn() {
    return this._turn;
  };
  get end() {
    return this._end;
  };
  set end(state) {
    this._end = state;
  }
  get pokemonChoice() {
    return this._pokemonChoice
  };
  get pokemonBot() {
    return this._pokemonBot
  };
}

let pikachu = new Pokemon(
  'Pikachu',
 'electric',
  15,
  47,
  ['Quick Attack', 'normal', 15],
  ['Surf', 'water', 25],
  ['Thunderbolt', 'electric', 40],
  ['Iron Tail', 'steel', 20]
  );
  
let bidoof = new Pokemon(
  'Bidoof',
  'normal',
  15,
  90,
  ['Bite', 'dark', 3],
  ['Headbutt', 'normal', 4],
  ['Splash', 'normal', 0],
  ['Self-destruct','normal', 9000]
  );

let game = new GameState(pikachu, bidoof);
  
server.listen(8000);