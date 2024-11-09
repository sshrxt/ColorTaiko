import clickSound from "../assets/sound effect/Click.wav";
import errorSound from "../assets/sound effect/Error.wav";
import connectSound from "../assets/sound effect/Connection.wav";

export function useAudio() {
  const clickAudio = new Audio(clickSound);
  const errorAudio = new Audio(errorSound);
  const connectAudio = new Audio(connectSound);

  return { clickAudio, errorAudio, connectAudio };
}
