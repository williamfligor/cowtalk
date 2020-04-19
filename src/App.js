import React from "react";
import "./App.css";
import fortune from "fortune-teller";
import cowsay from "cowsay2";

function speak(text) {
    speechSynthesis.cancel();

    var voices = speechSynthesis.getVoices();
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;

    var r = Math.floor(Math.random() * voices.length + 1);
    msg.voice = voices[r];

    speechSynthesis.speak(msg);
}

function getCow() {
    var fort = fortune.fortune();
    fort = cowsay.say(fort, {
        face: "parrot",
        e: "oO",
        T: "U",
    });

    var s = fort.replace(/[^-a-z0-9 ]/gi, "");
    fort = fort.replace(/ /g, "&emsp;");
    fort = fort.replace(/\n/g, "<br />");

    return {
        body: {
            __html: fort,
        },
        text: s,
    };
}

function App() {
    const { body, text } = getCow();

    return (
        <div className="App" onClick={() => speak(text)}>
            <header className="App-header">
                <div dangerouslySetInnerHTML={body}></div>
            </header>
        </div>
    );
}

export default App;
