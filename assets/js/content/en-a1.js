/* English · A1 Beginner */
FL.addLevel('en', {
  code: 'A1',
  name: 'Beginner',
  summary: 'Start from the basics: introduce yourself, talk about your family, your day, food and your home.',
  outcome: 'By the end of A1 you can introduce yourself, ask and answer simple personal questions and describe your daily life in simple sentences.',
  lessons: [
    {
      title: 'Hello! Introducing yourself',
      focus: 'The verb "to be" · greetings',
      minutes: 20,
      goals: ['Greet people in formal and informal situations', 'Introduce yourself and ask for someone’s name', 'Use the verb "to be" in positive, negative and question forms'],
      slides: [
        { t: 'table', title: 'Saying hello and goodbye', intro: 'We choose different words for friends and for formal situations, like work or meeting someone new.',
          head: ['Informal (friends, family)', 'Formal (work, new people)'],
          rows: [['Hi! / Hey!', 'Hello. / Good morning.'], ['How are you? / How’s it going?', 'How are you today?'], ['Bye! / See you!', 'Goodbye. / Have a nice day.']],
          note: 'Good morning (until 12:00) · Good afternoon (12:00–18:00) · Good evening (after 18:00). "Good night" is only for going to bed!' },
        { t: 'table', title: 'The verb "to be"', intro: 'In spoken English we almost always use the **short form**.',
          head: ['Full form', 'Short form', 'Example'],
          rows: [['I am', 'I’m', 'I’m Sara.'], ['You are', 'You’re', 'You’re my teacher.'], ['He is', 'He’s', 'He’s from Brazil.'], ['She is', 'She’s', 'She’s a nurse.'], ['It is', 'It’s', 'It’s a good book.'], ['We are', 'We’re', 'We’re students.'], ['They are', 'They’re', 'They’re in class.']] },
        { t: 'text', title: 'Negatives and questions',
          body: ['To make a **negative**, add *not* after the verb: I’m **not** tired. · She **isn’t** here. · They **aren’t** late.',
            'To make a **question**, put the verb first: **Are** you a student? · **Is** he from Japan?',
            'Answer with a **short answer**: Yes, I am. / No, I’m not. · Yes, he is. / No, he isn’t.'] },
        { t: 'dialogue', title: 'First day of class',
          lines: [['Teacher', 'Good morning! I’m Mr. Amar. What’s your name?'], ['Lina', 'Hi! My name is Lina.'], ['Teacher', 'Nice to meet you, Lina. Where are you from?'], ['Lina', 'I’m from Malaysia. I’m from Kuala Lumpur.'], ['Teacher', 'Great! Are you a student?'], ['Lina', 'Yes, I am. I’m a university student.'], ['Teacher', 'Welcome to the class!']] },
        { t: 'mistakes', title: 'Common mistakes',
          items: [['I student.', 'I am a student.', 'Don’t forget the verb "be" and the article "a".'], ['She are from Spain.', 'She is from Spain.', 'He / she / it → is.'], ['I have 20 years.', 'I am 20 (years old).', 'In English we use "be" for age.'], ['Are you from?', 'Where are you from?', 'Use the question word "where".']] }
      ],
      vocab: [['hello', 'a greeting'], ['goodbye', 'what we say when we leave'], ['name', 'what people call you'], ['nice to meet you', 'polite phrase when you meet someone new'], ['student', 'a person who studies'], ['teacher', 'a person who teaches'], ['country', 'e.g. Malaysia, France, Brazil'], ['from', 'shows where you were born or live']],
      practice: [
        ['choice', 'She ___ a doctor.', ['is', 'are', 'am', 'be'], 'He / she / it always takes "is".'],
        ['choice', 'Which greeting is formal?', ['Good morning. How are you today?', 'Hey! How’s it going?', 'Hi there!', 'See you!'], '"Good morning" is polite and works in any formal situation.'],
        ['gap', 'They ___ from Canada.', ['are', '’re'], 'They → are.'],
        ['gap', 'I ___ 25 years old.', ['am', '’m'], 'We use "be" for age: I am 25.'],
        ['choice', '"Are you a teacher?" — "No, ___."', ['I’m not', 'I amn’t', 'I not', 'I don’t'], 'The short negative answer is "No, I’m not."'],
        ['match', 'Match each question with its answer.', [['What’s your name?', 'My name is Ali.'], ['Where are you from?', 'I’m from Egypt.'], ['How are you?', 'I’m fine, thanks.'], ['Nice to meet you.', 'Nice to meet you too.']]],
        ['order', 'Where are you from?'],
        ['gap', '___ he your brother? (question)', ['Is'], 'Questions with "he" start with "Is".'],
        ['listen', 'Nice to meet you.']
      ],
      summary: ['Use "Hi" with friends and "Hello / Good morning" in formal situations.', 'I am · you/we/they are · he/she/it is — use short forms when speaking.', 'Questions: put the verb first (Are you…?). Negatives: add not (isn’t, aren’t).']
    },
    {
      title: 'My family',
      focus: 'Possessive adjectives · have got',
      minutes: 20,
      goals: ['Name the members of your family', 'Use my, your, his, her, our, their', 'Talk about family with "have got / has got"'],
      slides: [
        { t: 'vocab', title: 'Family words', words: [['mother / mum', 'female parent'], ['father / dad', 'male parent'], ['sister', 'a girl with the same parents'], ['brother', 'a boy with the same parents'], ['grandmother', 'your parent’s mother'], ['grandfather', 'your parent’s father'], ['aunt / uncle', 'your parent’s sister / brother'], ['cousin', 'your aunt’s or uncle’s child']] },
        { t: 'table', title: 'Possessive adjectives', intro: 'Possessive adjectives show who something belongs to. They go **before a noun** and never change for plural.',
          head: ['Subject', 'Possessive', 'Example'],
          rows: [['I', 'my', 'This is **my** sister.'], ['you', 'your', 'Is this **your** phone?'], ['he', 'his', '**His** name is Omar.'], ['she', 'her', '**Her** brother is a doctor.'], ['it', 'its', 'The cat is in **its** bed.'], ['we', 'our', '**Our** parents are teachers.'], ['they', 'their', '**Their** house is big.']] },
        { t: 'text', title: 'have got / has got',
          body: ['We use **have got** to talk about family and possessions (very common in British English).',
            'I / you / we / they **have got** → I’ve got two brothers.', 'He / she / it **has got** → She’s got a baby sister.',
            'Negative: I **haven’t got** a car. · He **hasn’t got** any cousins.', 'Question: **Have** you **got** any children? — Yes, I have. / No, I haven’t.'] },
        { t: 'examples', title: 'Listen and repeat', items: [['My mother is a nurse and my father is an engineer.', 'two jobs'], ['I’ve got one sister and two brothers.', 'how many siblings'], ['Her grandparents live in Penang.', 'her = she'], ['Their son is three years old.', 'their = they'], ['Have you got any cousins?', 'question']] },
        { t: 'mistakes', title: 'Watch out', items: [['She is my sister. His name is Amira.', 'She is my sister. Her name is Amira.', 'Use "her" for a woman and "his" for a man.'], ['Their are my parents.', 'They are my parents.', '"Their" is possessive; "they are" is the verb.'], ['He have got a car.', 'He has got a car.', 'He / she / it → has got.']] }
      ],
      vocab: [['parents', 'mother and father'], ['siblings', 'brothers and sisters'], ['son', 'a male child'], ['daughter', 'a female child'], ['husband', 'a married man'], ['wife', 'a married woman'], ['grandparents', 'your parents’ parents'], ['only child', 'a person with no siblings']],
      practice: [
        ['choice', 'This is Sara. ___ brother is a pilot.', ['Her', 'His', 'She', 'Their'], 'Sara is a woman, so we use "her".'],
        ['choice', 'We love ___ grandparents.', ['our', 'we', 'us', 'their'], 'We → our.'],
        ['gap', 'My uncle ___ got three children. (has / have)', ['has'], 'He / she / it → has got.'],
        ['gap', 'My father’s mother is my ___.', ['grandmother', 'grandma', 'granny'], 'Your parent’s mother is your grandmother.'],
        ['match', 'Match the family words.', [['brother', 'sister'], ['father', 'mother'], ['uncle', 'aunt'], ['son', 'daughter'], ['husband', 'wife']]],
        ['choice', 'Have you got any sisters? — No, I ___.', ['haven’t', 'hasn’t', 'don’t', 'am not'], 'Short answer: No, I haven’t.'],
        ['order', 'They have got two daughters.'],
        ['listen', 'My sister is a teacher.']
      ],
      summary: ['Possessive adjectives: my, your, his, her, its, our, their — always before a noun.', 'I / you / we / they have got · he / she / it has got.', 'Short answers: Yes, I have. / No, I haven’t.']
    },
    {
      title: 'My daily routine',
      focus: 'Present simple · telling the time',
      minutes: 25,
      goals: ['Describe your daily routine', 'Use the present simple, including he / she / it + -s', 'Tell the time and use adverbs of frequency'],
      slides: [
        { t: 'text', title: 'The present simple',
          body: ['We use the **present simple** for habits, routines and facts.', 'I / you / we / they **work** → I work in an office.', 'He / she / it + **-s** → She work**s** at a hospital.',
            'Spelling: watch → watch**es** · go → go**es** · study → stud**ies** · have → **has**'] },
        { t: 'table', title: 'Negatives and questions', intro: 'We use **do / does** to make negatives and questions. After *does*, the main verb has **no -s**.',
          head: ['', 'I / you / we / they', 'he / she / it'],
          rows: [['Negative', 'I **don’t** drink coffee.', 'She **doesn’t** drink coffee.'], ['Question', '**Do** you work on Saturday?', '**Does** he work on Saturday?'], ['Short answer', 'Yes, I do. / No, I don’t.', 'Yes, he does. / No, he doesn’t.']] },
        { t: 'table', title: 'Telling the time', head: ['Time', 'We say'],
          rows: [['7:00', 'seven o’clock'], ['7:15', 'quarter past seven / seven fifteen'], ['7:30', 'half past seven / seven thirty'], ['7:45', 'quarter to eight / seven forty-five'], ['7:10', 'ten past seven'], ['7:50', 'ten to eight']],
          note: 'Use **at** with times: at 8 o’clock, at midnight. Use **in** with parts of the day: in the morning, in the evening.' },
        { t: 'table', title: 'How often?', intro: 'Adverbs of frequency go **before** the main verb but **after** the verb "be".',
          head: ['Adverb', 'Example'],
          rows: [['always (100%)', 'I **always** have breakfast.'], ['usually', 'She **usually** walks to work.'], ['often', 'We **often** watch films.'], ['sometimes', 'He **sometimes** cooks dinner.'], ['never (0%)', 'They are **never** late.']] },
        { t: 'examples', title: 'A day in the life of Daniel', items: [['Daniel gets up at half past six.', ''], ['He has a shower and gets dressed.', ''], ['He usually takes the train to work.', ''], ['He doesn’t eat lunch at home.', ''], ['In the evening he goes to the gym.', ''], ['He goes to bed at eleven o’clock.', '']] }
      ],
      vocab: [['get up', 'leave your bed in the morning'], ['have breakfast', 'eat the first meal of the day'], ['go to work', 'travel to your job'], ['have lunch', 'eat in the middle of the day'], ['finish work', 'stop working for the day'], ['go to bed', 'go to sleep at night'], ['usually', 'most of the time'], ['never', 'not at any time']],
      practice: [
        ['choice', 'My brother ___ in a bank.', ['works', 'work', 'working', 'is work'], 'He / she / it + -s.'],
        ['gap', 'She ___ (not / like) coffee.', ['doesn’t like', 'does not like'], 'Negative with she: doesn’t + base verb.'],
        ['choice', '___ your parents live in Johor?', ['Do', 'Does', 'Are', 'Is'], 'Parents = they → Do.'],
        ['choice', 'Where does the adverb go? "I ___ late."', ['am never', 'never am', 'never be', 'am not never'], 'With "be", the adverb comes after the verb.'],
        ['gap', 'He ___ (watch) TV every evening.', ['watches'], 'Verbs ending in -ch add -es.'],
        ['match', 'Match the times.', [['8:15', 'quarter past eight'], ['8:30', 'half past eight'], ['8:45', 'quarter to nine'], ['9:00', 'nine o’clock']]],
        ['order', 'I usually have breakfast at seven.'],
        ['choice', 'Does he speak French? — Yes, he ___.', ['does', 'do', 'is', 'speaks'], 'Short answer: Yes, he does.'],
        ['listen', 'She gets up at half past six.']
      ],
      summary: ['Present simple for routines: I work → she works.', 'Negatives & questions use do / does + base verb (She doesn’t work. Does she work?).', 'at + time (at 7:30), in + part of the day (in the evening); adverbs go before the main verb.']
    },
    {
      title: 'Food and shopping',
      focus: 'Countable & uncountable · some / any',
      minutes: 25,
      goals: ['Name common food and drinks', 'Use a / an, some and any correctly', 'Ask "How much?" and "How many?" when shopping'],
      slides: [
        { t: 'vocab', title: 'At the market', words: [['apple', 'a round fruit'], ['banana', 'a long yellow fruit'], ['egg', 'chickens lay them'], ['bread', 'made from flour, baked'], ['rice', 'small white grains'], ['milk', 'white drink from cows'], ['water', 'a clear drink'], ['cheese', 'made from milk']] },
        { t: 'text', title: 'Countable or uncountable?',
          body: ['**Countable** nouns can be counted: one apple, two apples, three eggs.', '**Uncountable** nouns cannot be counted: rice, milk, water, bread, money, information.',
            'Uncountable nouns have **no plural** and we don’t use *a / an*: ~~a rice~~ → some rice.', 'To count them, use containers: a **bottle** of water, a **loaf** of bread, a **kilo** of rice, a **cup** of tea.'] },
        { t: 'table', title: 'a / an, some and any', head: ['', 'Countable', 'Uncountable'],
          rows: [['Positive (+)', 'a banana / **some** bananas', '**some** milk'], ['Negative (−)', 'There aren’t **any** eggs.', 'There isn’t **any** milk.'], ['Question (?)', 'Are there **any** eggs?', 'Is there **any** milk?']],
          note: 'Use **an** before a vowel sound: an apple, an egg, an hour. Use **some** in offers: Would you like **some** tea?' },
        { t: 'dialogue', title: 'At the shop',
          lines: [['Shop assistant', 'Good morning. Can I help you?'], ['Customer', 'Yes, please. I’d like some apples.'], ['Shop assistant', 'How many would you like?'], ['Customer', 'Six, please. And have you got any bread?'], ['Shop assistant', 'Sorry, we haven’t got any bread today.'], ['Customer', 'No problem. How much is that?'], ['Shop assistant', 'That’s four dollars fifty, please.']] },
        { t: 'table', title: 'How much? How many?', head: ['Question', 'Use with', 'Example'],
          rows: [['How many…?', 'countable nouns', 'How many eggs do we need?'], ['How much…?', 'uncountable nouns', 'How much water do you drink?'], ['How much is / are…?', 'prices', 'How much are the bananas?']] }
      ],
      vocab: [['a bottle of', 'container for water, juice, oil'], ['a loaf of', 'one whole bread'], ['a kilo of', '1000 grams'], ['How much is it?', 'asking the price'], ['shop assistant', 'person who works in a shop'], ['vegetables', 'carrots, onions, potatoes…'], ['cheap', 'it doesn’t cost much'], ['expensive', 'it costs a lot']],
      practice: [
        ['choice', 'Is there ___ milk in the fridge?', ['any', 'some', 'a', 'many'], 'Questions usually take "any".'],
        ['choice', 'I’d like ___ orange, please.', ['an', 'a', 'some', 'any'], '"Orange" starts with a vowel sound → an.'],
        ['gap', 'How ___ eggs do you need? (much / many)', ['many'], 'Eggs are countable → how many.'],
        ['gap', 'How ___ rice do we have? (much / many)', ['much'], 'Rice is uncountable → how much.'],
        ['choice', 'Which noun is uncountable?', ['information', 'apple', 'chair', 'egg'], 'Information has no plural in English.'],
        ['match', 'Match the container with the food.', [['a bottle of', 'water'], ['a loaf of', 'bread'], ['a cup of', 'tea'], ['a kilo of', 'rice']]],
        ['gap', 'There aren’t ___ bananas left.', ['any'], 'Negative sentences take "any".'],
        ['order', 'How much are the apples?'],
        ['listen', 'Would you like some water?']
      ],
      summary: ['Countable: a / an + singular, some + plural. Uncountable: no a / an, no plural.', 'some in positive sentences and offers, any in negatives and questions.', 'How many + countable, How much + uncountable or price.']
    },
    {
      title: 'Where I live',
      focus: 'There is / there are · prepositions of place',
      minutes: 20,
      goals: ['Describe your home and your city', 'Use there is / there are', 'Say where things are with in, on, under, next to…'],
      slides: [
        { t: 'vocab', title: 'Rooms and furniture', words: [['living room', 'where you relax and watch TV'], ['kitchen', 'where you cook'], ['bedroom', 'where you sleep'], ['bathroom', 'where you wash'], ['sofa', 'a long soft seat'], ['wardrobe', 'where you keep clothes'], ['shelf', 'a board on the wall for books'], ['fridge', 'keeps food cold']] },
        { t: 'table', title: 'There is / there are', head: ['', 'Singular', 'Plural'],
          rows: [['+', '**There’s** a sofa in the living room.', '**There are** two bedrooms.'], ['−', '**There isn’t** a garden.', '**There aren’t** any shops near here.'], ['?', '**Is there** a lift?', '**Are there** any parks?']],
          note: 'Short answers: Yes, there is. / No, there isn’t. · Yes, there are. / No, there aren’t.' },
        { t: 'table', title: 'Prepositions of place', head: ['Preposition', 'Example'],
          rows: [['in', 'The milk is **in** the fridge.'], ['on', 'The keys are **on** the table.'], ['under', 'The cat is **under** the bed.'], ['next to', 'The bank is **next to** the café.'], ['between', 'The pharmacy is **between** the bank and the school.'], ['opposite', 'My flat is **opposite** the park.'], ['behind / in front of', 'The car is **in front of** the house.']] },
        { t: 'examples', title: 'My flat in Kuala Lumpur', items: [['I live in a small flat in the city centre.', ''], ['There are two bedrooms and one bathroom.', ''], ['There isn’t a garden, but there’s a nice balcony.', ''], ['The supermarket is opposite my building.', ''], ['There are a lot of cafés near my street.', '']] },
        { t: 'mistakes', title: 'Common mistakes', items: [['There is two chairs.', 'There are two chairs.', 'Plural noun → there are.'], ['It has a park near my house.', 'There is a park near my house.', 'Use "there is" to say something exists.'], ['The book is on the bag.', 'The book is in the bag.', '"In" = inside; "on" = on the surface.']] }
      ],
      vocab: [['flat / apartment', 'a home on one floor of a building'], ['house', 'a building for one family'], ['neighbourhood', 'the area around your home'], ['city centre', 'the middle of the city'], ['balcony', 'small outside area on a flat'], ['lift / elevator', 'goes up and down between floors'], ['next to', 'beside'], ['opposite', 'across from, facing']],
      practice: [
        ['choice', '___ three windows in my room.', ['There are', 'There is', 'It has', 'Is there'], 'Three windows is plural → there are.'],
        ['choice', '___ a hospital near here?', ['Is there', 'Are there', 'There is', 'Has it'], 'Singular question → Is there…?'],
        ['gap', 'The keys are ___ the table. (on the surface)', ['on'], 'On = touching the top surface.'],
        ['gap', 'There ___ any shops in my street. (negative, plural)', ['aren’t', 'are not'], 'Plural negative → there aren’t.'],
        ['match', 'Match the room with the activity.', [['kitchen', 'cook dinner'], ['bedroom', 'sleep'], ['bathroom', 'have a shower'], ['living room', 'watch TV']]],
        ['choice', 'The bank is ___ the school and the post office.', ['between', 'next', 'opposite of', 'under'], '"Between" is used with two things.'],
        ['order', 'Is there a lift in your building?'],
        ['listen', 'There are two bedrooms in my flat.']
      ],
      summary: ['There is + singular / uncountable, there are + plural.', 'Questions: Is there…? Are there…? — Short answers: Yes, there is / No, there aren’t.', 'Prepositions: in, on, under, next to, between, opposite, in front of, behind.']
    }
  ]
});
