import fs from "fs";
import path from "path";

const PATH = "GM-soundfonts/FluidR3_GM/drumkits";

function convertMp3ToBase64(inputPath) {
  const instrumentName = path.basename(inputPath);
  console.log(instrumentName);
  let jsContent = `\nif (typeof(MIDI) === 'undefined') var MIDI = {};
if (typeof(MIDI.Soundfont) === 'undefined') MIDI.Soundfont = {};
MIDI.Soundfont.marimba = {\n`;
  const header = "data:audio/mp3;base64,";
  // Function to convert an MP3 file to a Base64 string
  function mp3ToBase64(filePath) {
    const data = fs.readFileSync(`${inputPath}/${filePath}`);
    return data.toString("base64");
  }

  // Generate a JavaScript file containing Base64 strings

  // Read all files in the MP3 directory
  const files = fs.readdirSync(inputPath);

  files.forEach((file) => {
    if (file.endsWith(".mp3")) {
      const base64String = mp3ToBase64(file);
      const fileName = path.basename(file, ".mp3");
      jsContent += `"${fileName}": "${header}${base64String}",\n`;
    }
  });

  jsContent += `\n}`;

  const outputFile = path.join(PATH, `${instrumentName}.js`);
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
    console.log(`Deleted existing output file: ${outputFile}`);
  }
  fs.writeFileSync(outputFile, jsContent);
  console.log(`JavaScript file '${outputFile}' created with Base64 strings.`);
}

const folders = fs.readdirSync(PATH);
folders.forEach((folder) => {
  const fullPath = path.join(PATH, folder);
  convertMp3ToBase64(fullPath);
});
