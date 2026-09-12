"use strict";

const LOCALE_KEY = "marina-locale";
const LOCALES = ["en", "ja"];
const JP_FONT_ID = "marina-font-jp";
const JP_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap";

const MESSAGES = {
  en: {
    "chrome.language": "Language",
    "chrome.languageToJa": "Switch to Japanese",
    "chrome.languageToEn": "Switch to English",
    "nav.work": "work",
    "nav.blog": "blog",
    "role.physicist": "Theoretical Astrophysicist",
    "role.engineer": "Principal Software Engineer",
    "home.bio.title": "Professional Bio",
    "home.bio":
      'I am a <b><a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/">theoretical physicist</a></b> by training (B.Sc. at the University of Sao Paulo; M.Sc. en route, Ph.D. at Stony Brook University; graduate research at the Los Alamos National Laboratory and Brookhaven National Laboratory; <b><a target="_blank" href="https://web.archive.org/web/20090620090344/http://www.steinkirch.org/">undergraduate research</a></b> at NASA Goddard Space Center) and a <b><a target="_blank" href="https://github.com/von-steinkirch">principal software engineer by trade</a></b> (Shopify, Apple, Etsy, Yelp, startups, and private projects — both as an individual contributor and in leadership roles).' +
      "<br><br>" +
      'I started coding in <b><a target="_blank" href="https://web.archive.org/web/20070322015644/http://fly.to/bytegirl">middle school</a></b> and have spent my entire life working on engineering & science. My story with AI/ML started back in high school when I received the first place on a national competition with Expert Systems ("AI Doctor"), during my PhD while working on my thesis on the equation of state of neutron stars at Los Alamos (I also took graduate classes in ML and robotics at that time), then at <b><a target="_blank" href="https://singularity.nullstar.fun/ouroboros-statement.html">many moments</a></b> during my engineering jobs.' +
      "<br><br>" +
      'Now, with LLMs and the many fascinating advances in the field, I\'ve been building and researching a range of projects — running <b><a target="_blank" href="https://marina.nullstar.fun/pages/post.html?post=idea_nullstar">my fleet of agents through my own custom harness and memory stack</a></b>, experimenting with and testing local models, reading research papers and technical literature, and writing lots of code at my colorful Linux workstations.' +
      "<br><br>" +
      "I am grateful to have been able to dedicate every day to my passion — constantly learning, experimenting, and deepening my knowledge during these extraordinary days of technological acceleration — and I hope to do so until the very last breath of my existence.",
    "home.interests.title": "Long-Term Intellectual Interests",
    "home.interests.ai":
      '<span class="highlight-text font-orbitron">AI + ML</span> → Multiplayer Agents; Infrastructure; Graphs; Memory; Interpretability; Robots; Local; AGI',
    "home.interests.physics":
      '<span class="highlight-text font-orbitron">Physics</span> → <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/qi.pdf">Quantum</a> <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/qft.pdf">Field</a> <a target="_blank" href="https://github.com/future-ai-org/my-phd-theoretical-physics-calculations-and-notes">Theories</a>; <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/group.pdf">Group Theory</a>; <a href="https://www.astro.sunysb.edu/steinkirch/reviews/cte_cosmologica_nov_2007.pdf" target="_blank">Cosmology</a>; Game Theory; Astronomy; Qubits',
    "home.interests.code":
      '<span class="highlight-text font-orbitron">Clean Code</span> → <a target="_blank" href="https://github.com/future-ai-org/master-algorithms-py">Python</a>; Rust; Lean; Algorithms; Formal Verification; Logic; Blockchains; Security',
    "home.interests.story":
      '<span class="highlight-text font-orbitron">Storytelling</span> → <a href="https://matrix.nullstar.fun" target="_blank">The Hero\'s Journey</a>; Philosophy; Theology; The Human Condition; History; Agape',
    "home.pubs.title": "Public Technical Research I Published",
    "home.oss.title": "Open-Source Projects I Authored",
    "home.contrib.title": "Third-Party Projects I've Contributed To",
    "home.cat.physics": "Theoretical Physics || Astrophysics || Quantum Computing",
    "home.cat.ai": "Artificial Intelligence || Machine Learning || Robotics",
    "home.cat.sec": "Privacy || Security || Infrastructure",
    "home.cat.chain": "Blockchains || Decentralized Finance",
    "home.cat.fun": "Just for Fun || Frontend AI-Driven Projects",
    "home.easter": "easter egg →",
    "blog.title": "just another tech blog",
    "blog.intro":
      "Here, I write down some of my ideas, pay homage to the research and other works that have made me smile, and, usually on Fridays, share some of the cool things I learned during the week.",
    "blog.drafts.title": "Drafts Backlog",
    "blog.drafts.intro":
      "A queue of things I'm playing with in my spare time — each of which might eventually become a review.",
    "blog.empty": "No posts yet.",
    "blog.indexError": "Could not load Technical Notes index.",
    "blog.draftsError": "Could not load drafts list.",
    "blog.draftsEmpty": "Nothing listed here yet.",
    "blog.back": "← back to the list",
    "blog.copy": "Copy",
    "blog.copied": "Copied!",
    "blog.copyFailed": "Copy failed",
    "blog.copyAria": "Copy code to clipboard",
    "blog.missingSlug": "Missing post slug.",
    "blog.loadError": "Could not load post content.",
    "blog.code": "code",
    "qa.title": "Q & A",
    "qa.intro": "This page offers colleagues a glimpse into the human behind the work.",
    "qa.q1": "What does your day-to-day look like?",
    "qa.a1":
      "<p>I love routines, and my career and family are my two greatest priorities. As a result, my mornings tend to follow the same rhythm:</p>" +
      '<ul class="qa-routine qa-routine--day">' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>Wake up + shower + spa</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span><a target="_blank" href="https://gist.github.com/von-steinkirch/454e3771e45fa1129f5eb2478764f183">Journal</a> + Hatha yoga or Kung Fu</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>Coffee + protein-based breakfast</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span><a target="_blank" href="https://science.nasa.gov/apod/">APOD</a> + a little bit of chess and piano</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>Start Working!</span></li>' +
      "</ul>" +
      "<p>In the evenings, I usually:</p>" +
      '<ul class="qa-routine qa-routine--night">' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span><a target="_blank" href="https://gist.github.com/von-steinkirch/abceab872b7a4bab220e64230f92a66a">Read</a>, <a target="_blank" href="https://gist.github.com/von-steinkirch/2f6c82155253bf9fc113fbc966037a7d">watch movies</a>, <a href="https://gist.github.com/von-steinkirch/49efc13bf9e6b13ee9ccb69683ba832e" target="_blank">play</a>, dance, or work out</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>Check messages and the news + plan the next day</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>Shower + spa + meditation</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>Sleep and have very good dreams 😴</span></li>' +
      "</ul>",
    "qa.q2": "What's your story with coding?",
    "qa.a2":
      'The first time I used a terminal, I was around 7 years old. It was <a target="_blank" href="https://en.wikipedia.org/wiki/MS-DOS">MS-DOS</a> running on an <a target="_blank" href="/images/8086.png">i386</a> machine. I started coding in middle school, working with (very old) languages such as BASIC and Pascal/Delphi. In high school, I discovered C/C++. In grad school, Python.' +
      "<br><br>" +
      'Python has since become my primary language — I even <a target="_blank" href="https://github.com/cypherpunk-symposium/master-algorithms-py" rel="noopener noreferrer">published a book on it in 2014</a> (one of the first open-source Python solutions to classical computer science problems in algorithms and data structures).' +
      "<br><br>" +
      'Throughout my career, I\'ve had the opportunity to write production code in many other languages, including <a target="_blank" href="https://en.wikipedia.org/wiki/Ruby_(programming_language)">Ruby</a> (Shopify), <a target="_blank" href="https://en.wikipedia.org/wiki/Swift_(programming_language)">Swift</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Objective-C">Objective-C</a> (Apple), <a target="_blank" href="https://en.wikipedia.org/wiki/Go_(programming_language)">Go</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/C++">C++</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Rust_(programming_language)">Rust</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Assembly_language">Assembly</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Solidity">Solidity</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Shell_script">Shell</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Terraform_(software)">Terraform</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/CUDA">CUDA</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/IDL_(programming_language)">IDL</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/MATLAB">MATLAB</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/R_(programming_language)">R</a>, and <a target="_blank" href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a>.' +
      "<br><br>" +
      'These days, I\'m super fan of <a target="_blank" href="https://en.wikipedia.org/wiki/Lean_(programming_language)">Lean</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Lua">Lua</a>, someday I will learn <a target="_blank" href="https://en.wikipedia.org/wiki/Haskell_(programming_language)">Haskell</a>, and I build AI and backends in Python and Rust and frontends in <a target="_blank" href="https://en.wikipedia.org/wiki/TypeScript">TypeScript</a>.',
    "qa.q3": "What's your story with Linux?",
    "qa.a3":
      'I discovered and learned Linux back in high school, when I was studying at <a target="_blank" href="https://en.wikipedia.org/wiki/Federal_Institute_of_Paran%C3%A1">ET-UFPR</a>, mostly through a magazine called <a target="_blank" href="https://augustocampos.net/revista-do-linux/">Revista do Linux (or Linux Brasil)</a>. At the time, I was using a Brazilian distribution called <a target="_blank" href="https://de.wikipedia.org/wiki/Conectiva">Conectiva Linux</a> — and I eventually ended up interning at the company for a little while.' +
      "<br><br>" +
      'In college, I first spent two years studying engineering at <a target="_blank" href="https://en.wikipedia.org/wiki/Polytechnic_School_of_the_University_of_S%C3%A3o_Paulo">POLI-USP</a> and then completed a bachelor\'s degree in <a target="_blank" href="https://en.wikipedia.org/wiki/Institute_of_Physics_of_the_University_of_S%C3%A3o_Paulo">Physics</a>. During that time, I experimented with a bunch of different distributions, mostly with dual- or multi- boot with <a target="_blank" href="https://en.wikipedia.org/wiki/GNU_GRUB">GRUB</a>, from the hardcore ones, like <a target="_blank" href="https://en.wikipedia.org/wiki/Gentoo_Linux">Gentoo</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Slackware">Slackware</a>, to the almost-too-easy ones, like <a target="_blank" href="https://en.wikipedia.org/wiki/Ubuntu">Ubuntu</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Linux_Mint">Mint</a>. I eventually settled on <a target="_blank" href="https://en.wikipedia.org/wiki/Fedora_Linux">Fedora</a> and <a target="_blank" href="https://en.wikipedia.org/wiki/Debian">Debian</a> as my favorites. They were different enough that I enjoyed having two machines, each running one of them.' +
      "<br><br>" +
      'During my <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/">PhD</a>, I used mostly Fedora, as well as <a target="_blank" href="https://en.wikipedia.org/wiki/Red_Hat">Red Hat</a> and actual <a target="_blank" href="https://en.wikipedia.org/wiki/Unix">UNIX</a> servers in the labs and on the large computing systems where I ran my research. When I became a software engineer, I joined Apple as a Senior Engineer in my first year, and I experimented with <a target="_blank" href="https://en.wikipedia.org/wiki/MacOS">macOS</a> for a while.' +
      "<br><br>" +
      'Nowadays, all my machines run Linux (and I\'ve been using <a target="_blank" href="https://en.wikipedia.org/wiki/Omarchy">Omarchy</a> since 2025).',
    "qa.q4": "What's your story with videogames?",
    "qa.a4":
      'When I was 5 or so, my dad brought an <a target="_blank" href="https://en.wikipedia.org/wiki/Atari">Atari</a> home, and we spent the following nights playing and eating bowls of french fries (his specialty). Around 10, my mom bought us a Super Nintendo, which is still my favorite console of all time. After that, we had a Mega Drive (Sega Genesis), a Nintendo 64, PlayStation 1, 2, 3, 4, Xbox 360, Nintendo Wii, and the Meta VR series. Plus, I have always been a PC gamer at the same time.' +
      "<br><br>" +
      'I have <a target="_blank" href="https://gist.github.com/von-steinkirch/49efc13bf9e6b13ee9ccb69683ba832e">too many favorite games</a>, but in terms of hours played, I would highlight all the old-school PC LAN games and the SNES and PS1 classics, with a sweet spot for Resident Evils, Silent Hills, Tomb Raiders, Half-Life/Portals, Left 4 Deads, Age of Empires, Fallouts, WoW, StarCrafts, and Diablos.' +
      "<br><br>" +
      'P.S. I\'ve always been a Linux girl, but I might have had to use Windows for my <a href="https://steamcommunity.com/id/bt3gl" target="_blank">Steam</a> and Blizzard games back in the day. Or not.',
    "qa.q5": "What's your story with astronomy and astrology?",
    "qa.a5":
      "I grew up absolutely fascinated by science and computers, and I could never decide which one I loved more." +
      "<br><br>" +
      'This became clear in college, when I started in (Electrical / Computer) Engineering, and switched to Physics halfway through. At the time, I read a bunch of <a target="_blank" href="https://gist.github.com/von-steinkirch/05851c6268dc569b9281c9c57662ec27">Carl Sagan</a>, <a href="https://en.wikipedia.org/wiki/Marcelo_Gleiser" target="_blank">Marcelo Gleiser</a>, <a href="https://en.wikipedia.org/wiki/Brian_Greene" target="_blank">Brian Greene</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Kip_Thorne">Kip Thorne</a>, <a href="https://en.wikipedia.org/wiki/Sean_M._Carroll" target="_blank">Sean Carroll</a>, <a href="https://en.wikipedia.org/wiki/Stephen_Hawking" target="_blank">Stephen Hawking</a>, <a href="https://en.wikipedia.org/wiki/Steven_Weinberg" target="_blank">Steven Weinberg</a>, <a href="https://en.wikipedia.org/wiki/Richard_Feynman" target="_blank">Richard Feynman</a>, <a href="https://en.wikipedia.org/wiki/Alan_Guth" target="_blank">Alan Guth</a>, and the thinkers of the Copenhagen school, including <a href="https://en.wikipedia.org/wiki/Werner_Heisenberg" target="_blank">Heisenberg</a> and <a href="https://en.wikipedia.org/wiki/Niels_Bohr" target="_blank">Bohr</a>. There was no better subject to study, and I went to pursue a PhD.' +
      "<br><br>" +
      "I did not believe in astrology at all (although, because of a peculiar autistic quirk of mine, I remember the birthdays of every person I have ever met). In fact, I once tried to design an experiment to debunk astrology. I asked my colleagues to fill out a questionnaire and planned to analyze the results statistically to demonstrate that their personalities could not be explained by their zodiac signs. Given that my only exposure to astrology at the time was through horoscopes and similar material, the conclusion seemed obvious." +
      "<br><br>" +
      'During <a href="https://www.astro.sunysb.edu/steinkirch/" target="_blank">my five years pursuing a PhD in Theoretical Physics at Stony Brook</a>, I was fortunate to explore many of the questions about physics that fascinated me at both extremes: the very large — the universe — and the very small — elementary particles. I have continued to think about these questions throughout my life. Now, with the emergence of AI, I expect to see many of them finally answered, and I am excited about what the future holds.' +
      "<br><br>" +
      'My relationship with astrology, however, took a rather unexpected turn. In 2020, a PhD colleague of mine from <a href="https://github.com/zapatacomputing/z-qml" target="_blank">Zapata</a> <a href="https://github.com/zapatacomputing/z-lstm" target="_blank">Computing</a> introduced me to birth charts. He was a very intelligent person, so I decided to investigate more. As I tend to do with anything that captures my interest, I went down the rabbit hole: I read dozens of books and analyzed hundreds of birth charts, all while applying the skeptical, scientific mindset I have used throughout my life.' +
      "<br><br>" +
      'I began noticing correlations and patterns, particularly in theories involving ascendants and angles, and I have been creating a mathematical theory drawing on my knowledge in <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/group.pdf">Group Theory</a> and other related fields. There are still several open questions that I cannot confidently answer — and that I also cannot simply dismiss.' +
      "<br><br>" +
      'Astrology has therefore become one of the subjects I will continue to study seriously throughout my life, alongside astronomy, computer science, physics, math, philosophy, literature, history, movies, art, and music. Just like <a href="https://en.wikipedia.org/wiki/Isaac_Newton\'s_occult_studies" target="_blank">Isaac Newton</a>.',
    "qa.q6": "What's your story with traveling?",
    "qa.a6":
      "I have spent my life navigating multiple cultural contexts." +
      "<br><br>" +
      "Language has fascinated me for decades: from Chomsky’s theories to the cultural and social dimensions of how humans communicate. Born and raised in Brazil in a European-descended family and living in the United States since 2009, I have experienced firsthand the complexities derived by communication, as well as the subtle ways in which culture shapes how we understand and interact with one another." +
      "<br><br>" +
      "During the first part of my life, I had a big dream of exploring the world and experiencing different traditions, so I took every opportunity to travel through my research. Over the last decade, my work as an engineer has paid reasonably well and allowed me to work remotely, which has enabled me to pursue <a href=\"https://gist.github.com/von-steinkirch/538484386a269e1ab6703ffa11480007\" target=\"_blank\">this objective</a> consistently." +
      "<br><br>" +
      'I’ve been to 30+ countries, lived in dozens of cities, and visited almost every state in the U.S. One of my goals for the second part of my life is to continue traveling with my family and <a href="https://matrix.nullstar.fun/" target="_blank">telling beautiful, compelling stories</a> about these experiences and the things I\'ve seen.',
    "qa.q7": "What's your story with religions?",
    "qa.a7":
      "My family is German and Italian, with a Jewish side, but I was raised Catholic (and I am confirmed). In my 20s, I became atheist. In my 30s, I explored several aspects of spirituality, including Eastern philosophies (and I was vegetarian for many years)." +
      "<br><br>" +
      'Nowadays, although I am drawn to the Jewish and Christian traditions, my views of reality remain highly eclectic (as you can see from <a href="https://choices.vonsteinkirch.com/" target="_blank">some</a> of my artistic side projects).' +
      "<br><br>" +
      "In a practical sense, I believe I've found the personal answers I needed. I live a peaceful but stoic and self-disciplined life, devoted to my craft and the people I love. I read a lot of philosophy and poetry, and I look at the flowers and the sky with awe.",
    "qa.q8": "What's your story with bitcoin?",
    "qa.a8":
      "It's not very fashionable to say this today, but <i>we are all Satoshi</i>. All I can say is that I've been using the handle <code>bytegirl (bt3gl)</code> <a target=\"_blank\" href=\"https://web.archive.org/web/20070322015644/http://fly.to/bytegirl\">since 1998</a>. And, cute enough, <code>bitcoin.org</code> was registered on August 18, 2008 — while the seminal <a target=\"_blank\" href=\"https://bitcoin.org/bitcoin.pdf\">paper</a> came out on <i>the best holiday of the year</i>." +
      "<br><br>" +
      'Back in <b><a target="_blank" href="https://web.archive.org/web/20110410001836/http://en.wikipedia.org/wiki/User:Steinkirch">2008</a>, I was already <a target="_blank" href="https://web.archive.org/web/20090620090344/http://www.steinkirch.org/">indoctrinated in the philosophies of decentralization</a>. My mom had completed a <a target="_blank" href="https://acervodigital.ufpr.br/xmlui/bitstream/handle/1884/24232/PDF%20-%20DELLA%20TORRE%20SILVANA%20VERSAO%20FINAL%20PUBLICACAO.pdf?sequence=1&isAllowed=y">master\'s thesis on financial decentralization in Brazilian schools</a>, and I was reading a lot of anarchist and libertarian texts. On top of that, I\'ve always found the mathematics of cryptography beautiful, as well as questions like how <a target="_blank" href="https://github.com/future-ai-org/quantum-computing-toolkit">quantum computers</a> might eventually <a target="_blank" href="https://www.youtube.com/watch?v=1Fp6ibfOQ4Y">break</a> existing cryptographic systems.' +
      "<br><br>" +
      'I returned to these ideas after leaving my amazing engineering role at Shopify at the end of 2021 to co-found a decentralized storytelling company (DAO) with a few friends (<a target="_blank" href="https://etherscan.io/address/0x9213256fe89fa0428e8546910a8d78180dbbdc38#code">Storyteller NFT</a>; <a target="_blank" href="https://www.youtube.com/watch?v=9uV2SURf_5Y">Midsummer</a>; <a target="_blank" href="https://paragraph.com/@getstory/l0gline-i-the-newsletter-for-web3-filmmakers">Story Protocol</a>). The venture was short-lived, but I ended up staying in the space for a few years, working on problems involving <a target="_blank" href="https://github.com/cypherpunk-symposium/dark-forest-toolkit">fair</a> <a target="_blank" href="https://github.com/urani-trade">arbitrage</a>, <a target="_blank" href="https://github.com/cypherpunk-symposium">game theory, privacy, protocols, and cryptography</a>.' +
      "<br><br>" +
      'As of 2026, I\'ve returned to the AI/ML space, and this is where I\'ll be building for the next decades. Although I still believe in the ethos of decentralization, I cannot endorse how toxic and casino-like things have become — <a target="_blank" href="https://gist.github.com/von-steinkirch/746bb4dffa5ba4c0e1042c4f822ecf72">but I do hope this will change</a>.',
    "qa.q9": "Do you have Instagram, OF, or any other form of personal online engagement?",
    "qa.a9":
      '<aside class="qa-warning">' +
      "<p>No. Obviously not. Never did, never will. My career and studies as an engineer and scientist have been my main focus throughout my entire life.</p>" +
      "<p>I am, and have always been, a very private person. I do not have and I never had any social media presence or other forms of online engagement beyond my GitHub (and the projects within it), personal YouTube, and email. The only official links for any of my work or projects are, and have always been, those listed on my website. If you have come across with any other links or accounts, they are and have always been criminal impersonations.</p>" +
      "<p>Any access to, or streaming from, any of my devices is, and has always been, illegal and constitutes a violation of my privacy, dignity, and human rights. Any distribution of personal photographs or videos depicting my private life is, and has always been, illegal and constitutes a violation of my privacy, dignity, and human rights.</p>" +
      "<p>Offenders will be prosecuted to the fullest extent of the law. If you are aware of any such incidents, I'd deeply appreciate it if you INFORM THE POLICE and at <code>contact@vonsteinkirch.com</code>.</p>" +
      "</aside>",
    "qa.slider":
      "impossible is a state of mind&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it always seems impossible until it's done&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to achieve the impossible, one must attempt the absurd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the word impossible is not in my dictionary&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a winner is a dreamer who never gives up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the harder the battle, the greater the triumph&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    "error.message": "page not found",
    "error.home": "back home",
  },
  ja: {
    "chrome.language": "言語",
    "chrome.languageToJa": "日本語に切り替える",
    "chrome.languageToEn": "英語に切り替える",
    "nav.work": "仕事",
    "nav.blog": "ブログ",
    "role.physicist": "理論天体物理学者",
    "role.engineer": "プリンシパルソフトウェアエンジニア",
    "home.bio.title": "プロフィール",
    "home.bio":
      '私は出身としては<b><a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/">理論物理学者</a></b>です（サンパウロ大学で学士、修士課程を経て、ストーニーブルック大学で博士号。ロスアラモス国立研究所およびブルックヘブン国立研究所で大学院研究、<b><a target="_blank" href="https://web.archive.org/web/20090620090344/http://www.steinkirch.org/">学部時代の研究</a></b>はNASAゴダード宇宙飛行センター）。職業としては<b><a target="_blank" href="https://github.com/von-steinkirch">プリンシパルソフトウェアエンジニア</a></b>です（Shopify、Apple、Etsy、Yelp、スタートアップ、個人プロジェクト——個人貢献者としてもリーダーとしても）。' +
      "<br><br>" +
      'プログラミングは<b><a target="_blank" href="https://web.archive.org/web/20070322015644/http://fly.to/bytegirl">中学</a></b>から始め、生涯をエンジニアリングと科学に捧げてきました。AI/MLとの関わりは高校時代、エキスパートシステム（「AIドクター」）で全国大会1位を取ったところから始まり、博士課程ではロスアラモスで中性子星の状態方程式の論文に取り組みながら（その頃、機械学習とロボット工学の大学院講義も受講していました）、その後エンジニアとしての仕事の<b><a target="_blank" href="https://singularity.nullstar.fun/ouroboros-statement.html">さまざまな局面</a></b>でも続いてきました。' +
      "<br><br>" +
      'いまはLLMをはじめ、この分野の多くの魅力的な進展を受けて、幅広く作り、調べています。<b><a target="_blank" href="https://marina.nullstar.fun/pages/post.html?post=idea_nullstar">自作のハーネスとメモリスタックでエージェント群を動かしたり</a></b>、ローカルモデルを試したり、論文や技術文献を読んだり、色とりどりのLinuxワークステーションで大量のコードを書いたりしています。' +
      "<br><br>" +
      "毎日を情熱に捧げられること——技術が加速するこの非凡な時代に、学び、試し、理解を深め続けられること——に感謝しています。そして、存在の最後の一息まで、そうでありたいと思っています。",
    "home.interests.title": "長期的な知的関心",
    "home.interests.ai":
      '<span class="highlight-text font-orbitron">AI + ML</span> → マルチプレイヤーエージェント、インフラ、グラフ、メモリ、解釈可能性、ロボット、ローカル、AGI',
    "home.interests.physics":
      '<span class="highlight-text font-orbitron">物理学</span> → <a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/qi.pdf">量子</a><a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/qft.pdf">場</a><a target="_blank" href="https://github.com/future-ai-org/my-phd-theoretical-physics-calculations-and-notes">の理論</a>、<a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/group.pdf">群論</a>、<a href="https://www.astro.sunysb.edu/steinkirch/reviews/cte_cosmologica_nov_2007.pdf" target="_blank">宇宙論</a>、ゲーム理論、天文学、量子ビット',
    "home.interests.code":
      '<span class="highlight-text font-orbitron">きれいなコード</span> → <a target="_blank" href="https://github.com/future-ai-org/master-algorithms-py">Python</a>、Rust、Lean、アルゴリズム、形式検証、論理、ブロックチェーン、セキュリティ',
    "home.interests.story":
      '<span class="highlight-text font-orbitron">物語</span> → <a href="https://matrix.nullstar.fun" target="_blank">英雄の旅</a>、哲学、神学、人間の条件、歴史、アガペー',
    "home.pubs.title": "公開した技術研究",
    "home.oss.title": "自ら開発したオープンソース",
    "home.contrib.title": "貢献したサードパーティのプロジェクト",
    "home.cat.physics": "理論物理学 || 天体物理学 || 量子コンピューティング",
    "home.cat.ai": "人工知能 || 機械学習 || ロボット工学",
    "home.cat.sec": "プライバシー || セキュリティ || インフラ",
    "home.cat.chain": "ブロックチェーン || 分散型金融",
    "home.cat.fun": "趣味 || AI駆動のフロントエンド",
    "home.easter": "イースターエッグ →",
    "blog.title": "ただのテックブログ",
    "blog.intro":
      "ここでは考えを書き留め、自分を微笑ませてくれた研究や仕事に敬意を払い、たいてい金曜日には、その週に知ったおもしろいことを共有します。",
    "blog.drafts.title": "下書きバックログ",
    "blog.drafts.intro":
      "空き時間にいじっているものの待ち行列——いずれレビューになるかもしれないものたちです。",
    "blog.empty": "まだ投稿がありません。",
    "blog.indexError": "技術ノートの索引を読み込めませんでした。",
    "blog.draftsError": "下書き一覧を読み込めませんでした。",
    "blog.draftsEmpty": "ここにはまだ何もありません。",
    "blog.back": "← 一覧に戻る",
    "blog.copy": "コピー",
    "blog.copied": "コピーしました",
    "blog.copyFailed": "コピーに失敗",
    "blog.copyAria": "コードをクリップボードにコピー",
    "blog.missingSlug": "投稿のスラッグがありません。",
    "blog.loadError": "投稿を読み込めませんでした。",
    "blog.code": "コード",
    "qa.title": "Q & A",
    "qa.intro": "仕事の向こう側にいる人間を、同僚に少し見せるページです。",
    "qa.q1": "日常はどんな感じですか？",
    "qa.a1":
      "<p>ルーティンが好きで、仕事と家族が私の二大優先事項です。そのため、朝はだいたい同じリズムです：</p>" +
      '<ul class="qa-routine qa-routine--day">' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>起床 + シャワー + スパ</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span><a target="_blank" href="https://gist.github.com/von-steinkirch/454e3771e45fa1129f5eb2478764f183">ジャーナル</a> + ハタヨガまたはカンフー</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>コーヒー + タンパク質中心の朝食</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span><a target="_blank" href="https://science.nasa.gov/apod/">APOD</a> + 少しチェスとピアノ</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">☀️</span><span>仕事開始！</span></li>' +
      "</ul>" +
      "<p>夜はたいてい：</p>" +
      '<ul class="qa-routine qa-routine--night">' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span><a target="_blank" href="https://gist.github.com/von-steinkirch/abceab872b7a4bab220e64230f92a66a">読書</a>、<a target="_blank" href="https://gist.github.com/von-steinkirch/2f6c82155253bf9fc113fbc966037a7d">映画</a>、<a href="https://gist.github.com/von-steinkirch/49efc13bf9e6b13ee9ccb69683ba832e" target="_blank">ゲーム</a>、ダンス、またはトレーニング</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>メッセージとニュースの確認 + 翌日の計画</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>シャワー + スパ + 瞑想</span></li>' +
      '<li><span class="qa-routine-mark" aria-hidden="true">🌙</span><span>眠って、とてもいい夢を見る 😴</span></li>' +
      "</ul>",
    "qa.q2": "プログラミングとの関わりは？",
    "qa.a2":
      '初めてターミナルを触ったのは7歳くらいのときでした。<a target="_blank" href="/images/8086.png">i386</a>マシン上の<a target="_blank" href="https://en.wikipedia.org/wiki/MS-DOS">MS-DOS</a>です。中学でプログラミングを始め、BASICやPascal/Delphiといった（とても古い）言語を使いました。高校でC/C++に出会い、大学院でPythonに出会いました。' +
      "<br><br>" +
      'それ以来Pythonが主言語になり、2014年には<a target="_blank" href="https://github.com/cypherpunk-symposium/master-algorithms-py" rel="noopener noreferrer">本まで出しています</a>（アルゴリズムとデータ構造における古典的な計算機科学の問題に対する、最初期のオープンソースPython解答集のひとつです）。' +
      "<br><br>" +
      'キャリアを通じて、ほかにも多くの言語で本番コードを書いてきました。<a target="_blank" href="https://en.wikipedia.org/wiki/Ruby_(programming_language)">Ruby</a>（Shopify）、<a target="_blank" href="https://en.wikipedia.org/wiki/Swift_(programming_language)">Swift</a>と<a target="_blank" href="https://en.wikipedia.org/wiki/Objective-C">Objective-C</a>（Apple）、<a target="_blank" href="https://en.wikipedia.org/wiki/Go_(programming_language)">Go</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/C++">C++</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Rust_(programming_language)">Rust</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Assembly_language">Assembly</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Solidity">Solidity</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Shell_script">Shell</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Terraform_(software)">Terraform</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/CUDA">CUDA</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/IDL_(programming_language)">IDL</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/MATLAB">MATLAB</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/R_(programming_language)">R</a>、そして<a target="_blank" href="https://en.wikipedia.org/wiki/JavaScript">JavaScript</a>です。' +
      "<br><br>" +
      'いまは<a target="_blank" href="https://en.wikipedia.org/wiki/Lean_(programming_language)">Lean</a>と<a target="_blank" href="https://en.wikipedia.org/wiki/Lua">Lua</a>の大ファンで、いつか<a target="_blank" href="https://en.wikipedia.org/wiki/Haskell_(programming_language)">Haskell</a>も学びたいと思っています。そしてAIとバックエンドはPythonとRust、フロントエンドは<a target="_blank" href="https://en.wikipedia.org/wiki/TypeScript">TypeScript</a>で書いています。',
    "qa.q3": "Linuxとの関わりは？",
    "qa.a3":
      'Linuxを知り、学んだのは高校時代、<a target="_blank" href="https://en.wikipedia.org/wiki/Federal_Institute_of_Paran%C3%A1">ET-UFPR</a>で勉強していたころで、おもに<a target="_blank" href="https://augustocampos.net/revista-do-linux/">Revista do Linux（またはLinux Brasil）</a>という雑誌を通じてでした。当時使っていたのはブラジルのディストリビューション、<a target="_blank" href="https://de.wikipedia.org/wiki/Conectiva">Conectiva Linux</a>で、やがてその会社で少しインターンもすることになりました。' +
      "<br><br>" +
      '大学ではまず二年間、<a target="_blank" href="https://en.wikipedia.org/wiki/Polytechnic_School_of_the_University_of_S%C3%A3o_Paulo">POLI-USP</a>で工学を学び、その後<a target="_blank" href="https://en.wikipedia.org/wiki/Institute_of_Physics_of_the_University_of_S%C3%A3o_Paulo">物理学</a>の学士号を取りました。そのあいだ、さまざまなディストリビューションを試し、多くは<a target="_blank" href="https://en.wikipedia.org/wiki/GNU_GRUB">GRUB</a>によるデュアル／マルチブートでした。ハードコアな<a target="_blank" href="https://en.wikipedia.org/wiki/Gentoo_Linux">Gentoo</a>や<a target="_blank" href="https://en.wikipedia.org/wiki/Slackware">Slackware</a>から、簡単すぎるくらいの<a target="_blank" href="https://en.wikipedia.org/wiki/Ubuntu">Ubuntu</a>や<a target="_blank" href="https://en.wikipedia.org/wiki/Linux_Mint">Mint</a>まで。最終的なお気に入りは<a target="_blank" href="https://en.wikipedia.org/wiki/Fedora_Linux">Fedora</a>と<a target="_blank" href="https://en.wikipedia.org/wiki/Debian">Debian</a>になりました。違いが十分にあったので、それぞれを走らせる二台を持つのは楽しかったです。' +
      "<br><br>" +
      '<a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/">博士課程</a>ではおもにFedoraを使い、研究室や大規模計算システムでは<a target="_blank" href="https://en.wikipedia.org/wiki/Red_Hat">Red Hat</a>や本物の<a target="_blank" href="https://en.wikipedia.org/wiki/Unix">UNIX</a>サーバも使いました。ソフトウェアエンジニアになって最初の一年はAppleのシニアエンジニアとして入り、しばらく<a target="_blank" href="https://en.wikipedia.org/wiki/MacOS">macOS</a>も試しました。' +
      "<br><br>" +
      'いまはすべてのマシンがLinuxです（2025年から<a target="_blank" href="https://en.wikipedia.org/wiki/Omarchy">Omarchy</a>を使っています）。',
    "qa.q4": "ゲームとの関わりは？",
    "qa.a4":
      '5歳くらいのとき、父が<a target="_blank" href="https://en.wikipedia.org/wiki/Atari">Atari</a>を家に持ってきて、それから何晩も遊んで、父特製のフライドポテトを食べました。10歳前後で母がスーパーファミコンを買ってくれて、今でも史上最高のゲーム機です。その後、メガドライブ（Sega Genesis）、NINTENDO 64、PlayStation 1、2、3、4、Xbox 360、Wii、Meta VRシリーズ。同時に、ずっとPCゲーマーでもありました。' +
      "<br><br>" +
      '<a target="_blank" href="https://gist.github.com/von-steinkirch/49efc13bf9e6b13ee9ccb69683ba832e">好きなゲームは多すぎます</a>が、プレイ時間で言えば、昔ながらのPC LANゲームと、SFCおよびPS1の古典を挙げます。とくにResident Evil、Silent Hill、Tomb Raider、Half-Life/Portal、Left 4 Dead、Age of Empires、Fallout、WoW、StarCraft、Diabloが甘いスポットです。' +
      "<br><br>" +
      '追記。ずっとLinuxガールですが、当時の<a href="https://steamcommunity.com/id/bt3gl" target="_blank">Steam</a>やBlizzardのゲームのため、Windowsを使わざるを得なかったかもしれません。あるいは、そうでもないかも。',
    "qa.q5": "天文学と占星術との関わりは？",
    "qa.a5":
      "科学とコンピュータに夢中で育ち、どちらがより好きか、決められませんでした。" +
      "<br><br>" +
      'それは大学で明らかになりました。（電気／コンピュータ）工学から始め、途中で物理学に転向したのです。当時は<a target="_blank" href="https://gist.github.com/von-steinkirch/05851c6268dc569b9281c9c57662ec27">カール・セーガン</a>、<a href="https://en.wikipedia.org/wiki/Marcelo_Gleiser" target="_blank">マルセロ・グレイザー</a>、<a href="https://en.wikipedia.org/wiki/Brian_Greene" target="_blank">ブライアン・グリーン</a>、<a target="_blank" href="https://en.wikipedia.org/wiki/Kip_Thorne">キップ・ソーン</a>、<a href="https://en.wikipedia.org/wiki/Sean_M._Carroll" target="_blank">ショーン・キャロル</a>、<a href="https://en.wikipedia.org/wiki/Stephen_Hawking" target="_blank">スティーヴン・ホーキング</a>、<a href="https://en.wikipedia.org/wiki/Steven_Weinberg" target="_blank">スティーヴン・ワインバーグ</a>、<a href="https://en.wikipedia.org/wiki/Richard_Feynman" target="_blank">リチャード・ファインマン</a>、<a href="https://en.wikipedia.org/wiki/Alan_Guth" target="_blank">アラン・グース</a>、そしてコペンハーゲン学派の思想家たち——<a href="https://en.wikipedia.org/wiki/Werner_Heisenberg" target="_blank">ハイゼンベルク</a>や<a href="https://en.wikipedia.org/wiki/Niels_Bohr" target="_blank">ボーア</a>——をたくさん読みました。これ以上の主題はなく、博士課程に進みました。' +
      "<br><br>" +
      "占星術はまったく信じていませんでした（ただし、私のある自閉的な癖で、会ったすべての人の誕生日を覚えています）。実際、占星術を反証する実験を設計しようとしたことさえあります。同僚にアンケートを記入してもらい、性格が星座では説明できないことを統計的に示そうとしました。当時の占星術との接点がホロスコープ類だけだったので、結論は明らかだと思えました。" +
      "<br><br>" +
      '<a href="https://www.astro.sunysb.edu/steinkirch/" target="_blank">ストーニーブルックで理論物理学の博士号を目指した五年間</a>、私を魅了した物理学の問いの多くを、両極端——とても大きなもの、宇宙と、とても小さなもの、素粒子——で探る幸運に恵まれました。これらの問いは、その後も一生考え続けています。いま、AIの登場とともに、多くがついに解かれるのを期待しており、未来が楽しみです。' +
      "<br><br>" +
      '占星術との関係は、しかし、かなり予想外の展開をたどりました。2020年、<a href="https://github.com/zapatacomputing/z-qml" target="_blank">Zapata</a> <a href="https://github.com/zapatacomputing/z-lstm" target="_blank">Computing</a>の博士課程の同僚が出生図を教えてくれました。とても知的な人だったので、もっと調べることにしました。興味を持ったものに対していつもそうするように、兎穴に入りました。何十冊も読み、何百もの出生図を分析し、生涯使ってきた懐疑的で科学的な姿勢を保ったまま。' +
      "<br><br>" +
      '相関やパターン、とくにアセンダントと角度に関する理論に気づき始め、<a target="_blank" href="https://www.astro.sunysb.edu/steinkirch/books/group.pdf">群論</a>など関連分野の知識を借りた数学的理論をつくっています。自信を持って答えられない——しかし簡単に切り捨てることもできない——未解決の問いが、まだいくつかあります。' +
      "<br><br>" +
      'だから占星術は、天文学、計算機科学、物理学、数学、哲学、文学、歴史、映画、芸術、音楽と並んで、生涯まじめに学び続ける主題のひとつになりました。<a href="https://en.wikipedia.org/wiki/Isaac_Newton\'s_occult_studies" target="_blank">アイザック・ニュートン</a>のように。',
    "qa.q6": "旅との関わりは？",
    "qa.a6":
      "私は生涯を通じて複数の文化的文脈のあいだを行き来してきました。" +
      "<br><br>" +
      "言語そのものにも、何十年も魅了されてきました。チョムスキーの理論から、人間がどうコミュニケーションするかの文化的・社会的な側面まで。ヨーロッパ系の家系をもつブラジルで生まれ育ち、2009年からアメリカに住んでいる私は、コミュニケーションから生じる複雑さ、そして文化が互いの理解や関わり方をいかに形づくるかを、身をもって経験してきました。" +
      "<br><br>" +
      "人生の前半、世界を探り、異なる伝統を体験するという大きな夢があり、研究を通じて旅する機会はすべて取りました。この十年、エンジニアとしての仕事はそこそこ報酬があり、リモートもできたので、<a href=\"https://gist.github.com/von-steinkirch/538484386a269e1ab6703ffa11480007\" target=\"_blank\">この目標</a>を一貫して追うことができました。" +
      "<br><br>" +
      '30か国以上を訪れ、何十もの都市に住み、アメリカのほぼ全州に行きました。人生の後半の目標のひとつは、家族と旅を続け、これらの経験と見てきたものについて<a href="https://matrix.nullstar.fun/" target="_blank">美しく、心を打つ物語を語ること</a>です。',
    "qa.q7": "宗教との関わりは？",
    "qa.a7":
      "家族はドイツ系とイタリア系で、ユダヤの系統もありますが、カトリックで育ち（堅信も受けています）、20代で無神論者になり、30代では東洋思想を含むスピリチュアリティのいくつかの面を探りました（何年も菜食でした）。" +
      "<br><br>" +
      'いまはユダヤとキリスト教の伝統に惹かれつつも、現実観はとても折衷的なままです（<a href="https://choices.vonsteinkirch.com/" target="_blank">いくつかの</a>芸術的なサイドプロジェクトからもわかると思います）。' +
      "<br><br>" +
      "実務的な意味では、自分に必要な個人的な答えは見つかったと思っています。穏やかだがストイックで自己規律のある生活を送り、技芸と愛する人たちに捧げています。哲学と詩をたくさん読み、花と空を畏れをもって見ます。",
    "qa.q8": "ビットコインとの関わりは？",
    "qa.a8":
      'いまこれを言うのはあまり流行っていませんが、<i>私たちはみなサトシ</i>です。言えるのは、ハンドル <code>bytegirl (bt3gl)</code> を<a target="_blank" href="https://web.archive.org/web/20070322015644/http://fly.to/bytegirl">1998年から</a>使っているということだけです。そしてかわいいことに、<code>bitcoin.org</code> は2008年8月18日に登録され——あの画期的な<a target="_blank" href="https://bitcoin.org/bitcoin.pdf">論文</a>は<i>一年でいちばんいい祝日</i>に出ました。' +
      "<br><br>" +
      '<b><a target="_blank" href="https://web.archive.org/web/20110410001836/http://en.wikipedia.org/wiki/User:Steinkirch">2008年</a>にはすでに、<a target="_blank" href="https://web.archive.org/web/20090620090344/http://www.steinkirch.org/">分散の哲学に染まっていました</a>。母は<a target="_blank" href="https://acervodigital.ufpr.br/xmlui/bitstream/handle/1884/24232/PDF%20-%20DELLA%20TORRE%20SILVANA%20VERSAO%20FINAL%20PUBLICACAO.pdf?sequence=1&isAllowed=y">ブラジルの学校における財政的分散についての修士論文</a>を書き上げていて、私はアナーキストやリバタリアンのテキストをたくさん読んでいました。そのうえ、暗号の数学の美しさ、そして<a target="_blank" href="https://github.com/future-ai-org/quantum-computing-toolkit">量子コンピュータ</a>がいつか既存の暗号系を<a target="_blank" href="https://www.youtube.com/watch?v=1Fp6ibfOQ4Y">破る</a>かもしれない、といった問いにも、ずっと惹かれてきました。' +
      "<br><br>" +
      'これらの考えに戻ったのは、2021年末にShopifyの素晴らしいエンジニア職を離れ、数人の友人と分散型ストーリーテリング会社（DAO）を共同創業してからです（<a target="_blank" href="https://etherscan.io/address/0x9213256fe89fa0428e8546910a8d78180dbbdc38#code">Storyteller NFT</a>、<a target="_blank" href="https://www.youtube.com/watch?v=9uV2SURf_5Y">Midsummer</a>、<a target="_blank" href="https://paragraph.com/@getstory/l0gline-i-the-newsletter-for-web3-filmmakers">Story Protocol</a>）。ベンチャーは短命でしたが、その後数年その領域に留まり、<a target="_blank" href="https://github.com/cypherpunk-symposium/dark-forest-toolkit">公正な</a><a target="_blank" href="https://github.com/urani-trade">裁定</a>、<a target="_blank" href="https://github.com/cypherpunk-symposium">ゲーム理論、プライバシー、プロトコル、暗号</a>といった問題に取り組みました。' +
      "<br><br>" +
      '2026年現在、AI/MLの領域に戻っており、これからの数十年はここで作ります。分散の精神はいまも信じていますが、有毒でカジノ化した現状は支持できません——<a target="_blank" href="https://gist.github.com/von-steinkirch/746bb4dffa5ba4c0e1042c4f822ecf72">それでも、変わってほしいとは願っています</a>。',
    "qa.q9": "Instagram、OF、その他の個人的なオンライン発信はしていますか？",
    "qa.a9":
      '<aside class="qa-warning">' +
      "<p>いいえ。当然しません。したこともなく、これからもありません。エンジニアおよび科学者としてのキャリアと研究が、生涯の主眼です。</p>" +
      "<p>私は、そして常に、非常に私的な人間です。GitHub（とその中のプロジェクト）、個人のYouTube、メール以外に、ソーシャルメディア上の存在や他の形態のオンライン発信は持っておらず、持ったこともありません。私の仕事やプロジェクトの公式リンクは、そして常に、このウェブサイトに掲載されているものだけです。それ以外のリンクやアカウントに出会った場合、それらは、そして常に、犯罪的ななりすましです。</p>" +
      "<p>私のいずれかのデバイスへのアクセス、またはそこからのストリーミングは、そして常に、違法であり、プライバシー、尊厳、人権の侵害です。私生活を写した個人の写真や動画の配布は、そして常に、違法であり、プライバシー、尊厳、人権の侵害です。</p>" +
      "<p>加害者は法の最大限の範囲で訴追されます。こうした事案を知っている場合は、警察に通報し、<code>contact@vonsteinkirch.com</code> にも知らせていただけると深く感謝します。</p>" +
      "</aside>",
    "qa.slider":
      "不可能とは心の状態である&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;いつだって、成し遂げるまでは不可能に見える&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不可能を成すには、不条理に挑まねばならない&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;私の辞書に不可能という文字はない&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勝者とは、決して諦めない夢想家である&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戦いが過酷であるほど、勝利は大きい&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    "error.message": "ページが見つかりません",
    "error.home": "ホームに戻る",
  },
};

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (LOCALES.includes(stored)) {
      return stored;
    }
  } catch {
    // private mode / blocked storage
  }
  return "en";
}

function writeStoredLocale(locale) {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // private mode / blocked storage
  }
}

function bootLocaleAttr(locale) {
  document.documentElement.setAttribute("data-locale", locale);
  document.documentElement.lang = locale === "ja" ? "ja" : "en-us";
}

bootLocaleAttr(readStoredLocale());

function t(key) {
  const locale = document.documentElement.getAttribute("data-locale") || "en";
  const dict = MESSAGES[locale] || MESSAGES.en;
  if (Object.prototype.hasOwnProperty.call(dict, key)) {
    return dict[key];
  }
  if (Object.prototype.hasOwnProperty.call(MESSAGES.en, key)) {
    return MESSAGES.en[key];
  }
  return key;
}

function ensureJpFont() {
  if (document.getElementById(JP_FONT_ID)) {
    return;
  }
  const link = document.createElement("link");
  link.id = JP_FONT_ID;
  link.rel = "stylesheet";
  link.href = JP_FONT_HREF;
  document.head.appendChild(link);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (!key) {
      return;
    }
    el.innerHTML = t(key);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key) {
      return;
    }
    el.setAttribute("aria-label", t(key));
  });
}

function syncSelectorState(locale) {
  document.querySelectorAll(".lang-toggle").forEach((el) => {
    const isJa = locale === "ja";
    el.setAttribute("aria-checked", isJa ? "true" : "false");
    el.setAttribute("aria-label", isJa ? t("chrome.languageToEn") : t("chrome.languageToJa"));
    el.title = isJa ? t("chrome.languageToEn") : t("chrome.languageToJa");
  });
}

function applyLocale(locale) {
  const next = LOCALES.includes(locale) ? locale : "en";
  bootLocaleAttr(next);
  if (next === "ja") {
    ensureJpFont();
  }
  applyTranslations();
  syncSelectorState(next);
  document.documentElement.classList.add("i18n-ready");
  window.dispatchEvent(new CustomEvent("marina:localechange", { detail: { locale: next } }));
}

function setLocale(locale) {
  const next = LOCALES.includes(locale) ? locale : "en";
  document.querySelectorAll(".lang-color-modes-illu.isInitialLang").forEach((el) => {
    el.classList.remove("isInitialLang");
  });
  writeStoredLocale(next);
  applyLocale(next);
}

function dogIlluSvg() {
  const paws =
    '<path d="M43 44H49"></path>' +
    '<path d="M57 44H63"></path>';
  const nose =
    '<path d="M50 25H56"></path>';
  const neck =
    '<path d="M47 34C48 42 58 42 59 34"></path>';
  const ears =
    '<path d="M38 16C28 12 25 24 30 34C33 37 38 34 41 24"></path>' +
    '<path d="M68 16C78 12 81 24 76 34C73 37 68 34 65 24"></path>';
  const sleepHead =
    '<path d="M38 20C28 18 26 28 31 36C34 38 39 35 41 27"></path>' +
    '<path d="M68 20C78 18 80 28 75 36C72 38 67 35 65 27"></path>' +
    '<circle cx="53" cy="20" r="12"></circle>' +
    '<ellipse cx="53" cy="28" rx="8" ry="5"></ellipse>' +
    '<path d="M50 27H56"></path>' +
    '<path d="M47 36C48 43 58 43 59 36"></path>' +
    paws;
  const sitHead =
    ears +
    '<circle cx="53" cy="18" r="13"></circle>' +
    '<ellipse cx="53" cy="26" rx="9" ry="6"></ellipse>' +
    nose +
    neck +
    paws;
  const sitEyes =
    '<path d="M45 14V19"></path>' +
    '<path d="M61 14V19"></path>';
  const mouth =
    '<path d="M47 28C50 31 56 31 59 28"></path>';
  const lookHead =
    sitHead + sitEyes + mouth;
  const awakeHead =
    lookHead;

  return (
    '<svg class="lang-color-modes-illu isInitialLang" width="106" height="60" viewBox="0 0 106 60" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<g class="lang-color-modes-illu-group lang-color-modes-illu-green">' +
        '<circle cx="5.5" cy="12.5" r="4"></circle>' +
        '<circle cx="18.5" cy="5.5" r="4"></circle>' +
        '<path d="M18.5 9.5L18.5 27.5"></path>' +
        '<path d="M18.5 23.5C6 23.5 5.5 23.6064 5.5 16.5"></path>' +
      "</g>" +
      '<g class="lang-color-modes-illu-group lang-color-modes-illu-orange">' +
        '<path d="M25 46C25 41 21 38 17 38C13 38 10 41 10 45C10 47 11 49 13 50C11 51 10 53 10 55C10 59 13 59 17 59C21 59 25 56 25 54H81C81 56 85 59 89 59C93 59 96 59 96 55C96 53 95 51 93 50C95 49 96 47 96 45C96 41 93 38 89 38C85 38 81 41 81 46H25Z"></path>' +
      "</g>" +
      '<g class="lang-color-modes-illu-group lang-color-modes-illu-blue">' +
        '<g class="lang-color-modes-illu-frame">' + sleepHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sitHead + sitEyes + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sitHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sitHead + sitEyes + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sitHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sitHead + sitEyes + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + lookHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + awakeHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + lookHead + "</g>" +
        '<g class="lang-color-modes-illu-frame">' + sleepHead + "</g>" +
      "</g>" +
    "</svg>"
  );
}

function createDogIllu() {
  const holder = document.createElement("div");
  holder.innerHTML = dogIlluSvg();
  return holder.firstElementChild;
}

function glyphSvg() {
  return (
    '<svg class="theme-toggle-moon" width="14" height="13" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.05 4.28 8.51 3.91C8.49 4.1 8.44 4.42 8.39 4.67H8.17C7.55 4.67 6.89 4.76 6.29 4.9L6.38 3.75C7.93 3.69 9.62 3.54 10.85 3.31L10.84 1.85C9.45 2.17 8.09 2.34 6.55 2.4L6.68 1.71C6.73 1.52 6.78 1.29 6.85 1.04L5.22 1C5.23 1.21 5.2 1.52 5.19 1.76L5.11 2.44H4.61C3.84 2.44 2.73 2.34 2.29 2.26L2.33 3.72C2.92 3.75 3.9 3.8 4.56 3.8H4.96C4.91 4.32 4.87 4.85 4.85 5.39C3.08 6.22 1.75 7.91 1.75 9.54C1.75 10.81 2.53 11.37 3.45 11.37C4.12 11.37 4.79 11.17 5.4 10.86L5.57 11.38L7.02 10.94C6.92 10.64 6.82 10.32 6.73 10.01C7.69 9.21 8.7 7.89 9.38 6.17C10.25 6.51 10.69 7.18 10.69 7.94C10.69 9.17 9.71 10.41 7.27 10.68L8.1 12C11.21 11.53 12.25 9.81 12.25 8.01C12.25 6.55 11.28 5.4 9.82 4.92ZM7.98 5.96C7.55 6.98 6.99 7.74 6.38 8.35C6.29 7.72 6.24 7.04 6.24 6.27V6.24C6.73 6.08 7.31 5.97 7.98 5.96ZM5.08 9.41C4.62 9.68 4.17 9.83 3.81 9.83C3.41 9.83 3.23 9.62 3.23 9.21C3.23 8.49 3.87 7.53 4.81 6.89C4.84 7.76 4.94 8.63 5.08 9.41Z"></path>' +
    "</svg>"
  );
}

function createSelector() {
  const isJa = readStoredLocale() === "ja";
  const el = document.createElement("span");
  el.className = "profile-color-modes-toggle no-select neon-toggle lang-toggle";
  el.tabIndex = 0;
  el.setAttribute("role", "switch");
  el.setAttribute("aria-checked", isJa ? "true" : "false");
  el.setAttribute("aria-label", isJa ? t("chrome.languageToEn") : t("chrome.languageToJa"));
  el.innerHTML =
    '<div class="profile-color-modes-toggle-track no-select neon-toggle-track"></div>' +
    '<div class="profile-color-modes-toggle-thumb neon-toggle-thumb">' +
      glyphSvg() +
    "</div>";
  const activate = () => setLocale(readStoredLocale() === "ja" ? "en" : "ja");
  el.addEventListener("click", activate);
  el.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
  return el;
}

function mountSelectors() {
  const locale = readStoredLocale();
  ensureJpFont();

  document.querySelectorAll(".profile-color-modes").forEach((modes) => {
    if (modes.querySelector(".lang-toggle")) {
      return;
    }
    const toggle = modes.querySelector(".js-promo-color-modes-toggle") ||
      modes.querySelector(".profile-color-modes-toggle:not(.lang-toggle)");
    const sel = createSelector();
    const dog = createDogIllu();
    if (toggle) {
      modes.insertBefore(dog, modes.firstElementChild);
      modes.insertBefore(sel, toggle);
    } else {
      modes.appendChild(dog);
      modes.appendChild(sel);
    }
  });

  document.querySelectorAll(".mobile-nav-sticky").forEach((bar) => {
    if (bar.querySelector(".lang-toggle")) {
      return;
    }
    const wrap = document.createElement("div");
    wrap.className = "lang-slot lang-slot--mobile";
    wrap.appendChild(createSelector());
    bar.appendChild(wrap);
  });

  if (document.body.classList.contains("error-404") && !document.querySelector(".lang-toggle")) {
    const wrap = document.createElement("div");
    wrap.className = "lang-slot lang-slot--404";
    wrap.appendChild(createSelector());
    document.body.appendChild(wrap);
  }

  syncSelectorState(locale);
}

function initI18n() {
  if (window.MARINA_I18N_LISTS) {
    Object.assign(MESSAGES.en, window.MARINA_I18N_LISTS.en || {});
    Object.assign(MESSAGES.ja, window.MARINA_I18N_LISTS.ja || {});
  }
  const locale = readStoredLocale();
  mountSelectors();
  applyLocale(locale);
}

window.MarinaI18n = {
  t,
  getLocale: () => document.documentElement.getAttribute("data-locale") || "en",
  setLocale,
  applyTranslations,
  applyLocale,
  initI18n,
  mountSelectors,
  readStoredLocale,
  ensureJpFont,
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}
