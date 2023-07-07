const easyTable = ["0 3", "1 1", "1 5", "3 0", "3 3", "3 6", "5 1", "5 5", "6 3"];
const mediumTable = ["0 2", "0 4", "2 0", "2 2", "2 4", "2 6", "3 3", "4 0", "4 2", "4 4", "4 6", "6 2", "6 4"];
const hardTable = ["0 1", "1 5", "1 7", "1 9", "2 1", "2 2", "2 7", "3 4", "4 1", "4 4", "4 5", "4 6", "5 3", "5 4", "5 5", "5 8", "6 5", "7 2", "7 7", "7 8", "8 0", "8 2", "8 4", "9 8"];

const easyNum = [1, 0, 2, -1, -1, -1, -1, 2, 3];
const mediNum = [0, -1, -1, -1, 3, -1, 1, 2, -1, -1, -1, -1, 2];
const hardNum = [-1, 3, 2, -1, 0, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 3, -1, 1, 0, -1, 3, -1, 0, 0];

let choosenTable = easyTable;
let choosenSize = easyNum;

let tableSize = 7;

let playerName = "";
let difficulty = 0;

let lightenedCell = [];
let perfectLightning = 0;

var timer = 0;
var specialTimer;

let k = -1;

let playTable;

let bulbpositions = [];

function generateTable()
{
    document.querySelector('#stopIt').disabled = false;
    let temptable = "";
    for (let i = 0; i < tableSize; i++)
    {
        temptable += '<tr>';
        for (let j = 0; j < tableSize; j++)
        {
            temptable += '<td class="egyedi" id="' + i + '' + j + '">';
            temptable += '</td>';
            lightenedCell[i*tableSize+j] = 0;
        }
        temptable.innerHTML += '</tr>';
    }
    playTable.innerHTML = temptable;

    for (let i = 0; i < choosenTable.length; i++)
    {
        let temp = choosenTable[i];
        let x = temp.split(' ');
        document.getElementById(x[0] + x[1]).style.backgroundColor = 'black';
        if (choosenSize[++k] != -1) document.getElementById(x[0] + x[1]).innerHTML = choosenSize[k];
    }

    checkIfBulbNextToWall();
}

async function onClick(event) {
    document.querySelector('#nyert').innerHTML = "";
    const handlerElement = this;
    const sourceElement = event.target;
    const selector = 'tr td';
  
    const closestElement = sourceElement.closest(selector);
  
    if (handlerElement.contains(closestElement)) {
        if (closestElement.style.backgroundColor != 'black')
        {
            let x = event.target.parentNode.rowIndex;
            let y = event.target.cellIndex;
            if (!bulbpositions.includes(x + " " + y))  //ha meg nincs gomb leteve
            {
                bulbpositions.push(x + " " + y);
                colorGrid(x, y, '#FFEE80', '#E5D068', 650);      
            }
            else  //vegye le a gombot
            {
                const index = bulbpositions.indexOf(x + " " + y);
                bulbpositions.splice(index, 1);
                colorGrid(x, y, 'transparent', 'transparent', 650);
            }
        }
        reColor();
        checkIfBulbNextToWall();
    }
    await new Promise(resolve => setTimeout(resolve, 650));
    if (theEnd())
    {
        document.querySelector('#playTable').removeEventListener('click', onClick, false);
        document.querySelector('#nyert').innerHTML = "Gratulálok! Ön nyert!<br>Új játék kezdéséhez nyomja meg az Új játék feliratú gombot!";
    }
}

async function colorGrid(x, y, color, midcolor, speed)
{
    await drawLightBulb(x, y, color, midcolor, speed);
};

async function drawLightBulb(x, y, color, midcolor, speed)
{
    if (lightenedCell[x*tableSize + y] != 0)
    {
        if (midcolor == 'transparent') 
        {
            playTable.rows[x].cells[y].style.backgroundColor = '#FFEE80';
        }
        else
        {
            playTable.rows[x].cells[y].style.backgroundColor = midcolor;
        }
    } else {
        playTable.rows[x].cells[y].style.backgroundColor = midcolor;
    }

    if (midcolor == '#E5D068') playTable.rows[x].cells[y].classList.add("bulb");
    else playTable.rows[x].cells[y].classList.remove("bulb");

    let f = parseInt(x) - 1;
    let l = parseInt(x) + 1;
    let b = parseInt(y) - 1;
    let j = parseInt(y) + 1;

    
    for (let i = 0; i < tableSize; i++)
    {
        if (b >= 0 && playTable.rows[x].cells[b].style.backgroundColor != 'black')
        {
            if (checkIfReplaceable(x,b,color, midcolor, x, y)) 
            {
                playTable.rows[x].cells[b].style.backgroundColor = color; //balra
            }
            b--;
        }
        if (f >= 0 && playTable.rows[f].cells[y].style.backgroundColor != 'black')
        {
            if (checkIfReplaceable(f,y,color, midcolor, x, y))
            {
                playTable.rows[f].cells[y].style.backgroundColor = color; //fel
            }
            f--;
        }
        if (j < tableSize && playTable.rows[x].cells[j].style.backgroundColor != 'black')
        {
            if (checkIfReplaceable(x,j,color, midcolor, x, y))
            {
                playTable.rows[x].cells[j].style.backgroundColor = color; //jobbra
            }
            j++;
        }
        if (l < tableSize && playTable.rows[l].cells[y].style.backgroundColor != 'black')
        {
            if (checkIfReplaceable(l,y,color, midcolor, x, y)) 
            {
                playTable.rows[l].cells[y].style.backgroundColor = color; //le
            }
            l++;
        }

        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

function checkIfReplaceable(x,y,color, midcolor, a, b)
{
    if (bulbpositions.includes(x + " " + y))
    {
        if (color == 'transparent')
        {
            if (lightenedCell[x * tableSize + y] <= 1) lightenedCell[x * tableSize + y] = 0;
            else lightenedCell[x * tableSize + y]--;
        } else {
            lightenedCell[x * tableSize + y]++;
        }

        return false;
    }

    if (color == 'transparent')
    {
        if (lightenedCell[x * tableSize + y] <= 1) 
        {
            lightenedCell[x * tableSize + y] = 0;
            return true;
        } else 
        {
            lightenedCell[x * tableSize + y]--;
            if (midcolor == '#E5D068') return false;
            return false;
        }
    } else {
        lightenedCell[x * tableSize + y]++;
        return true;
    }
    
}

function checkIfBulbNextToWall()
{
    for (let i = 0; i < choosenSize.length; i++)
    {
        if (choosenSize[i] == -1) continue;

        let pos = choosenTable[i];
        let x = parseInt(pos.split(' ')[0]);
        let y = parseInt(pos.split(' ')[1]);
        let yb = y - 1;
        let yj = y + 1;

        let db = choosenSize[i];

        if (bulbpositions.includes(x + " " + yb)) db--;
        if (bulbpositions.includes(x + " " + yj)) db--;
        if (bulbpositions.includes(x-1 + " " + y)) db--;
        if (bulbpositions.includes(x+1 + " " + y)) db--;

        if (db == 0)
        {
            playTable.rows[x].cells[y].style.color = '#68E583';
        } else {
            playTable.rows[x].cells[y].style.color = 'white';
        }
    }
}

function reColor()
{
    bulbpositions.sort();
    let save = [];
    for(let i = 0; i < bulbpositions.length; i++)
    {
        let x = bulbpositions[i].split(' ');
        let db = 0;
        for(let j = i+1; j < bulbpositions.length; j++)
        {
            let y = bulbpositions[j].split(' ');
            if (x[0] == y[0] || x[1] == y[1])
            {
                //check if there is a wall between them
                let ok = false;
                if (x[0] == y[0])
                {
                    for (let a = x[1]; a <= y[1]; a++) //sor
                    {
                        if (playTable.rows[x[0]].cells[a].style.backgroundColor == 'black')
                        {
                            ok = true;
                            break;
                        }
                    }
                } else {
                    for (let a = x[0]; a <= y[0]; a++) //oszlop
                    {
                        if (playTable.rows[a].cells[x[1]].style.backgroundColor == 'black')
                        {
                            ok = true;
                            break;
                        }
                    }
                }
         
                if (!ok)
                {
                    ++db;
                    playTable.rows[x[0]].cells[x[1]].style.backgroundColor = 'red';
                    playTable.rows[y[0]].cells[y[1]].style.backgroundColor = 'red';
                    save.push(y[0] + " " + y[1]);
                }
            }
        }
        if (db == 0 && !save.includes(x[0] + " " + x[1])) 
        {
            playTable.rows[x[0]].cells[x[1]].style.backgroundColor = '#E5D068';
        }
    }
}

function theEnd()
{
    perfectLightning = 0;
    for (let i = 0; i < choosenSize.length; i++)
    {
        if (choosenSize[i] == -1) continue;

        let pos = choosenTable[i];
        let x = parseInt(pos.split(' ')[0]);
        let y = parseInt(pos.split(' ')[1]);

        if (playTable.rows[x].cells[y].style.color == 'rgb(104, 229, 131)') perfectLightning++;
    }
    if (tableSize*tableSize == lightenedCell.filter(e => e > 0).length + choosenSize.length + bulbpositions.length && perfectLightning == choosenSize.filter(e => e > -1).length)
    {
        saveBoard();
        loadBoard();
        stopped = true;
        return true;
    } 
    return false;
}

let stopped = true;

function timerTimer()
{
    specialTimer = setInterval(function() {
      
    if (!stopped) timer++;

    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    
    document.getElementById('timer').innerHTML = minutes + " perc " + seconds + " mp";
    document.getElementById('displayname').innerHTML = playerName;
    
    }, 1000);
}

function saveBoard() //legutobbi jatekok eredmenyei
{
    const data = [playerName, difficulty, timer];
    localStorage.setItem(playerName, JSON.stringify(data));
}

function loadBoard() //legutobbi jatekok eredmenyei
{
    let tablazat = document.getElementById('nyertesPanel');
    tablazat.innerHTML = "<tr><th>Játékos neve</th><th>Pálya neve</th><th>Teljesítési idő</th></tr>";

    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        let splitted = JSON.parse(value);

        if (splitted.length != 3) continue;

        let adatok = "<tr>";
        adatok += "<td>" + splitted[0] + "</td>";
        switch(splitted[1])
        {
            case 0:
                adatok += "<td>Könnyű pálya</td>";
                break;
            case 1:
                adatok += "<td>Közepes pálya</td>";
                break;
            case 2:
                adatok += "<td>Extrém pálya</td>";
                break;
            default:
                adatok += "<td>Undefined</td>";
                break;
        }
        adatok += "<td>" + splitted[2] + " mp</td>";
        adatok += "</tr>";

        tablazat.innerHTML += adatok;
    }
}

function loadGames() //Mentett jatekok eredmenyei
{
    let tablazat = document.getElementById('addPanel');
    tablazat.innerHTML = "<tr><th>Játékos neve</th><th>Pálya neve</th><th>Betöltés</th></tr>";

    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        let splitted = JSON.parse(value);

        if (splitted.length == 3) continue;

        let adatok = "<tr>";
        adatok += "<td>" + splitted[0] + "</td>";
        switch(splitted[1])
        {
            case 0:
                adatok += "<td>Könnyű pálya</td>";
                break;
            case 1:
                adatok += "<td>Közepes pálya</td>";
                break;
            case 2:
                adatok += "<td>Extrém pálya</td>";
                break;
            default:
                adatok += "<td>Undefined</td>";
                break;
        }
        adatok += "<td><input type='button' value='Betöltés' onclick='loadTable(`" + splitted[0] + "`)'></td>";
        adatok += "</tr>";

        tablazat.innerHTML += adatok;
    }
}

async function saveTable() //playTable elmentese
{
    let atalakitMezo = "";
    let p = 0;

    for (p = 0; p < lightenedCell.length; p++)
    {
        atalakitMezo += lightenedCell[p];
    }

    let atalakitBulb = "";

    p = 0;

    for (p = 0; p < bulbpositions.length-1; p++)
    {
        atalakitBulb += bulbpositions[p] + "k";
    }
    atalakitBulb += bulbpositions[p];

    const data = [playerName, difficulty, timer, atalakitMezo, perfectLightning, atalakitBulb];
    localStorage.setItem(playerName, JSON.stringify(data));

    let tablazat = document.getElementById('addPanel');

    tablazat.innerHTML = "<tr><th>Játékos neve</th><th>Pálya neve</th><th>Teljesítési idő</th></tr>";

    document.getElementById('alert_message').value = 'Játék elmentve!';
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    document.getElementById('alert_message').value = '';
}

async function loadTable(findThisName) //playTable betoltese
{
    for(var i=0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        let splitted = JSON.parse(value);

        if(splitted[0] != findThisName) continue;

        if(splitted.length == 3) continue;

        playerName = splitted[0];
        
        difficulty = parseInt(splitted[1]);

        timer = splitted[2];
        
        let tempArray = [];
        
        tempArray = splitted[5].split('k');

        bulbpositions = tempArray;

        k = -1;

        document.querySelector('.chooseOne').style.visibility = 'hidden';
        document.querySelector('.game').style.visibility = 'visible';

        stopped = false;

        switch(difficulty)
        {
            case 0:
                choosenTable = easyTable;
                choosenSize = easyNum;
                tableSize = 7;
                break;
            case 1:
                choosenTable = mediumTable;
                choosenSize = mediNum;
                tableSize = 7;
                break;
            case 2:
                choosenTable = hardTable;
                choosenSize = hardNum;
                tableSize = 10;
                break;
            default:
                break;
        }

        generateTable();

        checkSaveable();

        for (let i = 0; i < bulbpositions.length; i++)
        {
            let x = bulbpositions[i].split(' ');
            await colorGrid(x[0], x[1], '#FFEE80', '#E5D068', 1)
        }

        hittedCell = 1;

        tempArray = splitted[3].split('');
        lightenedCell = tempArray;

        pauseGame();
    }
}

function checkSaveable()
{
    let buttons = document.querySelectorAll('#gomb');
    let state = false;

    if (document.querySelector('#name').value.length >= 3)
    {
        state = false;
    } else {
        state = true;
    }

    for (let i = 0; i < buttons.length; i++)
    {
        buttons[i].disabled = state;
    }
}

function easyStart()
{
    playerName = document.querySelector('#name').value;
    difficulty = 0;
    tableSize = 7;
    choosenTable = easyTable;
    choosenSize = easyNum;
    document.querySelector('.chooseOne').style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    timer = 0;
    stopped = false;
    generateTable();
}

function mediumStart()
{
    playerName = document.querySelector('#name').value;
    difficulty = 1;
    tableSize = 7;
    choosenTable = mediumTable;
    choosenSize = mediNum;
    document.querySelector('.chooseOne').style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    timer = 0;
    stopped = false;
    generateTable();
}

function hardStart()
{
    playerName = document.querySelector('#name').value;
    difficulty = 2;
    tableSize = 10;
    choosenTable = hardTable;
    choosenSize = hardNum;
    document.querySelector('.chooseOne').style.visibility = 'hidden';
    document.querySelector('.game').style.visibility = 'visible';
    timer = 0;
    stopped = false;
    generateTable();
}

let hittedCell = 0;

function pauseGame()
{
    if (hittedCell == 0)
    {
        stopped = true;
        document.querySelector('#savename').disabled = false;
        document.querySelector('#stopIt').value = "Folytatás";
        document.querySelector('#playTable').removeEventListener('click', onClick, false);
        hittedCell++;
    } else {
        stopped = false;
        document.querySelector('#savename').disabled = true;
        document.querySelector('#stopIt').value = "Szünet";
        document.querySelector('#playTable').addEventListener('click', onClick, false);
        hittedCell = 0;
    }
}

async function reAppear()
{
    document.querySelector('#stopIt').disabled = true;
    stopped = true;
    bulbpositions = [];
    lightenedCell = [];
    k = -1;
    document.querySelector('.chooseOne').style.visibility = 'visible';
    document.querySelector('.game').style.visibility = 'hidden';
    document.querySelector('#name').value = '';
    checkSaveable();
    hittedCell = 1;
    pauseGame();
    loadGames();
    await drawLightBulb(0, 0, 'transparent', 'transparent', 1);
}

function init()
{
    document.querySelector('#playTable').addEventListener('click', onClick, false);
    playTable = document.querySelector('#playTable');

    document.querySelector('#savename').addEventListener('click', saveTable, false);
    document.querySelector('#stopIt').addEventListener('click', pauseGame, false);
    document.querySelector('#name').addEventListener('input', checkSaveable, false);

    loadGames();
    loadBoard();

    timerTimer();

    document.querySelector('.konnyu').addEventListener('click', easyStart, false);
    document.querySelector('.kozepes').addEventListener('click', mediumStart, false);
    document.querySelector('.nehez').addEventListener('click', hardStart, false);

    document.querySelector('#newGame').addEventListener('click', reAppear, false);
}

window.onload = init;