import MidiWriter from "midi-writer-js";
import fs from "fs";

const octaves = [1, 2, 3, 4, 5, 6];
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

octaves.forEach((octave) => {
	notes.forEach((note) => {
		const track = new MidiWriter.Track();
		track.addEvent(new MidiWriter.NoteEvent({ pitch: [`${note}${octave}`], duration: "8", velocity: 100, channel: 10 }));
		fs.writeFileSync(`utilities/createMid/output/${note}${octave}.mid`, new MidiWriter.Writer(track).buildFile());
	});
});