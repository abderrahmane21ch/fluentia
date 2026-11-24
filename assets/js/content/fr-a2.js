/* French · A2 Élémentaire */
FL.addLevel('fr', {
  code: 'A2',
  name: 'Élémentaire',
  summary: 'Talk about the past and the future, describe your childhood and avoid repetition with pronouns.',
  outcome: 'By the end of A2 you can tell what you did, describe how things used to be, talk about your plans and handle everyday conversations more naturally.',
  lessons: [
    {
      title: 'Le week-end dernier',
      focus: 'Le passé composé avec avoir',
      minutes: 25,
      goals: ['Talk about completed actions in the past', 'Form past participles of regular and irregular verbs', 'Make negative sentences and questions in the passé composé'],
      slides: [
        { t: 'text', title: 'Formation',
          body: ['**Passé composé = avoir (present) + past participle** → J’**ai mangé**. Nous **avons fini**.', 'Regular participles:', '-er → **-é** : parler → parl**é**, regarder → regard**é**', '-ir → **-i** : finir → fin**i**, choisir → chois**i**', '-re → **-u** : vendre → vend**u**, attendre → attend**u**'] },
        { t: 'table', title: 'Participes irréguliers', intro: 'These are very common — learn them by heart.',
          head: ['Infinitif', 'Participe', 'Infinitif', 'Participe'],
          rows: [['faire', 'fait', 'prendre', 'pris'], ['voir', 'vu', 'boire', 'bu'], ['lire', 'lu', 'écrire', 'écrit'], ['avoir', 'eu', 'être', 'été'], ['mettre', 'mis', 'ouvrir', 'ouvert'], ['pouvoir', 'pu', 'vouloir', 'voulu']] },
        { t: 'text', title: 'Négation, questions, expressions de temps',
          body: ['**Negative**: ne … pas goes **around avoir**: Je **n’**ai **pas** mangé. Il **n’**a **jamais** vu la mer.', '**Questions**: Tu **as vu** le film ? · Qu’est-ce que tu **as fait** samedi ?',
            '**Time**: hier · samedi dernier · la semaine dernière · **il y a** deux jours (= two days ago)'] },
        { t: 'dialogue', title: 'Lundi matin',
          lines: [['Léa', 'Salut Karim ! Tu as passé un bon week-end ?', 'Hi Karim! Did you have a good weekend?'], ['Karim', 'Oui, super ! Samedi, j’ai visité le Louvre avec ma sœur.', 'Yes, great! On Saturday I visited the Louvre with my sister.'], ['Léa', 'Génial ! Vous avez vu la Joconde ?', 'Great! Did you see the Mona Lisa?'], ['Karim', 'Oui, mais il y a eu beaucoup de monde ! Et toi, qu’est-ce que tu as fait ?', 'Yes, but there were lots of people! And you, what did you do?'], ['Léa', 'J’ai lu un livre et j’ai regardé une série. Dimanche, j’ai fait un gâteau.', 'I read a book and watched a series. On Sunday I made a cake.'], ['Karim', 'Tu n’as pas travaillé ?', 'You didn’t work?'], ['Léa', 'Non, je n’ai pas travaillé ce week-end. Enfin !', 'No, I didn’t work this weekend. Finally!']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['J’ai mangeé.', 'J’ai mangé.', '-er verbs → -é.'], ['Je n’ai mangé pas.', 'Je n’ai pas mangé.', 'ne…pas goes around avoir.'], ['J’ai prendu le bus.', 'J’ai pris le bus.', 'prendre → pris (irregular).']] }
      ],
      vocab: [['hier', 'yesterday'], ['le week-end dernier', 'last weekend'], ['la semaine dernière', 'last week'], ['il y a deux jours', 'two days ago'], ['passer un bon week-end', 'to have a good weekend'], ['visiter', 'to visit (a place)'], ['beaucoup de monde', 'a lot of people'], ['génial', 'great, brilliant']],
      practice: [
        ['gap', 'Hier, j’ai ___ (manger) une pizza.', ['mangé'], '-er → -é.'],
        ['gap', 'Nous avons ___ (finir) le projet.', ['fini'], '-ir → -i.'],
        ['choice', 'Elle a ___ un roman cet été.', ['lu', 'lisé', 'liré', 'lit'], 'lire → lu.'],
        ['choice', 'Tu as ___ le dernier film de Spielberg ?', ['vu', 'voi', 'voyé', 'vus'], 'voir → vu.'],
        ['choice', 'Which negative sentence is correct?', ['Je n’ai pas compris.', 'Je n’ai compris pas.', 'Je ne pas ai compris.', 'Je pas ai compris.'], 'ne…pas around the auxiliary.'],
        ['match', 'Match the infinitive and the participle.', [['faire', 'fait'], ['prendre', 'pris'], ['boire', 'bu'], ['écrire', 'écrit'], ['ouvrir', 'ouvert']]],
        ['gap', 'Ils ont ___ (attendre) le bus pendant vingt minutes.', ['attendu'], '-re → -u.'],
        ['order', 'Qu’est-ce que tu as fait samedi ?', 'What did you do on Saturday?'],
        ['listen', 'J’ai pris le train il y a deux jours.']
      ],
      summary: ['Passé composé = avoir + participe passé (parlé, fini, vendu).', 'Irregular participles: fait, pris, vu, bu, lu, écrit, eu, été, mis, ouvert.', 'Negative: je n’ai pas + participle. "il y a" + time = ago.']
    },
    {
      title: 'Je suis allé(e)…',
      focus: 'Le passé composé avec être',
      minutes: 25,
      goals: ['Know which verbs take être in the passé composé', 'Make the participle agree with the subject', 'Use reflexive verbs in the past'],
      slides: [
        { t: 'text', title: 'Quels verbes ?',
          body: ['About 15 verbs — mostly about **movement or change of state** — use **être** instead of avoir.', 'aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner … plus their forms with *re-* (revenir, rentrer, devenir).',
            '**All reflexive verbs** also use être: se lever, se coucher, s’habiller…', 'Tip: imagine the **"house of être"** — you arrive, enter, go up, go down, go out, leave…'] },
        { t: 'table', title: 'Les participes', head: ['Verbe', 'Participe', 'Verbe', 'Participe'],
          rows: [['aller', 'allé', 'venir', 'venu'], ['arriver', 'arrivé', 'partir', 'parti'], ['sortir', 'sorti', 'rester', 'resté'], ['naître', 'né', 'mourir', 'mort'], ['tomber', 'tombé', 'descendre', 'descendu']] },
        { t: 'table', title: 'L’accord', intro: 'With être, the participle **agrees with the subject**: add **-e** (feminine) and **-s** (plural).',
          head: ['Subject', 'aller', 'English'],
          rows: [['je (m. / f.)', 'je suis allé / allée', 'I went'], ['il', 'il est allé', 'he went'], ['elle', 'elle est allée', 'she went'], ['nous (m. / f.)', 'nous sommes allés / allées', 'we went'], ['ils', 'ils sont allés', 'they went (m. or mixed)'], ['elles', 'elles sont allées', 'they went (f.)']],
          note: 'Reflexive verbs: je **me suis** levé(e) · elle **s’est** reposée · nous **nous sommes** promenés.' },
        { t: 'examples', title: 'Écoutez et répétez', items: [['Je suis née en 2001 à Alger.', 'I was born in 2001 in Algiers. (a woman speaking)'], ['Nous sommes partis à huit heures.', 'We left at eight.'], ['Elle est arrivée en retard.', 'She arrived late.'], ['Ils sont restés trois jours à Nice.', 'They stayed three days in Nice.'], ['Je me suis couché très tard.', 'I went to bed very late.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['J’ai allé au cinéma.', 'Je suis allé(e) au cinéma.', 'aller takes être.'], ['Elle est allé à Paris.', 'Elle est allée à Paris.', 'Agreement with a feminine subject.'], ['Il s’a levé tôt.', 'Il s’est levé tôt.', 'Reflexive verbs take être.']] }
      ],
      vocab: [['arriver', 'to arrive'], ['partir', 'to leave'], ['sortir', 'to go out'], ['rester', 'to stay'], ['tomber', 'to fall'], ['naître', 'to be born'], ['rentrer', 'to go / come back home'], ['en retard', 'late']],
      practice: [
        ['choice', 'Elle ___ partie à huit heures.', ['est', 'a', 'été', 'et'], 'partir takes être.'],
        ['choice', 'Nous ___ restés à la maison.', ['sommes', 'avons', 'sont', 'êtes'], 'rester takes être; nous → sommes.'],
        ['gap', 'Marie est ___ (aller) au marché.', ['allée'], 'Feminine subject → allée.'],
        ['gap', 'Mes cousins sont ___ (venir) en bus.', ['venus'], 'Masculine plural → venus.'],
        ['choice', 'Je ___ levé très tôt ce matin.', ['me suis', 'm’ai', 'suis', 'me'], 'Reflexive → me suis.'],
        ['choice', 'Which verb uses AVOIR in the passé composé?', ['manger', 'aller', 'partir', 'tomber'], 'manger → j’ai mangé. The others take être.'],
        ['match', 'Match infinitive and participle.', [['naître', 'né'], ['mourir', 'mort'], ['venir', 'venu'], ['descendre', 'descendu']]],
        ['order', 'Nous sommes arrivés à l’hôtel à midi.', 'We arrived at the hotel at noon.'],
        ['listen', 'Elle est née à Lyon en 1995.']
      ],
      summary: ['Movement / change-of-state verbs and all reflexive verbs use être.', 'With être, the participle agrees with the subject: elle est allée, ils sont partis.', 'Reflexive: je me suis levé(e), il s’est couché.']
    },
    {
      title: 'Projets d’avenir',
      focus: 'Le futur proche · le passé récent',
      minutes: 20,
      goals: ['Talk about plans and near-future events', 'Say what has just happened with venir de', 'Use future time expressions'],
      slides: [
        { t: 'table', title: 'Le futur proche : aller + infinitif', head: ['Subject', 'Futur proche', 'English'],
          rows: [['je', 'vais partir', 'I’m going to leave'], ['tu', 'vas manger', 'you’re going to eat'], ['il / elle', 'va pleuvoir', 'it’s going to rain'], ['nous', 'allons voyager', 'we’re going to travel'], ['vous', 'allez adorer', 'you’re going to love it'], ['ils / elles', 'vont arriver', 'they’re going to arrive']],
          note: 'Negative: ne … pas around **aller** → Je **ne vais pas** sortir ce soir.' },
        { t: 'table', title: 'Expressions de temps', head: ['Français', 'English'],
          rows: [['ce soir', 'this evening'], ['demain / après-demain', 'tomorrow / the day after tomorrow'], ['la semaine prochaine', 'next week'], ['le mois prochain', 'next month'], ['l’année prochaine', 'next year'], ['dans deux jours', 'in two days']] },
        { t: 'text', title: 'Le passé récent : venir de + infinitif',
          body: ['To say something **has just happened**, use **venir (present) + de + infinitive**.', 'Je **viens de** manger. (I’ve just eaten.) · Le train **vient de** partir. (The train has just left.)', 'Before a vowel: Nous **venons d’**arriver.',
            'Careful: Je **viens** manger = I’m coming to eat. Je **viens de** manger = I’ve just eaten!'] },
        { t: 'dialogue', title: 'Les vacances d’été',
          lines: [['Yasmine', 'Qu’est-ce que tu vas faire cet été ?', 'What are you going to do this summer?'], ['Hugo', 'Je vais partir en Espagne avec des amis.', 'I’m going to go to Spain with some friends.'], ['Yasmine', 'Super ! Vous allez prendre l’avion ?', 'Great! Are you going to fly?'], ['Hugo', 'Non, on va prendre le train. Et toi ?', 'No, we’re going to take the train. And you?'], ['Yasmine', 'Moi, je vais travailler en juillet, et en août je vais aller chez mes grands-parents.', 'I’m going to work in July, and in August I’ll go to my grandparents’.'], ['Hugo', 'Ça va être calme !', 'That’s going to be quiet!'], ['Yasmine', 'Oui, mais je viens de finir mes examens. J’ai besoin de repos !', 'Yes, but I’ve just finished my exams. I need a rest!']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je vais à partir demain.', 'Je vais partir demain.', 'No "à" before the infinitive.'], ['Je ne vais partir pas.', 'Je ne vais pas partir.', 'ne…pas around aller.'], ['Je viens manger. (= I’ve just eaten)', 'Je viens de manger.', 'The recent past needs "de".']] }
      ],
      vocab: [['demain', 'tomorrow'], ['la semaine prochaine', 'next week'], ['l’année prochaine', 'next year'], ['dans + durée', 'in (two days, a week)'], ['voyager', 'to travel'], ['prendre l’avion', 'to fly / take the plane'], ['venir de', 'to have just (done)'], ['avoir besoin de', 'to need']],
      practice: [
        ['choice', 'Demain, nous ___ visiter le musée.', ['allons', 'avons', 'sommes', 'allez'], 'nous → allons + infinitive.'],
        ['gap', 'Ils ___ partir en vacances. (aller)', ['vont'], 'ils → vont.'],
        ['choice', 'Regarde le ciel ! Il ___ pleuvoir.', ['va', 'vient', 'est', 'a'], 'Near future → va + infinitive.'],
        ['choice', 'How do you say "I have just arrived"?', ['Je viens d’arriver.', 'Je vais arriver.', 'Je viens arriver.', 'Je suis venu arriver.'], 'venir de + infinitive (d’ before a vowel).'],
        ['choice', 'Which negative sentence is correct?', ['Je ne vais pas travailler demain.', 'Je ne vais travailler pas demain.', 'Je ne pas vais travailler demain.', 'Je vais travailler ne pas demain.'], 'ne…pas around aller.'],
        ['gap', 'Elle vient ___ finir ses devoirs.', ['de'], 'Recent past: venir de + infinitive.'],
        ['match', 'Match French and English.', [['demain', 'tomorrow'], ['ce soir', 'this evening'], ['la semaine prochaine', 'next week'], ['dans deux jours', 'in two days']]],
        ['order', 'Qu’est-ce que tu vas faire ce week-end ?', 'What are you going to do this weekend?'],
        ['listen', 'Nous allons voyager l’année prochaine.']
      ],
      summary: ['Futur proche = aller + infinitive (je vais partir).', 'Passé récent = venir de + infinitive (je viens de manger).', 'Negative: je ne vais pas + infinitive. Time: demain, la semaine prochaine, dans deux jours.']
    },
    {
      title: 'Quand j’étais petit(e)',
      focus: 'L’imparfait',
      minutes: 25,
      goals: ['Describe your childhood and past habits', 'Form the imparfait of any verb', 'Describe people, places and situations in the past'],
      slides: [
        { t: 'text', title: 'Formation',
          body: ['Take the **nous** form of the present, remove **-ons**, then add the endings: **-ais, -ais, -ait, -ions, -iez, -aient**.', 'nous parl**ons** → je parl**ais** · nous finiss**ons** → je finiss**ais** · nous fais**ons** → je fais**ais**',
            'Only one irregular stem: **être → ét-** (j’étais, nous étions).', 'Spelling: -ger verbs keep the **e** before a: je mang**e**ais (but nous mangions).'] },
        { t: 'table', title: 'Conjugaison', head: ['', 'parler', 'finir', 'être'],
          rows: [['je / j’', 'parlais', 'finissais', 'étais'], ['tu', 'parlais', 'finissais', 'étais'], ['il / elle', 'parlait', 'finissait', 'était'], ['nous', 'parlions', 'finissions', 'étions'], ['vous', 'parliez', 'finissiez', 'étiez'], ['ils / elles', 'parlaient', 'finissaient', 'étaient']] },
        { t: 'table', title: 'Quand utiliser l’imparfait ?', head: ['Use', 'Example', 'English'],
          rows: [['Habits in the past', 'Le dimanche, nous allions chez ma grand-mère.', 'On Sundays we used to go to my grandmother’s.'], ['Descriptions', 'La maison était grande et il faisait beau.', 'The house was big and the weather was nice.'], ['Feelings and states', 'J’avais peur du noir.', 'I was afraid of the dark.'], ['Background action', 'Je regardais la télé…', 'I was watching TV…']] },
        { t: 'examples', title: 'Mon enfance', items: [['Quand j’étais petit, j’habitais à Constantine.', 'When I was little, I lived in Constantine.'], ['Tous les étés, nous allions à la mer.', 'Every summer we used to go to the seaside.'], ['Ma grand-mère faisait des gâteaux délicieux.', 'My grandmother used to make delicious cakes.'], ['Je n’aimais pas les légumes.', 'I didn’t like vegetables.'], ['Il y avait un grand jardin derrière la maison.', 'There was a big garden behind the house.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Quand j’ai été petit…', 'Quand j’étais petit…', 'Descriptions of the past → imparfait.'], ['Je mangais beaucoup.', 'Je mangeais beaucoup.', 'Keep the -e- in -ger verbs.'], ['Il faisé beau.', 'Il faisait beau.', 'Ending for il / elle → -ait.']] }
      ],
      vocab: [['l’enfance', 'childhood'], ['quand j’étais petit(e)', 'when I was little'], ['tous les jours', 'every day'], ['d’habitude', 'usually'], ['autrefois', 'in the past, formerly'], ['avoir peur (de)', 'to be afraid (of)'], ['il y avait', 'there was / there were'], ['souvent', 'often']],
      practice: [
        ['gap', 'Quand j’étais petit, je ___ (jouer) au foot tous les jours.', ['jouais'], 'je → -ais.'],
        ['gap', 'Nous ___ (habiter) à Alger.', ['habitions'], 'nous → -ions.'],
        ['choice', 'Hier, il ___ beau et chaud.', ['faisait', 'a fait', 'fait', 'faisais'], 'Weather description in the past → imparfait (il faisait).'],
        ['choice', 'Avant, ils ___ souvent au cinéma.', ['allaient', 'sont allés', 'allons', 'allait'], 'Past habit → imparfait; ils → -aient.'],
        ['choice', 'Être in the imparfait with "je" is…', ['j’étais', 'j’été', 'j’êtais', 'j’être'], 'Irregular stem ét- → j’étais.'],
        ['choice', 'Which sentence describes a past habit?', ['Le samedi, je jouais au tennis.', 'Samedi, j’ai joué au tennis.', 'Je vais jouer au tennis.', 'Je viens de jouer au tennis.'], 'Le samedi (every Saturday) + imparfait = habit.'],
        ['match', 'Match French and English.', [['d’habitude', 'usually'], ['autrefois', 'in the past'], ['il y avait', 'there was'], ['l’enfance', 'childhood']]],
        ['order', 'Quand j’étais petite, j’avais un chat.', 'When I was little, I had a cat.'],
        ['listen', 'Il y avait un grand jardin derrière la maison.']
      ],
      summary: ['Imparfait = nous stem + -ais, -ais, -ait, -ions, -iez, -aient (être → ét-).', 'Use it for past habits, descriptions, feelings and background.', 'Key phrases: quand j’étais petit(e), d’habitude, tous les étés, il y avait.']
    },
    {
      title: 'Je le vois !',
      focus: 'Les pronoms compléments d’objet direct',
      minutes: 25,
      goals: ['Replace a direct object with le, la, l’, les', 'Use me, te, nous, vous as objects', 'Place pronouns correctly in negative sentences and with infinitives'],
      slides: [
        { t: 'text', title: 'Pourquoi ?',
          body: ['A **direct object** answers *what?* or *whom?* without a preposition: Je regarde **le film**.', 'To avoid repeating it, replace it with a **pronoun**: Tu regardes le film ? — Oui, je **le** regarde.'] },
        { t: 'table', title: 'Les pronoms COD', head: ['Pronoun', 'Example', 'English'],
          rows: [['me (m’)', 'Il **me** regarde.', 'He’s looking at me.'], ['te (t’)', 'Je **t’**aime.', 'I love you.'], ['le (l’)', 'Paul ? Je **le** connais.', 'I know him.'], ['la (l’)', 'Cette robe ? Je **la** prends.', 'I’ll take it.'], ['nous', 'Ils **nous** invitent.', 'They’re inviting us.'], ['vous', 'Je **vous** écoute.', 'I’m listening to you.'], ['les', 'Mes clés ? Je **les** cherche.', 'I’m looking for them.']] },
        { t: 'table', title: 'La position', head: ['Structure', 'Example'],
          rows: [['Before the conjugated verb', 'Je **la** regarde.'], ['Negative: ne + pronoun + verb + pas', 'Je **ne la** regarde **pas**.'], ['With an infinitive: before the infinitive', 'Je vais **la** regarder.'], ['Passé composé: before avoir', 'Je **l’**ai regardée.']],
          note: 'In the passé composé the participle agrees with a COD placed before it — you’ll practise this at B1.' },
        { t: 'examples', title: 'Écoutez et répétez', items: [['Tu connais Paul ? — Oui, je le connais bien.', 'Do you know Paul? — Yes, I know him well.'], ['Tu prends le bus ? — Non, je le prends rarement.', 'Do you take the bus? — No, I rarely take it.'], ['Où sont mes lunettes ? Je les cherche partout !', 'Where are my glasses? I’m looking everywhere for them!'], ['Cette veste ? Je vais l’acheter.', 'This jacket? I’m going to buy it.'], ['Tu m’appelles ce soir ?', 'Will you call me tonight?']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je vois le.', 'Je le vois.', 'The pronoun goes before the verb.'], ['Je ne vois le pas.', 'Je ne le vois pas.', 'ne + pronoun + verb + pas.'], ['Je le vais acheter.', 'Je vais l’acheter.', 'Before the infinitive.']] }
      ],
      vocab: [['connaître', 'to know (a person, a place)'], ['chercher', 'to look for'], ['acheter', 'to buy'], ['appeler', 'to call'], ['inviter', 'to invite'], ['aider', 'to help'], ['écouter', 'to listen to'], ['partout', 'everywhere']],
      practice: [
        ['choice', 'Tu aimes cette chanson ? — Oui, je ___ adore.', ['l’', 'la', 'le', 'les'], 'la + vowel → l’.'],
        ['choice', 'Tu vois mes lunettes ? — Non, je ne ___ vois pas.', ['les', 'le', 'la', 'leur'], 'Plural → les.'],
        ['choice', 'Ce gâteau ? Je vais ___ manger !', ['le', 'la', 'lui', 'les'], 'gâteau is masculine; the pronoun goes before the infinitive.'],
        ['choice', 'Which sentence is correct?', ['Je ne le connais pas.', 'Je ne connais le pas.', 'Je le ne connais pas.', 'Je ne connais pas le.'], 'ne + pronoun + verb + pas.'],
        ['gap', 'Tu regardes la télé ? — Oui, je ___ regarde.', ['la'], 'la télé (feminine) → la.'],
        ['gap', 'Ils invitent Marc et Julie ? — Oui, ils ___ invitent.', ['les'], 'Plural → les.'],
        ['match', 'Match French and English.', [['Je le vois.', 'I see him.'], ['Je la vois.', 'I see her.'], ['Je les vois.', 'I see them.'], ['Je vous vois.', 'I see you (formal).']]],
        ['order', 'Je vais les appeler demain.', 'I’m going to call them tomorrow.'],
        ['listen', 'Je ne la connais pas.']
      ],
      summary: ['COD pronouns: me, te, le, la, l’, nous, vous, les.', 'Position: before the conjugated verb (je le vois), inside ne…pas (je ne le vois pas).', 'With an infinitive: before the infinitive (je vais le voir).']
    }
  ]
});
