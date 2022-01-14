b = document.body
dateExpiration = new Date(2022,4,15)
diff = 0

function cours(json) {
    let div = document.getElementById('cours')
    for (let i = 0 ; i < json.cours.length ; i++) {
        if (i%2 == 0) {
            let h = document.createElement('h3')
            h.setAttribute("id", "ptxt")
            h.textContent = json.cours[i]
            div.append(h)
        }
        else {
            let p = document.createElement('p')
            p.setAttribute("id", "ptxt");
            p.textContent = json.cours[i]
            div.append(p)
        }    
    }
}

/**
 * Permet de générer le test de positionnement
 */
function positionnement() {
    qs = document.getElementById("qs")
    update("qs")
    d = document.getElementById("position")
    if (d) {
        d.remove()
    }
    d = document.getElementById("scoreValue")
    if (d) {
        d.remove()
    }

    for (var i = 1 ; i < 11 ; i++) {
        let div = document.createElement('div')
        let newH2 = document.createElement('h2')
        let inp
    
        newH2.textContent = posijson.questions[i-1].question
        if (posijson.questions[i-1].options != null) {
            inp = document.createElement('select')
            inp.setAttribute("name", "qs" + i);
            inp.setAttribute("id", "inp" + i);
            inp.setAttribute("class", "inpanswer");

            for (let j = 0 ; j < 4 ; j++) {
                let opt = document.createElement('option')
                opt.textContent = posijson.questions[i-1].options[j]
                opt.setAttribute("value", posijson.questions[i-1].options[j]);    
                inp.append(opt)
            }
        }
        else {
            inp = document.createElement('input')
            inp.setAttribute("type", "text");
            inp.setAttribute("id", "inp" + i);
            inp.setAttribute("class", "inpanswer");
            inp.setAttribute("onkeypress", "validateInputMath(event)");
        }

    
        newH2.setAttribute("id", i);
        newH2.setAttribute("class", "question");
    
        div.setAttribute("id", "qs" + i);
        div.setAttribute("class", "divquestion");
    
        qs.append(div)
        div.append(newH2)
        div.append(inp)
    }
    document.getElementById("btnValid").setAttribute("style", "visibility: show;")
}

function repPositionnement() {
    qs = document.getElementById("qs")
    if (verify()) {
        return
    }
    update("ans")
    d = document.getElementById("position")
    if (d) {
        d.remove()
    }
    
    score = 0
    correct = 0

    for (let i = 1 ; i < 11 ; i++) {
        let div = document.getElementById("qs" + i)
        let newH2 = document.createElement('h4')
        newH2.textContent = posijson.questions[i-1].answer
        newH2.setAttribute("id", "ans" + i);
        newH2.setAttribute("class", "answer");

        if (document.getElementById("inp" + i).value == posijson.questions[i-1].answer) {
            newH2.setAttribute("style", "color: green;");
            score = score + posijson.questions[i-1].difficulty
            correct += 1
        }
        else {
            newH2.setAttribute("style", "color: red;");
        }

        div.append(newH2)
    }

    d = document.getElementById("scoreValue")
    if (d) {
        d.remove()
    }

    niveau = "facile"
    if (score > 12) {
        niveau = "difficile"
    }
    else if (score > 5) {
        niveau = "moyen"
    }

    div = document.getElementById("score")
    let h3 = document.createElement('h3')
    h3.setAttribute("id", "scoreValue")
    h3.textContent = (correct/10 * 100) + " %  de bonne réponses"

    let h3b = document.createElement('h3')
    h3b.setAttribute("id", "position")
    h3b.textContent = "Votre niveau est : " + niveau

    div.append(h3)
    div.append(h3b)
}

function oneQuestion(json, hasText, difficulty, id) {
    qs = document.getElementById("qs")
    diff = difficulty
    var base = ""

    switch(difficulty) {
        case 0:
            base = json.easy[0]
            break
        case 1:
            base = json.normal[0]
            break
        case 2:
            base = json.hard[0]
            break
        default:
            return
    }

    if (id == 0) {
        updateText()
        d = document.getElementById("scoreValue")
        if (d) {
            d.remove()
        }

        if (hasText) {
            let div = document.createElement('div')
            let p = document.createElement('p')
            p.setAttribute("id", "txt");
            p.textContent = base.file
            qs.append(div)
            div.append(p)
        }
    }

    questions = base.questions[id]

    
}


/**
 * Permet d'afficher les quesiton sur la page
 * @param {*} json 
 * @param {*} select 
 * @param {*} hasText 
 * @param {*} difficulty 
 */
function question(json, hasText, difficulty) {
    qs = document.getElementById("qs")
    diff = difficulty
    var base = ""
    update("qs")
    updateText()
    d = document.getElementById("scoreValue")
    if (d) {
        d.remove()
    }

    switch(difficulty) {
        case 0:
            base = json.easy[0]
            break
        case 1:
            base = json.normal[0]
            break
        case 2:
            base = json.hard[0]
            break
        default:
            return
    }

    
    if (hasText) {
        let div = document.createElement('div')
        let p = document.createElement('p')
        p.setAttribute("id", "txt");
        p.textContent = base.file
        qs.append(div)
        div.append(p)
    }

    questions = base.questions

    for (var i = 1 ; i < 6 ; i++) {
        let div = document.createElement('div')
        let newH2 = document.createElement('h2')
        let inp
    
        newH2.textContent = questions[i-1].question
    
        if ((questions[i-1].options != null)) {
            inp = document.createElement('select')
            inp.setAttribute("name", "qs" + i);
            inp.setAttribute("id", "inp" + i);
            inp.setAttribute("class", "inpanswer");
    
            for (let j = 0 ; j < 4 ; j++) {
                let opt = document.createElement('option')
                opt.textContent = questions[i-1].options[j]
                opt.setAttribute("value", questions[i-1].options[j]);
                inp.append(opt)
            }
        }
        else {
            inp = document.createElement('input')
            inp.setAttribute("type", "text");
            inp.setAttribute("id", "inp" + i);
            inp.setAttribute("class", "inpanswer");
            inp.setAttribute("onkeypress", "validateInputMath(event)");
        }

    
        newH2.setAttribute("id", i);
        newH2.setAttribute("class", "question");
    
        div.setAttribute("id", "qs" + i);
        div.setAttribute("class", "divquestion");
    
        qs.append(div)
        div.append(newH2)
        div.append(inp)
    }
    document.getElementById("btnValid").setAttribute("style", "visibility: show;")
}   

/**
 * Permet de répondre à une question
 * @param {*} json 
 * @param {*} isNum 
 * @returns 
 */
function answer(json, isNum) {
    qs = document.getElementById("qs")
    if (isNum && verify()) {
        return
    }
    update("ans")
    score = 0
    switch(diff) {
        case 0:
            questions = json.easy[0].questions
            break
        case 1:
            base = json.normal[0].questions
            break
        case 2:
            base = json.hard[0].questions
            break
        default:
            return
    }
    for (var i = 1 ; i < 6 ; i++) {
        let div = document.getElementById("qs" + i)
        let newH2 = document.createElement('h4')
        newH2.textContent = questions[i-1].answer
        newH2.setAttribute("id", "ans" + i);
        newH2.setAttribute("class", "answer");

        if (document.getElementById("inp" + i).value == questions[i-1].answer) {
            newH2.setAttribute("style", "color: green;");
            score += 1
        }
        else {
            newH2.setAttribute("style", "color: red;");
        }

        div.append(newH2)
    }
    setScore(score)
}


/**
 * Permet d'ajouter un cookie
 * @param {*} score 
 */
function addCookie(score) {
    len = document.cookie.length
    today = new Date()
    document.cookie = "score" + len + "=" + today.getDate() + today.getMonth() + today.getFullYear() + today.getHours() + today.getMinutes() + score + ";expires="+dateExpiration.toUTCString();
}

/**
 * Permet de supprimer les element avec l'id : pref + i où i -> [1, +infini]
 * @param {*} pref 
 * @returns 
 */
function update(pref) {
    i = 1
    while (true) {
        d = document.getElementById(pref + i)
        i += 1
        if (!d) {
            return
        }
        d.remove()
    }
}

/**
 * Permet de savoir si tout les champs de réponses ont était rempli
 * @returns 
 */
function verify() {
    for (let i = 1 ; i < 6 ; i++) {
        rep = document.getElementById("inp" + i).value
        if (rep == "") {
            alert ("Vous avez oublié de répondre à certaines questions");
            return true
        }
    }
    return false
}

/**
 * Permet d'afficher le score
 * @param {} score 
 */
function setScore(score) {

    d = document.getElementById("scoreValue")
    if (d) {
        d.remove()
    }

    div = document.getElementById("score")
    let h3 = document.createElement('h3')
    h3.setAttribute("id", "scoreValue")
    h3.textContent = (score/5 * 100) + " %  de bonne réponses"
    div.append(h3)
    addCookie(score)
    console.log(document.cookie)
}

/**
 * Permet de supprimer le texte si il en a un
 * @returns 
 */
function updateText() {
    d = document.getElementById("txt")
    if (!d)  {
        return
    }
    d.remove()
}

/**
 * Permet de s'assurer qu'une entree de réponses pour les calculs ne soit que des chiffres
 * @param {} evt 
 */
function validateInputMath(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9\.\-]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}