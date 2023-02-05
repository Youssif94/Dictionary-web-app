// selectors

const wordSearch = document.querySelector('.word-search');
const word = document.querySelector('.word');
const wordPron = document.querySelector('.word-pron');
const wordType = document.querySelector('.word-type1');
const wordType2 = document.querySelector('.word-type2');
const wordSearchForm = document.querySelector('.word-search-form');
const synonymsHTML = document.querySelector('.synonyms');
const sec1 = document.querySelector('.sec-1');
const errMsg = document.querySelector('.err');
const playBTN = document.querySelector('.play-BTN');
const audio = document.querySelector('.audio-link');

// event listeners
wordSearchForm.addEventListener('submit',getWord)


// word data


let meanings,
    types,
    synonyms,
    definitions,
    example,
    phonetics,
    wordName;


// api

async function getWord(e){
     e.preventDefault();
     try {
        const searched = wordSearch.value
        const res = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searched}`)).json()
           meanings = Array.from(res[0].meanings)

           types = res[0].meanings.map(obj=>obj.partOfSpeech)
           synonyms = res[0].meanings.map(obj=>obj.synonyms)
           definitions = res[0].meanings.map(obj=>obj.definitions)
           example = res[0].meanings.map(obj=>obj.definitions.map(obj=>obj.example))

           phonetics = Array.from(res[0].phonetics)

           wordName = res[0].word
           
     } catch (error) {
        errMsg.classList.remove('d-none')
        setTimeout(() => {
            errMsg.classList.add('d-none')
        }, 2500);
    }
    pupulateUI()
}

// functions

function pupulateUI(){
    // empty fields and UI
    if(document.querySelectorAll('.c').length > 1){
        document.querySelectorAll('.c').forEach(sec=>{sec.remove()})
    }
    wordSearch.value =''

    meanings.forEach(def=>{

    let title = 'synonyms';
    if (def.synonyms.length == 0) {title=''}
    let ex = 'Example Sentence:'


    const b = document.createElement('div')
    b.classList = 'c'
    b.innerHTML = `
    <div class="mt-5">
            <div class="type">
                <h4 class="word-type1 fw-bold">${def.partOfSpeech}</h4>
                <div class="line"></div>
            </div>
            <div class="sec-2 mt-4">
                <h4>Meaning:</h4>
                <ul class="meanings">

                </ul>
                <h4>${ex}</h4>
                <ul class="ex">

                </ul>
                <h5 class="mt-5 d-inline">${title}</h5>
                <p class="synonyms d-inline">${def.synonyms.map(obj=>obj).toString().split(',').join(' - ')}</p>
            </div>
        </div>
    `
    sec1.insertAdjacentElement('afterend',b)

            //Get meanings
            const meaningsHTML = document.querySelector('.meanings');
            def.definitions.map(obj=>{
                const li = document.createElement('li')
                li.innerHTML = obj.definition
                meaningsHTML.appendChild(li)
            })

            //Get exampleSentence
            const exampleHTML = document.querySelector('.ex');
            def.definitions.map(obj=>{
                const li = document.createElement('li')
                if(obj.example == undefined) {

                } else {
                    li.innerHTML = obj.example
                    exampleHTML.appendChild(li)
                }
            })
            

    })

    let audioLink;
    phonetics.find(obj=>{
        audioLink = obj.audio
    })
    audio.setAttribute('src',audioLink)

    playBTN.addEventListener('click',()=>audio.play())

    // 
    word.innerHTML = wordName;
    wordPron.innerHTML = phonetics.find(obj=>obj.text).text
    wordPron.style.color = 'purple'

}



// Change font

const fontSelect = document.querySelector('.font-select');
const sansF = document.querySelector('.sans');
const seriF = document.querySelector('.sans-serif');
const monospaceF = document.querySelector('.monospace');

sansF.addEventListener('click',(e)=>{
    const fontName = e.target.innerHTML
    fontSelect.innerHTML = fontName
    document.body.classList = 'sans'
})
seriF.addEventListener('click',(e)=>{
    const fontName = e.target.innerHTML
    fontSelect.innerHTML = fontName
    document.body.classList = 'sans-serif'
})
monospaceF.addEventListener('click',(e)=>{
    const fontName = e.target.innerHTML
    fontSelect.innerHTML = fontName
    document.body.classList = 'monospace'
})
