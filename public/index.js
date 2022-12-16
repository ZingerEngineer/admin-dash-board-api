const handleLight =  async (url) => {
    const isOff = url.includes("off");
    const apiToCall = isOff ? "/off" : "/on";
    await fetch(apiToCall, { method: "GET" });
  }

  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
  const grammar = `#JSGF V1.0; grammar values; public <values> = 'on | off';`
  const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
window.addEventListener("hashchange", (event) => handleLight(event.newURL));

const main = () => {
    const url = location.href
    handleLight(url)
    recognition.start();
    recognition.onerror = (err) => {
        console.log(err)
    }
    recognition.onresult = (event) => {
        try {
            const value = event.results[0][0].transcript;
        console.log(value)
        setTimeout(() => {
            recognition.stop();
        }, 250)
        setTimeout(() => {
            recognition.start();
        }, 350)
        
        const usedValue = value.includes('off') && value.includes('light') ? '#turnoff' : value.includes('on') && value.includes('light') ? '#turnon' : ''
        const values = ['#turnoff', '#turnon']
        if (values.includes(usedValue)) {
            location.href = usedValue
        }
        } catch (error) {
            console.log(error)
        }
        
      }
}

window.onload = () => {
    main()
}

