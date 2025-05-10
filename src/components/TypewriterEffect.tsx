
import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  text: string;
  typingSpeed?: number;
  delayAfterTyping?: number;
  cursorBlinkSpeed?: number;
}

const TypewriterEffect = ({
  text,
  typingSpeed = 100,
  delayAfterTyping = 1000,
  cursorBlinkSpeed = 500
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let cursorTimeout: NodeJS.Timeout;

    // Handle text typing animation
    if (isTyping) {
      if (displayText.length < text.length) {
        typingTimeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        typingTimeout = setTimeout(() => {
          // We don't reset the typing in this case, as we want to keep the full text displayed
        }, delayAfterTyping);
      }
    }

    // Handle cursor blinking
    cursorTimeout = setTimeout(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(cursorTimeout);
    };
  }, [displayText, isTyping, text, typingSpeed, delayAfterTyping, cursorBlinkSpeed]);

  return (
    <span className="font-mono">
      {displayText}
      <span 
        className={`inline-block w-1 h-10 ml-1 align-text-bottom bg-accent ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-100`}
      ></span>
    </span>
  );
};

export default TypewriterEffect;
