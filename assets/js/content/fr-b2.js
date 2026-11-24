/* French · B2 Avancé */
FL.addLevel('fr', {
  code: 'B2',
  name: 'Avancé',
  summary: 'Master the subjunctive, defend your opinions, express regrets and report what others said.',
  outcome: 'By the end of B2 you can argue a point of view, express doubt, wishes and regrets precisely, report conversations and write well-structured texts in French.',
  lessons: [
    {
      title: 'Il faut que tu saches…',
      focus: 'Le subjonctif présent',
      minutes: 30,
      goals: ['Form the subjunctive of regular and irregular verbs', 'Recognise the expressions that trigger the subjunctive', 'Know when to use an infinitive instead'],
      slides: [
        { t: 'text', title: 'Formation',
          body: ['Take the **ils** form of the present, remove **-ent**, add **-e, -es, -e, -ions, -iez, -ent**.', 'ils parl**ent** → que je parl**e** · ils finiss**ent** → que tu finiss**es** · ils prenn**ent** → qu’il prenn**e**',
            'For **nous** and **vous**, use the **nous** stem (like the imparfait): que nous **prenions**, que vous **veniez**.'] },
        { t: 'table', title: 'Subjonctifs irréguliers', head: ['Verbe', 'que je / j’', 'que nous'],
          rows: [['être', 'sois', 'soyons'], ['avoir', 'aie', 'ayons'], ['aller', 'aille', 'allions'], ['faire', 'fasse', 'fassions'], ['pouvoir', 'puisse', 'puissions'], ['savoir', 'sache', 'sachions'], ['vouloir', 'veuille', 'voulions']] },
        { t: 'table', title: 'Quand l’utiliser ?', intro: 'The subjunctive follows **que** after expressions of necessity, will, emotion and doubt — and after some conjunctions.',
          head: ['Category', 'Expressions', 'Example'],
          rows: [['Necessity', 'il faut que, il est important que', 'Il faut que tu **fasses** attention.'], ['Will / wish', 'vouloir que, souhaiter que', 'Je veux que vous **soyez** à l’heure.'], ['Emotion', 'être content que, avoir peur que', 'Je suis ravi que tu **viennes**.'], ['Doubt', 'douter que, il est possible que', 'Je doute qu’il **puisse** venir.'], ['Conjunctions', 'bien que, pour que, avant que, à condition que', 'Bien qu’il **soit** tard, je continue.']] },
        { t: 'text', title: 'Même sujet ? Infinitif !',
          body: ['If both verbs have the **same subject**, use an **infinitive**, not que + subjunctive.', 'Je veux **partir**. (I want to leave.) — ~~Je veux que je parte.~~', 'Je veux **que tu partes**. (I want you to leave — different subjects.)',
            'Same with conjunctions: Je travaille **pour réussir**. / Je travaille **pour que** mes enfants **réussissent**.'] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Il faut que tu fais tes devoirs.', 'Il faut que tu fasses tes devoirs.', 'il faut que + subjonctif.'], ['Je veux que je parte tôt.', 'Je veux partir tôt.', 'Same subject → infinitive.'], ['Bien qu’il est malade, il travaille.', 'Bien qu’il soit malade, il travaille.', 'bien que + subjonctif.']] }
      ],
      vocab: [['il faut que', 'it is necessary that'], ['souhaiter', 'to wish'], ['avoir peur que', 'to be afraid that'], ['douter que', 'to doubt that'], ['bien que', 'although'], ['pour que', 'so that'], ['avant que', 'before'], ['à condition que', 'provided that']],
      practice: [
        ['choice', 'Il faut que tu ___ tes devoirs avant le dîner.', ['fasses', 'fais', 'feras', 'faisais'], 'il faut que + subjonctif (faire → fasses).'],
        ['choice', 'Je veux que vous ___ à l’heure demain.', ['soyez', 'êtes', 'serez', 'étiez'], 'vouloir que + subjonctif (être → soyez).'],
        ['gap', 'Bien qu’il ___ (être) fatigué, il continue.', ['soit'], 'bien que + subjonctif.'],
        ['gap', 'Il est important que nous ___ (partir) tôt.', ['partions'], 'nous → -ions.'],
        ['choice', 'Which sentence is correct?', ['Je voudrais partir tôt.', 'Je voudrais que je parte tôt.', 'Je voudrais que je pars tôt.', 'Je voudrais de partir tôt.'], 'Same subject → infinitive.'],
        ['choice', 'Which conjunction is NOT followed by the subjunctive?', ['parce que', 'bien que', 'pour que', 'avant que'], 'parce que + indicative.'],
        ['match', 'Match the infinitive with its subjunctive (je).', [['être', 'que je sois'], ['avoir', 'que j’aie'], ['aller', 'que j’aille'], ['savoir', 'que je sache'], ['pouvoir', 'que je puisse']]],
        ['order', 'Il faut que tu viennes avec nous.', 'You have to come with us.'],
        ['listen', 'Je suis content que tu sois là.']
      ],
      summary: ['Subjonctif = ils stem + -e, -es, -e, -ions, -iez, -ent (irregular: sois, aie, aille, fasse, puisse, sache).', 'Triggers: necessity, will, emotion, doubt, and conjunctions like bien que, pour que, avant que.', 'Same subject → infinitive (je veux partir).']
    },
    {
      title: 'À mon avis…',
      focus: 'Exprimer et défendre une opinion',
      minutes: 30,
      goals: ['Give, justify and nuance your opinion', 'Choose indicative or subjunctive after opinion verbs', 'Agree and disagree politely in a debate'],
      slides: [
        { t: 'table', title: 'Indicatif ou subjonctif ?', head: ['+ indicatif (certainty)', '+ subjonctif (doubt)'],
          rows: [['Je pense qu’il **a** raison.', 'Je ne pense pas qu’il **ait** raison.'], ['Je crois que c’**est** possible.', 'Je ne crois pas que ce **soit** possible.'], ['Je suis sûr qu’elle **viendra**.', 'Je doute qu’elle **vienne**.'], ['Il est évident que…', 'Il est possible que… / Il se peut que…']],
          note: 'Affirmative opinion verbs (penser, croire, trouver) → indicative. Negative or interrogative → usually subjunctive.' },
        { t: 'table', title: 'Les expressions du débat', head: ['Function', 'Expressions'],
          rows: [['Give an opinion', 'À mon avis… · Selon moi… · D’après moi… · Il me semble que…'], ['Agree', 'Je suis d’accord avec toi. · Tu as raison. · Exactement !'], ['Disagree', 'Je ne suis pas d’accord. · Je ne partage pas ton avis. · Au contraire…'], ['Nuance', 'C’est vrai, mais… · D’un côté…, de l’autre… · Il faut reconnaître que…']] },
        { t: 'dialogue', title: 'Le télétravail : pour ou contre ?',
          lines: [['Nora', 'À mon avis, le télétravail est une excellente chose. On gagne du temps.', 'In my opinion, remote work is excellent. You save time.'], ['Marc', 'Je ne suis pas tout à fait d’accord. Je ne pense pas que ce soit bon pour l’esprit d’équipe.', 'I don’t completely agree. I don’t think it’s good for team spirit.'], ['Nora', 'C’est vrai, mais il est possible qu’on trouve un équilibre : deux jours au bureau, trois à la maison.', 'True, but we might find a balance: two days in the office, three at home.'], ['Marc', 'D’un côté, c’est plus flexible ; de l’autre, certains se sentent isolés.', 'On one hand it’s more flexible; on the other, some people feel isolated.'], ['Nora', 'Tu as raison. Je crois que tout dépend du métier.', 'You’re right. I think it all depends on the job.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Je pense qu’il soit malade.', 'Je pense qu’il est malade.', 'Affirmative opinion → indicative.'], ['Je ne pense pas qu’il a raison.', 'Je ne pense pas qu’il ait raison.', 'Negative opinion → subjunctive.'], ['Je suis d’accord de toi.', 'Je suis d’accord avec toi.', 'être d’accord avec quelqu’un.']] }
      ],
      vocab: [['à mon avis', 'in my opinion'], ['selon moi', 'according to me'], ['être d’accord avec', 'to agree with'], ['avoir raison / tort', 'to be right / wrong'], ['un point de vue', 'a point of view'], ['convaincre', 'to convince'], ['un équilibre', 'a balance'], ['le télétravail', 'remote work']],
      practice: [
        ['choice', 'Je pense qu’il ___ raison.', ['a', 'ait', 'avoir', 'aie'], 'Affirmative penser que → indicative.'],
        ['choice', 'Je ne crois pas que ce ___ une bonne idée.', ['soit', 'est', 'sera', 'était'], 'Negative opinion → subjunctive.'],
        ['gap', 'Je doute qu’elle ___ (venir) ce soir.', ['vienne'], 'douter que + subjonctif.'],
        ['choice', 'Tu as ___, je me suis trompé.', ['raison', 'tort', 'avis', 'accord'], 'avoir raison = to be right.'],
        ['choice', 'Je ne suis pas d’accord ___ toi.', ['avec', 'de', 'à', 'pour'], 'être d’accord avec quelqu’un.'],
        ['choice', 'Which expression introduces a nuance?', ['D’un côté…, de l’autre…', 'Exactement !', 'Tu as raison.', 'Au contraire !'], 'Weighing both sides = nuance.'],
        ['match', 'Match the expression and its function.', [['À mon avis', 'giving an opinion'], ['Je ne partage pas ton avis', 'disagreeing'], ['Tu as raison', 'agreeing'], ['C’est vrai, mais…', 'nuancing']]],
        ['order', 'À mon avis, il faut protéger l’environnement.', 'In my opinion, we must protect the environment.'],
        ['listen', 'Je ne pense pas que ce soit possible.']
      ],
      summary: ['Je pense / crois que + indicatif; je ne pense pas que / je doute que + subjonctif.', 'Debate phrases: à mon avis, je suis d’accord avec, je ne partage pas ton avis, d’un côté… de l’autre.', 'Nuance before disagreeing: C’est vrai, mais…']
    },
    {
      title: 'Si j’avais su…',
      focus: 'Plus-que-parfait · conditionnel passé',
      minutes: 30,
      goals: ['Form and use the plus-que-parfait', 'Express regrets with the conditionnel passé', 'Build si + plus-que-parfait sentences'],
      slides: [
        { t: 'text', title: 'Le plus-que-parfait',
          body: ['**avoir / être (imparfait) + participe passé** → j’**avais mangé**, elle **était partie**.', 'It shows an action **before another past action**: Quand je suis arrivé, le film **avait** déjà **commencé**.',
            'Same auxiliary and agreement rules as the passé composé: Nous **étions rentrés**. Elles **s’étaient levées** tôt.'] },
        { t: 'text', title: 'Le conditionnel passé',
          body: ['**avoir / être (conditionnel) + participe passé** → j’**aurais aimé**, nous **serions venus**.', 'It describes something that **did not happen** in the past, often a regret.'] },
        { t: 'table', title: 'Exprimer un regret', head: ['Structure', 'Example', 'English'],
          rows: [['J’aurais dû + inf.', 'J’**aurais dû** réviser.', 'I should have revised.'], ['J’aurais pu + inf.', 'J’**aurais pu** t’aider.', 'I could have helped you.'], ['J’aurais aimé + inf.', 'J’**aurais aimé** être là.', 'I would have liked to be there.'], ['Si seulement + PQP', '**Si seulement** j’**avais su** !', 'If only I had known!']] },
        { t: 'table', title: 'Si + plus-que-parfait → conditionnel passé', head: ['Condition (did not happen)', 'Result (did not happen)'],
          rows: [['Si j’**avais su**,', 'je **serais venu(e)**.'], ['Si tu m’**avais appelé**,', 'je t’**aurais aidé**.'], ['Si nous **étions partis** plus tôt,', 'nous n’**aurions** pas **raté** le train.']] },
        { t: 'dialogue', title: 'Le concert',
          lines: [['Sami', 'Tu es allée au concert samedi ?', 'Did you go to the concert on Saturday?'], ['Clara', 'Non, il n’y avait plus de billets. J’aurais dû les acheter plus tôt.', 'No, there were no tickets left. I should have bought them earlier.'], ['Sami', 'Dommage ! Si tu m’avais demandé, je t’en aurais trouvé un.', 'Shame! If you’d asked me, I’d have found you one.'], ['Clara', 'Si seulement j’avais su !', 'If only I’d known!'], ['Sami', 'La prochaine fois, je te préviendrai.', 'Next time, I’ll let you know.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Si j’aurais su, je serais venu.', 'Si j’avais su, je serais venu.', 'si + plus-que-parfait.'], ['J’aurais dû de venir.', 'J’aurais dû venir.', 'devoir + infinitive (no "de").'], ['Elle aurait venue.', 'Elle serait venue.', 'venir takes être.']] }
      ],
      vocab: [['regretter', 'to regret'], ['j’aurais dû', 'I should have'], ['j’aurais pu', 'I could have'], ['si seulement', 'if only'], ['rater', 'to miss (a train, a chance)'], ['dommage', 'what a shame'], ['prévenir', 'to let someone know, to warn'], ['à temps', 'in time']],
      practice: [
        ['gap', 'Si j’avais su, je ___ (venir) plus tôt. (I’m a man)', ['serais venu'], 'Conditionnel passé of venir: serais venu.'],
        ['choice', 'Si tu ___ plus tôt, tu n’aurais pas raté le bus.', ['étais parti', 'serais parti', 'partais', 'es parti'], 'si + plus-que-parfait.'],
        ['choice', 'J’___ dû réviser davantage.', ['aurais', 'avais', 'aurai', 'serais'], 'Regret: j’aurais dû.'],
        ['choice', 'Quand nous sommes arrivés, le spectacle ___.', ['avait commencé', 'a commencé', 'commençait', 'aurait commencé'], 'Earlier past action → plus-que-parfait.'],
        ['gap', 'Elle ___ (aimer) venir, mais elle était malade.', ['aurait aimé'], 'Unrealised wish → conditionnel passé.'],
        ['choice', '"J’aurais pu" means…', ['I could have', 'I should have', 'I would like', 'I had been able'], 'pouvoir → could have.'],
        ['match', 'Match French and English.', [['j’aurais dû', 'I should have'], ['j’aurais pu', 'I could have'], ['si seulement', 'if only'], ['rater le train', 'miss the train']]],
        ['order', 'Si j’avais su, je ne serais pas venu.', 'If I had known, I wouldn’t have come.'],
        ['listen', 'J’aurais aimé passer plus de temps avec toi.']
      ],
      summary: ['Plus-que-parfait = avais / étais + participle: an action before another past action.', 'Conditionnel passé = aurais / serais + participle: regrets and things that didn’t happen.', 'Si + plus-que-parfait → conditionnel passé (Si j’avais su, je serais venu).']
    },
    {
      title: 'Il m’a dit que…',
      focus: 'Le discours indirect',
      minutes: 30,
      goals: ['Report statements, questions and orders', 'Change tenses and time expressions correctly', 'Use precise reporting verbs'],
      slides: [
        { t: 'table', title: 'La concordance des temps', intro: 'When the reporting verb is in the past (il a dit, elle a expliqué…), tenses shift back.',
          head: ['Discours direct', 'Discours indirect'],
          rows: [['« Je **suis** fatigué. »', 'Il a dit qu’il **était** fatigué.'], ['« J’**ai perdu** mes clés. »', 'Il a dit qu’il **avait perdu** ses clés.'], ['« Je **viendrai**. »', 'Elle a promis qu’elle **viendrait**.'], ['« Je **vais partir**. »', 'Il a annoncé qu’il **allait partir**.'], ['« **Ferme** la porte ! »', 'Il m’a demandé **de fermer** la porte.']],
          note: 'If the reporting verb is in the **present** (Il dit que…), the tense does not change.' },
        { t: 'table', title: 'Les questions', head: ['Direct', 'Indirect'],
          rows: [['« Tu viens ? »', 'Elle m’a demandé **si** je venais.'], ['« Qu’est-ce que tu veux ? »', 'Il m’a demandé **ce que** je voulais.'], ['« Qu’est-ce qui se passe ? »', 'Il a demandé **ce qui** se passait.'], ['« Où habites-tu ? »', 'Elle m’a demandé **où** j’habitais.']] },
        { t: 'table', title: 'Les expressions de temps', head: ['Direct', 'Indirect'],
          rows: [['aujourd’hui', 'ce jour-là'], ['demain', 'le lendemain'], ['hier', 'la veille'], ['maintenant', 'à ce moment-là'], ['la semaine prochaine', 'la semaine suivante'], ['ici', 'là']] },
        { t: 'examples', title: 'Écoutez et répétez', items: [['Elle a expliqué qu’elle ne pouvait pas venir.', 'She explained that she couldn’t come.'], ['Il m’a demandé si j’avais faim.', 'He asked me if I was hungry.'], ['Le médecin m’a conseillé de me reposer.', 'The doctor advised me to rest.'], ['Ils ont annoncé qu’ils se mariaient le lendemain.', 'They announced they were getting married the next day.']] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Il m’a demandé est-ce que je venais.', 'Il m’a demandé si je venais.', 'Yes / no question → si.'], ['Il m’a demandé qu’est-ce que je voulais.', 'Il m’a demandé ce que je voulais.', 'qu’est-ce que → ce que.'], ['Elle a dit qu’elle viendra.', 'Elle a dit qu’elle viendrait.', 'futur → conditionnel.']] }
      ],
      vocab: [['affirmer', 'to state, to claim'], ['expliquer', 'to explain'], ['ajouter', 'to add'], ['répondre', 'to answer'], ['demander si', 'to ask whether'], ['conseiller de', 'to advise to'], ['le lendemain', 'the next day'], ['la veille', 'the day before']],
      practice: [
        ['choice', '« Je suis malade. » → Il a dit qu’il ___ malade.', ['était', 'est', 'sera', 'a été'], 'présent → imparfait.'],
        ['choice', '« Tu viens ? » → Elle m’a demandé ___ je venais.', ['si', 'que', 'est-ce que', 'ce que'], 'Yes / no question → si.'],
        ['choice', '« Qu’est-ce que tu fais ? » → Il m’a demandé ___ je faisais.', ['ce que', 'qu’est-ce que', 'que', 'ce qui'], 'qu’est-ce que → ce que.'],
        ['gap', '« Je viendrai. » → Elle a promis qu’elle ___.', ['viendrait'], 'futur → conditionnel.'],
        ['gap', '« J’ai perdu mes clés. » → Il a dit qu’il ___ ses clés.', ['avait perdu'], 'passé composé → plus-que-parfait.'],
        ['choice', 'In reported speech, "demain" becomes…', ['le lendemain', 'la veille', 'ce jour-là', 'demain'], 'demain → le lendemain.'],
        ['match', 'Match direct and indirect time words.', [['hier', 'la veille'], ['aujourd’hui', 'ce jour-là'], ['maintenant', 'à ce moment-là'], ['ici', 'là']]],
        ['order', 'Elle m’a demandé si j’étais prêt.', 'She asked me if I was ready.'],
        ['listen', 'Il a expliqué qu’il avait raté le train.']
      ],
      summary: ['After a past reporting verb: présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel.', 'Questions: si (yes / no), ce que (qu’est-ce que), ce qui (qu’est-ce qui).', 'Time words shift: demain → le lendemain, hier → la veille.']
    },
    {
      title: 'Argumenter avec élégance',
      focus: 'Les connecteurs logiques',
      minutes: 30,
      goals: ['Express cause, consequence and opposition precisely', 'Structure an argument from introduction to conclusion', 'Avoid typical mistakes with malgré, grâce à and bien que'],
      slides: [
        { t: 'table', title: 'La cause et la conséquence', head: ['Function', 'Connector', 'Example'],
          rows: [['Cause', 'parce que, car, puisque', 'Je reste ici **car** il pleut.'], ['Positive cause', 'grâce à + nom', 'J’ai réussi **grâce à** toi.'], ['Negative cause', 'à cause de + nom', 'Le vol est annulé **à cause de** la neige.'], ['Consequence', 'donc, c’est pourquoi, par conséquent', 'Il a triché ; **par conséquent**, il est disqualifié.']] },
        { t: 'table', title: 'L’opposition et la concession', head: ['Connector', 'Followed by', 'Example'],
          rows: [['mais, pourtant, cependant', 'a clause', 'Il est riche ; **pourtant**, il vit simplement.'], ['en revanche', 'a clause (contrast)', 'Paris est cher ; **en revanche**, la banlieue est abordable.'], ['alors que', 'indicative', 'Il travaille **alors que** tout le monde dort.'], ['bien que', 'subjunctive', '**Bien qu’**il **soit** tard, je continue.'], ['malgré', 'a noun', '**Malgré** la pluie, nous sommes sortis.']] },
        { t: 'text', title: 'Structurer un argument',
          body: ['**Tout d’abord**, apprendre une langue ouvre des portes professionnelles.', '**De plus**, cela permet de mieux comprendre d’autres cultures.',
            '**Certes**, cela demande du temps ; **cependant**, quelques minutes par jour suffisent.', '**Enfin**, c’est un excellent exercice pour la mémoire.', '**En conclusion**, c’est un investissement qui en vaut la peine.'] },
        { t: 'mistakes', title: 'Erreurs fréquentes', items: [['Malgré qu’il pleuve, on sort.', 'Bien qu’il pleuve / Malgré la pluie, on sort.', 'malgré + noun; bien que + subjonctif.'], ['Grâce à la pluie, le match est annulé.', 'À cause de la pluie, le match est annulé.', 'grâce à = positive cause only.'], ['Bien qu’il est riche…', 'Bien qu’il soit riche…', 'bien que + subjonctif.']] }
      ],
      vocab: [['cependant', 'however'], ['pourtant', 'yet, even so'], ['en revanche', 'on the other hand'], ['par conséquent', 'consequently'], ['grâce à', 'thanks to'], ['à cause de', 'because of (negative)'], ['malgré', 'despite'], ['certes', 'admittedly']],
      practice: [
        ['choice', '___ la pluie, nous sommes sortis.', ['Malgré', 'Bien que', 'Pourtant', 'Grâce à'], 'malgré + noun.'],
        ['choice', 'J’ai réussi l’examen ___ tes conseils.', ['grâce à', 'à cause de', 'malgré', 'car'], 'Positive cause + noun → grâce à.'],
        ['choice', 'Le train a été annulé ___ la grève.', ['à cause de', 'grâce à', 'malgré', 'donc'], 'Negative cause + noun → à cause de.'],
        ['gap', 'Il a beaucoup travaillé ; ___, il a échoué. (yet)', ['pourtant', 'cependant', 'néanmoins', 'toutefois'], 'Contrast → pourtant / cependant.'],
        ['choice', 'Bien qu’il ___ riche, il vit simplement.', ['soit', 'est', 'était', 'sera'], 'bien que + subjonctif.'],
        ['choice', 'Paris est cher ; ___, la banlieue est plus abordable.', ['en revanche', 'grâce à', 'car', 'puisque'], 'Contrast between two facts → en revanche.'],
        ['match', 'Match the connector with its function.', [['par conséquent', 'consequence'], ['car', 'cause'], ['cependant', 'opposition'], ['de plus', 'addition'], ['en conclusion', 'conclusion']]],
        ['order', 'Tout d’abord, je voudrais vous remercier.', 'First of all, I would like to thank you.'],
        ['listen', 'Par conséquent, nous devons agir rapidement.']
      ],
      summary: ['Cause: parce que, car, grâce à (+), à cause de (−). Consequence: donc, par conséquent.', 'Opposition: pourtant, cependant, en revanche; malgré + nom; bien que + subjonctif.', 'Structure: tout d’abord, de plus, certes… cependant, enfin, en conclusion.']
    }
  ]
});
