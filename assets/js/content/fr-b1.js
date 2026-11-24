/* French · B1 Intermédiaire */
FL.addLevel('fr', {
  code: 'B1',
  name: 'Intermédiaire',
  summary: 'Tell stories, imagine situations, talk about the future and build longer, connected sentences.',
  outcome: 'By the end of B1 you can tell a story in the past, express wishes and hypotheses, talk about the future and connect your ideas with pronouns and relative clauses.',
  lessons: [
    {
      title: 'Raconter une histoire',
      focus: 'Imparfait ou passé composé ?',
      minutes: 30,
      goals: ['Choose between the imparfait and the passé composé', 'Describe a scene and then tell what happened', 'Use time markers like soudain, pendant que, d’habitude'],
      slides: [
        { t: 'table', title: 'Deux temps, deux rôles', head: ['Imparfait — the scenery', 'Passé composé — the action'],
          rows: [['Description: Il **faisait** beau.', 'Event: Il **a commencé** à pleuvoir.'], ['Habit: Je **courais** chaque matin.', 'Single action: Ce matin, j’**ai couru** 5 km.'], ['Action in progress: Je **dormais**…', 'Interruption: …quand le téléphone **a sonné**.'], ['Feelings, age, time: J’**avais** 10 ans.', 'Change: Ce jour-là, j’**ai eu** peur.']] },
        { t: 'text', title: 'Les mots-clés',
          body: ['Often with the **imparfait**: d’habitude, souvent, tous les jours, pendant que, autrefois, à cette époque.', 'Often with the **passé composé**: soudain, tout à coup, un jour, ce jour-là, une fois, d’abord, ensuite, enfin.',
            'Think of a film: the **imparfait** is the camera showing the background; the **passé composé** is what suddenly happens.'] },
        { t: 'examples', title: 'Un samedi matin', items: [['C’était un samedi matin.', 'It was a Saturday morning.'], ['Il faisait beau et les oiseaux chantaient.', 'The weather was nice and the birds were singing.'], ['Je prenais mon café sur le balcon quand, tout à coup, j’ai entendu un bruit.', 'I was having my coffee on the balcony when suddenly I heard a noise.'], ['Je suis descendu et j’ai vu… un petit chat !', 'I went down and I saw… a little cat!'], ['Depuis ce jour-là, il habite avec moi.', 'Since that day, he has lived with me.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Quand je suis arrivé, il a plu.', 'Quand je suis arrivé, il pleuvait.', 'Background situation → imparfait.'], ['Je lisais quand il sonnait.', 'Je lisais quand il a sonné.', 'Interrupting action → passé composé.'], ['Quand j’étais jeune, je suis allé à l’école à pied tous les jours.', '…j’allais à l’école à pied tous les jours.', 'Repeated habit → imparfait.']] }
      ],
      vocab: [['soudain / tout à coup', 'suddenly'], ['pendant que', 'while'], ['un jour', 'one day'], ['d’habitude', 'usually'], ['entendre un bruit', 'to hear a noise'], ['sonner', 'to ring'], ['depuis ce jour-là', 'since that day'], ['à cette époque', 'at that time']],
      practice: [
        ['choice', 'Je ___ quand le téléphone a sonné.', ['dormais', 'ai dormi', 'dors', 'dormirai'], 'Action in progress → imparfait.'],
        ['choice', 'Tout à coup, la lumière ___.', ['s’est éteinte', 's’éteignait', 's’éteint', 's’éteignaient'], 'Sudden event → passé composé.'],
        ['gap', 'Il ___ (faire) très froid ce jour-là.', ['faisait'], 'Weather description → imparfait.'],
        ['gap', 'Hier soir, nous ___ (regarder) un film quand Paul est arrivé.', ['regardions'], 'Interrupted action in progress → imparfait.'],
        ['choice', 'Quand j’étais enfant, j’___ à l’école à pied.', ['allais', 'suis allé', 'vais', 'irai'], 'Habit in the past → imparfait.'],
        ['choice', 'Which expression introduces a sudden event?', ['tout à coup', 'd’habitude', 'souvent', 'pendant que'], '"Tout à coup" = suddenly → passé composé.'],
        ['match', 'Imparfait or passé composé?', [['description of the weather', 'imparfait'], ['a sudden event', 'passé composé'], ['a habit in the past', 'imparfait'], ['a completed single action', 'passé composé']]],
        ['order', 'Il pleuvait quand je suis sorti.', 'It was raining when I went out.'],
        ['listen', 'Je prenais mon café quand j’ai entendu un bruit.']
      ],
      summary: ['Imparfait = background, descriptions, habits, actions in progress.', 'Passé composé = events, completed actions, interruptions.', 'Clues: d’habitude / pendant que (imparfait) — soudain / un jour (passé composé).']
    },
    {
      title: 'Si j’avais le temps…',
      focus: 'Le conditionnel présent · si + imparfait',
      minutes: 30,
      goals: ['Form the conditionnel présent', 'Make polite requests and give advice', 'Imagine situations with si + imparfait'],
      slides: [
        { t: 'text', title: 'Formation',
          body: ['**Future stem + imparfait endings** (-ais, -ais, -ait, -ions, -iez, -aient).', 'The stem is usually the **infinitive** (verbs in -re lose the final **e**): parler → je **parler**ais · finir → je **finir**ais · prendre → je **prendr**ais.'] },
        { t: 'table', title: 'Radicaux irréguliers', intro: 'The same irregular stems are used for the future tense.',
          head: ['Verbe', 'Conditionnel', 'Verbe', 'Conditionnel'],
          rows: [['être', 'je serais', 'avoir', 'j’aurais'], ['aller', 'j’irais', 'faire', 'je ferais'], ['pouvoir', 'je pourrais', 'vouloir', 'je voudrais'], ['devoir', 'je devrais', 'venir', 'je viendrais'], ['voir', 'je verrais', 'savoir', 'je saurais']] },
        { t: 'table', title: 'Quand l’utiliser ?', head: ['Use', 'Example', 'English'],
          rows: [['Politeness', '**Pourriez**-vous m’aider ?', 'Could you help me?'], ['Advice', 'Tu **devrais** te reposer.', 'You should rest.'], ['Wishes', 'J’**aimerais** parler chinois.', 'I would like to speak Chinese.'], ['Hypothesis', 'Si j’**avais** le temps, je **voyagerais**.', 'If I had time, I would travel.']],
          note: '**Si + imparfait → conditionnel.** Never put the conditional after *si*: ~~Si j’aurais~~' },
        { t: 'dialogue', title: 'Et si tu gagnais au loto ?',
          lines: [['Inès', 'Qu’est-ce que tu ferais si tu gagnais au loto ?', 'What would you do if you won the lottery?'], ['Théo', 'J’achèterais une maison au bord de la mer.', 'I’d buy a house by the sea.'], ['Inès', 'Tu arrêterais de travailler ?', 'Would you stop working?'], ['Théo', 'Non, mais je travaillerais moins ! Et toi ?', 'No, but I’d work less! And you?'], ['Inès', 'Moi, je ferais le tour du monde. Et j’aiderais ma famille, bien sûr.', 'I’d travel around the world. And I’d help my family, of course.'], ['Théo', 'Alors tu devrais acheter un billet !', 'Then you should buy a ticket!']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Si j’aurais le temps, je viendrais.', 'Si j’avais le temps, je viendrais.', 'si + imparfait.'], ['Je voudrai un café, s’il vous plaît.', 'Je voudrais un café, s’il vous plaît.', 'Politeness → conditionnel (-ais).'], ['Je pourais venir.', 'Je pourrais venir.', 'pouvoir → pourr- (double r).']] }
      ],
      vocab: [['gagner au loto', 'to win the lottery'], ['au bord de la mer', 'by the sea'], ['faire le tour du monde', 'to travel around the world'], ['à ta place', 'if I were you (in your place)'], ['tu devrais', 'you should'], ['pourriez-vous… ?', 'could you…? (formal)'], ['j’aimerais', 'I would like'], ['moins', 'less']],
      practice: [
        ['choice', 'Si j’avais de l’argent, j’___ une voiture.', ['achèterais', 'achèterai', 'achetais', 'achète'], 'si + imparfait → conditionnel.'],
        ['choice', 'Si tu ___ plus, tu réussirais.', ['travaillais', 'travaillerais', 'travailles', 'travailleras'], 'After si → imparfait.'],
        ['gap', 'Je ___ (vouloir) un thé, s’il vous plaît.', ['voudrais'], 'Polite request → conditionnel.'],
        ['gap', 'À ta place, j’___ (aller) chez le médecin.', ['irais'], 'aller → ir- → j’irais.'],
        ['choice', 'Tu as l’air fatigué. Tu ___ dormir plus.', ['devrais', 'devras', 'devais', 'dois être'], 'Advice → devoir au conditionnel.'],
        ['choice', 'Which sentence is correct?', ['Si j’étais toi, je partirais.', 'Si je serais toi, je partirais.', 'Si j’étais toi, je partirai.', 'Si je suis toi, je partirais.'], 'si + imparfait, then conditionnel.'],
        ['match', 'Match the infinitive with the conditional.', [['être', 'je serais'], ['avoir', 'j’aurais'], ['faire', 'je ferais'], ['pouvoir', 'je pourrais']]],
        ['order', 'Qu’est-ce que tu ferais à ma place ?', 'What would you do in my place?'],
        ['listen', 'J’aimerais beaucoup visiter le Japon.']
      ],
      summary: ['Conditionnel = future stem + -ais, -ais, -ait, -ions, -iez, -aient.', 'Uses: politeness (je voudrais), advice (tu devrais), wishes (j’aimerais), hypotheses.', 'Si + imparfait → conditionnel: Si j’avais le temps, je voyagerais.']
    },
    {
      title: 'J’y vais, j’en veux',
      focus: 'Les pronoms y et en',
      minutes: 25,
      goals: ['Replace places and things introduced by à with y', 'Replace quantities and things introduced by de with en', 'Understand common expressions with y and en'],
      slides: [
        { t: 'table', title: 'Le pronom y', intro: '**y** replaces a **place** or **à + a thing / idea**.',
          head: ['Question', 'Answer with y', 'English'],
          rows: [['Tu vas à Paris ?', 'Oui, j’**y** vais.', 'Yes, I’m going there.'], ['Elle habite en France ?', 'Oui, elle **y** habite.', 'Yes, she lives there.'], ['Tu penses à ton examen ?', 'Oui, j’**y** pense.', 'Yes, I’m thinking about it.'], ['Vous répondez à l’e-mail ?', 'Oui, nous **y** répondons.', 'Yes, we’re answering it.']],
          note: 'For **people** after à, use stressed pronouns or lui / leur: Je pense **à elle**. Je **lui** réponds.' },
        { t: 'table', title: 'Le pronom en', intro: '**en** replaces **de + noun** and is used with **quantities**.',
          head: ['Question', 'Answer with en', 'English'],
          rows: [['Tu veux du café ?', 'Oui, j’**en** veux.', 'Yes, I want some.'], ['Tu as des frères ?', 'Oui, j’**en** ai deux.', 'Yes, I have two.'], ['Il parle de son voyage ?', 'Oui, il **en** parle.', 'Yes, he talks about it.'], ['Combien de pommes ?', 'J’**en** prends un kilo.', 'I’ll take a kilo (of them).']],
          note: 'Keep the number or quantity at the end: J’**en** ai **trois**. Il **en** reste **beaucoup**.' },
        { t: 'text', title: 'Position et expressions',
          body: ['Same position as other pronouns: Je **n’y** vais **pas**. · Je vais **en** acheter. · J’**y** suis allé.', 'Everyday expressions:',
            '**On y va !** = Let’s go! · **Ça y est !** = That’s it! / Done! · **Il y en a** = there is / are some · **Je m’en vais** = I’m leaving · **J’en ai marre** (informal) = I’m fed up'] },
        { t: 'examples', title: 'Écoutez et répétez', items: [['On y va ? — Oui, allons-y !', 'Shall we go? — Yes, let’s go!'], ['Tu es déjà allé au Maroc ? — Oui, j’y suis allé l’année dernière.', 'Have you been to Morocco? — Yes, I went there last year.'], ['Des problèmes ? Il n’y en a pas.', 'Problems? There aren’t any.'], ['Elle parle souvent de son pays ? — Oui, elle en parle tout le temps.', 'Does she often talk about her country? — Yes, all the time.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Tu as des enfants ? — Oui, j’ai deux.', 'Oui, j’en ai deux.', 'Quantities need en.'], ['Je vais y. / Je y vais.', 'J’y vais.', 'y goes before the verb (je → j’).'], ['Tu penses à ta mère ? — Oui, j’y pense.', 'Oui, je pense à elle.', 'For people, don’t use y.']] }
      ],
      vocab: [['penser à', 'to think about'], ['parler de', 'to talk about'], ['avoir besoin de', 'to need'], ['s’occuper de', 'to take care of'], ['On y va !', 'Let’s go!'], ['Ça y est !', 'That’s it! / Done!'], ['il y en a', 'there is / are some'], ['j’en ai marre', 'I’m fed up (informal)']],
      practice: [
        ['choice', 'Tu vas à la plage ? — Oui, j’___ vais.', ['y', 'en', 'le', 'lui'], 'A place → y.'],
        ['choice', 'Tu bois du thé ? — Oui, j’___ bois.', ['en', 'y', 'le', 'la'], 'du + noun → en.'],
        ['choice', 'Combien d’enfants as-tu ? — J’___ ai trois.', ['en', 'y', 'les', 'leur'], 'Quantity → en + number at the end.'],
        ['gap', 'Elle habite à Lyon ? — Oui, elle ___ habite depuis 2020.', ['y'], 'A place → y.'],
        ['gap', 'Tu as besoin d’aide ? — Oui, j’___ ai besoin.', ['en'], 'avoir besoin de → en.'],
        ['choice', 'Tu penses à ton frère ? — Oui, ___.', ['je pense à lui', 'j’y pense', 'j’en pense', 'je lui pense'], 'For a person after "penser à" → à lui / à elle.'],
        ['match', 'Match the expression with its meaning.', [['On y va !', 'Let’s go!'], ['Ça y est !', 'Done!'], ['Je m’en vais.', 'I’m leaving.'], ['Il y en a.', 'There are some.']]],
        ['order', 'Nous y allons demain matin.', 'We’re going there tomorrow morning.'],
        ['listen', 'Il y en a beaucoup dans le frigo.']
      ],
      summary: ['y replaces a place or à + thing (j’y vais, j’y pense).', 'en replaces de + noun and quantities (j’en veux, j’en ai deux).', 'Both go before the verb: je n’y vais pas, je vais en acheter.']
    },
    {
      title: 'Demain, on verra',
      focus: 'Le futur simple',
      minutes: 25,
      goals: ['Form the futur simple of regular and irregular verbs', 'Make predictions, promises and plans', 'Use quand + futur and si + présent'],
      slides: [
        { t: 'text', title: 'Formation',
          body: ['**Infinitive + -ai, -as, -a, -ons, -ez, -ont** (the endings look like *avoir*!).', 'parler → je parler**ai** · finir → tu finir**as** · prendre → il prendr**a** (-re verbs drop the e).',
            'Irregular stems (same as the conditional): **ser-** (être), **aur-** (avoir), **ir-** (aller), **fer-** (faire), **pourr-**, **voudr-**, **devr-**, **viendr-**, **verr-**, **saur-** — and il **faudra** (falloir), il **pleuvra** (pleuvoir).'] },
        { t: 'table', title: 'Conjugaison', head: ['', 'parler', 'finir', 'être'],
          rows: [['je / j’', 'parlerai', 'finirai', 'serai'], ['tu', 'parleras', 'finiras', 'seras'], ['il / elle', 'parlera', 'finira', 'sera'], ['nous', 'parlerons', 'finirons', 'serons'], ['vous', 'parlerez', 'finirez', 'serez'], ['ils / elles', 'parleront', 'finiront', 'seront']] },
        { t: 'text', title: 'quand + futur · si + présent',
          body: ['After **quand** (when) talking about the future, French uses the **future** — unlike English!', '**Quand** je **serai** grand, je serai médecin. (When I *am* older…)', 'Je t’appellerai **quand** j’**arriverai**.',
            'But after **si**, use the **present**: **S’il fait** beau demain, nous **irons** à la plage.'] },
        { t: 'examples', title: 'Écoutez et répétez', items: [['En 2050, nous voyagerons dans des voitures autonomes.', 'In 2050 we will travel in self-driving cars.'], ['Je te promets que je ferai attention.', 'I promise I’ll be careful.'], ['Quand tu auras dix-huit ans, tu pourras voter.', 'When you are eighteen, you’ll be able to vote.'], ['S’il pleut, on restera à la maison.', 'If it rains, we’ll stay at home.'], ['Il faudra partir tôt demain.', 'We will have to leave early tomorrow.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Quand j’arrive, je t’appellerai.', 'Quand j’arriverai, je t’appellerai.', 'quand + future.'], ['Si il fera beau, on sortira.', 'S’il fait beau, on sortira.', 'si + present (and si + il → s’il).'], ['Je serrai là.', 'Je serai là.', 'être → ser- (one r).']] }
      ],
      vocab: [['à l’avenir', 'in the future'], ['plus tard', 'later'], ['un jour', 'one day (future or past)'], ['promettre', 'to promise'], ['faire attention', 'to be careful'], ['il faudra', 'it will be necessary'], ['il pleuvra', 'it will rain'], ['bientôt', 'soon']],
      practice: [
        ['gap', 'Demain, je ___ (finir) mon rapport.', ['finirai'], 'finir + -ai.'],
        ['gap', 'Nous ___ (être) en vacances en août.', ['serons'], 'être → ser- + -ons.'],
        ['choice', 'Quand tu ___ à Paris, appelle-moi !', ['arriveras', 'arrives', 'arriverais', 'arrivé'], 'quand + future in French.'],
        ['choice', 'S’il ___ beau demain, nous irons à la plage.', ['fait', 'fera', 'faisait', 'ferait'], 'si + present.'],
        ['choice', 'The future of "aller" with "ils" is…', ['iront', 'alleront', 'iraient', 'vont'], 'aller → ir- + -ont.'],
        ['choice', 'Demain, il ___ partir à six heures. (falloir, future)', ['faudra', 'fallera', 'faut', 'faudrait'], 'falloir → il faudra.'],
        ['match', 'Match the infinitive with the future (je).', [['avoir', 'j’aurai'], ['faire', 'je ferai'], ['venir', 'je viendrai'], ['voir', 'je verrai']]],
        ['order', 'Je te téléphonerai quand j’arriverai.', 'I’ll phone you when I arrive.'],
        ['listen', 'À l’avenir, nous travaillerons moins.']
      ],
      summary: ['Futur simple = infinitive (or irregular stem) + -ai, -as, -a, -ons, -ez, -ont.', 'Irregular stems: ser-, aur-, ir-, fer-, pourr-, voudr-, devr-, viendr-, verr-.', 'quand + futur; si + présent → futur.']
    },
    {
      title: 'La ville où je suis né',
      focus: 'Les pronoms relatifs qui, que, où, dont',
      minutes: 25,
      goals: ['Combine two sentences with a relative pronoun', 'Choose between qui, que, où and dont', 'Write richer descriptions of people and places'],
      slides: [
        { t: 'table', title: 'Les quatre pronoms', head: ['Pronoun', 'Replaces', 'Example', 'English'],
          rows: [['qui', 'the subject', 'L’homme **qui** parle est mon prof.', 'The man who is speaking…'], ['que (qu’)', 'the object', 'Le livre **que** je lis est passionnant.', 'The book (that) I’m reading…'], ['où', 'a place or a time', 'La ville **où** je suis né. / Le jour **où** je t’ai rencontrée.', 'The town where… / The day when…'], ['dont', 'de + noun', 'Le film **dont** je parle.', 'The film I’m talking about.']] },
        { t: 'text', title: 'Astuce : qui ou que ?',
          body: ['**qui** is followed directly by a **verb**: le garçon **qui chante**.', '**que** is followed by a **subject + verb**: le garçon **que je connais**.',
            '**dont** is used with verbs and expressions built with **de**: parler de, avoir besoin de, se souvenir de, être fier de → C’est l’outil **dont** j’ai besoin.', '**dont** also expresses possession: Le collègue **dont** la femme est italienne. (whose wife)'] },
        { t: 'examples', title: 'Écoutez et répétez', items: [['C’est une amie qui habite à Montréal.', 'She’s a friend who lives in Montreal.'], ['Le gâteau que tu as fait est délicieux.', 'The cake you made is delicious.'], ['Je me souviens du jour où je suis arrivé en France.', 'I remember the day I arrived in France.'], ['C’est le quartier dont je suis le plus fier.', 'It’s the neighbourhood I’m proudest of.'], ['Voici le livre dont je t’ai parlé.', 'Here’s the book I told you about.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['L’homme que parle est mon père.', 'L’homme qui parle est mon père.', 'Directly followed by a verb → qui.'], ['Le film que je parle.', 'Le film dont je parle.', 'parler de → dont.'], ['Le jour quand je suis arrivé…', 'Le jour où je suis arrivé…', 'Time → où (not quand).']] }
      ],
      vocab: [['passionnant', 'fascinating, gripping'], ['se souvenir de', 'to remember'], ['être fier de', 'to be proud of'], ['le quartier', 'the neighbourhood'], ['rencontrer', 'to meet (for the first time)'], ['l’endroit', 'the place'], ['la raison', 'the reason'], ['grandir', 'to grow up']],
      practice: [
        ['choice', 'La femme ___ chante est ma voisine.', ['qui', 'que', 'dont', 'où'], 'Followed by a verb → qui.'],
        ['choice', 'Le gâteau ___ tu as fait est délicieux.', ['que', 'qui', 'dont', 'où'], 'Followed by a subject (tu) → que.'],
        ['choice', 'C’est la ville ___ j’ai grandi.', ['où', 'que', 'qui', 'dont'], 'A place → où.'],
        ['choice', 'Voici le livre ___ j’ai besoin.', ['dont', 'que', 'qui', 'où'], 'avoir besoin de → dont.'],
        ['gap', 'Le film ___ nous avons vu hier était drôle.', ['que'], 'Object + subject (nous) → que.'],
        ['gap', 'C’est un ami ___ habite à Montréal.', ['qui'], 'Followed by a verb → qui.'],
        ['match', 'Match the pronoun with its use.', [['qui', 'subject'], ['que', 'object'], ['où', 'place or time'], ['dont', 'replaces de + noun']]],
        ['order', 'C’est le restaurant où nous avons dîné.', 'It’s the restaurant where we had dinner.'],
        ['listen', 'Le professeur dont je t’ai parlé arrive demain.']
      ],
      summary: ['qui = subject (+ verb), que = object (+ subject + verb).', 'où = place or time (la ville où…, le jour où…).', 'dont = replaces de + noun (parler de, avoir besoin de) and expresses possession.']
    }
  ]
});
