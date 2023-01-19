import React from "react";
import Entry from "./Entry";
import * as emoji from "emoji-api";

console.log(emoji.get("🥺").codepoints);

const createEmojiCard = (emojiInfo, index) => (
  <Entry
    key={index}
    emoji={emojiInfo.emoji}
    name={emojiInfo.name}
    group={emojiInfo.group}
  />
);

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emoji
          .all()
          .map((emojiInfo, index) => createEmojiCard(emojiInfo, index))}
      </dl>
    </div>
  );
}

export default App;
