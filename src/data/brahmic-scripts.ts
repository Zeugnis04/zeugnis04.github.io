export type VowelGlyph = {
  independent: string;
  dependent: string;
};

export type BrahmicScript = {
  key: string;
  label: string;
  fontClass: string;
  consonants: string[];
  vowels: VowelGlyph[];
  numerals: string[];
};

export type ScriptGroup = {
  label: string;
  scripts: Array<{ key: string; depth?: number }>;
};

export const scriptGroups: ScriptGroup[] = [
  {
    label: "Historical",
    scripts: [{ key: "Ashoka Brahmi" }],
  },
  {
    label: "Northern Brahmic",
    scripts: [
      { key: "Gurmukhi" },
      { key: "Devanagari" },
      { key: "Gujarati" },
      { key: "Bengali-Assamese" },
      { key: "Tirhuta", depth: 1 },
      { key: "Odia" },
      { key: "Newa" },
      { key: "Tibetan" },
      { key: "Meitei Mayek", depth: 1 },
    ],
  },
  {
    label: "Southern Brahmic",
    scripts: [
      { key: "Tamil" },
      { key: "Malayalam" },
      { key: "Khmer" },
      { key: "Thai", depth: 1 },
      { key: "Lao", depth: 2 },
      { key: "Cham" },
      { key: "Balinese" },
      { key: "Javanese" },
      { key: "Burmese" },
      { key: "Sinhala" },
      { key: "Telugu" },
      { key: "Kannada" },
    ],
  },
];

export const consonantRows = [
  ["ka", "kha", "ga", "gha", "ṅa"],
  ["ca", "cha", "ja", "jha", "ña"],
  ["ṭa", "ṭha", "ḍa", "ḍha", "ṇa"],
  ["ta", "tha", "da", "dha", "na"],
  ["pa", "pha", "ba", "bha", "ma"],
  ["ya", "ra", "la", "va"],
  ["śa", "ṣa", "sa", "ha", "kṣa"],
];

export const vowelRows = [
  ["a", "ā", "ê", "ô", "i"],
  ["ī", "u", "ū", "e", "ē"],
  ["ai", "o", "ō", "au", "ə"],
  ["r̥", "r̥̄", "l̥", "l̥̄", "ṁ"],
  ["ḥ"],
];

export const numeralRows = [
  ["0", "1", "2", "3", "4"],
  ["5", "6", "7", "8", "9"],
];

function cells(value: string): string[] {
  return value.split("|").map((cell) => (cell === "-" ? "" : cell));
}

function vowelCells(value: string): VowelGlyph[] {
  return cells(value).map((cell) => {
    const [independent = "", dependent = ""] = cell.split("~");
    return { independent, dependent };
  });
}

// Local transcription of Wikipedia's Brahmic scripts comparison tables.
export const scripts: BrahmicScript[] = [
  {
    key: "Ashoka Brahmi",
    label: "Ashoka Brahmi",
    fontClass: "script-brahmi",
    numerals: cells("𑁦|𑁧|𑁨|𑁩|𑁪|𑁫|𑁬|𑁭|𑁮|𑁯"),
    consonants: cells("𑀓|𑀔|𑀕|𑀖|𑀗|𑀘|𑀙|𑀚|𑀛|𑀜|𑀝|𑀞|𑀟|𑀠|𑀡|𑀢|𑀣|𑀤|𑀥|𑀦|𑀧|𑀨|𑀩|𑀪|𑀫|𑀬|𑀭|𑀮|𑀯|𑀰|𑀱|𑀲|𑀳|-"),
    vowels: vowelCells("𑀅~𑀓|𑀆~𑀓𑀸|-|-|𑀇~𑀓𑀺|𑀈~𑀓𑀻|𑀉~𑀓𑀼|𑀊~𑀓𑀽|𑁱~𑀓𑁳|𑀏~𑀓𑁂|𑀐~𑀓𑁃|𑁲~𑀓𑁴|𑀑~𑀓𑁄|𑀒~𑀓𑁅|-|𑀋~𑀓𑀾|𑀌~𑀓𑀿|𑀍~𑀓𑁀|𑀎~𑀓𑁁|𑀅𑀁~𑀓𑀁|𑀅𑀂~𑀓𑀂"),
  },
  {
    key: "Devanagari",
    label: "Devanagari",
    fontClass: "script-devanagari",
    numerals: cells("०|१|२|३|४|५|६|७|८|९"),
    consonants: cells("क|ख|ग|घ|ङ|च|छ|ज|झ|ञ|ट|ठ|ड|ढ|ण|त|थ|द|ध|न|प|फ|ब|भ|म|य|र|ल|व|श|ष|स|ह|क्ष"),
    vowels: vowelCells("अ~क|आ~का|ऍ~कॅ|ऑ~कॉ|इ~कि|ई~की|उ~कु|ऊ~कू|ऎ~कॆ|ए~के|ऐ~कै|ऒ~कॊ|ओ~को|औ~कौ|-|ऋ~कृ|ॠ~कॄ|ऌ~कॢ|ॡ~कॣ|अं~कं|अः~कः"),
  },
  {
    key: "Bengali-Assamese",
    label: "Bengali–Assamese",
    fontClass: "script-bengali",
    numerals: cells("০|১|২|৩|৪|৫|৬|৭|৮|৯"),
    consonants: cells("ক|খ|গ|ঘ|ঙ|চ|ছ|জ|ঝ|ঞ|ট|ঠ|ড|ঢ|ণ|ত|থ|দ|ধ|ন|প|ফ|ব|ভ|ম|য|র,ৰ|ল|ৱ|শ|ষ|স|হ|ক্ষ"),
    vowels: vowelCells("অ~ক|আ~কা|অ্যা~ক্যা|-|ই~কি|ঈ~কী|উ~কু|ঊ~কূ|-|এ~কে|ঐ~কৈ|-|ও~কো|ঔ~কৌ|-|ঋ~কৃ|ৠ~কৄ|ঌ~কৢ|ৡ~কৣ|অং~কং|অঃ~কঃ"),
  },
  {
    key: "Tirhuta",
    label: "Tirhuta",
    fontClass: "script-tirhuta",
    numerals: cells("𑓐|𑓑|𑓒|𑓓|𑓔|𑓕|𑓖|𑓗|𑓘|𑓙"),
    consonants: cells("𑒏|𑒐|𑒑|𑒒|𑒓|𑒔|𑒕|𑒖|𑒗|𑒘|𑒙|𑒚|𑒛|𑒜|𑒝|𑒞|𑒟|𑒠|𑒡|𑒢|𑒣|𑒤|𑒥|𑒦|𑒧|𑒨|𑒩|𑒪|𑒫|𑒬|𑒭|𑒮|𑒯|-"),
    vowels: vowelCells("𑒁~𑒏|𑒂~𑒏𑒰|-|-|𑒃~𑒏𑒱|𑒄~𑒏𑒲|𑒅~𑒏𑒳|𑒆~𑒏𑒴|~𑒏𑒺|𑒋~𑒏𑒹|𑒌~𑒏𑒻|~𑒏𑒽|𑒍~𑒏𑒼|𑒎~𑒏𑒾|-|𑒇~𑒏𑒵|𑒈~𑒏𑒶|𑒉~𑒏𑒷|𑒊~𑒏𑒸|𑒁𑓀~𑒏𑓀|𑒁𑓁~𑒏𑓁"),
  },
  {
    key: "Gurmukhi",
    label: "Gurmukhi",
    fontClass: "script-gurmukhi",
    numerals: cells("੦|੧|੨|੩|੪|੫|੬|੭|੮|੯"),
    consonants: cells("ਕ|ਖ|ਗ|ਘ|ਙ|ਚ|ਛ|ਜ|ਝ|ਞ|ਟ|ਠ|ਡ|ਢ|ਣ|ਤ|ਥ|ਦ|ਧ|ਨ|ਪ|ਫ|ਬ|ਭ|ਮ|ਯ|ਰ|ਲ|ਵ|ਸ਼|-|ਸ|ਹ|-"),
    vowels: vowelCells("ਅ~ਕ|ਆ~ਕਾ|-|-|ਇ~ਕਿ|ਈ~ਕੀ|ਉ~ਕੁ|ਊ~ਕੂ|-|ਏ~ਕੇ|ਐ~ਕੈ|-|ਓ~ਕੋ|ਔ~ਕੌ|-|-|-|-|-|ਅਂ~ਕਂ|ਅਃ~ਕਃ"),
  },
  {
    key: "Gujarati",
    label: "Gujarati",
    fontClass: "script-gujarati",
    numerals: cells("૦|૧|૨|૩|૪|૫|૬|૭|૮|૯"),
    consonants: cells("ક|ખ|ગ|ઘ|ઙ|ચ|છ|જ|ઝ|ઞ|ટ|ઠ|ડ|ઢ|ણ|ત|થ|દ|ધ|ન|પ|ફ|બ|ભ|મ|ય|ર|લ|વ|શ|ષ|સ|હ|ક્ષ"),
    vowels: vowelCells("અ~ક|આ~કા|ઍ~કૅ|ઑ~કૉ|ઇ~કિ|ઈ~કી|ઉ~કુ|ઊ~કૂ|-|એ~કે|ઐ~કૈ|-|ઓ~કો|ઔ~કૌ|-|ઋ~કૃ|ૠ~કૄ|ઌ~કૢ|ૡ~કૣ|અં~કં|અઃ~કઃ"),
  },
  {
    key: "Odia",
    label: "Odia",
    fontClass: "script-odia",
    numerals: cells("୦|୧|୨|୩|୪|୫|୬|୭|୮|୯"),
    consonants: cells("କ|ଖ|ଗ|ଘ|ଙ|ଚ|ଛ|ଜ|ଝ|ଞ|ଟ|ଠ|ଡ|ଢ|ଣ|ତ|ଥ|ଦ|ଧ|ନ|ପ|ଫ|ବ|ଭ|ମ|ଯ|ର|ଲ|ୱ|ଶ|ଷ|ସ|ହ|କ୍ଷ"),
    vowels: vowelCells("ଅ~କ|ଆ~କା|-|-|ଇ~କି|ଈ~କୀ|ଉ~କୁ|ଊ~କୂ|-|ଏ~କେ|ଐ~କୈ|-|ଓ~କୋ|ଔ~କୌ|-|ଋ~କୃ|ୠ~କୄ|ଌ~କୢ|ୡ~କୣ|ଅଂ~କଂ|ଅଃ~କଃ"),
  },
  {
    key: "Newa",
    label: "Newa",
    fontClass: "script-newa",
    numerals: cells("𑑐|𑑑|𑑒|𑑓|𑑔|𑑕|𑑖|𑑗|𑑘|𑑙"),
    consonants: cells("𑐎|𑐏|𑐐|𑐑|𑐒|𑐔|𑐕|𑐖|𑐗|𑐘|𑐚|𑐛|𑐜|𑐝|𑐞|𑐟|𑐠|𑐡|𑐢|𑐣|𑐥|𑐦|𑐧|𑐨|𑐩|𑐫|𑐬|𑐮|𑐰|𑐱|𑐲|𑐳|𑐴|𑐎𑑂𑐲"),
    vowels: vowelCells("𑐀~𑐎|𑐁~𑐎𑐵|-|-|𑐂~𑐎𑐶|𑐃~𑐎𑐷|𑐄~𑐎𑐸|𑐅~𑐎𑐹|-|𑐊~𑐎𑐾|𑐋~𑐎𑐿|-|𑐌~𑐎𑑀|𑐍~𑐎𑑁|-|𑐆~𑐎𑐺|𑐇~𑐎𑐻|𑐈~𑐎𑐼|𑐉~𑐎𑐽|𑐀𑑄~𑐎𑑄|𑐀𑑅~𑐎𑑅"),
  },
  {
    key: "Tibetan",
    label: "Tibetan",
    fontClass: "script-tibetan",
    numerals: cells("༠|༡|༢|༣|༤|༥|༦|༧|༨|༩"),
    consonants: cells("ཀ|ཁ|ག|གྷ|ང|ཅ|ཆ|ཇ|ཛྷ|ཉ|ཊ|ཋ|ཌ|ཌྷ|ཎ|ཏ|ཐ|ད|དྷ|ན|པ|ཕ|བ|བྷ|མ|ཡ|ར|ལ|ཝ|ཤ|ཥ|ས|ཧ|ཀྵ"),
    vowels: vowelCells("ཨ~ཀ|ཨཱ~ཀཱ|-|-|ཨི~ཀི|ཨཱི~ཀཱི|ཨུ~ཀུ|ཨཱུ~ཀཱུ|-|ཨེ~ཀེ|ཨཻ~ཀཻ|-|ཨོ~ཀོ|ཨཽ~ཀཽ|-|རྀ~ཀྲྀ|རཱྀ~ཀྲཱྀ|ལྀ~ཀླྀ|ལཱྀ~ཀླཱྀ|ཨཾ~ཀཾ|ཨཿ~ཀཿ"),
  },
  {
    key: "Meitei Mayek",
    label: "Meitei Mayek",
    fontClass: "script-meitei",
    numerals: cells("꯰|꯱|꯲|꯳|꯴|꯵|꯶|꯷|꯸|꯹"),
    consonants: cells("ꯀ|ꯈ|ꯒ|ꯘ|ꯉ|ꯆ|ꫢ|ꯖ|ꯓ|ꫣ|ꫤ|ꫥ|ꫦ|ꫧ|ꫨ|ꯇ|ꯊ|ꯗ|ꯙ|ꯅ|ꯄ|ꯐ|ꯕ|ꯚ|ꯃ|ꯌ|ꯔ|ꯂ|ꯋ|ꫩ|ꫪ|ꯁ|ꯍ|-"),
    vowels: vowelCells("ꯑ~ꯀ|ꯑꯥ~ꯀꯥ|-|-|ꯏ~ꯀꯤ|ꯑꫫ~ꯀꫫ|ꯎ~ꯀꯨ|ꯑꫬ~ꯀꫬ|-|ꯑꯦ~ꯀꯦ|ꯑꯩ~ꯀꯩ|-|ꯑꯣ~ꯀꯣ|ꯑꯧ~ꯀꯧ|-|-|-|-|-|ꯑꯪ~ꯀꯪ|ꯑꫵ~ꯀꫵ"),
  },
  {
    key: "Tamil",
    label: "Tamil",
    fontClass: "script-tamil",
    numerals: cells("௦|௧|௨|௩|௪|௫|௬|௭|௮|௯"),
    consonants: cells("க|-|-|-|ங|ச|-|ஜ|-|ஞ|ட|-|-|-|ண|த|-|-|-|ந|ப|-|-|-|ம|ய|ர|ல|வ|ஶ|ஷ|ஸ|ஹ|க்ஷ"),
    vowels: vowelCells("அ~க|ஆ~கா|-|-|இ~கி|ஈ~கீ|உ~கு|ஊ~கூ|எ~கெ|ஏ~கே|ஐ~கை|ஒ~கொ|ஓ~கோ|ஔ~கௌ|-|-|-|-|-|அஂ~கஂ|அஃ~கஃ"),
  },
  {
    key: "Telugu",
    label: "Telugu",
    fontClass: "script-telugu",
    numerals: cells("౦|౧|౨|౩|౪|౫|౬|౭|౮|౯"),
    consonants: cells("క|ఖ|గ|ఘ|ఙ|చ|ఛ|జ|ఝ|ఞ|ట|ఠ|డ|ఢ|ణ|త|థ|ద|ధ|న|ప|ఫ|బ|భ|మ|య|ర|ల|వ|శ|ష|స|హ|క్ష"),
    vowels: vowelCells("అ~క|ఆ~కా|-|-|ఇ~కి|ఈ~కీ|ఉ~కు|ఊ~కూ|ఎ~కె|ఏ~కే|ఐ~కై|ఒ~కొ|ఓ~కో|ఔ~కౌ|-|ఋ~కృ|ౠ~కౄ|ఌ~కౢ|ౡ~కౣ|అం~కం|అః~కః"),
  },
  {
    key: "Kannada",
    label: "Kannada",
    fontClass: "script-kannada",
    numerals: cells("೦|೧|೨|೩|೪|೫|೬|೭|೮|೯"),
    consonants: cells("ಕ|ಖ|ಗ|ಘ|ಙ|ಚ|ಛ|ಜ|ಝ|ಞ|ಟ|ಠ|ಡ|ಢ|ಣ|ತ|ಥ|ದ|ಧ|ನ|ಪ|ಫ|ಬ|ಭ|ಮ|ಯ|ರ|ಲ|ವ|ಶ|ಷ|ಸ|ಹ|ಕ್ಷ"),
    vowels: vowelCells("ಅ~ಕ|ಆ~ಕಾ|-|-|ಇ~ಕಿ|ಈ~ಕೀ|ಉ~ಕು|ಊ~ಕೂ|ಎ~ಕೆ|ಏ~ಕೇ|ಐ~ಕೈ|ಒ~ಕೊ|ಓ~ಕೋ|ಔ~ಕೌ|-|ಋ~ಕೃ|ೠ~ಕೄ|ಌ~ಕೢ|ೡ~ಕೣ|ಅಂ~ಕಂ|ಅಃ~ಕಃ"),
  },
  {
    key: "Malayalam",
    label: "Malayalam",
    fontClass: "script-malayalam",
    numerals: cells("൦|൧|൨|൩|൪|൫|൬|൭|൮|൯"),
    consonants: cells("ക|ഖ|ഗ|ഘ|ങ|ച|ഛ|ജ|ഝ|ഞ|ട|ഠ|ഡ|ഢ|ണ|ത|ഥ|ദ|ധ|ന|പ|ഫ|ബ|ഭ|മ|യ|ര|ല|വ|ശ|ഷ|സ|ഹ|ക്ഷ"),
    vowels: vowelCells("അ~ക|ആ~കാ|-|-|ഇ~കി|ഈ~കീ|ഉ~കു|ഊ~കൂ|എ~കെ|ഏ~കേ|ഐ~കൈ|ഒ~കൊ|ഓ~കോ|ഔ~കൗ|-|ഋ~കൃ|ൠ~കൄ|ഌ~കൢ|ൡ~കൣ|അം~കം|അഃ~കഃ"),
  },
  {
    key: "Sinhala",
    label: "Sinhala",
    fontClass: "script-sinhala",
    numerals: cells("෦|෧|෨|෩|෪|෫|෬|෭|෮|෯"),
    consonants: cells("ක|ඛ|ග|ඝ|ඞ|ච|ඡ|ජ|ඣ|ඤ|ට|ඨ|ඩ|ඪ|ණ|ත|ථ|ද|ධ|න|ප|ඵ|බ|භ|ම|ය|ර|ල|ව|ශ|ෂ|ස|හ|ක්‍ෂ"),
    vowels: vowelCells("අ~ක|ආ~කා|ඇ~කැ|ඈ~කෑ|ඉ~කි|ඊ~කී|උ~කු|ඌ~කූ|එ~කෙ|ඒ~කේ|ඓ~කෛ|ඔ~කො|ඕ~කෝ|ඖ~කෞ|-|ඍ~කෘ|ඎ~කෲ|ඏ~කෟ|ඐ~කෳ|අං~කං|අඃ~කඃ"),
  },
  {
    key: "Burmese",
    label: "Burmese",
    fontClass: "script-burmese",
    numerals: cells("၀|၁|၂|၃|၄|၅|၆|၇|၈|၉"),
    consonants: cells("က|ခ|ဂ|ဃ|င|စ|ဆ|ဇ|ဈ|ဉ / ည|ဋ|ဌ|ဍ|ဎ|ဏ|တ|ထ|ဒ|ဓ|န|ပ|ဖ|ဗ|ဘ|မ|ယ|ရ|လ|ဝ|ၐ|ၑ|သ|ဟ|-"),
    vowels: vowelCells("အ~က|အာ~ကာ|-|-|ဣ~ကိ|ဤ~ကီ|ဥ~ကု|ဦ~ကူ|-|ဧ~ကေ|အဲ~ကဲ|ဩ~ကော|-|အောင်~ကောင်|-|ၒ~ကၖ|ၓ~ကၗ|ၔ~ကၘ|ၕ~ကၙ|အံ~ကံ|အး~ကး"),
  },
  {
    key: "Khmer",
    label: "Khmer",
    fontClass: "script-khmer",
    numerals: cells("០|១|២|៣|៤|៥|៦|៧|៨|៩"),
    consonants: cells("ក|ខ|គ|ឃ|ង|ច|ឆ|ជ|ឈ|ញ|ដ|ឋ|ឌ|ឍ|ណ|ត|ថ|ទ|ធ|ន|ប|ផ|ព|ភ|ម|យ|រ|ល|វ|ឝ|ឞ|ស|ហ|-"),
    vowels: vowelCells("អ~ក|អា~កា|-|-|ឥ~កិ|ឦ~កី|ឧ~កុ|ឩ~កូ|-|ឯ~កេ|ឰ~កៃ|-|ឱ~កោ|ឳ~កៅ|-|ឫ~ក្ឫ|ឬ~ក្ឬ|ឭ~ក្ឭ|ឮ~ក្ឮ|អំ~កំ|អះ~កះ"),
  },
  {
    key: "Cham",
    label: "Cham",
    fontClass: "script-cham",
    numerals: cells("꩐|꩑|꩒|꩓|꩔|꩕|꩖|꩗|꩘|꩙"),
    consonants: cells("ꨆ|ꨇ|ꨈ|ꨉ|ꨋ|ꨌ|ꨍ|ꨎ|ꨏ|ꨑ|-|-|-|-|-|ꨓ|ꨔ|ꨕ|ꨖ|ꨘ|ꨚ|ꨜ|ꨝ|ꨞ|ꨠ|ꨢ|ꨣ|ꨤ|ꨥ|-|ꨦ|ꨧ|ꨨ|-"),
    vowels: vowelCells("ꨀ~ꨆ|ꨀꨩ~ꨆꨩ|-|-|ꨁ~ꨆꨪ|ꨁꨩ~ꨆꨫ|ꨂ~ꨆꨭ|ꨂꨩ~ꨆꨭꨩ|-|ꨃ~ꨆꨯꨮ|ꨄ~ꨆꨰ|-|ꨅ~ꨆꨯ|ꨀꨯꨱ~ꨆꨯꨱ|-|ꨣꨮ~ꨆꨴꨮ|ꨣꨮꨩ~ꨆꨴꨮꨩ|ꨤꨮ~ꨆꨵꨮ|ꨤꨮꨩ~ꨆꨵꨮꨩ|ꨀꩌ~ꨆꩌ|ꨀꩍ~ꨆꩍ"),
  },
  {
    key: "Thai",
    label: "Thai",
    fontClass: "script-thai",
    numerals: cells("๐|๑|๒|๓|๔|๕|๖|๗|๘|๙"),
    consonants: cells("ก|ข, (ฃ)|ค, (ฅ)|ฆ|ง|จ|ฉ|ช, (ซ)|ฌ|ญ|ฎ, (ฏ)|ฐ|ฑ|ฒ|ณ|ด, (ต)|ถ|ท|ธ|น|ป, (บ)|ผ, (ฝ)|พ, (ฟ)|ภ|ม|ย|ร|ล|ว|ศ|ษ|ส|ห, ฮ|-"),
    vowels: vowelCells("อ (อะ)~ก (กะ)|อา~กา|แอ~แก|ออ~กอ|อิ~กิ|อี~กี|อุ~กุ|อู~กู|เอะ~เกะ|เอ~เก|ไอ~ไก|โอะ~โกะ|โอ~โก|เอา~เกา|เออ~เกอ|ฤ~กฺฤ|ฤๅ~กฺฤๅ|ฦ~กฺฦ|ฦๅ~กฺฦๅ|อํ~กํ|อะ (อะฮฺ)~กะ (กะฮฺ)"),
  },
  {
    key: "Lao",
    label: "Lao",
    fontClass: "script-lao",
    numerals: cells("໐|໑|໒|໓|໔|໕|໖|໗|໘|໙"),
    consonants: cells("ກ|ຂ|ຄ|ຆ|ງ|ຈ|ຉ|ຊ|ຌ|ຎ|ຏ|ຐ|ຑ|ຒ|ຓ|ດ, ຕ|ຖ|ທ|ຘ|ນ|ບ, ປ|ຜ, ຝ|ພ, ຟ|ຠ|ມ|ຍ|ຣ|ລ|ວ|ຨ|ຩ|ສ|ຫ|-"),
    vowels: vowelCells("ອະ~ກະ|ອາ~ກາ|ແອ~ແກ|(ອອ)~(ກອ)|ອິ~ກິ|ອີ~ກີ|ອຸ~ກຸ|ອູ~ກູ|(ແອະ)~(ແກະ)|ເອ~ເກ|ໄອ ໃອ~ໄກ ໃກ|(ໂອະ)~(ໂກະ)|ໂອ~ໂກ|ເອົາ ອາວ~ເກົາ ກາວ|-|-|-|-|-|ອํ~ກํ|ອະ~ກະ"),
  },
  {
    key: "Balinese",
    label: "Balinese",
    fontClass: "script-balinese",
    numerals: cells("᭐|᭑|᭒|᭓|᭔|᭕|᭖|᭗|᭘|᭙"),
    consonants: cells("ᬓ|ᬔ|ᬕ|ᬖ|ᬗ|ᬘ|ᬙ|ᬚ|ᬛ|ᬜ|ᬝ|ᬞ|ᬟ|ᬠ|ᬡ|ᬢ|ᬣ|ᬤ|ᬥ|ᬦ|ᬧ|ᬨ|ᬩ|ᬪ|ᬫ|ᬬ|ᬭ|ᬮ|ᬯ|ᬰ|ᬱ|ᬲ|ᬳ|-"),
    vowels: vowelCells("ᬅ~ᬓ|ᬆ~ᬓᬵ|-|-|ᬇ~ᬓᬶ|ᬈ~ᬓᬷ|ᬉ~ᬓᬸ|ᬊ~ᬓᬹ|ᬏ~ᬓᬾ|-|ᬐ~ᬓᬿ|ᬑ~ᬓᭀ|-|ᬒ~ᬓᭁ|ᬅᭂ~ᬓᭂ|ᬋ~ᬓᬺ|ᬌ~ᬓᬻ|ᬍ~ᬓᬼ|ᬎ~ᬓᬽ|ᬅᬂ~ᬓᬂ|ᬅᬄ~ᬓᬄ"),
  },
  {
    key: "Javanese",
    label: "Javanese",
    fontClass: "script-javanese",
    numerals: cells("꧐|꧑|꧒|꧓|꧔|꧕|꧖|꧗|꧘|꧙"),
    consonants: cells("ꦏ|ꦑ|ꦒ|ꦓ|ꦔ|ꦕ|ꦖ|ꦗ|ꦙ|ꦚ|ꦛ|ꦜ|ꦝ|ꦞ|ꦟ|ꦠ|ꦡ|ꦢ|ꦣ|ꦤ|ꦥ|ꦦ|ꦧ|ꦨ|ꦩ|ꦪ|ꦫ|ꦭ|ꦮ|ꦯ|ꦰ|ꦱ|ꦲ|-"),
    vowels: vowelCells("ꦄ~ꦏ|ꦄꦴ~ꦏꦴ|-|-|ꦆ~ꦏꦶ|ꦇ~ꦏꦷ|ꦈ~ꦏꦸ|ꦈꦴ~ꦏꦹ|ꦌ~ꦏꦺ|-|ꦍ~ꦏꦻ|ꦎ~ꦏꦺꦴ|-|ꦎꦴ~ꦏꦻꦴ|ꦄꦼ~ꦏꦼ|ꦉ~ꦏꦽ|ꦉꦴ~ꦏꦽꦴ|ꦊ~ꦏ꧀ꦊ|ꦋ~ꦏ꧀ꦋ|ꦄꦁ~ꦏꦁ|ꦄꦃ~ꦏꦃ"),
  },
];
